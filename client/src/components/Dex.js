import React, { useContext, useState } from "react";
import Local1 from "../contracts/Local1.json";
import Local2 from "../contracts/Local2.json";
import SlowDex from "../contracts/SlowDex.json";
import LendingProtocol from "../contracts/LendingProtocol.json";
import Web3Context from "../context/Web3Context";
import DexSwap from "./DexSwap";
import DexLiquidity from "./DexLiquidity";

import { Tabs, Typography, Layout } from "antd";
const { Content } = Layout;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

function Dex(props) {
	const [selectedTabUI, setSelectedTabUI] = useState(<DexSwap />);
	const callback = (values) => {
		switch (values) {
			case "1":
				setSelectedTabUI(<DexSwap />);
				break;
			case "2":
				setSelectedTabUI(<DexLiquidity />);
				break;
			default:
				break;
		}
	};
	return (
		<Content
			style={{ padding: "20px 20px", background: "#fff", minHeight: "83vh" }}
		>
			<Title> DEX</Title>
			<Tabs defaultActiveKey="1" onChange={callback}>
				<TabPane tab="Swap Token" key="1">
					{selectedTabUI}
				</TabPane>
				<TabPane tab="Add Liquidity" key="2">
					{selectedTabUI}
				</TabPane>
			</Tabs>
		</Content>
	);
}

export default Dex;
