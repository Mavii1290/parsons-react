import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceDetail.css';

import HeaderBar from '../HeaderBar/HeaderBar';
import Footer from '../Footer/Footer';

import epoxyDetail from '../Pages/Assets/Services/epoxy-details-1.png';

const EpoxyServices = () => {
  return (
    <div className="service-detail-page">
      <HeaderBar />
      <section className="detail-hero epoxy-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Epoxy Services</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="detail-content">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <h2>Advanced Epoxy Coating Systems</h2>
              
              <p>
                ProCoat by Parsons Flooring focuses on advanced coating technologies. 
                Epoxy flooring ranks among the most resilient flooring options available, 
                offering extended service life. Our high-performance coating systems 
                provide unmatched durability for industrial, commercial, and institutional 
                environments.
              </p>

              <div className="feature-image">
                <img 
                  src={epoxyDetail} 
                  alt="Professional epoxy flooring installation" 
                />
              </div>

              <h3>Superior Protection and Performance</h3>
              
              <p>
                Epoxy delivers outstanding protection with superior resistance to wear and 
                chemical exposure. With an extensive range of color options, these floors 
                enable creative patterns to be integrated into the installation, resulting 
                in a premium aesthetic finish. Whether you need a simple solid color or 
                complex decorative designs, our epoxy systems deliver both beauty and 
                performance.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <h4>Extreme Durability</h4>
                  <p>
                    Our epoxy coatings withstand heavy traffic, impact, and abrasion, 
                    making them ideal for warehouses, manufacturing facilities, and 
                    high-traffic commercial spaces.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Chemical Resistance</h4>
                  <p>
                    Resistant to oils, solvents, acids, and cleaning chemicals, our 
                    epoxy floors maintain their integrity in demanding industrial 
                    environments.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Custom Aesthetics</h4>
                  <p>
                    Choose from solid colors, metallic finishes, decorative flakes, 
                    or custom logos and patterns to create exactly the look you want.
                  </p>
                </div>

                <div className="feature-item">
                  <h4>Easy Maintenance</h4>
                  <p>
                    Seamless, non-porous surfaces resist stains and are incredibly 
                    easy to clean and maintain, reducing long-term costs.
                  </p>
                </div>
              </div>

              <h3>Epoxy Coating Applications</h3>
              
              <ul className="product-list">
                <li>Industrial Manufacturing Facilities</li>
                <li>Commercial Warehouses and Distribution Centers</li>
                <li>Automotive Showrooms and Service Areas</li>
                <li>Healthcare and Laboratory Environments</li>
                <li>Food Processing and Commercial Kitchens</li>
                <li>Retail Spaces and Shopping Centers</li>
                <li>Parking Garages and Structures</li>
              </ul>

              <h3>Our Epoxy Systems</h3>
              
              <div className="systems-grid">
                <div className="system-card">
                  <h4>Solid Color Epoxy</h4>
                  <p>
                    Classic, professional appearance with exceptional durability. 
                    Perfect for commercial and light industrial applications.
                  </p>
                </div>

                <div className="system-card">
                  <h4>Decorative Flake Epoxy</h4>
                  <p>
                    Add texture and visual interest with colored vinyl flakes 
                    broadcast into the epoxy for a unique, slip-resistant finish.
                  </p>
                </div>

                <div className="system-card">
                  <h4>Metallic Epoxy</h4>
                  <p>
                    Create stunning, three-dimensional effects with metallic pigments 
                    that produce a high-end, artistic appearance.
                  </p>
                </div>

                <div className="system-card">
                  <h4>Quartz Broadcast</h4>
                  <p>
                    Maximum durability and slip resistance for heavy industrial 
                    applications and outdoor environments.
                  </p>
                </div>
              </div>

              <div className="benefits-section">
                <h3>Why Choose Epoxy Flooring?</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <div>
                      <h4>Long Lifespan</h4>
                      <p>Properly installed epoxy can last 20+ years with minimal maintenance</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <div>
                      <h4>Cost Effective</h4>
                      <p>Lower installation and maintenance costs compared to many alternatives</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <div>
                      <h4>Safety First</h4>
                      <p>Options for slip-resistant finishes to enhance workplace safety</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <div>
                      <h4>Environmentally Friendly</h4>
                      <p>Low VOC options available and sustainable long-term solution</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cta-box">
                <h3>Ready for a Durable Epoxy Floor?</h3>
                <p>
                  Let ProCoat by Parsons Flooring design and install an epoxy system 
                  that meets your performance requirements and aesthetic vision.
                </p>
                <Link to="/contact" className="cta-button">
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-card">
                <h3>Our Services</h3>
                <ul className="services-menu">
                  <li>
                    <Link to="/services/commercial-flooring">Commercial Flooring</Link>
                  </li>
                  <li>
                    <Link to="/services/sports-flooring">Sports Flooring</Link>
                  </li>
                  <li className="active">
                    <Link to="/services/epoxy">Epoxy Services</Link>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h3>Need Help?</h3>
                <p>Our epoxy coating specialists are ready to answer your questions.</p>
                <a href="tel:516-484-2323" className="phone-link">
                  (516)484-2323
                </a>
                <Link to="/contact" className="contact-button">
                  Contact Us
                </Link>
              </div>

              <div className="sidebar-card info-card">
                <h3>Color Options</h3>
                <p>
                  Choose from hundreds of standard colors or create a custom shade 
                  to match your brand or design vision.
                </p>
                <Link to="/contact" className="info-link">
                  View Color Samples →
                </Link>
              </div>

              <div className="sidebar-card">
                <h3>Installation Process</h3>
                <ol className="process-list">
                  <li>Surface Preparation</li>
                  <li>Crack Repair & Leveling</li>
                  <li>Primer Application</li>
                  <li>Base Coat Installation</li>
                  <li>Decorative Elements (if applicable)</li>
                  <li>Top Coat Sealing</li>
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EpoxyServices;
