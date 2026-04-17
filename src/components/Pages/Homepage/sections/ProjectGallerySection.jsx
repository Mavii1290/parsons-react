import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectGallerySection.css';

import gallery1 from '../../Assets/Homepage/gallery-1.jpg';
import gallery2 from '../../Assets/Homepage/gallery-2.jpg';
import gallery3 from '../../Assets/Homepage/gallery-3.jpg';
import gallery4 from '../../Assets/Homepage/gallery-4.jpg';
import gallery5 from '../../Assets/Homepage/gallery-5.jpg';

const ProjectGallerySection = () => {
  const projects = [
    {
      title: 'Senior Living Facility',
      category: 'Senior Living',
      image: {gallery1},
      link: '/gallery/senior-living'
    },
    {
      title: 'Commercial Epoxy Installation',
      category: 'Epoxy Services',
      image: {gallery2},
      link: '/gallery/epoxy-commercial'
    },
    {
      title: 'University Recreation Center',
      category: 'Higher Education',
      image: {gallery3},
      link: '/gallery/university'
    },
    {
      title: 'High School Athletic Flooring',
      category: 'K-12 Education',
      image: {gallery4},
      link: '/gallery/high-school'
    },
    {
      title: 'Municipal Building Renovation',
      category: 'Government',
      image: {gallery5},
      link: '/gallery/municipal'
    }
  ];

  return (
    <section className="project-gallery-section">
      <div className="project-gallery-container">
        <div className="project-gallery-header">
          <div className="project-gallery-label">OUR WORK</div>
          <h2>Project Gallery</h2>
        </div>
        <div className="gallery-grid">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              to={project.link} 
              className="gallery-card"
            >
              <div className="gallery-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="gallery-overlay">
                  <span className="gallery-category">{project.category}</span>
                  <h3 className="gallery-title">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="gallery-cta">
          <Link to="/gallery" className="all-projects-btn">ALL PROJECTS</Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallerySection;
