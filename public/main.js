import React from 'react';
import { render } from 'react-dom';
import {browserHistory, IndexRoute, Route, Router} from 'react-router');
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import update from 'immutability-helper');
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from 'app/components/App');
import About from 'app/components/About');
import Poll from 'app/components/Poll';
import Polls from 'app/components/Polls');

import mainReducer from 'app/reducers/mainReducer';
import { getPolls } from 'app/controllers/pollsController';
import * as Actions from 'app/actions';

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
}), applyMiddleware(thunk));
store.dispatch(Actions.fetchPolls());

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', function(){
  render((
    <Provider store={store}><Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Polls} />
        <Route path="poll/:id" component={Poll} />
        <Route path="/about" component={About} />
      </Route>
    </Router></Provider>
  ), document.getElementById('root'));
}, false);
