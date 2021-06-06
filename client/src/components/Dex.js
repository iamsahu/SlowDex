import React, { useState } from "react";
// import Local1 from "../contracts/Local1.json";
// import Local2 from "../contracts/Local2.json";
// import SlowDex from "../contracts/SlowDex.json";
// import LendingProtocol from "../contracts/LendingProtocol.json";
// import Web3Context from "../context/Web3Context";
import DexSwap from "./DexSwap";
import DexLiquidity from "./DexLiquidity";

import { Tabs, Typography, Layout, Divider } from "antd";
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
					<Divider />
					<Text>
						Simple DEX is a AMM. It relies on constant product formula (k = x*y)
						to determine the asset prices.
						<br />
						This example shows how you can swap one token with another.
					</Text>
				</TabPane>
				<TabPane tab="Add Liquidity" key="2">
					{selectedTabUI}
					<Divider />
					<Text>
						You can create a liquidity pool by depositing 2 types of tokens. The
						ratio in which they are added would play a role in determining the
						prices of swap.
						<br />
					</Text>
				</TabPane>
			</Tabs>
		</Content>
	);
}

export default Dex;
