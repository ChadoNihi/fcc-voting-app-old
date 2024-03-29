'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	},
	'twitterAuth': {
		'consumerKey': process.env.TWITTER_CONSUMER_KEY,
	  'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
	  'callbackURL': process.env.APP_URL + "auth/twitter/callback"
	}
};
//  https://fcc-voting-app-efish.herokuapp.com/auth/twitter/callback
