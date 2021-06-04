import React, { useContext, useState, useEffect } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import { Button, Form, Input } from "antd";

function Borrow(props) {
	const details = useContext(Web3Context);
	const [accountBalance, setAccountBalance] = useState("");
	const [maxBorrow, setMaxBorrow] = useState("");
	const [convertedLOC1, setConvertedLOC1] = useState("");
	const [borrowStatus, setBorrowStatus] = useState("");
	const [borrowedTillNow, setBorrowedTillNow] = useState("");
	const [depositiedTillNow, setDepositiedTillNow] = useState("");
	const { web3, accounts } = details.current;
	const lendingContract = LendingProtocol.networks[details.current.networkId];

	const lendingInstance = new details.current.web3.eth.Contract(
		LendingProtocol.abi,
		lendingContract && lendingContract.address
	);
	useEffect(() => {
		async function GetBalance() {
			let res = await web3.eth.getBalance(accounts[0]);
			setAccountBalance(web3.utils.fromWei(res, "ether"));
			setMaxBorrow(web3.utils.fromWei(res, "ether") / 2);

			console.log(details);
			console.log(lendingContract);
			let bal = await lendingInstance.methods.MyDeposits().call();
			let bal2 = await lendingInstance.methods.MyBorrows().call();

			// console.log(bal);
			setDepositiedTillNow(web3.utils.fromWei(bal, "ether"));
			setBorrowedTillNow(web3.utils.fromWei(bal2, "ether"));
		}
		if (accountBalance == "") {
			GetBalance();
		}
	}, [details.current.accounts]);

	async function Borrow(borrowThis) {
		try {
			await lendingInstance.methods
				.LoanMe(
					Local1.networks[details.current.networkId].address,
					web3.utils.toWei(borrowThis, "ether")
				)
				.send({
					from: accounts[0],
					value: web3.utils.toWei(String(parseInt(borrowThis) * 2), "ether"),
					gas: 210000,
					gasPrice: 1000000000,
				})
				.on("error", function (error, receipt) {
					// If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
					console.log(error);
				})
				.on("confirmation", function (confirmationNumber, receipt) {
					console.log("Lending Successful!");
					setBorrowStatus(
						"Successfully lended! Here is the confirmation number: " +
							confirmationNumber
					);
				})
				.on("receipt", function (receipt) {
					console.log(receipt);
					// setlendingStatus(receipt);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = async (values) => {
		await Borrow(values.borrowAmount);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onValuesChange = (changedFields, allFields) => {
		for (let index = 0; index < changedFields.length; index++) {
			const element = changedFields[index];
			if (element.name[0] == "borrowAmount") {
				setConvertedLOC1(parseInt(element.value) / 2);
			}
		}
	};

	return (
		<div>
			You have {accountBalance} ETH
			<br />
			You can borrow a max {maxBorrow} LOC1 <br />
			You have borrowed {borrowedTillNow} LOC1 <br />
			You have deposited {depositiedTillNow} ETH <br />
			<Form
				{...layout}
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onFieldsChange={onValuesChange}
			>
				<Form.Item
					label="Amount to Borrow"
					name="borrowAmount"
					rules={[{ required: true, message: "Please input an amount!" }]}
				>
					<Input />
				</Form.Item>
				{convertedLOC1 != ""
					? "Here is what you will receive: " + convertedLOC1
					: ""}
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Borrow
					</Button>
				</Form.Item>
			</Form>
			<br />
			{borrowStatus == "" ? "" : "You successfully borrowed!"}
		</div>
	);
}

export default Borrow;
