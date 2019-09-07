/* Actions */
// import {  } from './actions';

/* Initial State */
const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'fake': {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
}
