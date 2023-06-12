import React from "react";
import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";

import "./Products.css";

export default function LuxuryVinyl() {
	return (
		<>
			<HeaderBar />
			<div className="products-header-container">
				<h1>Luxury Vinyl Tile</h1>
				<p>
					Luxury Vinyl Tile flooring is designed to replicate the appearance of
					real hardwood, ceramic, and stone. It consists of multiple layers of
					vinyl, with a printed design on the top layer that mimics the desired
					material.
				</p>
				<p>
					One of the advantages of LVT is its wide range of options in terms of
					colors, patterns, and textures. It can be installed using various
					methods such as glue-down, loose-lay, or click-lock systems. Its
					popularity stems from its durability, low maintenance requirements,
					and resistance to water, making it an ideal choice for high-traffic
					areas or spaces prone to moisture.
				</p>
				<p>
					Choosing to install luxury vinyl flooring provides a cost-effective
					solution to achieve the aesthetic of natural floors.
				</p>
			</div>
			<Footer />
		</>
	);
}
