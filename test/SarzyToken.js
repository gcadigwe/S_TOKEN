const SarzyToken = artifacts.require("./SarzyToken.sol")

contract ("SarzyToken", function(accounts){
	it("initializes the contract correct values", async()=>{
		const tokenInstance = await SarzyToken.deployed();
		const name = await tokenInstance.name()
		 assert.equal(name, "Sarzy Token","has the same name as the contract name")
		const symbol = await tokenInstance.symbol()
		 assert.equal(symbol,"SZY","if token name is correct");
		 const standard = await tokenInstance.standard();
		 assert.equal(standard,"Sarzy Token v1.0","has the same standard")

	})
	it("allocates the total supply upon deployment",  async()=>{
		const tokenInstance = await SarzyToken.deployed();
		const totalSupply = await tokenInstance.totalSupply();
		 assert.equal(totalSupply.toNumber(), 1000000, "sets the total supply to 1,000,000")

		const adminBalance = await tokenInstance.balanceOf(accounts[0]);
		 assert.equal(adminBalance.toNumber(), 1000000,"it allocates the initial supply to admin account")
	})
})