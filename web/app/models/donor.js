'use strict';

var cache = require('memory-cache');
const donorModel  = require('../core/database').models.donor;

var create = function (data, callback){
	var newDonor = new donorModel(data);
	return newDonor.save(callback);
};

var find = function (query, callback){
	return donorModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return donorModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return donorModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return donorModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return donorModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
  findByIdAndUpdate
};