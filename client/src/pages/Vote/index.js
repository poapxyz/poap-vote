import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { accountFetched, web3Failed, web3Fetched, web3Request, tokensFetched } from '../../modules/web3/actions';
import { voteOptionFetched } from '../../modules/lobsters/actions';
import Loader from '../../components/Layout/components/Loader';

/* Styles */
import './styles.scss';
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

class Vote extends Component {
  state = {
    tokenContract: null,
    voteContract: null,
    selected: null,
    loadingMessage: 'Loading proposals',
    loading: true,
    voted: false,
  };

  componentDidMount = async () => {
    let { web3Request, web3Fetched, web3Failed, accountFetched, w3 } = this.props;
    let {loadingMessage, loading} = this.state
    let web3 = w3.web3;

    if (!web3) {
      // Fetch web3 instance
      web3Request();
      try {
        web3 = await getWeb3();
        web3Fetched(web3);
        // change msg loader
        this.setState({loadingMessage: 'Loading account tokens'})
      } catch (e) {
        console.log('Error fetching web3:', e);
        web3Failed();
      }
    }

    if (web3) {
      // Fetch account if possible
      let account = null;
      await this.initContracts(web3);

      try {
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        accountFetched(account);
        // change loading msg
        this.setState({loadingMessage: 'Fetching your tokens'})
      } catch (e) {
        console.log('Error fetching account:', e);
      }

      if (account) {
        await this.fetchTokens(account);
        await this.fetchUserVote(account);
      }



      await this.fetchVoteOptions();
    }
  };

  initContracts = async web3 => {
    const tokenContract = await new web3.eth.Contract(ABI_TOKEN, CONSTANTS.tokenContractAddress);
    const voteContract = await new web3.eth.Contract(ABI_VOTE, CONSTANTS.voteContractAddress);
    await this.setState({ tokenContract, voteContract });
  };

  fetchTokens = async account => {
    let { tokenContract } = this.state;
    let balance = await tokenContract.methods.balanceOf(account).call();
    this.props.tokensFetched(parseInt(balance));
    this.setState({loadingMessage: 'Fetching votes'})
  };

  fetchUserVote = async account => {
    let { voteContract } = this.state;
    let vote = await voteContract.methods.getVote(account).call();
    // vote = {
    // 0: option
    // 1: tokens
    // 2: weightedVote
    // }
    if (parseInt(vote[1]) > 0) {
      await this.setState({ voted: true, selected: parseInt(vote[10]) });
    }
  };

  fetchVoteOptions = async () => {
    this.setState({loadingMessage: 'Fetching proposal'})

    let { voteContract } = this.state;
    let voteOptionsCount = await voteContract.methods.proposalNonce().call();
    const arrayTimes = Array.from({ length: voteOptionsCount });

    let counter = 0;
    for await (const time of arrayTimes) {
      let voteOption = await voteContract.methods.getProposal(counter).call();
      this.props.voteOptionFetched({
        index: counter,
        image: voteOption[0],
        voteCount: voteOption[1],
        weightedVotes: voteOption[2],
      });
      counter++;
    }
    this.setState({loading: false})

  };

  canVote = () => {
    let { w3 } = this.props;
    return w3.web3 && w3.account && w3.tokens > 0;
  };

  changeSelection = id => {
    this.setState({ selected: id });
  };

  submitVote = () => {
    this.setState({ loading: true, loadingMessage: 'Submitting your vote' });
    setTimeout(() => this.props.history.push('/thanks'), 3000);
  }

  render() {
    let { w3, lobsters } = this.props;
    let { selected, loading, loadingMessage } = this.state;
    let voted = false;

    return (
      <Layout>
        <div className="container">
          <img src={kingOfLobstersSmall} alt="King of Lobsters" className="king-of-lobsters" />

          {loading ? (
            <Loader message={loadingMessage} />
          ) : (
            <div>
              {!w3.web3 && (
                <div className="alert">
                  <div>Wanna vote? you need a web3 connection like MetaMask</div>
                </div>
              )}

              {w3.web3 && !w3.account && (
                <div className="alert">
                  <div className="alert-text">You should</div>
                  <button className="btn-sm" onClick={() => console.log('Click')}>
                    Connect to MetaMask
                  </button>
                </div>
              )}

              {w3.web3 && w3.account && w3.tokens === 0 && (
                <div className="alert">
                  <div>
                    You need POAP tokens to vote. Check with your kickback address or <a href="#">come see us…</a>
                  </div>
                </div>
              )}

              {w3.web3 && w3.account && voted && (
                <div className="alert">
                  <div>You already voted but you can change you vote</div>
                </div>
              )}

              <div className={'header'}>
                <div>
                  <h2 className="title">Elegí tu ganador</h2>
                  <h3 className="subtitle">Usa tus tokens para votar</h3>
                </div>
                <div>
                  {/* This component should appear only when we have an address */}
                  <div className="badge-box">
                    <img src={badge} className="poap-badge" />
                    <div>{w3.tokens} Tokens</div>
                  </div>
                </div>
              </div>

              <div className="grid">
                {Object.entries(lobsters).map(([id, lobster]) => (
                  <VoteOption
                    key={id}
                    id={id}
                    image={lobster.image}
                    // action={() => voteLobster(id)}
                    action={this.changeSelection}
                    disabled={!this.canVote()}
                    selected={selected === id}
                    outFocus={!this.canVote()}
                  />
                ))}
              </div>
              <div className="intro">
                <button className="btn-pink" onClick={() => this.submitVote()}>
                  VOTE NOW!
                </button>
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
    lobsters: state.lobsters,
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
)(Vote);
