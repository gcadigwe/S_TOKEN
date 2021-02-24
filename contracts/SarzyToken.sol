// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SarzyToken {
	uint public totalSupply;

	//token name
	string public name = "Sarzy Token";
	//token symbol
	string public symbol = "SZY";
	//token standard
	string public standard = "Sarzy Token v1.0";


	//Transfer event
	event Transfer (
		address indexed _from,
		address indexed _to,
		uint indexed _value
		);
	//approve event
	event Approval (
		address indexed _owner,
		address indexed _spender,
		uint indexed _value
		);

	//getting balance
	mapping(address => uint) public balanceOf;
	//allowance mapping
	mapping(address => mapping(address => uint)) public allowance;


	constructor(uint _initialsupply) public {
		 totalSupply = _initialsupply;

		 //allocate the initial supply
		 balanceOf[msg.sender] = _initialsupply;
	}

	//Transfer

	function transfer(address _to, uint _value) public returns (bool success) {
	// Exception if account doesn't have enough token
	require(balanceOf[msg.sender] >= _value);
	//Transfer balance
	balanceOf[msg.sender] -= _value;
	balanceOf[_to] += _value;

	//Transfer Event

	emit Transfer(msg.sender, _to, _value);

	//Return a boolean
	return true;
	
	}

	//approve function

	function approve(address _spender,uint _value) public returns(bool success){
		//allowance 
		allowance[msg.sender][_spender] = _value;

		//emit event
		emit Approval(msg.sender,_spender,_value);

		return true;
	}


	//transfer From
	function transferFrom(address _from, address _to, uint _value) public returns (bool success){
		//require _from has enough token
		require(balanceOf[_from] >= _value);
		//require allowance is big enough
		require(allowance[_from][msg.sender] >= _value);

		//change the balance
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;


		//update the allowance

		allowance[_from][msg.sender] = 0;

		//transfer event
		emit Transfer(_from,_to,_value);
		return true;
	}

}