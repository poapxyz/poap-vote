import React from 'react';

import './styles.scss';

/**
 * Properties
 *
 * image: string => URL to the image
 * selected: bool => When true: color border + selection badge. Default to false
 * action: func => Action to be executed when option is selected
 * disabled: bool => When true: we should disable pointer-actions & block action. Default to false
 * outFocus: bool => When true we should add a grey scale over everything. Default to false
 */

const VoteOption = () => {
  return <div className="vote-option"></div>;
};

export default VoteOption;
