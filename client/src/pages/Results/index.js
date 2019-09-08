import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { accountFetched, web3Failed, web3Fetched, web3Request, tokensFetched } from '../../modules/web3/actions';
import { voteOptionFetched } from '../../modules/lobsters/actions';
import Loader from '../../components/Layout/components/Loader';

/* Styles */
// import './styles.scss';
/* Components */
import Layout from '../../components/Layout';
import VoteOption from '../../components/VoteOption';
/* Assets */
import kingOfLobstersSmall from '../../assets/images/king-of-lobsters-small.png';
import badge from '../../assets/images/poap-badge.png';
/* Utils */
import { getWeb3 } from '../../utils/web3';
import CONSTANTS from '../../utils/constants';
import ABI_TOKEN from '../../artifacts/Poap.json';
import ABI_VOTE from '../../artifacts/VotePoap.json';
import QUOTES from '../../utils/loadingQuotes';

class Results extends Component {
  state = {
    tokenContract: null,
    voteContract: null,
    votingOptions: [],
    loadingMessage: 'Loading proposals',
    loading: true,
  };

  componentDidMount = async () => {
    let { web3Request, web3Fetched, web3Failed, accountFetched, w3 } = this.props;
    let { loadingMessage, loading } = this.state;
    let web3 = w3.web3;

    if (!web3) {
      // Fetch web3 instance
      web3Request();
      try {
        web3 = await getWeb3();
        web3Fetched(web3);
        // change msg loader
        this.setState({ loadingMessage: 'Loading account tokens' });
      } catch (e) {
        console.log('Error fetching web3:', e);
        web3Failed();
      }
    }

    if (web3) {
      // Fetch account if possible
      await this.initContracts(web3);
      await this.fetchVoteOptions();
    }
  };

  initContracts = async web3 => {
    const tokenContract = await new web3.eth.Contract(ABI_TOKEN, CONSTANTS.tokenContractAddress);
    const voteContract = await new web3.eth.Contract(ABI_VOTE, CONSTANTS.voteContractAddress);
    await this.setState({ tokenContract, voteContract });
  };

  fetchVoteOptions = async () => {
    this.setState({ loadingMessage: 'Fetching proposal' });

    let { voteContract } = this.state;
    let voteOptionsCount = await voteContract.methods.proposalNonce().call();
    const arrayTimes = Array.from({ length: voteOptionsCount });
    let votingOptions = [];

    let counter = 0;
    for await (const time of arrayTimes) {
      let voteOption = await voteContract.methods.getProposal(counter).call();
      votingOptions.push({
        index: counter,
        image: voteOption[0],
        voteCount: voteOption[1],
        weightedVotes: voteOption[2],
      });
      counter++;
    }
    votingOptions = votingOptions.sort((a, b) => (a.weightedVotes > b.weightedVotes ? -1 : 1));
    this.setState({ loading: false, votingOptions });
  };

  connectWallet = async () => {
    let { w3 } = this.props;
    if (w3.web3 && window.ethereum) {
      await window.ethereum.enable();
      try {
        const accounts = await w3.web3.eth.getAccounts();
        this.props.accountFetched(accounts[0]);
        await this.fetchTokens(accounts[0]);
        await this.fetchUserVote(accounts[0]);
      } catch (e) {
        console.log('Error fetching account:', e);
      }
    }
  };

  render() {
    let { loading, loadingMessage, votingOptions } = this.state;
    return (
      <Layout>
        <div className="container">
          <img src={kingOfLobstersSmall} alt="King of Lobsters" className="king-of-lobsters" />

          {loading ? (
            <Loader message={loadingMessage} />
          ) : (
            <div>
              <div className={'header'}>
                <div>
                  <h2 className="title">The Queen/King is:</h2>
                </div>
              </div>

              <div className="grid">
                {votingOptions.map((option, i) => {
                  return (
                    <VoteOption
                      key={option.index}
                      id={option.index}
                      image={option.image}
                      action={() => {}}
                      disabled={false}
                      selected={i === 0}
                      outFocus={false}
                      votes={`${option.weightedVotes} (#${option.voteCount})`}
                    />
                  );
                })}
              </div>
            </div>
          )}
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
  return bindActionCreators(
    { web3Request, web3Failed, web3Fetched, accountFetched, tokensFetched, voteOptionFetched },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);
