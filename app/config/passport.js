'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var db = require('../../server.js').db;
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user._id.toString());
	});

	passport.deserializeUser(function (id, done) {
		db.collection('voting_app_users').findOne(new ObjectId(id), function (err, user) {
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
						"provider": profile.provider,
						"github.id": profile.id,
						"github.displayName": profile.displayName,
						"github.username": profile.username,
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
			db.collection('voting_app_users').findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {

					db.collection('voting_app_users').insert({
						"provider": profile.provider,
						"twitter.id": profile.id,
						"twitter.displayName": profile.displayName,
						"twitter.username": profile.username,
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
