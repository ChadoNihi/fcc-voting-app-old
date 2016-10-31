const React = require('react'),
      render = require('react-dom').render,
      IndexRoute = require('react-router').IndexRoute,
      Router = require('react-router').Router,
      Route = require('react-router').Route,
      browserHistory = require('react-router').browserHistory,

      App = require('./modules/App'),
      Polls = require('./modules/Repos');

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Polls} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'));
