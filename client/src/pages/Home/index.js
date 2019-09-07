import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Redux actions */
import { web3Request, web3Fetched, web3Failed, accountFetched } from '../../modules/web3/actions';
/* Utils */
import { getWeb3 } from '../../utils/web3';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';
import dai from '../../assets/images/dai-2.svg';

class Home extends Component {
  componentDidMount = async () => {
    let { web3Request, web3Fetched, web3Failed, accountFetched, w3 } = this.props;
    let web3 = w3.web3;
    if (!web3) {
      let web3 = null;
      // Fetch web3 instance
      web3Request();
      try {
        web3 = await getWeb3();
        web3Fetched(web3);
      } catch (e) {
        console.log('Error fetching web3:', e);
        web3Failed();
      }
    }
    // Fetch account if possible
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        accountFetched(accounts[0]);
      } catch (e) {
        console.log('Error fetching account:', e);
      }
    }
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="intro">
            <img src={kingOfLobsters} alt="King of Lobsters" className="king-of-lobsters" />
            <h2 className="title-2">Vote with your POAP tokens</h2>
            <div className="prize">
              500 <img src={dai} alt="DAI" />
            </div>
            <button className="btn" onClick={() => this.props.history.push('/vote')}>
              Participate!
            </button>
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
)(Home);
