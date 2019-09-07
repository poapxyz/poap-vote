import React, { Component } from 'react';
import { getWeb3, getSigner } from '../getWeb3';
import ABI from '../artifacts/VotePoap.json';

/* Components */
import Layout from '../components/Layout';
/* Assets */

export default class Sandbox extends Component {
  state = {
    web3: null,
    contract: null,
    account: null,
  };

  componentDidMount = async () => {
    const web3 = await getWeb3();
    let contract = new web3.eth.Contract(ABI, '0x9eeDe127d72fe7851CdB3182b0b21E883408EB46');
    this.setState({ web3, contract }, () => {
      console.log('Web3 Loaded', web3);
      console.log('Contract Loaded', contract);

      web3.eth.getAccounts().then(accounts => {
        this.setState({ account: accounts[0] });
        web3.eth.getBlockNumber().then(console.log);
      });

      // web3.personal.sign("Hola rama", 0xEeD5867f99f5F4e1888bA796c9Af12F401f671F1, (e, r) => {
      //   console.log('Error: ', e);
      //   console.log('Response: ', r);
      // });
    });
  };

  vote = () => {
    let { contract, account } = this.state;
    contract.methods
      .vote(2)
      .send({
        from: account,
        gasPrice: '5000000000',
        gas: 1000000,
      })
      .then(console.log);
  };

  relayVote = async () => {
    let { account, web3 } = this.state;
    const signer = await getSigner();

    const proposal = 2;

    console.log('account: ', account);

    // const backMessage = web3.utils.sha3(JSON.stringify([proposal,]));
    const backMessage = web3.utils.sha3(proposal.toString());
    const claimerSignature = await signer.signMessage(backMessage);
    console.log('Signature for back validation:', claimerSignature);

    const signature = await web3.eth.personal.sign(backMessage, account);
    console.log('Signature for back validation:', signature);
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <h1>Tester</h1>
          <br />
          <br />
          <button onClick={this.vote}>Vote</button>
          <br />
          <br />
          <button onClick={this.relayVote}>Relayed Vote</button>
        </div>
      </Layout>
    );
  }
}
