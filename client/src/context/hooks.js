import React, { useState, useEffect } from 'react';

const useGetPoapTokens = address => {
  const [tokens, setTokens] = useState([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);

  useEffect(() => {
    fetch(`https://api.poap.xyz/actions/scan/${address}`)
      .then(res => res.json())
      .then(data => setTokens(data))
      .catch(console.error)
      .finally(() => setIsLoadingTokens(false));
  }, [address]);

  return [tokens, isLoadingTokens];
};

export { useGetPoapTokens };
