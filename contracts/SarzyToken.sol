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

	//getting balance
	mapping(address => uint) public balanceOf;

	constructor(uint _initialsupply) public {
		 totalSupply = _initialsupply;

		 //allocate the initial supply
		 balanceOf[msg.sender] = _initialsupply;
	}
}