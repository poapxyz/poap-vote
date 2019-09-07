import React, { createContext, useReducer, useEffect } from 'react';
import { useWeb3Injected } from '@openzeppelin/network/react';

/* Hooks */
import useGetPoapTokens from './hooks';

// matoken.eth address
const matoken = '0x5A384227B65FA093DEC03Ec34e111Db80A040615';

const fakeLobsters = Array.from({ length: 10 }, (_, index) => [
  index,
  { image: require('../assets/proposals/proposal1.png') },
]);

/* Initial State */
const initialState = {
  web3: null,
  lobsters: Object.fromEntries(fakeLobsters), // {}
  poap: { tokens: [], isLoadingTokens: false },
};

/* Context Creation */
const VotesContext = createContext(initialState);

/* Reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POAP_TOKENS': {
      const { tokens, isLoadingTokens } = action.payload;

      return {
        ...state,
        poap: { ...state.poap, isLoadingTokens, tokens: [...state.poap.tokens, ...tokens] },
      };
    }

    case 'SET_WEB3_CONTEXT': {
      const { web3 } = action.payload;

      return {
        ...state,
        web3,
      };
    }

    case 'VOTE_LOBSTER': {
      const { lobsterId } = action.payload;

      return {
        ...state,
        lobsters: {
          ...state.lobsters,
          [lobsterId]: { ...state.lobsters[lobsterId], voted: true },
        },
      };
    }

    default: {
      return state;
    }
  }
};

/* Votes Provider */
const VotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 1. Connect to Web3 using metamask
  const web3Context = useWeb3Injected();

  // 2. Get account addresss
  const [userAccount = ''] = web3Context.accounts;

  // 3. Get POAP tokens
  const [tokens, isLoadingTokens] = useGetPoapTokens(matoken);

  // 4. Save Web3Context to state
  useEffect(() => {
    setWeb3Context(web3Context);
  }, [web3Context]);

  // 5. Save tokens to state
  useEffect(() => {
    setPoapTokens(tokens, isLoadingTokens);
  }, [isLoadingTokens, tokens]);

  const setPoapTokens = (tokens, isLoadingTokens) => {
    dispatch({ type: 'SET_POAP_TOKENS', payload: { tokens, isLoadingTokens } });
  };

  const setWeb3Context = web3 => {
    dispatch({ type: 'SET_WEB3_CONTEXT', payload: { web3 } });
  };

  const voteLobster = async lobsterId => {
    // Logic to vote lobster
    // Open metamask
    dispatch({ type: 'VOTE_LOBSTER', payload: { lobsterId } });
  };

  return (
    <VotesContext.Provider
      value={{
        state,
        actions: { voteLobster },
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};

export { VotesContext, VotesProvider };
