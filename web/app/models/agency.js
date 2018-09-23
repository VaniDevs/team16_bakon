'use strict';

var cache = require('memory-cache');
const agencyModel  = require('../core/database').models.agency;

var create = function (data, callback){
	var newAgency = new agencyModel(data);
	return newAgency.save(callback);
};

var find = function (query, callback){
	return agencyModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return agencyModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return agencyModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return agencyModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return agencyModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
	findByIdAndUpdate
};