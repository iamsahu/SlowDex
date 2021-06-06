import React from "react";
import { Typography, Divider, Layout, Button } from "antd";
const { Content } = Layout;
const { Title, Text } = Typography;
function HomePage() {
	return (
		<Content
			style={{ padding: "20px 20px", background: "#fff", minHeight: "83vh" }}
		>
			<Title>Slow Finance</Title>
			<Text>
				Slow finance is an attempt to create DeFi primitives from scratch.{" "}
				<Text strong>
					These are not meant to be used in production. This is just for
					learning.
				</Text>
			</Text>
			<Divider />
			Link to the repository:{" "}
			<Button
				type="primary"
				href="https://github.com/iamsahu/slowdex"
				target="_blank"
			>
				GitHub Repo
			</Button>
		</Content>
	);
}

export default HomePage;
