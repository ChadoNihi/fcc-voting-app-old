'use strict';

var express = require('express');
var mongo = require("mongodb").MongoClient;
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var validatePoll = require(process.cwd() + '/app/utils.js').validatePoll;
var loggedIn = require(process.cwd() + '/app/utils.js').loggedIn;
var ensureUnauthenticated = require(process.cwd() + '/app/utils.js').ensureUnauthenticated;

var app = express();
var db;

require('dotenv').load();
require(process.cwd() + '/app/config/passport')(passport);

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
	.use(ensureUnauthenticated())
	.get(passport.authenticate('github'));
app.route('/auth/github/callback')
	.get(passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));

app.route('/auth/twitter')
	.use(ensureUnauthenticated())
	.get(passport.authenticate('twitter'));
app.route('/auth/twitter/callback')
	.get(passport.authenticate('twitter', {
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
		db.collection('voting_app_users').findOne(new ObjectId(req.user._id), (err, user)=> {
			if (err) {
				res.status(500).send(err.message)
			} else {
				db.collection('polls').find({_id: {$in: user.pollsIds}}).toArray((err, polls)=> {
					user.polls = polls;
					res.json(user);
				});
			}
		});
  } else {
    res.json({});
  }
});

app.post('/poll', loggedIn, (req, res) => {
	if (err) {
		res.status(500).send(err.message)
	} else {
		let poll = req.body;
		if (validatePoll(poll)) {
			db.collection('polls').insert({
				userName: req.user.displayName,
				title: poll.title,
				optHist: poll.opts.reduce((acc, opt)=> {
						acc[opt] = 0;
						return acc;
					}, {})
			}, (err, poll)=> {
				if (err) {
					res.status(500).send(err.message);
				} else {
					db.collection('polls').findAndModify({
						query: {_id: poll._id},
						update: {id: poll._id.toString()},
						new: true
					}, (err, poll)=> {
						// does user session also get updated?
						db.collection('voting_app_users').update({_id: new ObjectId(req.user._id)}, {$push: {pollsIds: poll._id}}, (err)=> {
							if (err) {
								res.status(500).send(err.message);
							} else {
								res.send(poll);
							}
						});
					});
				}
			});
		} else {
			res.status(400).send("Error: wrong poll format.");
		}
	}
});

app.put('/vote', (req, res)=> {
	if (err) {
		res.status(500).send(err.message)
	} else {
		db.collection('polls').findAndModify({
			query: {_id: new ObjectId(req.id)},
			update: {$inc: {[`optHist.${req.opt}`]: 1}},
			new: true
		}, (err, poll)=> {
				res.send(poll);
		});
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
		<!doctype html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta name="description" content="Voting App for Free Code Camp">
			<title>Voting App</title>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
			<link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.blue_grey-orange.min.css" />
			<!--<link href="/public/css/main.css" rel="stylesheet">-->
			<script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
			<script defer src="https://use.fontawesome.com/ade899c041.js"></script>
			<script defer type="text/javascript" src="common/common.js"></script>
		</head>
		<div id='root'>
			${appHtml}
			<script src="/public/bundle.js"></script>
		</div>
		</html>
   `
}

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
