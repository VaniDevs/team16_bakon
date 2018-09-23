// dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
// var cookieParser = require('cookie-parser');

// application components
var session = require('./app/core/session');
// var passport = require('./app/core/auth');
var logger 	= require('./app/core/logger');
var errors  = require('./app/core/errors');
var routes 	= require('./app/routes');

// set the port number
var port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup session
app.use(session);

// passport 
// app.use(passport.initialize());
// app.use(passport.session());

// store flash messages in the session
app.use(flash());

// propagate request in the logger
// app.use(logger.propagateRequest);

// Add headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes
app.use('/', routes);

// catch errors
app.use(errors);

// listen to the port
app.listen(port);
logger.debug(`Listening on port ${port}`);