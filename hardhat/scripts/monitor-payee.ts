// Usage: pnpm hardhat run --network <network> scripts/run-vigil.ts

import { ethers } from 'hardhat';
require('dotenv').config()
declare var process : {
  [x: string]: number;
  env: {
    payeeAddress: string
  }
}
async function main() {
  const payeeAddress= process.env.payeeAddress
  const provider = new ethers.providers.WebSocketProvider(
    `wss://pre-rpc.bt.io:8546`
);
  const accounts = await ethers.getSigners();
  const PayeeContract = await ethers.getContractFactory('Payee');
  const payee=new ethers.Contract(payeeAddress, PayeeContract.interface, accounts[0]);
  payee.on("transactionSent",(_sender, _receiver , _amount)=>{
    console.log(_sender, _receiver, _amount);
  })

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
