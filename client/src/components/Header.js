import React, { useState } from 'react';
import XSVG from '../svg/XSvg';

const Header = props => {
	const headerP = props.pwd;

	const [showPopup, setShowPopup] = useState(false);

	const togglePopup = event => {
		setShowPopup(!showPopup);
	};

	return (
		<header>
			<div className={headerP >= 149 ? 'undo header' : 'header'}>
				<ul className="service-bar">
					<li>India</li>
					<li>English</li>
					<li className="open" onClick={togglePopup}>
						Customer Support
					</li>
				</ul>
				{showPopup ? (
					<div className="popup">
						<div className="popup_inner">
							<div className="service-title">
								<h1>
									Customer Support
									<span>FootWearCart</span>
								</h1>
							</div>
							<div className="service-items">
								<h2>
									Need help with orders or product inquiries?
								</h2>

								<div className="phone">
									<div>
										<h3>PHONE</h3>
										<p>
											Support available Mon–Sun / 10 AM –
											8 PM
										</p>
									</div>

									<div>
										<div>
											Call us
											<br /> +91-9876543210
										</div>
									</div>
								</div>

								<div className="email">
									<div>
										<h3>EMAIL</h3>
										<p>
											Click ‘Send Email’ to reach our
											support team.
											<br />
											Leave your query and contact
											details, and we’ll get back to you
											shortly.
										</p>
									</div>

									<div>
										<a href="mailto:support@footwearcart.com">
											Send Email
										</a>
									</div>
								</div>
								<div className="live-chat">
									<div>
										<h3>Live Chat</h3>
										<p>
											Chat available Mon–Sun / 10 AM – 8
											PM
										</p>
									</div>

									<div>
										<button className="chat-btn">
											Chat Unavailable
										</button>
									</div>
								</div>
							</div>
							<div>
								<span
									className="close-btn"
									onClick={togglePopup}
								>
									<XSVG />
								</span>
							</div>
						</div>
					</div>
				) : null}
				<ul className="user-menu-bar">
					<a href="/cart">Cart</a>
					<a href="/wishlist">🤍</a>
					<a href="/login">Login</a>
				</ul>

				<div className="serach-menu-bar">
					<img
						src={
							'https://github.com/dlatldhs/react-clone/blob/main/public/imgs/search_icon_white.png?raw=true'
						}
						alt="header search logo"
					/>
				</div>

				<div
					className={
						headerP >= 149 ? 'hidden gucci-logo' : 'gucci-logo'
					}
				>
					<a tabIndex="5" href="/" className="logo">
						FootWearCart
					</a>
				</div>

				<ul
					className={
						headerP >= 149
							? 'scoll-header main-contents-menu-bar'
							: 'undo2 main-contents-menu-bar'
					}
				>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="/products">Products</a>
					</li>
					<li>
						<a href="/shop">Shop</a>
					</li>
					<li>
						<a href="/blog">Blog</a>
					</li>
					<li>
						<a href="/contact">Contact</a>
					</li>
					<li>
						<a href="/login">Login / Register</a>
					</li>
					<li>
						<a href="/wishlist">Wishlist</a>
					</li>
				</ul>
			</div>
		</header>
	);
};
export default Header;