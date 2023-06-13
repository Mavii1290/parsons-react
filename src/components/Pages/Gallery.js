import React from "react";

import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";

import ClassIV1000 from "./Products/Assets/ClassIV1000.png";
import ClassIV1001 from "./Products/Assets/ClassIV1001.png";
import ClassIV1002 from "./Products/Assets/ClassIV1002.png";
import ClassIV1003 from "./Products/Assets/ClassIV1003.png";
import ClassIV1005 from "./Products/Assets/ClassIV1005.png";
import ClassIV1006 from "./Products/Assets/ClassIV1006.png";
import ClassIV1008 from "./Products/Assets/ClassIV1008.png";

const gallery = [
	{
		src: ClassIV1008,
	},
	{
		src: ClassIV1000,
	},
	{
		src: ClassIV1002,
	},
	{
		src: ClassIV1001,
	},
	{
		src: ClassIV1003,
	},
  {
		src: ClassIV1005,
	},
  {
		src: ClassIV1006,
	},
];

export default function Gallery() {
	return (
		<div>
			<HeaderBar />
			<GalleryCarousel data={gallery} />
			<Footer />
		</div>
	);
}
