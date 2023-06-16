import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./GalleryCarousel.css";

export default function GalleryCarousel({ data }) {
	return (
		<div className="gallery-container">
			<Carousel
				arrows={true}
				autoPlay
				autoPlaySpeed={3000}
				centerMode={false}
				containerClass="container-with-dots"
				dotListClass="react-multi-carousel-dot-list"
				draggable
				emulateTouch={true}
				focusOnSelect={true}
				infiniteLoop={true}
				showArrows={true}
				swipeable={true}
				margin=" auto 0"
				showStatus={false}
			>
				{/* <Carousel
				additionalTransfrom={-60 * 5}
				centerMode={true}
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
						items: 50,
						partialVisibilityGutter: 40,
					},
					tablet: {
						breakpoint: {
							max: 1024,
							min: 464,
						},
						items: 50,
						partialVisibilityGutter: 40,
					},
					mobile: {
						breakpoint: {
							max: 464,
							min: 0,
						},
						items: 50,
						partialVisibilityGutter: 40,
					},
				}}

			
			></Carousel> */}
				{data.map(({ src }) => (
					<div key={src} className="carousel-element">
						<img src={src} alt="Gallery" />
					</div>
				))}
			</Carousel>
		</div>
	);
}
