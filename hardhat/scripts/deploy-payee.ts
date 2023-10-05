// Usage: pnpm hardhat run --network <network> scripts/run-vigil.ts

import { ethers } from 'hardhat';

async function main() {
  const accounts = await ethers.getSigners();
  const Wallet = await ethers.getContractFactory('Payee');
  const wallet = await Wallet.deploy(accounts[0].address);
  console.log('Wallet deployed to:', wallet.address,'via address',accounts[0].address);
   

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
