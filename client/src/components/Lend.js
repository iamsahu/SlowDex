import React, { useContext, useState } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import { Form, Typography, Input, Button, Checkbox } from "antd";

const { Text } = Typography;

function Lend(props) {
	const [lendingStatus, setlendingStatus] = useState("");
	const details = useContext(Web3Context);

	async function FundLending(amountToLend) {
		const { accounts, contract, web3 } = details.current;

		const lendingContract = LendingProtocol.networks[details.current.networkId];
		const lendingInstance = new web3.eth.Contract(
			LendingProtocol.abi,
			lendingContract && lendingContract.address
		);

		await contract.methods
			.approve(
				lendingContract.address,
				details.current.web3.utils.toWei(amountToLend, "ether")
			)
			.send({
				from: accounts[0],
				// value: web3.utils.toWei("0.5", "ether"),
				gas: 210000,
				gasPrice: 1000000000,
			});

		await lendingInstance.methods
			.AcceptTokensToLend(
				Local1.networks[details.current.networkId].address,
				details.current.web3.utils.toWei(amountToLend, "ether")
			)
			.send({ from: accounts[0], gas: 210000, gasPrice: 1000000000 })
			.on("confirmation", function (confirmationNumber, receipt) {
				console.log("Lending Successful!");
				setlendingStatus(
					"Successfully lended! Here is the confirmation number: " +
						confirmationNumber
				);
			})
			.on("receipt", function (receipt) {
				console.log(receipt);
				// setlendingStatus(receipt);
			})
			.on("error", function (error, receipt) {
				// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
				console.log(error);
			});
		// await contract.methods
		// 	.transfer(
		// 		lendingContract.address,
		// 		details.current.web3.utils.toWei(amountToLend, "ether")
		// 	)
		// 	.send({ from: accounts[0], gas: 210000, gasPrice: 1000000000 })
		// 	.on("confirmation", function (confirmationNumber, receipt) {
		// 		console.log("Lending Successful!");
		// 		setlendingStatus(
		// 			"Successfully lended! Here is the confirmation number: " +
		// 				confirmationNumber
		// 		);
		// 	})
		// 	.on("receipt", function (receipt) {
		// 		console.log(receipt);
		// 		// setlendingStatus(receipt);
		// 	})
		// 	.on("error", function (error, receipt) {
		// 		// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
		// 		console.log(error);
		// 	});
	}

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = async (values) => {
		await FundLending(values.lendAmount);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			<Form
				{...layout}
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Amount to Lend"
					name="lendAmount"
					rules={[{ required: true, message: "Please input an amount!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Lend
					</Button>
				</Form.Item>
			</Form>
			<Text>{lendingStatus}</Text>
			{/* <Button onClick={FundLending}>Lend Tokens to Protocol</Button> */}
		</div>
	);
}

export default Lend;
