import React from "react";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";

import "./Products.css";

export default function VinylTile() {
	return (
		<>
			<HeaderBar />
			<div className="products-header-container">
				<h1>VinylTile</h1>
				<p>
					Vinyl Composition Tile (VCT) flooring is renowned for its durability,
					low maintenance, and extensive pattern selection. It proves to be an
					excellent choice for areas with heavy foot traffic, such as retail
					stores, schools, and commercial spaces.
				</p>
				<p>
					Imperial Texture, a highly sought-after VCT option, exudes timeless
					appeal. While primarily designed for commercial use, it has also
					gained popularity in residential settings, including basement game
					rooms, vintage garages, and nostalgic diners and restaurants. It has
					become a favored choice in schools, grocery stores, and corporate
					offices alike.
				</p>
			</div>
		</>
	);
}
