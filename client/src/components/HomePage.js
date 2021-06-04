import React from "react";
import { Typography, Divider } from "antd";

const { Title, Text } = Typography;
function HomePage() {
	return (
		<div>
			<Title>Slow Finance</Title>
			<Text>
				Slow finance is an attempt to create DeFi primitives from scratch.{" "}
				<Text strong>
					These are not meant to be used in production. This is just for
					learning.
				</Text>
			</Text>
			<Divider />
		</div>
	);
}

export default HomePage;
