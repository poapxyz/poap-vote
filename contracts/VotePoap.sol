pragma solidity ^0.5.11;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC721/ERC721.sol";
import "./PoapRoles.sol";

contract VotePoap is Initializable, PoapRoles {

    // -----------------------
    // EVENTS:
    // -----------------------
    event _Activated(address account);
    event _Deactivated(address account);
    event _ProposalAdded(uint index, string image);
    event _Vote(address account, uint vote, uint weightedVote);

    // -----------------------
    // DATA STRUCTURES:
    // -----------------------

    // It will represent a single voter
    struct Voter {
        uint tokens;            /// Amount of tokens the user had at the moment
        uint weightedVote;      /// Weighted votes
        uint voteOption;        /// Proposal index voted
        bool voted;
    }

    // This is a type for a single proposal
    struct Proposal {
        string image;           /// URL to proposal image
        uint voteCount;       /// Amount of addresses that voted the proposal
        uint weightedVotes;     /// Weighted votes depending on POAP tokens owned
    }

    // -----------------------
    // STATE VARIABLES:
    // -----------------------

    // Boolean to determine if votation is active
    bool public voteActive;

    // End vote timestamp
    uint public endDate;

    // Proposal counter
    uint public proposalNonce;

    // ERC721 POAP Contract
    ERC721 POAPToken;

    // A dynamically-sized array of `Proposal` structs
    Proposal [] public proposals;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address
    mapping(address => Voter) public voters;

    /**
     * @dev Modifier to make a function callable only when the vote is active.
     */
    modifier whenActive() {
        require(voteActive || !isExpired());
        _;
    }

    /**
     * @dev called by the owner to deactivate vote
     */
    function deactivate() public onlyAdmin whenActive {
        voteActive = false;
        emit _Deactivated(msg.sender);
    }

    /**
     * @dev called by the owner to activate vote
     */
    function activate() public onlyAdmin {
        voteActive = true;
        emit _Activated(msg.sender);
    }

    /**
     * @dev Initializer. Can only be called once.
     * @param _token The address where the ERC721 token contract is deployed
     * @param _admins List of address to be set as admins
     */
    function initialize(address _token, uint _endDate, address[] memory _admins)
    public initializer
    {
        PoapRoles.initialize(msg.sender);

        // Add the requested admins
        for (uint256 i = 0; i < _admins.length; ++i) {
            _addAdmin(_admins[i]);
        }

        voteActive = true;
        endDate = _endDate;
        POAPToken = ERC721(_token);
        proposalNonce = 0;
    }

    /**
     * @dev Method to add a new proposal
     * @param _image URL where proposal image is hosted
     */
    function addProposal(string memory _image) public onlyAdmin whenActive {
        proposalNonce = proposalNonce + 1;
        proposals.push(Proposal(_image, 0, 0));

        emit _ProposalAdded(proposalNonce, _image);
    }

    /**
     * @dev Method for users to vote
     * @param _proposal Proposal index
     */
    function vote(uint _proposal) public whenActive {
        _vote(msg.sender, _proposal);
    }

    /**
    * @dev Admin method to publish users vote
    * @param _signer User that submitted a signed message with the proposal
    * @param _proposal Proposal index
    */
    function relayedVote(address _signer, uint _proposal) public onlyAdmin whenActive {
        _vote(_signer, _proposal);
    }

    /**
    * @dev Internal reusable method to vote
    * @param _sender Real address from sender
    * @param _proposal Proposal index
    */
    function _vote(address _sender, uint _proposal) private {
        uint tokensAmount = POAPToken.balanceOf(_sender);
        require(tokensAmount > 0);

        Voter storage sender = voters[_sender];

        uint weightedVote = _ceilLog2(tokensAmount);

        // Decrease vote from previous vote if existed
        if (sender.voted) {
            proposals[sender.voteOption].voteCount -= 1;
            proposals[sender.voteOption].weightedVotes -= weightedVote;
        }

        sender.tokens = tokensAmount;
        sender.weightedVote = weightedVote;
        sender.voteOption = _proposal;
        sender.voted = true;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[_proposal].voteCount += 1;
        proposals[_proposal].weightedVotes += weightedVote;

        emit _Vote(_sender, _proposal, weightedVote);
    }

    /**
     * @dev Get proposals data
     * @param _proposal Proposal index
     */
    function getProposal(uint _proposal) public view returns (string memory, uint, uint) {
        return (
            proposals[_proposal].image,
            proposals[_proposal].voteCount,
            proposals[_proposal].weightedVotes
        );
    }

    /**
     * @dev Get voter data
     * @param _voter Voter address
     */
    function getVote(address _voter) public view returns (uint, uint, uint) {
        Voter memory addressVote = voters[_voter];
        return (
        addressVote.voteOption,
        addressVote.tokens,
        addressVote.weightedVote
        );
    }

    /**
     * Checks if an expiration date has been reached
     * @return expired Boolean indication of whether the endDate has passed
     */
    function isExpired() public view returns (bool expired) {
        return (block.timestamp > endDate);
    }

    /**
     * @dev Obtain math ceiling of logarithm based 2
     * https://github.com/bancorprotocol/contracts
     */
    function _ceilLog2(uint256 _n) private pure returns (uint8) {
        uint8 res = 0;
        uint256 n = _n;

        if (n < 256) {
            // At most 8 iterations
            while (n > 1) {
                n >>= 1;
                res += 1;
            }
        } else {
            // Exactly 8 iterations
            for (uint8 s = 128; s > 0; s >>= 1) {
                if (n >= (1 << s)) {
                    n >>= s;
                    res |= s;
                }
            }
        }

        return res + 1;
    }

}
