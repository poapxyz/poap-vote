/* Action Types */
export const VOTE_OPTION_FETCHED = 'VOTE_OPTION_FETCHED';

/* Action Generators */
export function voteOptionFetched(payload) {
  return {
    type: VOTE_OPTION_FETCHED,
    payload,
  };
}
