// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SarzyToken {
	//constructor
	//set the total number of tokens
	//read total number of tokens

	uint public totalSupply;

	constructor() public {
		 totalSupply = 1000000;
	}
}