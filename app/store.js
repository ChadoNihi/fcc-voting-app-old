import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import mainReducer from './reducers/mainReducer';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    mainReducer,
    routing: routerReducer
  });

  const logger = createLogger();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      logger
    )
  );

  return store;
}
