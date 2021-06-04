import React, { useContext, useState, useEffect } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import Web3Context from "../context/Web3Context";
import { Form, Typography, Input, Button } from "antd";

const { Text } = Typography;

function DexSwap(params) {
	const details = useContext(Web3Context);
	const { accounts, contract, web3 } = details.current;
	const [currentLiquidity, setCurrentLiquidity] = useState("");
	const [constant, setConstant] = useState("");
	const [secondTokenOutput, setSecondTokenOutput] = useState("");

	const networkId = details.current.networkId;
	const dexContract = SlowDex.networks[networkId];
	const local1Contract = Local1.networks[networkId];
	const local2Contract = Local2.networks[networkId];
	const local1nstance = new web3.eth.Contract(
		Local1.abi,
		local1Contract && local1Contract.address
	);

	const local2instance = new web3.eth.Contract(
		Local2.abi,
		local2Contract && local2Contract.address
	);

	const dexInstance = new web3.eth.Contract(
		SlowDex.abi,
		dexContract && dexContract.address
	);

	useEffect(() => {
		async function GetLiquidity() {
			const tokens = await dexInstance.methods.ReturnBalances().call();
			const mult = await dexInstance.methods.theconstant().call();
			console.log(tokens);
			console.log(mult);
			setCurrentLiquidity(tokens);
			setConstant(mult);
		}
		GetLiquidity();
	}, []);
	async function SwapPair(amount1, amount2) {
		const depAm1 = web3.utils.toWei(amount1, "ether");
		const depAm2 = web3.utils.toWei(String(amount2), "ether");
		console.log(secondTokenOutput);
		try {
			await local1nstance.methods.approve(dexContract.address, depAm1).send({
				from: accounts[0],
				// value: web3.utils.toWei("0.5", "ether"),
				gas: 210000,
				gasPrice: 1000000000,
			});

			await dexInstance.methods
				.swapToken(
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

	const onLend = async (values) => {
		await SwapPair(values.token1Amount, secondTokenOutput);
	};

	const onLendFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onValuesChange = (changedFields, allFields) => {
		for (let index = 0; index < changedFields.length; index++) {
			const element = changedFields[index];
			if (element.name[0] == "token1Amount") {
				const theconstant = web3.utils.fromWei(constant, "ether");
				var tok1 = web3.utils.fromWei(currentLiquidity[0], "ether");
				var tok2 = web3.utils.fromWei(currentLiquidity[1], "ether");
				console.log("tok1: " + tok1);
				console.log("tok2: " + tok2);
				console.log("Constant: " + tok1 * tok2);

				var val = (tok1 * tok2) / (parseInt(tok1) + parseInt(element.value));
				console.log(val);
				var diff = tok2 - val;
				console.log(diff);
				console.log((tok1 + parseInt(element.value)) * val);
				setSecondTokenOutput(diff);
			}
		}
	};

	return (
		<div>
			<Form
				name="basic"
				onFinish={onLend}
				onFinishFailed={onLendFailed}
				onFieldsChange={onValuesChange}
			>
				<Form.Item
					label="Token 1 Amount"
					name="token1Amount"
					rules={[{ required: true, message: "Please input an amount!" }]}
				>
					<Input />
				</Form.Item>
				{secondTokenOutput == ""
					? ""
					: "You will get " + secondTokenOutput + " LOC2"}
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Swap Tokens!
					</Button>
				</Form.Item>
			</Form>
			<br />
			<Text></Text>
		</div>
	);
}

export default DexSwap;
