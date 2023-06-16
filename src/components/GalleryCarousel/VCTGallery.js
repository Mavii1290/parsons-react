import React from "react";

import GalleryCarousel from "./GalleryCarousel";

import vct from "../Pages/Assets/Gallery/VCT/vct.png";
import vct1 from "../Pages/Assets/Gallery/VCT/vct1.png";
import vct2 from "../Pages/Assets/Gallery/VCT/vct2.png";
import vct3 from "../Pages/Assets/Gallery/VCT/vct3.png";
import vct4 from "../Pages/Assets/Gallery/VCT/vct4.png";
import Vct5 from "../Pages/Assets/Gallery/VCT/Vct5.png";
import vct6 from "../Pages/Assets/Gallery/VCT/vct6.png";
import Vct7 from "../Pages/Assets/Gallery/VCT/Vct7.png";
import vct8 from "../Pages/Assets/Gallery/VCT/vct8.png";
import Vct9 from "../Pages/Assets/Gallery/VCT/Vct9.png";
import Vct10 from "../Pages/Assets/Gallery/VCT/Vct10.png";
import vct11 from "../Pages/Assets/Gallery/VCT/vct11.png";
import vct12 from "../Pages/Assets/Gallery/VCT/vct12.png";
import Vct13 from "../Pages/Assets/Gallery/VCT/Vct13.png";
import vct14 from "../Pages/Assets/Gallery/VCT/vct14.png";
import vct15 from "../Pages/Assets/Gallery/VCT/vct15.png";
import vct16 from "../Pages/Assets/Gallery/VCT/vct16.png";
import vct17 from "../Pages/Assets/Gallery/VCT/vct17.png";

const gallery = [
	{
		src: vct,
	},
	{
		src: vct1,
	},
    {
		src: vct2,
	},
    {
		src: vct3,
	},
    {
		src: vct4,
	},
    {
		src: Vct5,
	},
    {
		src: vct6,
	},
    {
		src: Vct7,
	},
    {
		src: vct8,
	},
    {
		src: Vct9,
	},
    {
		src: Vct10,
	},
    {
		src: vct11,
	},
    {
		src: vct12,
	},
    {
		src: Vct13,
	},
    {
		src: vct14,
	},
    {
		src: vct15,
	},
    {
		src: vct16,
	},
    {
		src: vct17,
	},

];

export default function VCTGallery() {
	return (
		<div className="carpet-gallery-section">
			<h2>Vinyl Composition Tile</h2>
			<GalleryCarousel data={gallery} />
		</div>
	);
}
