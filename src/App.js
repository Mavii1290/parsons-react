import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Pages/Homepage/Homepage";
import About from "./components/Pages/About";
import Products from "./components/Pages/Products/Products";
import Services from "./components/Pages/Services";
import Gallery from "./components/Pages/Gallery";
import Contact from "./components/Pages/Contact";
import Carpet from "./components/Pages/Products/Carpet";
import VinylTile from "./components/Pages/Products/VinylTile";
import LuxuryVinyl from "./components/Pages/Products/LuxuryVinyl";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/Products" element={<Products />} />
				<Route path="/Carpet" element={<Carpet />} />
				<Route path="/LuxuryVinyl" element={<LuxuryVinyl />} />
				<Route
					path="/VinylTile"
					element={<VinylTile />}
				/>
				<Route path="/Services" element={<Services />} />
				<Route path="/About" element={<About />} />
				<Route path="/Gallery" element={<Gallery />} />
				<Route path="/Contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}
