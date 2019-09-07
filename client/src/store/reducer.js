import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/* Reducers */
import web3Reducer from '../modules/web3/reducer';
import lobstersReducer from '../modules/lobsters/reducer';

const createRootReducer = history => {
  const reducers = {
    web3: web3Reducer,
    lobsters: lobstersReducer,
    router: connectRouter(history),
  };

  return combineReducers(reducers);
};

export default createRootReducer;
