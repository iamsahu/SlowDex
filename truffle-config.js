const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		develop: {
			port: 8545,
		},
		matic: {
			provider: () =>
				new HDWalletProvider(
					mnemonic
					// `https://rpc-mumbai.matic.today`
					"https://polygon-mumbai.infura.io/v3/b0d77b59929c4c0f8743077f967c09b3"
				),
			network_id: 80001,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true,
			websocket: true,
			// timeoutBlocks: 50000,
			// networkCheckTimeout: 1000000,
		},
	},

	compilers: {
		solc: {
			version: "^0.8.0",
		},
	},
};
