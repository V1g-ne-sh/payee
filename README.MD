forum.trondao.link:- 
# Payee - Send Crypto directly via Usernames
### No More Remembering Long Wallet addresses
### No more worrying about getting a single letter wrong in wallet address
### Crypto payments even easier than ordering from Amazon
##
## About Payee
- Getting new user to crypto is hard as learning curve for everyone is very high. 
- But now with payee payments using crypto have become very easy, and fast.

- Payee Allows user to connect their wallets with a unique username.
- once linked with the username anyone else registered with payee and having a username can pay him over crypto using just his username. 
- Again you can verify that you are sending crypto to the very person you intend to send them, no more mishaps, and no more sending money to wrong addresses. 
- and as a added benefit you can view all you incoming transcations and whom they are coming from in one place. 

### It is Easy, Safe, Fast, Verifiable, and New

## Inspiration
- India has seen a huge rise in online transactions since upi was introduced. 
- This was possible only because paying money was using your mobile phone was as easy as scanning a qr code typing in amount and entering your password. 
- Plus you could verify whom you are sending money while doing the payments, and avoid any mishaps. 
### We wanted to develop something similar to UPI in the Opensource Crypto world. 
- So we have payee 
- it is as simple as 
1. Register
2. Scan 
3. Enter amount
4. Press pay and sign transaction

## How to use Payee (Testing Guide)
1. Visit [payee.onrender.com](https://payee.onrender.com) with your metamask linked browser or via metamask app browser if you are on mobile phone
2. Change to BTTC network
3. Connect your wallet
4. Register by choosing a username and signing a transaction
5. Print out the qr received, or take a screenshot and share to a payment sender. 
6. To make payments or to pay money tab and either fill in the username to whom you want to send the money or scan the qrcode with your camera
7. fill in the BTT amount to send
8. Send the transaction and you are good to go
9. To withdraw money  go to withdraw money option and fill in the amount and click withdraw. 

## How to run your local instance
1. clone this repo
2. cd to web folder 
3. Execute this command ` npm run test`

### To deploy contract
1. copy Payee.sol contract from hardhat/contracts folder
2. Open remix ide
3. Paset the contract in a new .sol file, save it and compile it
4. deploy the contract my mentioning the admin address 

## Challenges we ran into
- Making it as easy to use as possible was the greatest challenge we faced. while integrating multiple features 

## What is next for Payee
- We plan at creating Mail and Push notification system integrated with a payee app, 
- plus we plan at creating a social media linked custodial wallet of customers with zero knowledge of crypto
- Creating a borderless, opensource, transparent, yet easy to use payment is our main goal moving forward


