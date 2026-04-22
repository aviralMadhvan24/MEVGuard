// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WalletReputation
 * @author Your Team
 * @notice Decentralized reputation system for wallets based on security alerts
 *
 * IMPORTANT:
 * - This contract DOES NOT detect attacks
 * - It consumes alert outcomes from AlertRegistry
 * - It provides a READ-ONLY risk signal for protocols
 */
contract WalletReputation {

    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    // Reputation score: 0 (worst) → 100 (best)
    mapping(address => uint8) public reputationScore;

    // Number of alerts associated with a wallet
    mapping(address => uint256) public alertCount;

    // Blacklist flag for extreme cases
    mapping(address => bool) public isBlacklisted;

    // Admin / security authority
    address public owner;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event ReputationInitialized(address indexed wallet);
    event ReputationDecreased(address indexed wallet, uint8 newScore);
    event ReputationIncreased(address indexed wallet, uint8 newScore);
    event WalletBlacklisted(address indexed wallet);

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
                        INTERNAL HELPERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Initialize wallet reputation if not set
     */
    function _initializeWallet(address wallet) internal {
        if (reputationScore[wallet] == 0 && !isBlacklisted[wallet]) {
            reputationScore[wallet] = 100;
            emit ReputationInitialized(wallet);
        }
    }

    /*//////////////////////////////////////////////////////////////
                        CORE LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Apply penalty when a wallet is linked to an alert
     * @param wallet Wallet address
     * @param severity Risk severity (0–100)
     * @param verified Whether alert was confirmed as real attack
     *
     * Verified attacks reduce reputation more aggressively.
     */
    function penalizeWallet(
        address wallet,
        uint8 severity,
        bool verified
    ) external onlyOwner {
        require(wallet != address(0), "Zero address");
        require(severity <= 100, "Invalid severity");

        _initializeWallet(wallet);
        alertCount[wallet]++;

        uint8 penalty;

        if (verified) {
            // Verified attacks → heavy penalty
            penalty = severity / 2;   // e.g. severity 80 → -40
        } else {
            // Unverified / suspected → light penalty
            penalty = severity / 4;   // e.g. severity 80 → -20
        }

        if (reputationScore[wallet] > penalty) {
            reputationScore[wallet] -= penalty;
            emit ReputationDecreased(wallet, reputationScore[wallet]);
        } else {
            reputationScore[wallet] = 0;
            isBlacklisted[wallet] = true;
            emit WalletBlacklisted(wallet);
        }
    }

    /**
     * @notice Restore reputation if alert was a false positive
     * @param wallet Wallet address
     * @param amount Amount to restore (0–100)
     */
    function restoreReputation(
        address wallet,
        uint8 amount
    ) external onlyOwner {
        require(wallet != address(0), "Zero address");
        require(amount <= 100, "Invalid amount");
        require(!isBlacklisted[wallet], "Wallet blacklisted");

        _initializeWallet(wallet);

        uint16 newScore = uint16(reputationScore[wallet]) + amount;

        if (newScore > 100) {
            reputationScore[wallet] = 100;
        } else {
            reputationScore[wallet] = uint8(newScore);
        }

        emit ReputationIncreased(wallet, reputationScore[wallet]);
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Check if wallet is considered trusted
     */
    function isTrusted(address wallet) external view returns (bool) {
        return reputationScore[wallet] >= 70 && !isBlacklisted[wallet];
    }

    /**
     * @notice Transfer admin control
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
