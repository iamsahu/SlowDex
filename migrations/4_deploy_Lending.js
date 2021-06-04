var LendingProtocol = artifacts.require("./LendingProtocol.sol");

module.exports = function (deployer) {
	deployer.deploy(LendingProtocol);
};
