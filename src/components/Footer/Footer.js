import React from "react";
import { useNavigate } from "react-router-dom";


import "./Footer.css";
import logo from "../HeaderBar/logo.png";

export default function Footer() {
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		navigate("/Contact");
	};

	return (
		<div className="footer-container">
			<div className="footer-contact">
				<div className="contact-left">
					<h3>Schedule an Estimate</h3>
					<p>For quotes on your upcoming projects please contact us at your convenience.  We look forward to meeting you soon. Our flooring projects are often in the state of New York but we do commercial flooring throughout the North East and are expanding rapidly to other territories.</p>
                    <button className="contact-btn" onClick={handleNavigate}>
					Schedule</button>
                </div>
				<div className="contact-right">
                <div className="logo">
					<img src={logo} alt="" />
					<h3>PARSONS FLOORS</h3>
                    </div>
					<div className="address">
						<h4>Location</h4>
						<h6>665 Commercial Ave, Garden City, NY 11530</h6>
						<h6>(516) 484-2323</h6>

						<h4>Hours</h4>
                        <h6>Monday - Saturday: 10AM–4PM</h6>
                        <h6>Sunday: 12–5PM</h6>
					</div>
				</div>
			</div>
			<div className="terms-footer">
				<div className="terms-left">
					<a href="/About">About us</a>
					<a href="/TermsAndConditions">Terms & Conditions</a>
					<a href="/PrivacyPolicy">Privacy Policy</a>
				</div>
				<div className="terms-right">
					<p>2026</p>
					<p>©ParsonsFloors</p>
				</div>
			</div>
		</div>
	);
}
