import React from "react";

import GalleryCarousel from "./GalleryCarousel";

import Planks from "../Pages/Assets/Gallery/LVT/Planks.png";
import Planks1 from "../Pages/Assets/Gallery/LVT/Planks1.png";
import Planks2 from "../Pages/Assets/Gallery/LVT/Planks2.png";
import Planks3 from "../Pages/Assets/Gallery/LVT/Planks3.png";
import Planks4 from "../Pages/Assets/Gallery/LVT/Planks4.png";
import Planks5 from "../Pages/Assets/Gallery/LVT/Planks5.png";
import Planks6 from "../Pages/Assets/Gallery/LVT/Planks6.png";
import Planks7 from "../Pages/Assets/Gallery/LVT/Planks7.png";
import Planks8 from "../Pages/Assets/Gallery/LVT/Planks8.png";
import Planks9 from "../Pages/Assets/Gallery/LVT/Planks9.png";
import Planks10 from "../Pages/Assets/Gallery/LVT/Planks10.png";
import Planks11 from "../Pages/Assets/Gallery/LVT/Planks11.png";
import planks12 from "../Pages/Assets/Gallery/LVT/planks12.png";
import planks13 from "../Pages/Assets/Gallery/LVT/planks13.png";
import Planks14 from "../Pages/Assets/Gallery/LVT/Planks14.png";
import Planks15 from "../Pages/Assets/Gallery/LVT/Planks15.png";
import planks16 from "../Pages/Assets/Gallery/LVT/planks16.png";
import Planks17 from "../Pages/Assets/Gallery/LVT/Planks17.png";
import Planks18 from "../Pages/Assets/Gallery/LVT/Planks18.png";
import Planks19 from "../Pages/Assets/Gallery/LVT/Planks19.png";
import planks20 from "../Pages/Assets/Gallery/LVT/planks20.png";
import Planks21 from "../Pages/Assets/Gallery/LVT/Planks21.png";
import Planks22 from "../Pages/Assets/Gallery/LVT/Planks22.png";
import Planks23 from "../Pages/Assets/Gallery/LVT/Planks23.png";
import Planks24 from "../Pages/Assets/Gallery/LVT/Planks24.png";
import planks25 from "../Pages/Assets/Gallery/LVT/planks25.png";
import Planks26 from "../Pages/Assets/Gallery/LVT/Planks26.png";
import Planks27 from "../Pages/Assets/Gallery/LVT/Planks27.png";
import Planks28 from "../Pages/Assets/Gallery/LVT/Planks28.png";
import Planks29 from "../Pages/Assets/Gallery/LVT/Planks29.png";
import Planks30 from "../Pages/Assets/Gallery/LVT/Planks30.png";
import Planks31 from "../Pages/Assets/Gallery/LVT/Planks31.png";
import Planks32 from "../Pages/Assets/Gallery/LVT/Planks32.png";
import Planks33 from "../Pages/Assets/Gallery/LVT/Planks33.png";
import Planks34 from "../Pages/Assets/Gallery/LVT/Planks34.png";
import Planks35 from "../Pages/Assets/Gallery/LVT/Planks35.png";
import Planks36 from "../Pages/Assets/Gallery/LVT/Planks36.png";
import Planks37 from "../Pages/Assets/Gallery/LVT/Planks37.png";
import Planks38 from "../Pages/Assets/Gallery/LVT/Planks38.png";
import Planks39 from "../Pages/Assets/Gallery/LVT/Planks39.png";

const gallery = [
	{
		src: Planks,
	},
	{
		src: Planks1,
	},
	{
		src: Planks2,
	},
	{
		src: Planks3,
	},
	{
		src: Planks4,
	},
	{
		src: Planks5,
	},
	{
		src: Planks6,
	},
	{
		src: Planks7,
	},
	{
		src: Planks8,
	},
	{
		src: Planks9,
	},
	{
		src: Planks10,
	},
	{
		src: Planks11,
	},
	{
		src: planks12,
	},
	{
		src: planks13,
	},
	{
		src: Planks14,
	},
	{
		src: Planks15,
	},
	{
		src: planks16,
	},
	{
		src: Planks17,
	},
	{
		src: Planks18,
	},
	{
		src: Planks19,
	},
	{
		src: planks20,
	},
	{
		src: Planks21,
	},
	{
		src: Planks22,
	},
	{
		src: Planks23,
	},
	{
		src: Planks24,
	},
	{
		src: planks25,
	},
	{
		src: Planks26,
	},
	{
		src: Planks27,
	},
	{
		src: Planks28,
	},
	{
		src: Planks29,
	},
	{
		src: Planks30,
	},
	{
		src: Planks31,
	},
	{
		src: Planks32,
	},
	{
		src: Planks33,
	},
	{
		src: Planks33,
	},
	{
		src: Planks34,
	},
	{
		src: Planks35,
	},
	{
		src: Planks36,
	},
	{
		src: Planks37,
	},
	{
		src: Planks38,
	},
	{
		src: Planks39,
	},
];

export default function LVTGallery() {
	return (
		<>
			<div className="carpet-gallery-section">
				<h2>Luxury Vinyl</h2>
				<GalleryCarousel data={gallery} />
			</div>
		</>
	);
}
