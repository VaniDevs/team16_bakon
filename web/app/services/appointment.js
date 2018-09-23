'use strict';

const appointmentModel = require('../core/database').models.appointment;
const slotModel = require('../core/database').models.slot;

const clientService = require('./client');
const agencyService = require('./agency');

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

class AppointmentService {
  constructor() {
  }

  static findById(appointmentId) {
    return appointmentModel.findById(appointmentId);
  }

  static async findByAgency() {
    let appointments = await appointmentModel.find({}, 'agencyId');
    let groupByAgency = {};
    for(let j = 0; j < appointments.length; j++) {
      let agencyId = appointments[j].agencyId;
      if(groupByAgency[agencyId] === undefined) { groupByAgency[agencyId] = 0; }
      groupByAgency[agencyId] += 1;
    }

    let agencies = Object.keys(groupByAgency);
    for(let j = 0; j < agencies.length; j++) {
      let agencyId = agencies[j];
      let agency = await agencyService.findById(agencyId);
      let count = groupByAgency[agencyId];
      groupByAgency[agency.name] = count;
      delete groupByAgency[agencyId];
    }

    return groupByAgency;
  }

  static getAll(options) {
    options = (options)? options: {};
    return appointmentModel.find(options, null, { sort: { 'date' : -1 } });
  }

  static getPending() {
    return appointmentModel.find({ status: 'Pending' }, null, { sort: { 'date' : -1 } });
  }

  static getReleased() {
    return appointmentModel.find({ status: 'Released' }, null, { sort: { 'date' : -1 } });
  }

  static async getReleasedByDay() {
    // 30 days window period
    let monthBack = new Date();
    monthBack.setDate(monthBack.getDate() - 30);

    let appointments = await appointmentModel.find(
      { status: 'Released', date: { $gte: monthBack }}, null, { sort: { 'date' : -1 } });

    let groupByDay = {};
    for(let j = 0; j < appointments.length; j++) {
      let d = (new Date(appointments[j].date));
      let key = d.getDate() + ", " + MONTH[d.getMonth()];
      if(groupByDay[key] === undefined) { groupByDay[key] = 0; }
      groupByDay[key] += 1;
    }

    return groupByDay;
  }

  static async create(data) {
    // create client
    let client = data.client;
    let newClient = await clientService.create(client);

    // get slot
    let slotId = data.slotId;
    let slot = await slotModel.findById(slotId);

    // create an appointment
    let appointment = data.appointment;
    appointment.clientId = newClient._id;
    appointment.date = new Date(slot.date);
    let newAppointment = await appointmentModel.create(appointment);

    // mark slot
    slot.appointmentId = newAppointment._id;
    slot.available = false;
    await slot.save();
  }

  static async todayAppointments() {
    let today  = new Date();
    today.setHours(0);
    let tomorrow = new Date();
    tomorrow.setHours(0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await appointmentModel.find({ status: 'Pending', date: { $gte: today, $lt: tomorrow } });
  }

  static async calendar() {
    return await appointmentModel.find({ status: 'Pending' });
  }

  static async populate(appointments) {
    let result = [];
    for(let j = 0; j < appointments.length; j++) {
      let client = await clientService.findById(appointments[j].clientId);
      let agency = await agencyService.findById(appointments[j].agencyId);
      let d = new Date(appointments[j].date);

      let dayAndMonth = d.getDate() + ", " + MONTH[d.getMonth()];
      let time = AppointmentService.getTime(d);
      result.push({ 
        _id: appointments[j]._id, 
        client: client.name, 
        agency: agency.name, 
        date: dayAndMonth + " " + time 
      });
    }

    return result;
  }

  // ----------- Slots ----------------
  static async openSlots(date) {
    for(let h = 10; h <= 17; h++) {
      for(let m = 0; m <= 59; m+=10) {
        try {
          await slotModel.create({
            date: new Date(`${date.year}-${date.month}-${date.day} ${h}:${m}:00`)
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  static async getSlots() {
    let forWeek = new Date();
    forWeek.setDate(forWeek.getDate() + 7);
    let slots = await slotModel.find({ available: true, date: { $gte: new Date(), $lt: forWeek }});
    
    let groupByDay = {};
    for(let j = 0; j < slots.length; j++) {
      let d = new Date(slots[j].date);
      let day = d.getDate() + ", " + MONTH[d.getMonth()];
      if(groupByDay[day] === undefined) { groupByDay[day] = []; }

      groupByDay[day].push({
        slotId: slots[j]._id,
        time: AppointmentService.getTime(d)
      });
    }

    return groupByDay;
  }

  static getTime (date) {
    var hours   = date.getHours();
    var minutes = date.getMinutes();
    var timeString = "" + ((hours > 12) ? hours - 12 : hours);
    timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
    timeString  += (hours >= 12) ? " PM" : " AM";
    return timeString;
  }
}

module.exports = AppointmentService;
