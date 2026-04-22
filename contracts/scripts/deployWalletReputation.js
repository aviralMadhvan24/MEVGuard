const hre = require("hardhat");

async function main() {
  const WalletReputation = await hre.ethers.getContractFactory("WalletReputation");
  const walletReputation = await WalletReputation.deploy();

  await walletReputation.waitForDeployment();

  console.log(
    "WalletReputation deployed to:",
    await walletReputation.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
