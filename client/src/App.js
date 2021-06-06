import React, { useRef, useEffect, useState } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Local1 from "./contracts/Local1.json";
import getWeb3 from "./getWeb3";
import Lend from "./components/Lend";
import Borrow from "./components/Borrow";
import HomePage from "./components/HomePage";
import Dex from "./components/Dex";
import Web3Context from "./context/Web3Context";
import "./App.css";

import { Layout, Menu } from "antd";
import {
	AreaChartOutlined,
	MoneyCollectOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Link } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
	const [collapsed, setCollapsed] = useState(true);
	const [currentUI, setcurrentUI] = useState(<HomePage />);

	const details = useRef({
		storageValue: 0,
		web3: null,
		accounts: null,
		contract: null,
		networkId: null,
	});
	async function setup() {
		const web3 = await getWeb3();

		// Use web3 to get the user's accounts.
		const accounts = await web3.eth.getAccounts();

		// Get the contract instance.
		const networkId = await web3.eth.net.getId();
		// Web3Context = createContext({web3:web3,accounts:accounts,networkId:networkId});
		const deployedNetwork = Local1.networks[networkId];
		console.log(deployedNetwork.address);
		const instance = new web3.eth.Contract(
			Local1.abi,
			deployedNetwork && deployedNetwork.address
		);
		details.current.web3 = web3;
		details.current.contract = instance;
		details.current.accounts = accounts;
		details.current.networkId = networkId;
		details.current.storageValue = 1;
	}
	useEffect(() => {
		if (details.current.storageValue === 0) setup();
	});

	function onCollapse(collapse) {
		setCollapsed(collapse);
	}

	function onItemClick(item) {
		// console.log(item);
		switch (item.key) {
			case "1":
				setcurrentUI(<HomePage />);
				break;
			case "2":
				setcurrentUI(<Dex />);
				break;
			case "3":
				setcurrentUI(<Lend />);
				break;
			case "4":
				setcurrentUI(<Borrow />);
				break;
			default:
				break;
		}
	}

	return (
		<Layout>
			<Header
				className="header"
				style={{ position: "fixed", zIndex: 1, width: "100%" }}
			></Header>
			<Content className="site-layout" style={{ marginTop: 64 }}>
				<Layout style={{ minHeight: "92vh" }}>
					<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
						<div className="logo" />
						<Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
							<Menu.Item key="1" icon={<HomeOutlined />} onClick={onItemClick}>
								Home
							</Menu.Item>
							<Menu.Item
								key="2"
								icon={<AreaChartOutlined />}
								onClick={onItemClick}
							>
								DEX
							</Menu.Item>
							{/* <Menu.Item key="2" icon={<DesktopOutlined />}>
						Option 2
					</Menu.Item> */}
							<SubMenu
								key="sub1"
								icon={<MoneyCollectOutlined />}
								title="Lending/Borrowing"
							>
								<Menu.Item key="3" onClick={onItemClick}>
									Lend
								</Menu.Item>
								<Menu.Item key="4" onClick={onItemClick}>
									Borrow
								</Menu.Item>
								{/* <Menu.Item key="5">Alex</Menu.Item> */}
							</SubMenu>
							{/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
						<Menu.Item key="6">Team 1</Menu.Item>
						<Menu.Item key="8">Team 2</Menu.Item>
					</SubMenu> */}
							{/* <Menu.Item key="9" icon={<FileOutlined />}>
						Files
					</Menu.Item> */}
						</Menu>
					</Sider>
					<Layout className="site-layout">
						<Content>
							<Web3Context.Provider value={details}>
								<div
									className="site-layout-background"
									style={{ padding: 24, minHeight: 360 }}
								>
									{currentUI}
								</div>
							</Web3Context.Provider>
						</Content>
						<Footer style={{ textAlign: "center" }}>
							Slow Finance ©2021 Created by{" "}
							<Link href="https://twitter.com/themystery" target="_blank">
								Prafful Sahu
							</Link>
						</Footer>
					</Layout>
				</Layout>
			</Content>
		</Layout>
	);
}

export default App;
