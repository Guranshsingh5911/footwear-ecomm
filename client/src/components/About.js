import React from 'react';

const AboutPage = () => {
	return (
		<div className="about-container">
			<header className="about-header">
				<h1>About Us</h1>
			</header>

			<div className="content-inner">
				<section className="footer-section">
					<h2 className="footer-group-title">Our Mission</h2>
					<ul className="footer-group">
						<li>
							Provide the best footwear for comfort and style.
						</li>
						<li>Empower individuals with diverse choices.</li>
						<li>
							Ensure quality, sustainability, and inclusivity.
						</li>
					</ul>
				</section>

				<section className="footer-section">
					<h2 className="footer-group-title">Our Values</h2>
					<ul className="footer-group">
						<li>Quality First</li>
						<li>Sustainability</li>
						<li>Inclusivity</li>
						<li>Innovation</li>
					</ul>
				</section>

				<section className="footer-section">
					<h2 className="footer-group-title">Meet The Team</h2>
					<ul className="footer-group">
						<li>John Doe - CEO</li>
						<li>Jane Smith - Lead Designer</li>
						<li>Mike Johnson - Marketing Head</li>
						<li>Anna Lee - Customer Support</li>
					</ul>
				</section>
			</div>

			<footer className="footer-info">
				<p>© 2025 FootWearCart. All Rights Reserved.</p>
			</footer>
		</div>
	);
};

export default AboutPage;