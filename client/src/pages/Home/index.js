import React from 'react';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';

const Home = ({ history }) => {
  return (
    <Layout>
      <div className="container">
        <div className="intro">
          <img src={kingOfLobsters} alt="King of Lobsters" className="king-of-lobsters" />
          <h2 className="title-2">Participate and vote for 500 DAI</h2>
          <button className="btn" onClick={() => history.push('/vote')}>
            Participate!
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
