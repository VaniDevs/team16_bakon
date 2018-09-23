'use strict';

var cache = require('memory-cache');
const clientModel  = require('../core/database').models.client;

var create = function (data, callback){
	var newClient = new clientModel(data);
	return newClient.save(callback);
};

var find = function (query, callback){
	return clientModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return clientModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return clientModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return clientModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return clientModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
	findByIdAndUpdate
};