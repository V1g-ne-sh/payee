window.ethereum.enable();
const web3 = new Web3(window.ethereum);
var accountAddress=""
var chain="bttc";
var chainId=1029;
var payeeAddress = "0xFA97Fbfd62dE543BeCfa31Ad704F500d6826bbFA";
var userName="";
var bal;
payeeABI=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_sender",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_receiver",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transactionSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newAdmin",
				"type": "address"
			}
		],
		"name": "changeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAdmin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_userName",
				"type": "bytes32"
			}
		],
		"name": "getMyBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			}
		],
		"name": "getUserAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getUserName",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_dataHash",
				"type": "bytes32"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewFeeBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
/* global BigInt */
window.ethereum.on('accountsChanged', async () => {
    connectWallet();
});

async function connectWallet(){
    try{
        await ethereum.send('eth_requestAccounts')
        //alert("Wallet connected successfully")
        const accounts= await web3.eth.getAccounts()
        accountAddress=accounts[0];
        verifyChainID()
        w=document.getElementById("wallet")
        if(accountAddress!=""){
            w.innerText= accountAddress.slice(0,7)+"...";
            w.onclick=Wsetup;
           var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
           response = await Contract.methods.getUserName(accountAddress).call({'from':`${accounts[0]}`})
           console.log(response)
           if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
            
                document.getElementById("req").style.display="none"
                document.getElementById("registration").style.display="block"
           }
           else{
            userName=web3.utils.hexToString(response);
            document.getElementById("req").style.display="none"
            document.getElementById("registration").style.display="none"
            
            document.getElementById("data").style.display="block"
            document.getElementById("uName").innerText= userName;
			document.getElementById("uName").onclick= copyLink;
			
            new QRCode(document.getElementById("qrcode"), window.location.origin+"/payment/"+userName);

           }
        }
        
        return accounts[0];
    }
    catch (err){
        alert(err.message)
        w=document.getElementById("wallet")
        
        w.innerText= "Login";
        w.onclick=connectWallet;
        return null;
    }
}

function copyLink(){
	navigator.clipboard.writeText(window.location.origin+"/payment/"+userName).then(()=>{

		alert("Direct Payment Link copied")
	});
}
async function loadPayee(){
	var payeeData=document.getElementById('payeeData')
    var payee=document.getElementById('payee').innerText
	var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
    response = await Contract.methods.getUserDetails(web3.utils.stringToHex(payee)).call()
	if(response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
		alert("Wrong Username")
		window.location.href='/dashboard'
	}
    payeeData.innerText= "Paying to "+ web3.utils.hexToString(response)+ " with user name " +payee
}

async function pay(){
	var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
    response = await Contract.methods.getUserDetails(web3.utils.stringToHex(document.getElementById("payname").value)).call()
	if(response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
		alert("Wrong Username")
		return
		//window.location.href='/dashboard'
	}
    window.location=window.location.origin+"/payment/"+document.getElementById("payname").value
    
  }

async function register(){
    var val=document.getElementById('uname').value
    var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
    response = await Contract.methods.getUserDetails(web3.utils.fromAscii(val)).call(   )
    if (response=="0x0000000000000000000000000000000000000000000000000000000000000000"){
        var Name=document.getElementById('nn').innerText;
        var email=document.getElementById('em').innerText;
       // response = await Contract.methods.register(accountAddress).call()
        //console.log(Name,email)
        var res=await Contract.methods.register(web3.utils.fromAscii(val),web3.utils.fromAscii(Name)).send({'from':accountAddress,'value':10000*10**18});
        connectWallet();
    }
    else{
        alert("Username Already exists Try something new")
    }
  
}


async function payAmt(){
	var val=document.getElementById('amt').value
	if(val<1){
		alert("min 1 BTT has to be sent")
		return
	}
	var BN=web3.utils.BN;

    var payee=document.getElementById('payee').innerText
    var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
	try{
    	response = await Contract.methods.sendMoney(web3.utils.stringToHex(payee),web3.utils.toWei(new BN(val)).toString()).send({'from':accountAddress,'value': web3.utils.toWei(new BN(val)).toString()});
		alert("Money Sent Successfully")
		window.location.href="/dashboard"
	}
	catch(err){
		alert(err)
	}
}

async function WAmt(){
	var BN=web3.utils.BN;
	var val=document.getElementById('Wamt').value
	//var bal=document.getElementById('UBalance').innerText
	if(parseInt(bal)<(parseInt(val)+10000)){
		alert("insufficient Balance")
		return
	}
    var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
	try{
    	response = await Contract.methods.withdrawMoney(web3.utils.toWei(new BN(val)).toString()).send({'from':accountAddress});
		alert("Money Withdrawn Successfully")
		window.location.href="/dashboard"
	}
	catch(err){
console.log(err)
	}
}

async function getBalance(){
	var UBalance=document.getElementById('UBalance')
   
	var Contract=new web3.eth.Contract(payeeABI,payeeAddress);
	try{
    response = await Contract.methods.getMyBalance(web3.utils.stringToHex(userName)).call()
    UBalance.innerText= "Your Balance is "+ web3.utils.fromWei(response) + " BTT"
	bal=web3.utils.fromWei(response)
	console.log(response);
	}catch(err){console.log(err)}
}

function Wsetup(){
   
    document.getElementById("walletSetup").style.display="block";
    document.getElementById("QR").style.display="none";
    document.getElementById("UName").style.display="none";
    document.getElementById("History").style.display="none";
    }

function checkWalletConnect(){
    if(accountAddress=="") return false;
    return true
}

async function verifyChainID(){
    var changed= false;
    try{
        activeChain= await web3.eth.getChainId()
        if (activeChain!=parseInt(chainId)){
            changed =await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x'+chainId.toString(16) }], // chainId must be in hexadecimal numbers
                    })
                    return(true)
        }
        else {changed= true;}
    }catch(err){return err};
    console.log(changed);
    return changed;
  }


async function getTrans(){
url=	"https://api-testnet.bttcscan.com/api?module=logs&action=getLogs&address=0x6a98045685eb1C92F1480f8e4803875D0a29574E&topic0=0xc523bcf6216203e46e799244596f69646e16c9a6108c4796bfc941f058accefc"
}

