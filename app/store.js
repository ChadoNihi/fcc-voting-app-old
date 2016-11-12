import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import mainReducer from './reducers/mainReducer';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    mainReducer,
    routing: routerReducer
  });

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );

  return store;
}
