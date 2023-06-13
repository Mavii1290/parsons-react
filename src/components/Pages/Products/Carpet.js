import React from "react";

import "./Products.css";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";
import PhotoCards from "../../PhotoCards/PhotoCards";
import GalleryCarousel from "../../GalleryCarousel/GalleryCarousel";


import StellaQ1 from "./Assets/StellaQ1.png";
import StellaQ2 from "./Assets/StellaQ2.png";
import StellaQ3 from "./Assets/StellaQ3.png";
import StellaQ4 from "./Assets/StellaQ4.png";
import StellaQ5 from "./Assets/StellaQ5.png";
import StellaQ6 from "./Assets/StellaQ6.png";
import OuterBanks001 from "./Assets/OuterBanks001.png";
import OuterBanks002 from "./Assets/OuterBanks002.png";
import OuterBanks003 from "./Assets/OuterBanks003.png";
import OuterBanks004 from "./Assets/OuterBanks004.png";
import OuterBanks005 from "./Assets/OuterBanks005.png";
import OuterBanks006 from "./Assets/OuterBanks006.png";
import HorizonBlue from "./Assets/HorizonBlue.png";
import HorizonGreen from "./Assets/HorizonGreen.png";
import HorizonRust from "./Assets/HorizonRust.png";

const data = [
	{
		name: "Stella 1",
		src: StellaQ1,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Stella 2",
		src: StellaQ2,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Stella 3",
		src: StellaQ3,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Stella 4",
		src: StellaQ4,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Stella 5",
		src: StellaQ5,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Stella 6",
		src: StellaQ6,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 1",
		src: OuterBanks001,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 2",
		src: OuterBanks002,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 3",
		src: OuterBanks003,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 4",
		src: OuterBanks004,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 5",
		src: OuterBanks005,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "OuterBanks 6",
		src: OuterBanks006,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Horizon Blue",
		src: HorizonBlue,
		txt: `24" x 24" Carpet Squares`,
	},
	{
		name: "Horizon Green",
		src: HorizonGreen,
	},
	{
		name: "Horizon Rust",
		src: HorizonRust,
		txt: `24" x 24" Carpet Squares`,
	},
];

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
			<div className="product-container">
				<PhotoCards data={data} />
			</div>
			<div className="gallery-container">
			<GalleryCarousel data={data}/>
			</div>
			<Footer />
		</>
	);
}
