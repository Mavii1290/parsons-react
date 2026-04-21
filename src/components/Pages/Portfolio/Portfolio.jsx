import React, { useState } from "react";
import HeaderBar from "../../HeaderBar/HeaderBar";
import Footer from "../../Footer/Footer";
import ProjectGallery from "./ProjectGallery";
import { galleryProjects, videoProjects } from "./projectData";
import "./portfolio-styles.css";

export default function Portfolio() {
	const [activeTab, setActiveTab] = useState("gallery");
	const [selectedProject, setSelectedProject] = useState(null);
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [segmentFilter, setSegmentFilter] = useState("All");

	const currentProjects = activeTab === "gallery" ? galleryProjects : videoProjects;

	// Filter projects based on selected filters
	const filteredProjects = currentProjects.filter((project) => {
		const categoryMatch = categoryFilter === "All" || project.category === categoryFilter;
		const segmentMatch = segmentFilter === "All" || project.segment === segmentFilter;
		return categoryMatch && segmentMatch;
	});

	// Get unique categories and segments for filter dropdowns
	const categories = ["All", ...new Set(currentProjects.map((p) => p.category))];
	const segments = ["All", ...new Set(currentProjects.map((p) => p.segment))];

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleCloseGallery = () => {
		setSelectedProject(null);
	};

	const resetFilters = () => {
		setCategoryFilter("All");
		setSegmentFilter("All");
	};

	if (selectedProject) {
		return (
			<ProjectGallery
				project={selectedProject}
				onClose={handleCloseGallery}
				isVideo={activeTab === "videos"}
			/>
		);
	}

	return (
		<>
			<HeaderBar />
			<div className="portfolio-container">
				<div className="portfolio-header">
					<h1>Portfolio</h1>
					<p>Explore our completed projects and video showcases</p>
				</div>

				{/* Tab Navigation */}
				<div className="portfolio-tabs">
					<button
						className={`tab-button ${activeTab === "gallery" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("gallery");
							resetFilters();
						}}
					>
						Gallery
					</button>
					<button
						className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("videos");
							resetFilters();
						}}
					>
						Videos
					</button>
				</div>

				{/* Filters Section */}
				<div className="portfolio-filters">
					<div className="filter-group">
						<label>Category</label>
						<select
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}
						>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<div className="filter-group">
						<label>Segment</label>
						<select
							value={segmentFilter}
							onChange={(e) => setSegmentFilter(e.target.value)}
						>
							{segments.map((seg) => (
								<option key={seg} value={seg}>
									{seg}
								</option>
							))}
						</select>
					</div>

					<button className="reset-filters-btn" onClick={resetFilters}>
						Reset Filters
					</button>
				</div>

				{/* Projects Grid */}
				<div className="projects-grid">
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							className="project-card"
							onClick={() => handleProjectClick(project)}
						>
							<div className="project-card-image">
								<img src={project.thumbnail} alt={project.title} />
								<div className="project-card-overlay">
									<span className="view-project">View Project</span>
								</div>
							</div>
							<div className="project-card-content">
								<div className="project-tags">
									<span className="tag category">{project.category}</span>
									<span className="tag segment">{project.segment}</span>
								</div>
								<h3>{project.title}</h3>
							</div>
						</div>
					))}
				</div>

				{filteredProjects.length === 0 && (
					<div className="no-results">
						<p>No projects found with the selected filters.</p>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}
