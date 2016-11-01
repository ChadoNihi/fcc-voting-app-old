import React from 'react';
import { render } from 'react-dom';
import {browserHistory, IndexRoute, Route, Router} from 'react-router');
import createStore from 'redux';
import update from 'immutability-helper');

import App from './public/components/App');
import About from './public/components/About');
import Polls from './public/components/Polls');

import ActionCreators from 'app/action-creators.js'

const getUserInit = ()=> {
  if (req.isAuthenticated()) {

  } else {

  }
};

let initState = {
      user: {
        authParty: null,
        id: null,
        name: "an anon voter",
      },
      pools: getPolls()
    },
    reducer = (state = initState, action)=> {
      switch (action.type) {
        case 'ADD_POLL':
          return update(state, {polls, {push: action.poll}});
        default:
          return state;
      }
    },
    store = createStore(reducer);

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Polls} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'));
