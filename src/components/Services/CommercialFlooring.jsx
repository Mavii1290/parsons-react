import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceDetail.css';

import HeaderBar from '../HeaderBar/HeaderBar';
import Footer from '../Footer/Footer';

import commercialDetail from '../Pages/Assets/Services/commercial-detail.png';

const CommercialFlooring = () => {
  return (
    <div className="service-detail-page">
      <HeaderBar />
      <section className="detail-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Commercial Flooring Services</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="detail-content">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <h2>Comprehensive Commercial Flooring Solutions</h2>
              
              <p>
                Parsons Flooring's expert technicians transform design concepts into reality 
                through custom collaborative projects and exceptional installations. We've 
                established partnerships with industry-leading manufacturers to provide an 
                extensive selection of commercial flooring solutions. From resilient surfaces 
                to textile coverings, we handle every aspect of your flooring needs.
              </p>

              <div className="feature-image">
                <img 
                  src={commercialDetail} 
                  alt="Commercial flooring installation process" 
                />
              </div>

              <h3>Why Choose Parsons for Commercial Flooring</h3>
              
              <p>
                As the leading comprehensive commercial flooring provider in the New York 
                metropolitan area, Parsons has built a solid track record for outstanding 
                quality, forward-thinking approaches, and budget-conscious service delivery. 
                Our seasoned and well-informed team has positioned Parsons as a preferred 
                collaborator for architects, designers, and construction professionals.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <h4>Expert Installation</h4>
                  <p>
                    Our certified installers bring decades of combined experience to every 
                    project, ensuring precision and quality workmanship.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Extensive Product Range</h4>
                  <p>
                    From luxury vinyl tile to carpet tile, hardwood to laminate, we offer 
                    solutions for every commercial application.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Project Management</h4>
                  <p>
                    We coordinate every phase from initial consultation through final 
                    walkthrough, keeping your project on schedule and within budget.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Quality Assurance</h4>
                  <p>
                    Rigorous quality control at every stage ensures installations that 
                    meet or exceed industry standards.
                  </p>
                </div>
              </div>

              <h3>Our Commercial Flooring Products</h3>
              
              <ul className="product-list">
                <li>Luxury Vinyl Tile (LVT) and Luxury Vinyl Plank (LVP)</li>
                <li>Commercial Carpet Tile and Broadloom</li>
                <li>Sheet Vinyl and Resilient Flooring</li>
                <li>Hardwood and Engineered Wood</li>
                <li>Laminate Flooring Solutions</li>
                <li>Rubber Flooring for High-Traffic Areas</li>
                <li>Polished Concrete Systems</li>
              </ul>

              <div className="cta-box">
                <h3>Ready to Start Your Commercial Flooring Project?</h3>
                <p>
                  We're devoted to surpassing your expectations and remain dedicated to 
                  fulfilling your commercial flooring requirements with excellence and honesty.
                </p>
                <Link to="/contact" className="cta-button">
                  Get a Free Consultation
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3>Our Services</h3>
                <ul className="services-menu">
                  <li className="active">
                    <Link to="/services/commercial-flooring">Commercial Flooring</Link>
                  </li>
                  <li>
                    <Link to="/services/sports-flooring">Sports Flooring</Link>
                  </li>
                  <li>
                    <Link to="/services/epoxy">Epoxy Services</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h3>Need Help?</h3>
                <p>Our flooring specialists are ready to answer your questions.</p>
                <a href="tel:516-484-2323" className="phone-link">
                  (516)484-2323
                </a>
                <Link to="/contact" className="contact-button">
                  Contact Us
                </Link>
              </div>

                <div className="sidebar-card">
                <h3>Featured Projects</h3>
                <div className="project-preview">
                  <img src="/images/project-1.jpg" alt="High school gymnasium" />
                  <p>Regional High School Gymnasium</p>
                </div>
                <div className="project-preview">
                  <img src="/images/project-2.jpg" alt="University sports center" />
                  <p>University Athletics Complex</p>
                </div>
                <Link to="/gallery" className="view-all-link">
                  View All Projects →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CommercialFlooring;
