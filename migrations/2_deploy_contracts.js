const SarzyToken = artifacts.require("./SarzyToken.sol");

module.exports = function (deployer) {
  deployer.deploy(SarzyToken, 1000000);
};
