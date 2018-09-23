'use strict';

var cache = require('memory-cache');
const itemModel  = require('../core/database').models.item;

var create = function (data, callback){
	var newItem = new itemModel(data);
	return newItem.save(callback);
};

var find = function (query, callback){
	return itemModel.find(query, callback);
}

var findBySelect = function (query, select, callback){
	return itemModel.find(query, select, callback);
}

var findOne = function (query, callback){
	return itemModel.findOne(query, callback);
}

var findById = function (id, callback) {
  return itemModel.findById(id, callback);
}

var findByIdAndUpdate = function(id, data, callback){
	return itemModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

module.exports = { 
	create, 
	find, 
	findBySelect,
	findOne, 
	findById, 
	findByIdAndUpdate
};