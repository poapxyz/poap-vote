import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

/* Root Reducer */
import createRootReducer from './reducer';

/* Router Middleware */
const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

/* Combined Middlewares */
const middlewares = [routerMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return { store };
}

export { configureStore, history };
