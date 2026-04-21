import React, { useState } from "react";
import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";
import "./portfolio-styles.css";

export default function ProjectGallery({ project, onClose, isVideo }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) =>
			prev === 0 ? project.images.length - 1 : prev - 1
		);
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prev) =>
			prev === project.images.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<>
			<HeaderBar />
			<div className="project-gallery-container">
				<button className="back-button" onClick={onClose}>
					← Back to Portfolio
				</button>

				<div className="project-gallery-header">
					<div className="project-tags">
						<span className="tag category">{project.category}</span>
						<span className="tag segment">{project.segment}</span>
					</div>
					<h1>{project.title}</h1>
					<p className="project-description">{project.description}</p>
				</div>

				{isVideo ? (
					// Video Display
					<div className="video-container">
						<iframe
							src={project.videoUrl}
							title={project.title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				) : (
					// Image Gallery Display
					<>
						<div className="main-image-container">
							<button className="gallery-nav-btn prev" onClick={handlePrevImage}>
								‹
							</button>
							<img
								src={project.images[currentImageIndex]}
								alt={`${project.title} - Image ${currentImageIndex + 1}`}
								className="main-gallery-image"
							/>
							<button className="gallery-nav-btn next" onClick={handleNextImage}>
								›
							</button>
							<div className="image-counter">
								{currentImageIndex + 1} / {project.images.length}
							</div>
						</div>

						{/* Thumbnail Strip */}
						<div className="thumbnail-strip">
							{project.images.map((image, index) => (
								<div
									key={index}
									className={`thumbnail ${
										index === currentImageIndex ? "active" : ""
									}`}
									onClick={() => setCurrentImageIndex(index)}
								>
									<img src={image} alt={`Thumbnail ${index + 1}`} />
								</div>
							))}
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
}
