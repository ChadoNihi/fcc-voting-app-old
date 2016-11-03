import React from 'react';
import { render } from 'react-dom';
import {browserHistory, IndexRoute, Route, Router} from 'react-router');
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from 'app/components/App';
import About from 'app/components/About';
import Poll from 'app/components/Poll';
import Polls from 'app/components/Polls';

import mainReducer from 'app/reducers/mainReducer';
import { getPolls } from 'app/controllers/pollsController';
import * as Actions from 'app/actions';

const store = createStore(
combineReducers({
  global: mainReducer,
  routing: routerReducer
}), applyMiddleware(thunk));
store.dispatch(Actions.fetchPolls());
store.dispatch(Actions.fetchUser());

const history = syncHistoryWithStore(browserHistory, store);

document.addEventListener('DOMContentLoaded', function(){
  render((
    <Provider store={store}><Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Polls} />
        <Route path="poll/:id" component={Poll} />
        <Route path="user/:id" component={UserMain} />
        <Route path="/about" component={About} />
      </Route>
    </Router></Provider>
  ), document.getElementById('root'));
}, false);
