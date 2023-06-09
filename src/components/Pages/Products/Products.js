import React from "react";
import { useNavigate } from "react-router-dom";

import HeaderBar from "../../HeaderBar/HeaderBar";
import LogoCarousel from "../../Logo-Carousel/LogoCarousel";
import PhotoCards from "../../PhotoCards/PhotoCards";

import "./Products.css";

import whiteWood from "../Assets/whiteWood.png";
import carpetExample2 from "../Assets/carpetExample2.png";
import VCTExample from "../Assets/VCTExample.jpg.png";
import LVexample from "../Assets/LVexample.jpg";

const data = [
	{
		name: "Carpet",
		src: carpetExample2,
		path: "Carpet",
	},
	{
		name: "Vinyl Composite Tile",
		src: VCTExample,
		path: "VinylTile",
	},
	{
		name: "Luxury Vinyl",
		src: LVexample,
		path: "LuxuryVinyl",
	},
];

export default function Products() {
	return (
		<>
			<HeaderBar />
			<div className="products-header-container">
				<h1>Products</h1>
				<p>
					At Parsons Floors, we specialize in commercial flooring and take pride
					in offering a wide range of flooring options. Our selection includes
					hardwood, engineered hardwood, luxury vinyl tiles, water-resistant
					laminate, durable carpet, and more. But that's not all! We also
					provide an extensive line of high-quality floor care products,
					ensuring that your floors remain stunning and well-maintained for many
					years after your remodel is complete.
				</p>
				<p>
					<b>BROWSE OUR ONLINE FLOORING CATALOG </b>
				</p>
			</div>
			<LogoCarousel />
			<div className="product-container">
				<img src={whiteWood} alt="White Wood" className="product-underlay" />
				<PhotoCards data={data} />
			</div>
		</>
	);
}
