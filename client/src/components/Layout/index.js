import React from 'react';

/* Components */
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

/* Styles */
import './styles.scss';

const Layout = ({ children }) => {
  return (
    <main className="main">
      <Banner />
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
