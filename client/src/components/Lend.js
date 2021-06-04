import React, { useContext, useState } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";

import Withdraw from "./Withdraw";
import { Tabs, Form, Layout, Typography, Input, Button } from "antd";
const { Content } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

function Lend(props) {
	const [lendingStatus, setlendingStatus] = useState("");
	const details = useContext(Web3Context);
	const { accounts, contract, web3 } = details.current;

	const lendingContract = LendingProtocol.networks[details.current.networkId];
	const lendingInstance = new web3.eth.Contract(
		LendingProtocol.abi,
		lendingContract && lendingContract.address
	);

	async function FundLending(amountToLend) {
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
	}

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onLend = async (values) => {
		await FundLending(values.lendAmount);
	};

	const onLendFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	function callback(key) {}
	return (
		<Content
			style={{ padding: "20px 20px", background: "#fff", minHeight: "83vh" }}
		>
			<Title> Lending</Title>

			<Tabs defaultActiveKey="1" onChange={callback}>
				<TabPane tab="Lendtokens" key="1">
					<Text>You can lend your LOC1 token here</Text>
					<br />
					<Form name="basic" onFinish={onLend} onFinishFailed={onLendFailed}>
						<Form.Item
							label="Amount to Lend"
							name="lendAmount"
							rules={[{ required: true, message: "Please input an amount!" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Lend
							</Button>
						</Form.Item>
					</Form>
					<Text>{lendingStatus}</Text>
				</TabPane>
				<TabPane tab="Withdraw" key="2">
					<Withdraw />
				</TabPane>
			</Tabs>

			{/* <Button onClick={FundLending}>Lend Tokens to Protocol</Button> */}
		</Content>
	);
}

export default Lend;
