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


	//getting balance
	mapping(address => uint) public balanceOf;

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
}