import { useState, useEffect } from "react";
import "./App.css";
import { Input, Space, message } from "antd";
const { Search } = Input;

const App = () => {
	const [shortURL, setShortURL] = useState(null);
	const [originUrl, setOriginUrl] = useState(null);
	const createShortURL = async (value, _e, info) => {
		const response = await fetch(
			`http://localhost:3000/create?url=${value}`,
			{
				method: "POST",
			}
		);
		setShortURL(await response.text());
	};
	const getOriginURL = async (value, _e, info) => {
		const response = await fetch(`http://localhost:3000/short/${value}`);
		let url = await response.text();
		url = url.startsWith("http") ? url : `https://${url}`;
		setOriginUrl(url);
	};
	return (
		<>
			<div>
				<Search
					placeholder="input origin url"
					onSearch={createShortURL}
					enterButton
				/>
				<div>Short link: {shortURL}</div>
			</div>
			<div>
				<Search
					placeholder="input short url"
					onSearch={getOriginURL}
					enterButton
				/>
				<div>
					Origin link:
					<a
						href={originUrl}
					>
						{originUrl}
					</a>
				</div>
			</div>
		</>
	);
};

export default App;
