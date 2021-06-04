import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;
function HomePage() {
	return (
		<div>
			<Title>Slow Finance</Title>
			<Text>
				Slow finance is an set of DeFi primitives. The are not meant to be used
				in production. This is just for learning.
			</Text>
		</div>
	);
}

export default HomePage;
