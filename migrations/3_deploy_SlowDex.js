var SlowDex = artifacts.require("./SlowDex.sol");

module.exports = function (deployer) {
	deployer.deploy(SlowDex);
};
