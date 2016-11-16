'use strict';

module.exports = {
  appUrl: 'http://127.0.0.1:8080/', //dirty solution after hours of frustration w/ webpack
  loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      req.flash('error', 'Please, log in first.');
      res.redirect('/');
    }
  },
  validatePoll(poll) {
    try {
      return poll.title.trim() && poll.opts.length>1 && poll.opts.every(opt=> opt.trim());
    } catch (e) {
      return false;
    }
  },
  ensureUnauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // display an "already logged in" message
      return res.redirect('/');
    }
    next();
  },
  getAppUrl() {
    return ((process && process.env.APP_URL) ? process.env.APP_URL : (window.location.origin || window.location.protocol + "//"
        + window.location.hostname
        + (window.location.port ? ':' + window.location.port : '')));
  }
};
