import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Homepage from "./components/Pages/Homepage/Homepage.jsx";
import About from "./components/Pages/About";
import Products from "./components/Pages/Products/Products";
import Gallery from "./components/Pages/Portfolio/Portfolio";
import Contact from "./components/Pages/Contact";
import Carpet from "./components/Pages/Products/Carpet";
import VinylTile from "./components/Pages/Products/VinylTile";
import LuxuryVinyl from "./components/Pages/Products/LuxuryVinyl";
import GymDesignerPage from './components/Pages/GymDesignerPage/GymDesignerPage';
import Services from './components//Services/Services';
import CommercialFlooring from './components/Services/CommercialFlooring';
import SportsFlooring from './components/Services/SportsFlooring';
import EpoxyServices from './components/Services/EpoxyServices';
import InstallRepair from './components/Services/InstallRepair';



export default function App() {
	return (
		<>
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
				<Route path="/services" element={<Services />} />
				<Route path="/services/commercial-flooring" element={<CommercialFlooring />} />
				<Route path="/services/sports-flooring" element={<SportsFlooring />} />
				<Route path="/services/epoxy" element={<EpoxyServices />} />
				<Route path="/services/install-repair" element={<InstallRepair />} />

				<Route path="/About" element={<About />} />
				<Route path="/Gallery" element={<Gallery />} />
				<Route path="/Contact" element={<Contact />} />
				<Route path="/gym-designer" element={<GymDesignerPage />} />
			</Routes>
		</BrowserRouter>
		</>
	);
}
