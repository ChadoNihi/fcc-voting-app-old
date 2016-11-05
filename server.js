'use strict';

var express = require('express');
var mongo = require("mongodb").MongoClient,
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var validatePoll = require(process.cwd() + '/app/utils').validatePoll;

var app = express();
var db;

require('dotenv').load();
require('./app/config/passport')(passport);

mongo.connect(process.env.MONGO_URI, (err, mdb)=> {
	if (err) {
		throw err;
	} else {
		db = mdb;
		exports.db = db;
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(flash());

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.route('/auth/github')
	.get(passport.authenticate('github'));
app.route('/auth/github/callback')
	.get(passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));

app.route('/auth/twitter')
	.get(passport.authenticate('twitter'));
app.route('/auth/twitter/callback')
	.get(passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});


app.get('/polls-api', (req, res) => {
	if (err) {
		res.status(500).send(err.message)
	} else {
		db.collection('polls').find().toArray((err, polls)=> {
			if (err) {
				res.status(500).send(err.message)
			} else {
				res.json(polls);
			}
		});
	}
});

app.get('/user-api', (req, res) => {
	if (req.user) {
    res.json();
  } else {
    res.redirect('/login');
  }
});

app.post('/poll', (req, res) => {
	if (err) {
		res.status(500).send(err.message)
	} else {
		let poll = req.body;
		if (validatePoll(poll)) {
			db.collection('polls').insert(Object.assign({}, {user: {usrreq.user.displayName}, time: Date.now()}), (err, poll)=> {
				if (err) {
					res.status(500).send(err.message)
				} else {
					res.send(poll);
				}
			});
		} else {
			res.status(400).send("Error: wrong poll format.");
		}
	}
});

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
