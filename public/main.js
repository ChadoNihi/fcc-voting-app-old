import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../app/routes';
import { configureStore } from '../app/store';
require('./main.styl');

// todo http://redux.js.org/docs/advanced/ExampleRedditAPI.html

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

document.addEventListener('DOMContentLoaded', function(){
  //todo delete match?
  render((
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  ), document.getElementById('root'));
}, false);
