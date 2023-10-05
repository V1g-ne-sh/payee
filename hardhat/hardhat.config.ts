import { HardhatUserConfig } from "hardhat/config";
import '@oasisprotocol/sapphire-hardhat';
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sapphire_testnet: {
      // This is Testnet! If you want Mainnet, add a new network config item.
      url: "https://pre-rpc.bt.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
      chainId: 0x405,
    },
  },
};

export default config;
