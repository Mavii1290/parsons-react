import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceDetail.css';


import HeaderBar from '../HeaderBar/HeaderBar';
import Footer from '../Footer/Footer';

import sportsDetail from '../Pages/Assets/Services/sports-detail.jpg';

const SportsFlooring = () => {
  return (
    <div className="service-detail-page">
      <HeaderBar />
      <section className="detail-hero sports-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Sports Flooring Services</h1>
          </div>
        </div>
      </section>

      <section className="detail-content">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <h2>Performance Athletic Flooring Solutions</h2>
              
              <p>
                Our athletic surface specialists energize teams with our unique and bold 
                designs while building trust through the strength and longevity of our 
                installations. Whether you're outfitting a gymnasium, fitness center, 
                training facility, or multi-purpose sports complex, Parsons delivers 
                performance surfaces that meet the demands of competitive athletics.
              </p>

              <div className="feature-image">
                <img 
                  src={sportsDetail}
                  alt="Professional sports flooring installation" 
                />
              </div>

              <h3>Athletic Performance and Safety</h3>
              
              <p>
                Every athletic floor we install is engineered for optimal performance, 
                providing the perfect balance of shock absorption, ball response, and 
                traction. Our installations meet or exceed standards set by governing 
                bodies for competitive sports while ensuring player safety remains the 
                top priority.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <h4>Custom Court Designs</h4>
                  <p>
                    From school colors to intricate logos, our design team creates 
                    eye-catching courts that inspire team pride and energize athletes.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Professional Installation</h4>
                  <p>
                    Our certified sports flooring installers follow manufacturer 
                    specifications precisely to ensure warranty compliance and optimal 
                    performance.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Maintenance Programs</h4>
                  <p>
                    Protect your investment with our comprehensive maintenance services 
                    including screening, recoating, and full refinishing.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Multi-Sport Versatility</h4>
                  <p>
                    Our floors accommodate multiple sports and activities with game line 
                    systems that keep facilities flexible and functional.
                  </p>
                </div>
              </div>

              <h3>Sports Flooring Systems We Install</h3>
              
              <ul className="product-list">
                <li>Hardwood Maple Athletic Flooring</li>
                <li>Synthetic Sports Surfaces</li>
                <li>Rubber Athletic Flooring</li>
                <li>Multi-Purpose Gymnasium Floors</li>
                <li>Weight Room and Fitness Center Surfaces</li>
                <li>Indoor Track Systems</li>
                <li>Performance Court Game Lines and Graphics</li>
                <li>Playground Turf</li>
              </ul>

              <div className="stats-section">
                <h3>Performance You Can Measure</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Athletic Facilities Completed</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">Years of Sports Flooring Expertise</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Safety Standards Compliance</div>
                  </div>
                </div>
              </div>

              <div className="cta-box">
                <h3>Transform Your Athletic Facility</h3>
                <p>
                  Let our sports flooring experts help you create a performance surface 
                  that inspires athletes and stands the test of time.
                </p>
                <Link to="/contact" className="cta-button">
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            <aside className="sidebar">
              <div className="sidebar-card">
                <h3>Our Services</h3>
                <ul className="services-menu">
                  <li>
                    <Link to="/services/commercial-flooring">Commercial Flooring</Link>
                  </li>
                  <li className="active">
                    <Link to="/services/sports-flooring">Sports Flooring</Link>
                  </li>
                  <li>
                    <Link to="/services/epoxy">Epoxy Services</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h3>Need Help?</h3>
                <p>Our sports flooring specialists are ready to answer your questions.</p>
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

export default SportsFlooring;
