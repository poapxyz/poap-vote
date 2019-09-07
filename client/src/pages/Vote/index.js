import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { accountFetched, web3Failed, web3Fetched, web3Request } from '../../modules/web3/actions';

/* Styles */
import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
/* Assets */
import kingOfLobsters from '../../assets/images/king-of-lobsters.png';
/* Provider */
import { getWeb3 } from '../../utils/web3';

class Vote extends Component {
  componentDidMount = async () => {
    let { web3Request, web3Fetched, web3Failed, accountFetched, w3 } = this.props;
    if (!w3.web3) {
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

      // Fetch account if possible
      if (web3) {
        try {
          const accounts = await web3.eth.getAccounts();
          accountFetched(accounts[0]);
        } catch (e) {
          console.log('Error fetching account:', e);
        }
      }
    }
  };

  render() {
    let { lobsters, w3 } = this.props;
    return <h1>Vote</h1>;
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
)(Vote);
