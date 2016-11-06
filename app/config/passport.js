'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
//var User = require('../models/users');
var db = require(process.cwd() + '/server').db;
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (id, done) {
		db.collection('users').findOne(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			db.collection('voting_app_users').findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {

					db.collection('voting_app_users').insert({
						"github.id": profile.id,
						"github.displayName": profile.displayName,
						"github.username": profile.username
					}, (err, result)=> {
						if (err) {
							throw err;
						}

						return done(null, result.ops);
					});
				}
			});
		});
	}));

	passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			db.collection('voting_app_users').findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {

					db.collection('voting_app_users').insert({
						"twitter.id": profile.id,
						"twitter.displayName": profile.displayName,
						"twitter.username": profile.username
					}, (err, result)=> {
						if (err) {
							throw err;
						}

						return done(null, result.ops);
					});
				}
			});
		});
	});
};
