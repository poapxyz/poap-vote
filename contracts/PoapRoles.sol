pragma solidity ^0.5.11;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/access/Roles.sol";

contract PoapRoles is Initializable {
    using Roles for Roles.Role;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    Roles.Role private _admins;
    mapping(uint256 => Roles.Role) private _minters;

    function initialize(address sender) public initializer {
        if (!isAdmin(sender)) {
            _addAdmin(sender);
        }
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender));
        _;
    }

    function isAdmin(address account) public view returns (bool) {
        return _admins.has(account);
    }

    function addAdmin(address account) public onlyAdmin {
        _addAdmin(account);
    }

    function renounceAdmin() public {
        _removeAdmin(msg.sender);
    }

    function _addAdmin(address account) internal {
        _admins.add(account);
        emit AdminAdded(account);
    }

    function _removeAdmin(address account) internal {
        _admins.remove(account);
        emit AdminRemoved(account);
    }

    // For future extensions
    uint256[50] private ______gap;
}