import React from 'react';
import kingOfLobstersSmall from '../../../../assets/images/king-of-lobsters-small.png';
import './styles.scss';

const Loader = props => {
  return (
    <div className="loading-container">
      <div>
        <div style={{ color: '#6534ff' }} className={'la-ball-pulse-sync la-3x'}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="loading-text">{props.message}</div>
      <div className="loading-please">Please wait</div>
    </div>
  );
};

export default Loader;
