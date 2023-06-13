import React from "react";

import GalleryCarousel from "./GalleryCarousel";

import Carpet0 from "../Pages/Assets/Gallery/Carpet/Carpet0.png";
import Carpet2 from "../Pages/Assets/Gallery/Carpet/carpet2.png";
import Carpet3 from "../Pages/Assets/Gallery/Carpet/carpet3.png";
import Carpet4 from "../Pages/Assets/Gallery/Carpet/carpet4.png";
import Carpet5 from "../Pages/Assets/Gallery/Carpet/carpet5.png";
import Carpet6 from "../Pages/Assets/Gallery/Carpet/carpet6.png";
import Carpet7 from "../Pages/Assets/Gallery/Carpet/carpet7.png";
import Carpet8 from "../Pages/Assets/Gallery/Carpet/carpet8.png";

const gallery = [
	{
		src: Carpet0,
	},
	{
		src: Carpet2,
	},
	{
		src: Carpet3,
	},
	{
		src: Carpet4,
	},
	{
		src: Carpet5,
	},
	{
		src: Carpet6,
	},
	{
		src: Carpet7,
	},
	{
		src: Carpet8,
	},
];

export default function CarpetGallery() {
	return (
		<>
			<div className="carpet-gallery-section">
				<h2>Carpet Gallery</h2>
				<GalleryCarousel data={gallery} />
			</div>
            </>
	);
}
