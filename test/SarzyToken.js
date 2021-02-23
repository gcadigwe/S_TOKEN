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

	it('transfers token ownership', function() {
		return SarzyToken.deployed().then(function(instance){
			tokenInstance = instance;

			return tokenInstance.transfer.call(accounts[1],999999999999);
		}).then(assert.fail).catch(function(error){
			console.log("ERROR MESSAGE ==>",error.message)
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from:accounts[0]});
		}).then(function(success){
			assert.equal(success, true, 'successful transaction')
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]})
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
		      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
		      assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
		      assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
		      assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(),250000, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 750000, 'deducts amount from the sending account')
		})
	})


	it('approves token for delegated transfer', async()=>{
		const tokenInstance = await SarzyToken.deployed()
	await tokenInstance.approve.call(accounts[1], 100).then((success) => {
			assert.equal(success,true,'it returns true')
		})
	await tokenInstance.approve(accounts[1],100,{from: accounts[0]}).then((receipt)=>{
		assert.equal(receipt.logs.length, 1, 'triggers one event');
		assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Transfer" event');
		assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are transferred from');
		assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are transferred to');
		assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');

	})
	await tokenInstance.allowance(accounts[0], accounts[1]).then(allowance => {
		assert.equal(allowance,100,'stores the allowance for delegated transfer')
	})

	})
})