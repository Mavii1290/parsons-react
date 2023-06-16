import React from "react";

import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";
import CarpetGallery from "../GalleryCarousel/CarpetGallery";
import LVTGallery from "../GalleryCarousel/LVTGallery";
import VCTGallery from "../GalleryCarousel/VCTGallery";

export default function Gallery() {
	return (
		<div>
			<HeaderBar />
			<CarpetGallery />
			<LVTGallery />
			<VCTGallery />
			<Footer />
		</div>
	);
}
