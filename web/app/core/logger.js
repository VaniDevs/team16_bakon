'use strict';

var winston = require('winston');

// create winston object 
var logger = new (winston.Logger)({
	transports: [
    new (winston.transports.Console)({
      level: 'debug',
      // json: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ],
	exitOnError: true
});

module.exports = logger;