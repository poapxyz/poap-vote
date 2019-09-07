/* Actions */
import { VOTE_OPTION_FETCHED } from './actions';

/* Initial State */
const INITIAL_STATE = {
  options: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VOTE_OPTION_FETCHED: {
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.index]: action.payload,
        },
      };
    }

    default:
      return state;
  }
}
