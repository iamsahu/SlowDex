import React, { useRef, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Local1 from "./contracts/Local1.json";
import SlowDex from "./contracts/SlowDex.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
	const details = useRef({
		storageValue: 0,
		web3: null,
		accounts: null,
		contract: null,
	});
	async function setup() {
		const web3 = await getWeb3();

		// Use web3 to get the user's accounts.
		const accounts = await web3.eth.getAccounts();

		// Get the contract instance.
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = Local1.networks[networkId];
		console.log(deployedNetwork.address);
		const instance = new web3.eth.Contract(
			Local1.abi,
			deployedNetwork && deployedNetwork.address
		);
		details.current.web3 = web3;
		details.current.contract = instance;
		details.current.accounts = accounts;
		details.current.storageValue = 1;
	}
	useEffect(() => {
		if (details.current.storageValue === 0) setup();
	});

	async function runExample() {
		// console.log(details);
		const { accounts, contract } = details.current;
		// console.log(accounts);
		// Stores a given value, 5 by default.

		await contract.methods
			.transfer(
				"0x7ffB5DeB7eb13020aa848bED9DE9222E8F42Fd9A",
				details.current.web3.utils.toWei("500", "ether")
			)
			.send({ from: accounts[0] });

		// Update state with the result.
		// this.setState({ storageValue: response });
	}

	async function runExample2() {
		const { accounts, web3 } = details.current;

		const networkId = await web3.eth.net.getId();

		const deployedNetwork = Local1.networks[networkId];
		const instance = new web3.eth.Contract(
			Local1.abi,
			deployedNetwork && deployedNetwork.address
		);

		const deployedNetwork2 = SlowDex.networks[networkId];
		// await instance.methods
		// 	.increaseAllowance(
		// 		deployedNetwork2.address,
		// 		details.current.web3.utils.toWei("0.5", "ether")
		// 	)
		// 	.send({ from: accounts[0] });

		let res = await instance.methods
			.allowance(accounts[0], deployedNetwork2.address)
			.send({ from: accounts[0] });

		// console.log(al);
		console.log(res);
		// const contractInstance = new web3.eth.Contract(
		// 	SlowDex.abi,
		// 	deployedNetwork2 && deployedNetwork2.address
		// );
		// await contractInstance.methods
		// 	.transferTokens(
		// 		deployedNetwork.address,
		// 		details.current.web3.utils.toWei("0.1", "ether")
		// 	)
		// 	.send({ from: accounts[0], gas: 4712388, gasPrice: 100000000000 });
	}

	return (
		<div className="App">
			<h1>Good to Go!</h1>
			<p>Your Truffle Box is installed and ready.</p>
			<h2>Smart Contract Example</h2>
			<p>
				If your contracts compiled and migrated successfully, below will show a
				stored value of 5 (by default).
			</p>
			<p>
				Try changing the value stored on <strong>line 40</strong> of App.js.
			</p>

			<button onClick={runExample}>Transfer Loc1</button>
			<button onClick={runExample2}>DEX Transfer</button>
		</div>
	);
}

export default App;
