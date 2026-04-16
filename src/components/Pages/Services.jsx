import React from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";
import OurServices from "../Services/Services";
import CommercialFlooring from "../CommercialFlooring/CommercialFlooring";
import SportsFlooring from "../SportsFlooring/SportsFlooring";
import EpoxyServices from "../EpoxyServices/EpoxyServices";
import InstallRepair from "../InstallRepair/InstallRepair";	
import '../Services/Services.css';

export default function ServicesPage() {
	return (
		<div>
			<HeaderBar />
			<OurServices />
			<CommercialFlooring />
			<SportsFlooring />
			<EpoxyServices />
			<InstallRepair />
			<Footer />
		</div>
	);
}






