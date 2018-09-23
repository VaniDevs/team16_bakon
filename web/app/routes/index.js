'use strict';

var express	 	= require('express');
var router 		= express.Router();
// var passport 	= require('passport');

// const logger = require('../core/logger');
const appointmentService = require('../services/appointment');
const itemService = require('../services/item');
const agencyService  = require('../services/agency');
const clientService  = require('../services/client');
const donorService  = require('../services/donor');

/* --------------------- Appointment --------------------- */
router.post('/appointment', function(req, res, next) {
	var data = req.body;
	appointmentService.create(data)
	.then(appointment => {
		return res.send({ success: true });
	}).catch(err => {
		next(err);
	});
});

router.get('/appointments', function(req, res, next) {
	appointmentService.getAll()
	.then(appointments => {
		return res.send(appointments);
	}).catch(err => { next(err);});
});

router.get('/appointments/today', function(req, res, next) {
	appointmentService.todayAppointments()
	.then(async function(appointments) {
		appointments = await appointmentService.populate(appointments);
		return res.send(appointments);
	}).catch(err => { next(err);});
});

router.get('/appointments/calendar', function(req, res, next) {
	appointmentService.calendar()
	.then(async function(appointments) {
		appointments = await appointmentService.populate(appointments);
		var result = [];
		appointments = appointments.map(app => { 
			var entry = {};
			entry.start = new Date(app.date);
			entry.start.setFullYear(2018);
			entry.title = `${app.agency} - ${app.client}`;
			result.push(entry);
		});
		return res.send(result);
	}).catch(err => { next(err);});
});

/* --------------------- Inventory Items --------------------- */
router.post('/items/drop', function(req, res, next) {
	var data = req.body;
	itemService.drop(data)
	.then(done => {
		return res.send({ success: true });
	}).catch(err => { next(err);});
});

router.post('/items/pick', function(req, res, next) {
	var items = req.body.items;
	var appointmentId = req.body.appointmentId;

	itemService.pick(appointmentId, items)
	.then(done => {
		return res.send({ success: true });
	}).catch(err => { next(err);});
});

router.post('/item', function(req, res, next) {
	var item = req.body;
	itemService.create(item)
	.then(done => {
		return res.send({ success: true });
	}).catch(err => { next(err);});
});

router.get('/items', function(req, res, next) {
	itemService.getAll()
	.then(items => {
		return res.send(items);
	}).catch(err => { next(err);});
});

/* --------------------- Agency --------------------- */
router.get('/agencies', function(req, res, next) {
	agencyService.getAll()
	.then(agencies => {
		return res.send(agencies);
	}).catch(err => { next(err);});
});

router.post('/agency', function(req, res, next) {
	var agency = req.body;
	agencyService.create(agency)
	.then(done => {
		return res.send({ success: true });
	}).catch(err => { next(err);});
});

/* --------------------- Stats --------------------- */
router.get('/stats', async function(req, res, next) {
	try {

		// clients
		let clients = await clientService.countAll();
		let clientsByMinority = await clientService.clientsByMinority();
		// donors
		let donors = await donorService.countAll();
		// agencies
		let groupByAgency = await appointmentService.findByAgency();

		// current items in the store (cat, count)
		let itemsInStore = await itemService.getInStore();
		// items pending (cat, count)
		let itemsPending = await itemService.getPending();

		// items released (cat, count)
		// let itemsReleased = await itemService.getReleased();
	
		// items released by date
		let itemsReleasedByDay = await appointmentService.getReleasedByDay();
		// todays appointments 
		let todaysAppointments = (await appointmentService.todayAppointments()).length;
		let pendingAppointments = (await appointmentService.getPending()).length;
		

		res.send({ 
			clients, clientsByMinority,
			donors, todaysAppointments,
			pendingAppointments, 
			itemsInStore, itemsPending, 
			itemsReleasedByDay,
			groupByAgency
		});

	} catch (err) {
		next(err);
	}
});

/* --------------------- Slots --------------------- */
router.post('/slots', function(req, res, next) {
	var date = req.body;
	appointmentService.openSlots(date)
	.then(done => {
		return res.send({ success: true });
	}).catch(err => { next(err);});
});

router.get('/slots', function(req, res, next) {
	appointmentService.getSlots()
	.then(slots => {
		return res.send(slots);
	}).catch(err => { next(err);});
});

module.exports = router;