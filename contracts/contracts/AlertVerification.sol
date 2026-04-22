// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AlertVerification
 * @author Your Team
 * @notice Access control layer for verifying DeFi security alerts
 *
 * This contract DOES NOT detect attacks.
 * It only controls WHO can verify alerts.
 */
contract AlertVerification {

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    // Owner (e.g. protocol security admin)
    address public owner;

    // Optional: multiple trusted verifiers
    mapping(address => bool) public verifiers;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyVerifier() {
        require(
            msg.sender == owner || verifiers[msg.sender],
            "Not authorized to verify"
        );
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() {
        owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                        VERIFIER MANAGEMENT
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Add a trusted verifier (e.g. security team address)
     */
    function addVerifier(address _verifier) external onlyOwner {
        require(_verifier != address(0), "Zero address");
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    /**
     * @notice Remove a verifier
     */
    function removeVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }

    /**
     * @notice Transfer ownership to another admin
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW HELPERS
    //////////////////////////////////////////////////////////////*/

    function isAuthorizedVerifier(address user) external view returns (bool) {
        return user == owner || verifiers[user];
    }
}
