'use strict';

var cache = require('memory-cache');
const slotModel  = require('../core/database').models.slot;

var create = function (data, callback){
	var newSlot = new slotModel(data);
	return newSlot.save(callback);
};

var find = function (query, callback){
	return slotModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return slotModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return slotModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return slotModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return slotModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
  findByIdAndUpdate
};