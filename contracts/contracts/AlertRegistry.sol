// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AlertRegistry
 * @author Your Team
 * @notice Immutable on-chain registry for high-risk DeFi transaction alerts
 *
 * IMPORTANT:
 * - Detection is done OFF-CHAIN (ML system)
 * - This contract only stores VERIFIED METADATA
 * - No alerts can be modified or deleted
 */
contract AlertRegistry {

    /*//////////////////////////////////////////////////////////////
                                STRUCTS
    //////////////////////////////////////////////////////////////*/

    struct Alert {
        bytes32 txHash;        // Transaction that triggered the alert
        uint8 riskScore;       // Severity score (0–100)
        uint256 timestamp;     // When alert was created
        address reporter;      // Backend / system address
        bool verified;         // Whether alert was reviewed
    }

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    // Sequential alert storage
    mapping(uint256 => Alert) public alerts;

    // Prevent duplicate alerts for same transaction
    mapping(bytes32 => bool) public isFlagged;

    // Total number of alerts
    uint256 public alertCount;

    // Admin who can verify alerts
    address public owner;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event AlertCreated(
        uint256 indexed alertId,
        bytes32 indexed txHash,
        uint8 riskScore,
        address indexed reporter
    );

    event AlertVerified(
        uint256 indexed alertId,
        bool isAttack
    );

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() {
        owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                        CORE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Create a new immutable alert
     * @dev Called by backend when ML flags a transaction
     * @param _txHash Transaction hash that triggered the alert
     * @param _riskScore Risk score (0–100)
     */
    function createAlert(
        bytes32 _txHash,
        uint8 _riskScore
    ) external returns (uint256) {
        require(!isFlagged[_txHash], "Alert already exists");
        require(_riskScore <= 100, "Invalid risk score");

        uint256 alertId = alertCount;

        alerts[alertId] = Alert({
            txHash: _txHash,
            riskScore: _riskScore,
            timestamp: block.timestamp,
            reporter: msg.sender,
            verified: false
        });

        isFlagged[_txHash] = true;
        alertCount++;

        emit AlertCreated(alertId, _txHash, _riskScore, msg.sender);

        return alertId;
    }

    /**
     * @notice Verify an existing alert
     * @dev Only trusted authority can verify
     * @param _alertId Alert ID
     * @param _isAttack Whether it was confirmed as a real attack
     */
    function verifyAlert(
        uint256 _alertId,
        bool _isAttack
    ) external onlyOwner {
        require(_alertId < alertCount, "Invalid alert ID");

        alerts[_alertId].verified = true;

        emit AlertVerified(_alertId, _isAttack);
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Check if a transaction has already been flagged
     */
    function isTransactionFlagged(bytes32 _txHash) external view returns (bool) {
        return isFlagged[_txHash];
    }

    /**
     * @notice Transfer verification authority
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
