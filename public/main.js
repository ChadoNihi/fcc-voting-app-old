import React from 'react';
import { render } from 'react-dom';
import {browserHistory, IndexRoute, Route, Router} from 'react-router');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import update from 'immutability-helper');
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from 'app/components/App');
import About from 'app/components/About');
import Polls from 'app/components/Polls');

import mainReducer from 'app/reducers/mainReducer.js'
import { getPolls } from 'app/controllers/pollsController.js';
import { addUser } from 'app/actions.js';

/*const getUserInit = ()=> {
  if (req.isAuthenticated()) {
    //ActionCreators.addUser();
  } else {
    //db
    addUser({
        provider: null,
        id: null,
        displayName: "an anon voter",
      },
      pools: getPolls()
    });
  }
};*/

const store = createStore(
combineReducers({
  global: mainReducer,
  routing: routerReducer
}));

const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}><Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Polls} />
      <Route path="/about" component={About} />
    </Route>
  </Router></Provider>
), document.getElementById('root'));
