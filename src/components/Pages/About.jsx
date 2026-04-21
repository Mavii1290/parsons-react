import React from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import LogoCarousel from "../Logo-Carousel/LogoCarousel";
import Footer from "../Footer/Footer";

import "./styles.css";
import VCTExample from "./Assets/VCTExample.jpg.png";
import showroom from "./Assets/showroom.png";

export default function About() {
	return (
		<>
			<HeaderBar />
			<div className="hero-section-about">
				<div className="hero-overlay-about"></div>
				<div className="hero-content-about">
					<h1>About Parsons Floors</h1>
				</div>
			</div>

			<div className="page-intro">
				<div className="page-intro-container">
					<div className="page-intro-img">
						<img src={showroom} alt="" />
					</div>
					<div className="page-intro-content">
						<h2>Our History</h2>
						<p>
							Parsons Floors has been enhancing the visual appeal of countless
							buildings in New York for over 25 years. With our extensive
							expertise in installing, repairing, designing, and maintaining a
							wide range of flooring options, we have transformed spaces with
							everything from elegant design carpets to custom wood flooring,
							and much more. Our comprehensive services cater to diverse
							flooring needs, ensuring that each project receives the utmost
							attention and craftsmanship.
						</p>
						<p>
							Our unwavering commitment lies in achieving customer satisfaction.
							To fulfill this goal, we prioritize equipping our installers with
							up-to-date knowledge of the latest flooring techniques and
							providing them access to state-of-the-art equipment. By staying at
							the forefront of the industry, we guarantee that our team delivers
							exceptional results that exceed your expectations.
						</p>
					</div>
				</div>
			</div>
			<div className="about-content">
				<h3>Our Mission</h3>
				<p>
					At Parson's Floors, our objective is to deliver exceptional service
					through our well-informed sales team and skilled mechanics. We are
					committed to surpassing your expectations with our top-notch products,
					expert craftsmanship, and competitive pricing. Our aim is to establish
					a long-term relationship that extends beyond your immediate flooring
					needs, ensuring your utmost satisfaction.
				</p>
				<p>
					With over 25 years of experience, Parsons Floors specializes in the
					design and installation of various flooring types. Our dedicated team
					comprises dynamic designers and knowledgeable sales staff who are
					ready to assist you in selecting, installing, and maintaining a wide
					range of flooring options, from basic ceramics to custom-designed
					carpets. Having built a strong reputation over the years, we have
					become trusted flooring experts, serving commercial clients throughout
					Long Island. Located in Garden City, New York, we have established a
					loyal client base in Nassau County.
				</p>
				<p>
					Our extensive collection includes designer carpets, rugs, vinyl
					flooring, and natural hardwood floors, offering a comprehensive
					selection to suit diverse preferences. To explore our services, please
					reach out to us today for a consultation. Our team will guide you
					through our flooring options and address any questions or concerns you
					may have about enhancing the floors in your home or business. You can
					contact us at (516) 484-2323. We look forward to assisting you!
				</p>
			</div>
			<LogoCarousel />
			<div className="contracts-section">
				<h3>New York State Contracts</h3>
				<p>
					Parsons works with BOTH the private sector and public entities.
					<br /> If you are a government entity and would like to know what
					contract your facility can purchase from call us for a list of
					contracts and or further information.
				</p>
				<h3>Public & Private Works</h3>
				<p>
					Any state-funded or non-profit organization can buy on the New York
					State contract (NJPA, OGS) to access competitive pre-negotiated rates.
					The current contract is very comprehensive, now including carpet,
					carpet tile, vinyl/LVT, rubber, and installation — as well as sundry
					items from adhesives to stair treads.
				</p>
				<h3>Can't buy from the State Contracts?</h3>
				<p>
					Parsons also holds many local contracts that are piggybackable by all
					public entities. Call us at (516) 484 2323. We can help answer your
					questions about floor-covering options and what contract would be your
					best option.
				</p>
			</div>
			<Footer />
		</>
	);
}
