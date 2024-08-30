import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x44be090dCc05C58c72930D3bA5285bc6F932d06d";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;

// Deployed SaveERC20: 0xbd3fdFa1f9bbe68b9a7db4245600502Cf3DB660A
