'use strict';

import serialize from 'serialize-javascript';
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from './app/store';
import routes from './app/routes';
import {fetchPolls, fetchUser} from './app/actions';

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var renderToString = require('react-dom/server').renderToString;
var utils = require('./app/utils');
var validatePoll = utils.validatePoll;
var loggedIn = utils.loggedIn;
var ensureUnauthenticated = utils.ensureUnauthenticated;
var ObjectId = require('mongodb').ObjectID;

var app = express();

require('dotenv').load();
var mongo = require('./app/db.js');
mongo.connect(function(err){
  /* Handle any connection error here */
  if (err) throw err;

  const db = mongo.db;

  require('./app/config/passport')(passport);

  const HTML = ({ content, store }) => (
    <html>
  		<head lang='en'>
  			<meta charset="utf-8" />
  			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  			<meta name="description" content="Voting App for Free Code Camp" />
  			<title>Voting App</title>
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css" />
  			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  			<link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.blue_grey-orange.min.css" />
        <link rel="stylesheet" href="public/css/main.css" />
  			<script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
  			<script defer src="https://use.fontawesome.com/ade899c041.js"></script>
  		</head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
        <script src="/public/bundle.js"/>
      </body>
    </html>
  )

  app.use('/public', express.static('./public'));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(flash());

  app.use(session({
  	secret: process.env.SESSION_SECRET,
  	resave: false,
  	saveUninitialized: true,
    cookie : { httpOnly: true, maxAge: 2419200000 }
    //cookie: { secure: false } //true requires https
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.route('/auth/github')
  	.get(ensureUnauthenticated, passport.authenticate('github'));
  app.route('/auth/github/callback')
  	.get(passport.authenticate('github', {
  		successRedirect: '/',
  		failureRedirect: '/',
  		failureFlash: true
  	}));

  app.route('/auth/twitter')
  	.get(ensureUnauthenticated, passport.authenticate('twitter'));
  app.route('/auth/twitter/callback')
  	.get(passport.authenticate('twitter', {
  		successRedirect: '/',
  		failureRedirect: '/404',
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
    console.log('get /user-api\nreq.user: '+req.user);
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
      res.json(false);
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

  app.get('*', (req, res) => { //https://github.com/reactjs/react-router-redux/blob/master/examples/server/server.js
  	const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory);
    //const history = syncHistoryWithStore(memoryHistory, store);

    Promise.all([
      store.dispatch(fetchUser()),
      store.dispatch(fetchPolls())
    ]).then(()=> {
      match({ routes, location: req.url }, (err, redirect, props) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (redirect) {
          res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
          console.log('store in match: '+store);
    			const content = renderToString(
            <Provider store={store}>
              <RouterContext {...props}/>
            </Provider>
          )
          res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))

        } else {
          res.status(404).send('Not Found');
        }
      });
    });
  })

  var port = process.env.PORT || 8080;
  app.listen(port,  function () {
  	console.log('Node.js listening on port ' + port + '... Ctrl+C to stop');
  });
});
