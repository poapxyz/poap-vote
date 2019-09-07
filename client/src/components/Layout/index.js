import React from 'react';

/* Styles */
import './styles.scss';

const Layout = ({ children }) => {
  return (
    <main className="main">
      <header className="header">...</header>
      {children}
      <footer className="footer">...</footer>
    </main>
  );
};

export default Layout;
