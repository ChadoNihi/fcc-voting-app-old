'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require("mongodb").MongoClient,
var passport = require('passport');
var session = require('express-session');

var app = express();
var db;

require('dotenv').load();
require('./app/config/passport')(passport);

mongo.connect(process.env.MONGO_URI, (err, mdb)=> {
	if (err) {
		throw err;
	} else {
		db = mdb;
	}
});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
