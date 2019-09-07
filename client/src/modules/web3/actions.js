/* Action Types */
export const WEB3_REQUEST = 'WEB3_REQUEST';
export const WEB3_SUCCESS = 'WEB3_SUCCESS';
export const WEB3_FAILURE = 'WEB3_FAILURE';

export const WEB3_ACCOUNT_FETCHED = 'WEB3_ACCOUNT_FETCHED';

export const POAP_TOKENS_FETCHED = 'POAP_TOKENS_FETCHED';

/* Action Generators */
export function web3Request() {
  return {
    type: WEB3_REQUEST,
  };
}

export function web3Failed() {
  return {
    type: WEB3_REQUEST,
  };
}

export function web3Fetched(payload) {
  return {
    type: WEB3_SUCCESS,
    payload: payload,
  };
}

export function accountFetched(payload) {
  return {
    type: WEB3_ACCOUNT_FETCHED,
    payload: payload,
  };
}

export function tokensFetched(payload) {
  return {
    type: POAP_TOKENS_FETCHED,
    payload: payload,
  };
}
