import React from 'react';
import { Link } from 'react-router-dom';

import PoapLogo from '../../../../assets/images/POAP.svg';
import './styles.scss';

const NavBar = () => {
  return (
    <>
      <header className="site-header" role="banner">
        <div className="container">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <Link to="/" className="logo">
              <img src={PoapLogo} alt="POAP" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
