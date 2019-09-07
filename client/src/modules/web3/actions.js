/* Action Types */
export const WEB3_REQUEST = 'WEB3_REQUEST';
export const WEB3_SUCCESS = 'WEB3_SUCCESS';
export const WEB3_FAILURE = 'WEB3_FAILURE';

export const WEB3_ACCOUNT_FETCHED = 'WEB3_ACCOUNT_FETCHED';

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
  console.log(payload);
  return {
    type: WEB3_ACCOUNT_FETCHED,
    payload: payload,
  };
}
