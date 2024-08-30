import { ethers } from "hardhat";

async function main() {
  const web3CXITokenAddress = "0x44be090dCc05C58c72930D3bA5285bc6F932d06d";
  const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

  const saveERC20ContractAddress = "0x8dC7767e1B0F5EED3A486e30D97d7DC1F13ef492";
  const saveERC20 = await ethers.getContractAt(
    "ISaveERC20",
    saveERC20ContractAddress
  );

  // Approve savings contract to spend token
  const approvalAmount = ethers.parseUnits("1000", 18);

  const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
  approveTx.wait();

  const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
  console.log("Contract balance before :::", contractBalanceBeforeDeposit);

  const depositAmount = ethers.parseUnits("150", 18);
  const depositTx = await saveERC20.deposit(depositAmount);

  console.log(depositTx);

  depositTx.wait();

  const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

  console.log("Contract balance after :::", contractBalanceAfterDeposit);

  // Withdrawal Interaction
  const withdrawalTx = await saveERC20.withdraw(depositAmount);

  console.log(withdrawalTx);

  withdrawalTx.wait();

  const contractBalanceAfterWithdraw = await saveERC20.getContractBalance();

  console.log(
    "Contract balance after withdrawal :::",
    contractBalanceAfterWithdraw
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
