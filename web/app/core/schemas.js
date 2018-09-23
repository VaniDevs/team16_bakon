'use strict';

const Schema 	= require('mongoose').Schema;
// const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

function agency () {
  var agencySchema = new Schema({
    name: { type: String, required: true, index: true, unique: true },
    website: { type: String },
    contacts: [{ 
        name: { type: String }, 
        email: { type: String }, 
        phone: { type: String } 
      }]
  });
  return agencySchema;
}

function client () {
  var clientSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Female', 'Male', 'Non-Binary'] },
    job: { type: String },
    country: { type: String },
    phone: { type: String },
    city: { type: String },
    minority: { type: String },
  }, { strict: false });
  return clientSchema;
}

function item () {
  var itemSchema = new Schema({
    category: { type: String, required: true, index: true },
    size: { type: String, required: true },
    count: { type: Number, default: 0 }
  });

  return itemSchema;
}

function slot () {
  var slotSchema = new Schema({
    date: { type: Date, required: true, index: true },
    available: { type: Boolean, default: true },
    appointmentId: { type: String },
  });
  
  return slotSchema;
}

function appointment () {
  var appointmentSchema = new Schema({
    agencyId: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    clientId: { type: String, required: true },
    status:  { type: String, enum: ['Pending', 'Canceled', 'Released'], default: 'Pending' , index: true},
    items: { type: Array }
  });

  return appointmentSchema;
}

function donor () {
  var donorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    subscribed: { type: Boolean, default: true }
  });
  return donorSchema;
}

module.exports = {
  agency: agency(),
  client: client(),
  item: item(),
  appointment: appointment(),
  slot: slot(),
  donor: donor()
};