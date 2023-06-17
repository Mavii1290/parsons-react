import React from "react";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";
import PhotoCards from "../../PhotoCards/PhotoCards";
import GalleryCarousel from "../../GalleryCarousel/VCTGallery";

import Adobe from "./Assets/VCT/Adobe.png";
import Almond from "./Assets/VCT/Almond.png";
import Amberlight from "./Assets/VCT/Amberlight.png";
import BlueDrop from "./Assets/VCT/BlueDrop.png";
import ButterMilk from "./Assets/VCT/ButterMilk.png";
import Cloudy from "./Assets/VCT/Cloudy.png";
import Cooper from "./Assets/VCT/Cooper.png";
import DarkGreen from "./Assets/VCT/DarkGreen.png";
import DaylightSR from "./Assets/VCT/DaylightSR.png";
import DeepPlum from "./Assets/VCT/DeepPlum.png";
import Deepwater from "./Assets/VCT/Deepwater.png";
import DesertStorm from "./Assets/VCT/DesertStorm.png";
import DoeskinBrown from "./Assets/VCT/DoeskinBrown.png";
import Dunes from "./Assets/VCT/Dunes.png";
import Earth from "./Assets/VCT/Earth.png";
import Ebony from "./Assets/VCT/Ebony.png";
import GingerSpice from "./Assets/VCT/GingerSpice.png";
import GreenGrape from "./Assets/VCT/GreenGrape.png";
import IvoryTower from "./Assets/VCT/IvoryTower.png";
import Matador from "./Assets/VCT/Matador.png";
import Meadow from "./Assets/VCT/Meadow.png";
import MilitaryTan from "./Assets/VCT/MilitaryTan.png";
import MineralWhite from "./Assets/VCT/MineralWhite.png";
import Mushroom from "./Assets/VCT/Mushroom.png";
import Palm from "./Assets/VCT/Palm.png";
import Pebble from "./Assets/VCT/Pebble.png";
import Pewter from "./Assets/VCT/Pewter.png";
import Sandstone from "./Assets/VCT/Sandstone.png";
import Seafoam from "./Assets/VCT/Seafoam.png";
import ShootingStar from "./Assets/VCT/ShootingStar.png";
import SkyVista from "./Assets/VCT/SkyVista.png";
import SolidBlack from "./Assets/VCT/SolidBlack.png";
import SolidRed from "./Assets/VCT/SolidRed.png";
import SolidWhite from "./Assets/VCT/SolidWhite.png";
import StarryNight from "./Assets/VCT/StarryNight.png";
import SteelWorks from "./Assets/VCT/SteelWorks.png";
import StoneGreyQuartz from "./Assets/VCT/StoneGreyQuartz.png";
import StoneTaupeQuartz from "./Assets/VCT/StoneTaupeQuartz.png";
import StoneWhiteQuartz from "./Assets/VCT/StoneWhiteQuartz.png";
import SunlightSR from "./Assets/VCT/SunlightSR.png";
import TrueBiege from "./Assets/VCT/TrueBiege.png";
import Turquoise from "./Assets/VCT/Turquoise.png";
import TwilightSR from "./Assets/VCT/TwilightSR.png";
import WinterStorm from "./Assets/VCT/WinterStorm.png";

import "./Products.css";

const data = [
	{ name: "Adobe", src: Adobe },
	{ name: "Almond", src: Almond },
	{ name: "Amberlight", src: Amberlight },
	{ name: "BlueDrop", src: BlueDrop },
	{ name: "Butter Milk", src: ButterMilk },
	{ name: "Cloudy", src: Cloudy },
	{ name: "Cooper", src: Cooper },
	{ name: "Dark Green", src: DarkGreen },
	{ name: "Daylight SR", src: DaylightSR },
	{ name: "Deep Plum", src: DeepPlum },
	{ name: "Desert Storm", src: DesertStorm },
	{ name: "Doeskin Brown", src: DoeskinBrown },
	{ name: "Deepwater", src: Deepwater },
	{ name: "Dunes", src: Dunes },
	{ name: "Earth", src: Earth },
	{ name: "Ebony", src: Ebony },
	{ name: "Ginger Spice", src: GingerSpice },
	{ name: "Green Grape", src: GreenGrape },
	{ name: "Ivory Tower", src: IvoryTower },
	{ name: "Matador", src: Matador },
	{ name: "Meadow", src: Meadow },
	{ name: "Military Tan", src: MilitaryTan },
	{ name: "Mineral White", src: MineralWhite },
	{ name: "Mushroom", src: Mushroom },
	{ name: "Palm", src: Palm },
	{ name: "Pebble", src: Pebble },
	{ name: "Pewter", src: Pewter },
	{ name: "Sandstone", src: Sandstone },
	{ name: "Seafoam", src: Seafoam },
	{ name: "Shooting Star", src: ShootingStar },
	{ name: "Sky Vista", src: SkyVista },
	{ name: "Solid Black", src: SolidBlack },
	{ name: "Solid Red", src: SolidRed },
	{ name: "Solid White", src: SolidWhite },
	{ name: "Starry Night", src: StarryNight },
	{ name: "Steel Works", src: SteelWorks },
	{ name: "Stone Grey Quartz", src: StoneGreyQuartz },
	{ name: "Stone Taupe Quartz", src: StoneTaupeQuartz },
	{ name: "Stone White Quartz", src: StoneWhiteQuartz },
	{ name: "Sunlight SR", src: SunlightSR },
	{ name: "True Biege", src: TrueBiege },
	{ name: "Turquoise", src: Turquoise },
	{ name: "Twilight SR", src: TwilightSR },
	{ name: "Winter Storm", src: WinterStorm },
];

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
			<div className="product-container">
				<PhotoCards data={data} />
			</div>
			<GalleryCarousel />
			<Footer />
		</>
	);
}
