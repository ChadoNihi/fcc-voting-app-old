exports.loggedIn = (req, res, next)=> {
  if (req.user) {
    next();
  } else {
    req.flash('error', 'Please, log in first.');
    res.redirect('/');
  }
};
exports.validatePoll = (poll)=> {
  try {
    return poll.title.trim() && poll.opts.length>1 && poll.opts.every(opt=> opt.trim());
  } catch (e) {
    return false;
  }
};
exports.ensureUnauthenticated = (req, res, next)=> {
  if (req.isAuthenticated()) {
    // display an "already logged in" message
    return res.redirect('/');
  }
  next();
};
