import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";

import HeaderBar from "../../HeaderBar/HeaderBar";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../Footer/Footer";
import LogoCarousel from "../../Logo-Carousel/LogoCarousel";
import PhotoCards from "../../PhotoCards/PhotoCards";

import carpet from "../Assets/carpet.png";
import herringbone from "../Assets/herringbone.png";
import kitchen from "../Assets/kitchen.png";
import homepageDropback from "./homepageDropback.png";
import homepageDropbackMobile from "./homepageDropbackMobile.png";
import WoodInstall from "../Assets/WoodInstall.png";
import carpetInstall from "../Assets/carpetInstall.png";
import womenCarpet1 from "../Assets/womanCarpet1.png";
import carpetExample from "../Assets/carpetExample.png";
import TarkettLVT from "../Assets/TarkettLVT.png";
import TarkettVCT from "../Assets/TarkettVCT.png";

const data = [
	{
		name: "Carpet",
		src: carpetExample,
		path: "Carpet",
	},
	{
		name: "Luxury Vinyl",
		src: TarkettLVT,
		path: "LuxuryVinyl",
	},
	{
		name: "Vinyl Composition Tile",
		src: TarkettVCT,
		path: "VinylTile",
	},
];

export default function Homepage() {
	const navigate = useNavigate();

	const handleNavigate = (e) => {
		navigate("/About");
	};
	return (
		<>
			<div className="homepage-container">
				<HeaderBar></HeaderBar>
				<Carousel>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={herringbone}
							alt="First slide"
						/>
						<Carousel.Caption className="carousel-text">
							<h3>Welcome to Parsons Floors</h3>
							<p>A Trusted Name in the Industry</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={carpet} alt="Second slide" />

						<Carousel.Caption className="carousel-text">
							<h3>Your leading experts in commercial flooring</h3>
							<p>With over 25 years of experience</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={kitchen} alt="Third slide" />

						<Carousel.Caption className="carousel-text">
							<h3>New York State Contracts</h3>
							<p>
								We work with any non-profit or state-funded organization to
								access competitive pre-negotiated rates{" "}
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<div className="homepage-intro">
					<h2>A Trusted Name in the Industry</h2>
					<p>
						For more than 25 years, Parsons Floors has been involved in the
						design and installation of various types of floors. We are equipped
						with a design department and sales office that can assist you with
						the selection, installation, and upkeep of all kinds of flooring,
						including personalized design projects.
					</p>
					<p>
						Our exclusive showroom is designed to offer you personalized
						service. We are situated in Garden City, New York, and boast a vast
						range of products to choose from. Schedule an appointment with us
						today and witness how we can transform your flooring ideas into a
						successful project!
					</p>
					<button className="about-us-btn" onClick={handleNavigate}>
						Learn More
					</button>
				</div>
				<div className="company-info-container">
					<div className="company-info-dropback">
						<img
							src={homepageDropback}
							alt="tile-n-wood-flooring"
							className="photo-overlay"
						/>
						<img
							src={homepageDropbackMobile}
							alt="tile-n-wood-flooring"
							className="photo-overlay-mobile"
						/>
					</div>
					<Container fluid className="company-info-section">
						<Row xs={1} sm={1} md={2} lg={3}>
							<Col>
								<div className="company-info">
									<img
										src={WoodInstall}
										alt=""
										className="company-info-image"
									/>
									<div className="company-info-text">
										<h4>Flooring Installers You Can Trust</h4>
										<p>
											Our in-house installers are professionally trained to meet
											and exceed your expectations.
										</p>
									</div>
								</div>
							</Col>
							<Col>
								<div className="company-info">
									<img
										src={womenCarpet1}
										alt=""
										className="company-info-image"
									/>
									<div className="company-info-text-experts">
										<h4>Creative Experts</h4>
										<p>
											Meet our design team to assist in helping you create the
											best design for your needs.
										</p>
									</div>
								</div>
							</Col>
							<Col>
								<div className="company-info">
									<img
										src={carpetInstall}
										alt=""
										className="company-info-image"
									/>
									<div className="company-info-text-cust">
										<h4>Customer Satisfaction Guaranteed</h4>
										<p>We aim to please! We stand behind our work 100%.</p>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
				<div className="manufacturers-section">
					<h4>Featured Manufacturers</h4>
					<p>
						Rest assured that when you choose our commercial flooring options
						from our exclusive collections, you can expect top-notch quality
						that will not only elevate the professional aesthetics of your space
						but also add significant value to your commercial property.
					</p>
					<LogoCarousel />
				</div>
			</div>
			<PhotoCards data={data} />

			<Footer />
		</>
	);
}
