// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Payee {
    uint private fees;

    address private owner;
    address private admin;
    struct userData {
        address userAddress;
        bytes32 username;
        bytes32 dataHash;
    }

    mapping(bytes32 => userData) private userNameDetail ;
    mapping(address => bytes32) private userName;
    mapping(bytes32 => uint256) private userBalance ;

    event transactionSent(bytes32 _sender, bytes32 _receiver ,uint256 _amount);

    // modifier to check if caller is owner
    modifier isOwnerOrAdmin() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner||  msg.sender== admin , "Caller is not owner");
        _;
    }

    // modifier to check if caller is registered with us
    modifier isRegistered() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(userName[msg.sender] > 0 , "Please register before sending money");
        _;
    }

    constructor(address _admin) {
        owner= msg.sender;
        admin= _admin;
        fees=0;
    }

    function changeAdmin(address _newAdmin) external isOwnerOrAdmin{
        admin= _newAdmin;   
    }

    function getAdmin() public view  returns(address) {
        return admin;
    }

    function register(bytes32 _username, bytes32 _dataHash) public payable {
        //fees per registration= 10000 ROSE 
        require(msg.value >= 10000*1e18, 'need to pay 1 ROSE to register');
        fees+=1e18;
        require(userNameDetail[_username].userAddress == address(0),'Already registered username');
        userNameDetail[_username]= userData({
                                        userAddress:msg.sender, 
                                        username:_username,
                                        dataHash:_dataHash});
        userName[msg.sender]= _username;
        userBalance[_username]= 0;
    }

    function sendMoney(bytes32 _username, uint256 _amount) public payable isRegistered{
        //fees per transaction= 0 ROSE 
        require(msg.value>=_amount,'Amount sent less than required');
        require(userNameDetail[_username].userAddress != address(0), 'invalid username');
        userBalance[_username]+=_amount;
        bytes32 senderUsername= userName[msg.sender];
        emit transactionSent(senderUsername, _username, _amount);
       }
    
    function withdrawMoney(uint256 _amount) public {
        //Withdrawl fees per transaction= 10000 ROSE
        require(userBalance[userName[msg.sender]]> _amount+(10000* 1e18)); 
        userBalance[userName[msg.sender]]-=_amount+(10000* 1e18);
        fees+=(10000* 1e18);
        (bool sent, bytes memory data) = msg.sender.call{value: _amount}("");
        
        require(sent, "Failed to send Ether");
    }

    function withdrawFees() public isOwnerOrAdmin(){
        (bool sent, bytes memory data) = msg.sender.call{value: fees}("");
        fees=0;
        require(sent, "Failed to send Ether");
    }

    function getUserDetails(bytes32 _username) public view returns(bytes32){
        return userNameDetail[_username].dataHash;
    }

    function getUserAddress( bytes32 _username) public view returns(address){
        return userNameDetail[_username].userAddress;
    }

    function getMyBalance(bytes32 _userName) public view returns(uint256){
        return userBalance[_userName];
    }

    function viewFeeBalance() public isOwnerOrAdmin returns(uint256){
        return fees;
    } 



    function getUserName(address _sender) public view returns( bytes32){
        return userName[_sender];
    }
    


}