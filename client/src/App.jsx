import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import MainPage from './components/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage';

import './style/popup.css';
import './style/App.css';
import './style/header.css';
import './style/mainStyle.css';
import './style/footerStyle.css';
import './style/slider.css';

function ScrollableApp() {
  const [position, setPosition] = useState(0);
  const location = useLocation();  // useLocation inside the Router

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHomePage = location.pathname === "/" || location.pathname === "/react-clone/home";

  return (
    <div className={isHomePage ? 'scrollable' : ''}>
      <Header pwd={position} />
      <Routes>
        {/* Define the routes for the main site */}
        <Route path="/" element={<MainPage />} />
        <Route path="/react-clone/home" element={<MainPage />} />

        {/* Define the routes for the auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename={process.env.BASE_URL}>
        <ScrollableApp />
      </Router>
    </AuthProvider>
  );
}
