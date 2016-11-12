import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { configureStore } from '../app/store';
import * as Actions from '../app/actions';
import css from './css/main.styl';

/*const store = createStore(
combineReducers({
  global: mainReducer,
  routing: routerReducer
}), applyMiddleware(thunk));
store.dispatch(Actions.fetchPolls());
store.dispatch(Actions.fetchUser());*/

//const history = syncHistoryWithStore(browserHistory, store);
const store = configureStore(browserHistory, window.__initialState__)
const history = syncHistoryWithStore(browserHistory, store)

document.addEventListener('DOMContentLoaded', function(){
  render((
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  ), document.getElementById('root'));
}, false);
