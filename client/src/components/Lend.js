import React, { useContext } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import { Button } from "antd";

function Lend(props) {
	const details = useContext(Web3Context);

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

	return (
		<div>
			<Button onClick={FundLending}>Lend Tokens to Protocol</Button>
		</div>
	);
}

export default Lend;
