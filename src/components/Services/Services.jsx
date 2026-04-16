import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";



const OurServices = () => {
	return (
		<div className="services-page">
			<HeaderBar />

			{/* Introduction Section */}
			<section className="intro-section">
				<div className="container">
					<div className="intro-grid">
						<div className="intro-text">
							<h2>Our Services</h2>
							<p>
								Parsons Flooring specialists walk you through every phase of a
								comprehensive commercial flooring project from initial planning
								to final completion. Our team collaborates with all stakeholders
								to understand your unique requirements. We perform detailed site
								evaluations to determine optimal solutions. Implementation
								follows industry best practices to ensure timely delivery within
								budget. Our commitment to exceptional quality, creative
								problem-solving, and value-driven service has established us as
								a trusted ally to architects, interior designers, and general
								contractors.
							</p>
							<Link to="/services/install-repair" className="service-link">
								Installation & Repair Services
							</Link>
						</div>
						<div className="intro-image">
							<img
								src="../Assets/Services/services-intro.png"
								alt="Professional flooring installation"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Services Cards Section */}
			<section className="services-cards">
				<div className="container">
					{/* Commercial Flooring */}
					<div className="service-card">
						<div className="service-image">
							<img
								src="../Assets/Services/commercial-flooring.png"
								alt="Commercial flooring installation"
							/>
						</div>
						<div className="service-content">
							<h2>Commercial Flooring Services</h2>
							<p>
								Parsons Flooring's expert technicians transform design concepts
								into reality through custom collaborative projects and
								exceptional installations. We've established partnerships with
								industry-leading manufacturers to provide an extensive selection
								of commercial flooring solutions. From resilient surfaces to
								textile coverings, we handle every aspect of your flooring
								needs.
							</p>
							<p>
								As the leading comprehensive commercial flooring provider in the
								New York metropolitan area, Parsons has built a solid track
								record for outstanding quality, forward-thinking approaches, and
								budget-conscious service delivery. Our seasoned and
								well-informed team has positioned Parsons as a preferred
								collaborator for architects, designers, and construction
								professionals. We're devoted to surpassing your expectations and
								remain dedicated to fulfilling your commercial flooring
								requirements with excellence and honesty.
							</p>
							<Link to="/services/commercial-flooring" className="service-link">
								Commercial Flooring Services
							</Link>
						</div>
					</div>

					{/* Sports Flooring */}
					<div className="service-card reverse">
						<div className="service-image">
							<img
								src="../Pages/Assets/Services/sports-flooring.png"
								alt="Sports flooring installation"
							/>
						</div>
						<div className="service-content">
							<h2>Sports Flooring Services</h2>
							<p>
								Our athletic surface specialists energize teams with our unique
								and bold designs while building trust through the strength and
								longevity of our installations.
							</p>
							<Link to="/services/sports-flooring" className="service-link">
								Sports Flooring Services
							</Link>
						</div>
					</div>

					{/* Epoxy Services */}
					<div className="service-card">
						<div className="service-image">
							<img
								src="../Pages/Assets/Services/epoxy-flooring.png"
								alt="Epoxy flooring application"
							/>
						</div>
						<div className="service-content">
							<h2>Our Epoxy Services</h2>
							<p>
								ProCoat by Parsons Flooring focuses on advanced coating
								technologies. Epoxy flooring ranks among the most resilient
								flooring options available, offering extended service life.
							</p>
							<p>
								Epoxy delivers outstanding protection with superior resistance
								to wear and chemical exposure. With an extensive range of color
								options, these floors enable creative patterns to be integrated
								into the installation, resulting in a premium aesthetic finish.
							</p>
							<Link to="/services/epoxy" className="service-link">
								Epoxy Services
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="cta-section">
				<div className="container">
					<div className="cta-content">
						<h2>Why Parsons Flooring</h2>
						<h3>Hardwood look, Textile or ceramic style?</h3>
						<p>
							Our superior products and expertise in commercial flooring have
							established Parsons Flooring as an industry leader. This
							excellence is why over 90% of our projects come from returning
							clients and word-of-mouth recommendations. For quality work you
							can trust, we should be your first contact!
						</p>
						<Link to="/contact" className="cta-button">
							Contact us
						</Link>
					</div>
				</div>
			</section>

			{/* Experts Section */}
			<section className="experts-section">
				<div className="container">
					<h2>
						Our flooring specialists are ready to assist with your questions.
					</h2>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default OurServices;
