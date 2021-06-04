import React, { useContext } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import { Button } from "antd";

function Borrow(props) {
	const details = useContext(Web3Context);

	async function Borrow() {
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

	return (
		<div>
			<Button onClick={Borrow}>Borrow</Button>
		</div>
	);
}

export default Borrow;
