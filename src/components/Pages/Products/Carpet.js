import React from "react";

import "./Products.css";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";

export default function Carpet() {
	return (
		<>
			<HeaderBar />
			<div className="products-header-container">
				<h1>Carpet</h1>
				<p>
					Experience the ultimate in comfort, functionality, and style with our
					exceptional range of commercial carpets. Designed to provide warmth
					and insulation, they offer a cozy environment for your workspace. With
					an extensive selection of colors and styles, finding the perfect
					carpet that meets your commercial needs is a breeze. With a legacy of
					supplying designer carpets to satisfied customers across Long Island
					for over 25 years, we take pride in offering unparalleled quality.
					Discover unbeatable prices on our premium carpets at Parson's Floors,
					perfect for enhancing your commercial space!
				</p>
			</div>
			<Footer />
		</>
	);
}
