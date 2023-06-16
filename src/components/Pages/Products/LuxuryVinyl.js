import React from "react";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";
import PhotoCards from "../../PhotoCards/PhotoCards";
import GalleryCarousel from "../../GalleryCarousel/GalleryCarousel";

import "./Products.css";

import ClassIV1000 from "./Assets/LVT/ClassIV1000.png";
import ClassIV1001 from "./Assets/LVT/ClassIV1001.png";
import ClassIV1002 from "./Assets/LVT/ClassIV1002.png";
import ClassIV1003 from "./Assets/LVT/ClassIV1003.png";
import ClassIV1005 from "./Assets/LVT/ClassIV1005.png";
import ClassIV1006 from "./Assets/LVT/ClassIV1006.png";
import ClassIV1008 from "./Assets/LVT/ClassIV1008.png";

const data = [
	{
		name: "Class IV",
		src: ClassIV1000,
		txt: `Planks`,
	},
	{
		name: "Class IV 1",
		src: ClassIV1001,
		txt: `Planks`,
	},
	{
		name: "Class IV 2",
		src: ClassIV1002,
		txt: `Planks`,
	},
	{
		name: "Class IV 3",
		src: ClassIV1003,
		txt: `Planks`,
	},
	{
		name: "Class IV 5",
		src: ClassIV1005,
		txt: `Planks`,
	},
	{
		name: "Class IV 6",
		src: ClassIV1006,
		txt: `Planks`,
	},
	{
		name: "Class IV 8",
		src: ClassIV1008,
		txt: `Planks`,
	},
];

const gallery = [
{
	src: ClassIV1008,
},
{
	src: ClassIV1008,
},
{
	src: ClassIV1008,
},
{
	src: ClassIV1008,
},
{
	src: ClassIV1008,
},
]

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
			<div className="product-container">
				<PhotoCards data={data} />
			</div>
			<GalleryCarousel data={gallery} />
			<Footer />
		</>
	);
}
