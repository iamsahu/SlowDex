import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
ReactDOM.render(
	<Layout className="layout">
		<Header>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
				<Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
			</Menu>
		</Header>
		<Content style={{ padding: "0 50px" }}>
			<Breadcrumb style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>List</Breadcrumb.Item>
				<Breadcrumb.Item>App</Breadcrumb.Item>
			</Breadcrumb>
			<div className="site-layout-content">
				<App />
			</div>
		</Content>
		<Footer style={{ textAlign: "center" }}>Easy Finance</Footer>
	</Layout>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
