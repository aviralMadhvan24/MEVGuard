const hre = require("hardhat");

async function main() {
  const AlertRegistry = await hre.ethers.getContractFactory("AlertRegistry");
  const alertRegistry = await AlertRegistry.deploy();

  await alertRegistry.waitForDeployment();

  console.log(
    "AlertRegistry deployed to:",
    await alertRegistry.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
