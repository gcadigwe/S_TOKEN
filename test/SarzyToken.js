const SarzyToken = artifacts.require("./SarzyToken.sol")

contract ("SarzyToken", function(accounts){
	it("sets the total supply upon deployment",  async()=>{
		return tokenInstance = await SarzyToken.deployed();
		return totalSupply = await tokenInstance.totalSupply()
		assert.equal(totalSupply.toNumber(), 1000000, "sets the total supply to 1,000,000")
	})
})