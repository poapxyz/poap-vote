import React from 'react';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';
import dai from '../../assets/images/dai-2.svg';

const Home = ({ history }) => {
  return (
    <Layout>
      <div className="container">
        <div className="intro">
          <img src={kingOfLobsters} alt="King of Lobsters" className="king-of-lobsters" />
          <h2 className="title-2">Vote with your POAP tokens</h2>
          <div className="prize">
            500 <img src={dai} alt="DAI" />
          </div>
          <button className="btn" onClick={() => history.push('/vote')}>
            Participate!
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
