/*
* Script to upload proposal
* You will need an admin account & web3 provider
* */
const env = require('dotenv');
const abi = require('../build/contracts/VotePoap.json');

const newProposalURL = '';

module.exports = (done) => {
  async function uploadProposal(networkID) {
    const result = env.config();

    if (result.error || newProposalURL === '') {
      throw result.error;
    }

    let contractAddress = '0x9eeDe127d72fe7851CdB3182b0b21E883408EB46';
    if (networkID === 1) {
      contractAddress = process.env.POAP_VOTE_ADDRESS;
    }
    const contract = new web3.eth.Contract(abi.abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.addProposal(newProposalURL).send({
      from: accounts[0], gas: 1000000
    })

    console.log('*  New proposal added:');
    console.log(`*    Tx: ${JSON.stringify(tx)}`);
    console.log('*');
    console.log('*---- Add proposal (end) ------------');

    return true;
  }

  // web3 requires callback syntax. silly!
  web3.eth.net.getId((err, network) => {
    if (err) {
      console.log('Error detected!');
      return done(err); // truffle exec exits if an error gets returned
    }
    return uploadProposal(network).then(() => done());
  });
};
