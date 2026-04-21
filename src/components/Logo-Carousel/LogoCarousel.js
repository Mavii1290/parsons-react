import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./LogoCarousel.css";
import amarco from "./amarco.png";
import bona from "./bona.png";
import connor from "./connor.png";
import daltile from "./daltile.png";
import karndean from "./karndean.png";
import milliken from "./milliken.png";
import mohawk from "./mohawk.png";
import patcraft from "./patcraft.png";
import shaw from "./shaw.png";
import tarkett from "./tarkett.png";
import Interface from "./Interface.png";
import Mannington from "./Mannington.png";
import mapei from "./mapei.png";
import nuwud from "./nuwud.png";
import roppe from "./roppe.png";




export default function LogoCarousel() {
	return (
		<div className="carousel-container">
			<Carousel
				additionalTransfrom={-60 * 5}
				arrows={false}
				autoPlay
				autoPlaySpeed={3000}
				centerMode={false}
				className=""
				containerClass="container-with-dots"
				dotListClass="react-multi-carousel-dot-list"
				draggable
				focusOnSelect={true}
				infinite
				itemClass="carousel-item-padding-40-px"
				keyBoardControl
				minimumTouchDrag={80}
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024,
						},
						items: 4,
						partialVisibilityGutter: 40,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 3,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 2,
						partialVisibilityGutter: 40,
					},
				}}
				rewind={false}
				rewindWithAnimation={false}
				rtl={false}
				shouldResetAutoplay
				showDots={false}
				sliderClass=""
				slidesToSlide={2}
				swipeable
			>
				<div className="logo-carousel">
					<img width="75%" src={connor} alt="Connor" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={amarco} alt="Gerflor" />
				</div>
								<div className="logo-carousel">
					<img width="75%" src={daltile} alt="Gerflor" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={milliken} alt="Milliken" />
				</div>
								<div className="logo-carousel">
					<img width="75%" src={karndean} alt="Milliken" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={mohawk} alt="Mohawk" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={patcraft} alt="patcraft" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={shaw} alt="shaw" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={tarkett} alt="Tarkett" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={bona} alt="Bentley" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={mapei} alt="Bentley" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={nuwud} alt="Interface" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={roppe} alt="Mannington" />
				</div>
			</Carousel>
		</div>
	);
}

/* <Carousel cols={5} rows={1} gap={50} loop  > */
