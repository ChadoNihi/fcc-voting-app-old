'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var db = require('../db.js').db;
var configAuth = require('./auth');
var ObjectId = require('mongodb').ObjectID;

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id.toString());
	});

	passport.deserializeUser(function (id, done) {
		db.collection('voting_app_users').findOne({new ObjectId(id)}, function (err, user) {
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
			db.collection('voting_app_users').findOne({ 'githubId': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {

					db.collection('voting_app_users').insert({
						"provider": profile.provider,
						"githubId": profile.id,
						"githubDisplayName": profile.displayName,
						"githubUsername": profile.username,
						'pollsIds': []
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
			db.collection('voting_app_users').findOne({ 'twitterId': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {

					db.collection('voting_app_users').insert({
						"provider": profile.provider,
						"twitterId": profile.id,
						"twitterDisplayName": profile.displayName,
						"twitterUsername": profile.username,
						'pollsIds': []
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
};
