import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { accountFetched, web3Failed, web3Fetched, web3Request } from '../../modules/web3/actions';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
import kingOfLobstersSmall from '../../assets/images/king-of-lobsters-small.png';
import badgePoap from '../../assets/images/poap-badge.png';

class Thanks extends Component {

  submitVote = () => {
    this.setState({ loading: true, loadingMessage: 'Submitting your vote' });
    setTimeout(() => { this.props.history.push('/thanks') }, 3000);
  }

  render() {
   
    return (
      <Layout>
        <div className="container">
          <img src={kingOfLobstersSmall} alt="King of Lobsters" className="king-of-lobsters" />
          <div className="thanks">
            <h1>Congratulations!</h1>
            <img src={badgePoap} alt="King of Lobsters" />
            <h2>You are participating for 500 dai!</h2>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    w3: state.web3,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ web3Request, web3Failed, web3Fetched, accountFetched }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Thanks);
