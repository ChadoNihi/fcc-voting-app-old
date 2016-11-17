import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../app/routes';
import { configureStore } from '../app/store';
require('./main.styl');

/*const store = createStore(
combineReducers({
  global: mainReducer,
  routing: routerReducer
}), applyMiddleware(thunk));
store.dispatch(Actions.fetchPolls());
store.dispatch(Actions.fetchUser());*/

//const history = syncHistoryWithStore(browserHistory, store);
const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

console.log("store.user: "+JSON.stringify(store.user, null, 4));

document.addEventListener('DOMContentLoaded', function(){
  render((
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  ), document.getElementById('root'));
}, false);
