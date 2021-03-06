/*

npx zos session --network local --from 0x4Ab6E2dA6E6E3977F0D458f11F6A555C01780D57 --expires 3600
oz push
oz create VotePoap --init initialize --args '0x69BD976345ED8462f723d1Fa9261fD37f667dCDd, 1597825200,[]'

* */
const Web3 = require('web3');
const abi = require('../build/contracts/VotePoap.json');

const web3 = new Web3('http://localhost:7545');
const contractAddress = '0x7BADC340820BD1bd3CB58F5607Ed5222Bb518Ee8';

const contract = new web3.eth.Contract(abi.abi, contractAddress);

const proposals = ['A', 'B', 'C', 'D'];
const addresses = [
  '0xAa82FdE1a5266971b27f135d16d282fA20b84C94',
  '0x903243D37d983796E1cEa26984568f60Bccf60Bc',
  '0x027B4E6d5F5603287fC7eD8759F83C494895b1Ff',
  '0xDc45d2A77028b714530E3D96E0F5b52bEB8d4Fe3',
  '0x10AA492A9C3CDeC6d910cCE9E52063838dd0630c',
  '0xC55E5DADfA858cA2048D5bB0b536F84913cF4f19', // Metamask
  '0xEeD5867f99f5F4e1888bA796c9Af12F401f671F1'  // Last Ganache
];

web3.eth.getAccounts()
  .then(accounts => {

    // contract.methods.relayedVote(addresses[6], 2).send({from: addresses[0], gas: 1000000}).then(console.log);

    // Add Proposals
    // contract.methods.addProposal(proposals[0]).send({from: accounts[0], gas: 1000000});
    // contract.methods.addProposal(proposals[1]).send({from: accounts[0], gas: 1000000});
    // contract.methods.addProposal(proposals[2]).send({from: accounts[0], gas: 1000000});
    // contract.methods.addProposal(proposals[3]).send({from: accounts[0], gas: 1000000});
    // contract.methods.changeProposal(1, 'RAMA').send({from: accounts[0], gas: 1000000});
    // contract.methods.changeProposal(2, 'RAMA').send({from: accounts[0], gas: 1000000});
    // contract.methods.changeProposal(10, 'RAMA').send({from: accounts[0], gas: 1000000});

    // Vote
    // contract.methods.vote(3).send({from: accounts[0], gas: 1000000});
    // contract.methods.vote(3).send({from: accounts[1], gas: 1000000});
    // contract.methods.vote(3).send({from: accounts[2], gas: 1000000});
    // contract.methods.vote(3).send({from: accounts[3], gas: 1000000});

    // Activate
    // contract.methods.activate().send({from: accounts[0], gas: 1000000});
});

function getData() {
  contract.methods.proposalNonce().call().then(r => console.log('proposalNonce: ', r));
  contract.methods.voteActive().call().then(r => console.log('Active: ', r));
  contract.methods.endDate().call().then(r => console.log('endDate: ', r));
  contract.methods.isExpired().call().then(r => console.log('isExpired: ', r));
}

function getProposals () {
  contract.methods.getProposal(1).call().then(r => console.log('proposal: ', r));
  contract.methods.getProposal(2).call().then(r => console.log('proposal: ', r));
  contract.methods.getProposal(10).call().then(r => console.log('proposal: ', r));
}

function getVoters () {
  contract.methods.getVote(addresses[0]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[1]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[2]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[3]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[4]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[5]).call().then(r => console.log('Vote: ', r));
  contract.methods.getVote(addresses[6]).call().then(r => console.log('Vote: ', r));
}

getData();
// getProposals();
// getVoters();

