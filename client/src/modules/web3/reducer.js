/* Actions */
import { WEB3_REQUEST, WEB3_FAILURE, WEB3_SUCCESS, WEB3_ACCOUNT_FETCHED } from './actions';

/* Initial State */
const INITIAL_STATE = {
  web3: false,
  account: false,
  isLoading: false,
  tokens: 0,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WEB3_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case WEB3_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case WEB3_SUCCESS: {
      return {
        ...state,
        web3: action.payload,
        isLoading: false,
      };
    }

    case WEB3_ACCOUNT_FETCHED: {
      return {
        ...state,
        account: action.payload,
      };
    }

    default:
      return state;
  }
}
