import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './components/MainPage';

import './style/popup.css';
import './style/App.css';
import './style/header.css';
import './style/mainStyle.css';
import './style/footerStyle.css';
import './style/slider.css';

export default function App() {
	const [position, setPosition] = useState(0);

	const onScroll = () => {
		setPosition(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<div className="App">
			<BrowserRouter basename={process.env.BASE_URL}>
				<Header pwd={position} />

				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/react-clone/home" element={<MainPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
