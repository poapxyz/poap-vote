import React from 'react';

/* Components */
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

/* Styles */
import './styles.scss';

const Layout = ({ children, hideFooter }) => {
  return (
    <main className="main">
      <Banner />
      <NavBar />
      {children}
      <Footer hide={hideFooter} />
    </main>
  );
};

export default Layout;
