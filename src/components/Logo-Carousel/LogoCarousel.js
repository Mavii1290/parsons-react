import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselItem } from "react-bootstrap";

import "./LogoCarousel.css";
import Connor from "./Connor.png";
import Gerflor from "./Gerflor.png";
import milliken from "./milliken.png";
import Mohawk from "./Mohawk.png";
import patcraft from "./patcraft.png";
import shaw from "./shaw.png";
import Tarkett from "./Tarkett.png";
import Bentley from "./Bentley.png";
import Interface from "./Interface.png";
import Mannington from "./Mannington.png";

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
					<img width="60%" src={Connor} alt="Connor" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Gerflor} alt="Gerflor" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={milliken} alt="Milliken" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Mohawk} alt="Mohawk" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={patcraft} alt="patcraft" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={shaw} alt="shaw" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Tarkett} alt="Tarkett" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Bentley} alt="Bentley" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Interface} alt="Interface" />
				</div>
				<div className="logo-carousel">
					<img width="75%" src={Mannington} alt="Mannington" />
				</div>
			</Carousel>
		</div>
	);
}

/* <Carousel cols={5} rows={1} gap={50} loop  > */
