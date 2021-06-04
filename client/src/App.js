import React, { useRef, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Local1 from "./contracts/Local1.json";
import Local2 from "./contracts/Local2.json";
import SlowDex from "./contracts/SlowDex.json";
import LendingProtocol from "./contracts/LendingProtocol.json";
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

	async function FundLending() {
		const { accounts, contract, web3 } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];

		await contract.methods
			.transfer(
				lendingContract.address,
				details.current.web3.utils.toWei("50", "ether")
			)
			.send({ from: accounts[0], gas: 210000, gasPrice: 1000000000 });
		// const a = await contract.methods
		// 	.balanceOf(lendingContract.address)
		// 	.send({ from: accounts[0], gas: 21000, gasPrice: 1000000000 });
		// console.log(a);
	}

	async function GetBalanceOf() {
		const { accounts, contract, web3 } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];

		const res = await contract.methods
			.balanceOf(lendingContract.address)
			.call();

		console.log(res);
		console.log(lendingContract.address);
	}

	async function GetBalanceC() {
		const { web3 } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];

		// const instance = new web3.eth.Contract(
		// 	LendingProtocol.abi,
		// 	lendingContract && lendingContract.address
		// );
		// const res = await instance.methods.balance().call();

		// console.log(res);
		// console.log(lendingContract.address);

		await web3.eth.getBalance(lendingContract.address).then(console.log);
	}

	async function GiveMe() {
		const { web3, accounts } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];

		const instance = new web3.eth.Contract(
			LendingProtocol.abi,
			lendingContract && lendingContract.address
		);
		try {
			await instance.methods
				.LoanMe(
					Local1.networks[networkId].address,
					web3.utils.toWei("0.05", "ether")
				)
				.send({
					from: accounts[0],
					value: web3.utils.toWei("0.5", "ether"),
					gas: 210000,
					gasPrice: 1000000000,
				})
				.on("error", function (error, receipt) {
					// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
					console.log(error);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	async function DepositPair() {
		const { web3, accounts } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];
		const local1Contract = Local1.networks[networkId];
		const local2Contract = Local2.networks[networkId];
		const local1instance = new web3.eth.Contract(
			Local1.abi,
			local1Contract && local1Contract.address
		);

		const local2instance = new web3.eth.Contract(
			Local2.abi,
			local2Contract && local2Contract.address
		);

		const lendingInstance = new web3.eth.Contract(
			LendingProtocol.abi,
			lendingContract && lendingContract.address
		);

		const depAm1 = web3.utils.toWei("0.03", "ether");
		const depAm2 = web3.utils.toWei("0.01", "ether");

		try {
			await local1instance.methods
				.approve(lendingContract.address, depAm1)
				.send({
					from: accounts[0],
					// value: web3.utils.toWei("0.5", "ether"),
					gas: 210000,
					gasPrice: 1000000000,
				});

			await local2instance.methods
				.approve(lendingContract.address, depAm2)
				.send({
					from: accounts[0],
					// value: web3.utils.toWei("0.5", "ether"),
					gas: 210000,
					gasPrice: 1000000000,
				});

			await lendingInstance.methods
				.DepositTokens(
					Local1.networks[networkId].address,
					Local2.networks[networkId].address,
					depAm1,
					depAm2
				)
				.send({
					from: accounts[0],
					// value: web3.utils.toWei("0.5", "ether"),
					gas: 210000,
					gasPrice: 1000000000,
				})
				.on("error", function (error, receipt) {
					// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
					console.log(error);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	async function GetBalanceToken() {
		const { web3 } = details.current;
		const networkId = await web3.eth.net.getId();
		const lendingContract = LendingProtocol.networks[networkId];
		const local1Contract = Local1.networks[networkId];
		const local2Contract = Local2.networks[networkId];

		const local1instance = new web3.eth.Contract(
			Local1.abi,
			local1Contract && local1Contract.address
		);

		const local2instance = new web3.eth.Contract(
			Local2.abi,
			local2Contract && local2Contract.address
		);
		await local1instance.methods
			.balanceOf(lendingContract.address)
			.call()
			.then(console.log);
		await local2instance.methods
			.balanceOf(lendingContract.address)
			.call()
			.then(console.log);
		// await web3.eth.getBalance(lendingContract.address).then(console.log);
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
			<button onClick={FundLending}>Fund Lending</button>
			<button onClick={GiveMe}>Give Me</button>
			<button onClick={GetBalanceOf}>GetBalanceOf</button>
			<button onClick={GetBalanceC}>GetBalanceC</button>
			<button onClick={DepositPair}>DepositPair</button>
			<button onClick={GetBalanceToken}>GetBalanceToken</button>
		</div>
	);
}

export default App;
