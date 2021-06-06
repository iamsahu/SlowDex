import React, { useState } from "react";
import { Button, Form, Input, Tabs, Typography, Layout, Divider } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

function Faucet() {
	const [faucet, setfaucet] = useState("1");
	const onFinish = async (values) => {};

	const onFinishFailed = (errorInfo) => {};

	const onValuesChange = (changedFields, allFields) => {
		for (let index = 0; index < changedFields.length; index++) {
			const element = changedFields[index];
			if (element.name[0] === "address") {
			}
		}
	};

	const callback = (values) => {
		switch (values) {
			case "1":
				setfaucet("1");
				break;
			case "2":
				setfaucet("2");
				break;
			default:
				break;
		}
	};

	return (
		<Content
			style={{ padding: "20px 20px", background: "#fff", minHeight: "83vh" }}
		>
			<Title> Faucet</Title>
			<Tabs defaultActiveKey="1" onChange={callback}>
				<TabPane tab="LOC1" key="1">
					<Form
						name="basic"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						onFieldsChange={onValuesChange}
					>
						<Form.Item
							label="Address to receive"
							name="address"
							rules={[
								{ required: true, message: "Please input your address!" },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
					<Divider />
					<Text>Get some LOC1 tokens in your wallet.</Text>
				</TabPane>
				<TabPane tab="LOC2" key="2">
					<Divider />
					<Text>Get some LOC2 tokens in your wallet.</Text>
				</TabPane>
			</Tabs>
		</Content>
	);
}

export default Faucet;
