import React, { useContext, useState } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import { Form, Typography, Input, Button } from "antd";

const { Text } = Typography;

function Withdraw(props) {
	const [withdrawStatus, setwithdrawStatus] = useState("");
	const details = useContext(Web3Context);
	const { accounts, contract, web3 } = details.current;

	const lendingContract = LendingProtocol.networks[details.current.networkId];
	const lendingInstance = new web3.eth.Contract(
		LendingProtocol.abi,
		lendingContract && lendingContract.address
	);

	async function Withdraw(withdrawAmount) {
		// await contract.methods
		// 	.approve(
		// 		lendingContract.address,
		// 		details.current.web3.utils.toWei(withdrawAmount, "ether")
		// 	)
		// 	.send({
		// 		from: accounts[0],
		// 		gas: 210000,
		// 		gasPrice: 1000000000,
		// 	});

		await lendingInstance.methods
			.withDraw(
				Local1.networks[details.current.networkId].address,
				details.current.web3.utils.toWei(withdrawAmount, "ether")
			)
			.send({ from: accounts[0], gas: 210000, gasPrice: 1000000000 })
			.on("confirmation", function (confirmationNumber, receipt) {
				console.log("Lending Successful!");
				setwithdrawStatus(
					"Successfully lended! Here is the confirmation number: " +
						confirmationNumber
				);
			})
			.on("receipt", function (receipt) {
				console.log(receipt);
				// setwithdrawStatus(receipt);
			})
			.on("error", function (error, receipt) {
				// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
				console.log(error);
			});
	}

	const onWithDraw = async (values) => {
		await Withdraw(values.withDrawAmount);
	};

	const onWithDrawFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	function callback(key) {
		console.log(key);
	}
	return (
		<div>
			<Text>Withdraw your LOC1 token</Text>
			<br />
			<Form
				name="basic"
				onFinish={onWithDraw}
				onFinishFailed={onWithDrawFailed}
			>
				<Form.Item
					label="Amount to Withdraw"
					name="withDrawAmount"
					rules={[{ required: true, message: "Please input an amount!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Withdraw!
					</Button>
				</Form.Item>
			</Form>
			<Text>{withdrawStatus}</Text>

			{/* <Button onClick={FundLending}>Lend Tokens to Protocol</Button> */}
		</div>
	);
}

export default Withdraw;
