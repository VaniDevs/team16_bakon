'use strict';

var cache = require('memory-cache');
const appointmentModel  = require('../core/database').models.appointment;

var create = function (data, callback){
	var newAppointment = new appointmentModel(data);
	return newAppointment.save(callback);
};

var find = function (query, callback){
	return appointmentModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return appointmentModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return appointmentModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return appointmentModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return appointmentModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
	findByIdAndUpdate
};