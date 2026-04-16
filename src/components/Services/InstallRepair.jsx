import React from 'react';
import { Link } from 'react-router-dom';
import './InstallRepair.css';

import HeaderBar from '../HeaderBar/HeaderBar';
import Footer from '../Footer/Footer';

const InstallRepair = () => {
  return (
    <div className="services-landing-page">
    <HeaderBar />
      <section className="landing-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Complete Flooring Solutions</h1>
            <p className="hero-subtitle">
              Your partner for every stage of your flooring project—from concept to completion and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="landing-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Comprehensive Service Offerings</h2>
            <p>
              Parsons Flooring delivers end-to-end flooring solutions for athletic facilities, 
              commercial spaces, and residential projects. Whether you're planning a new construction, 
              renovating an existing space, or maintaining your current floors, our experienced team 
              provides the expertise and craftsmanship you need. From initial design consultation through 
              installation, ongoing care, and emergency repairs, we're your single-source partner for 
              all flooring requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Installation */}
      <section className="service-section installation-section">
        <div className="container">
          <div className="service-layout">
            <div className="service-text">
              <div className="service-number">01</div>
              <h2>Professional Installation Services</h2>
              <p>
                Parsons Flooring excels in the installation of indoor athletic and commercial 
                flooring systems. Our skilled technicians work with premium materials including 
                Northern Hard Maple, seamless polyurethane systems, sheet vinyl, rubber flooring, 
                and artificial turf installations.
              </p>
              <p>
                We specialize in diverse spaces such as gymnasiums, multipurpose rooms, aerobics 
                studios, dance facilities, performing arts venues, theater stages, indoor running 
                tracks, weight training areas, and fitness centers.
              </p>
              <p>
                Our expertise extends to commercial and residential applications including private 
                residences, corporate offices, condominiums, apartments, museums, and various other 
                commercial settings requiring specialized flooring solutions.
              </p>
              
              <div className="service-features">
                <h3>What Sets Our Installations Apart</h3>
                <div className="feature-grid">
                  <div className="feature-box">
                    <h4>Certified Installers</h4>
                    <p>Factory-trained professionals with industry certifications</p>
                  </div>
                  <div className="feature-box">
                    <h4>Premium Materials</h4>
                    <p>Partnerships with leading manufacturers for quality products</p>
                  </div>
                  <div className="feature-box">
                    <h4>Precision Work</h4>
                    <p>Meticulous attention to detail on every installation</p>
                  </div>
                  <div className="feature-box">
                    <h4>Timely Completion</h4>
                    <p>Projects delivered on schedule with minimal disruption</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-image">
              <img src="/images/installation-service.jpg" alt="Professional flooring installation" />
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Design & Consulting */}
      <section className="service-section design-section">
        <div className="container">
          <div className="service-layout reverse">
            <div className="service-image">
              <img src="/images/design-service.jpg" alt="Flooring design consultation" />
            </div>
            <div className="service-text">
              <div className="service-number">02</div>
              <h2>Design & Consulting Services</h2>
              <p>
                Parsons Flooring provides comprehensive support for every aspect of your project. 
                Our team evaluates your current flooring system and recommends cost-effective 
                solutions tailored to your specific needs and budget constraints.
              </p>
              <p>
                We offer complete court and game line design services, creating custom layouts 
                that optimize your space for multiple sports and activities. Our design team 
                specializes in creating distinctive custom lettering, team logos, and branding 
                elements that make your facility stand out.
              </p>
              
              <div className="service-benefits">
                <h3>Consulting Services Include</h3>
                <ul className="benefits-list">
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Existing Floor Assessment</strong>
                      <p>Thorough evaluation of current conditions and recommendations</p>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Custom Court Layouts</strong>
                      <p>Multi-sport line systems designed for maximum versatility</p>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Logo & Graphics Design</strong>
                      <p>Custom branding elements that enhance your facility's identity</p>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Budget Planning</strong>
                      <p>Value engineering to maximize quality within your budget</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Annual Maintenance */}
      <section className="service-section maintenance-section">
        <div className="container">
          <div className="service-layout">
            <div className="service-text">
              <div className="service-number">03</div>
              <h2>Annual Maintenance Programs</h2>
              <p>
                Trust Parsons Flooring to maintain the beauty and performance of your athletic 
                and commercial floors. Our maintenance services range from applying fresh finish 
                coats to complete sanding, refinishing, and re-striping of wood surfaces.
              </p>
              <p>
                For synthetic flooring systems, we provide professional deep cleaning services 
                that restore appearance and extend floor life. Save valuable time and reduce 
                long-term costs by partnering with Parsons Flooring for all your recurring 
                maintenance requirements.
              </p>
              
              <div className="maintenance-services">
                <h3>Maintenance Service Options</h3>
                <div className="services-columns">
                  <div className="services-column">
                    <h4>Wood Floor Services</h4>
                    <ul>
                      <li>Screen and recoat applications</li>
                      <li>Complete sanding and refinishing</li>
                      <li>Game line repainting and updates</li>
                      <li>Logo restoration and refresh</li>
                      <li>Surface damage repair</li>
                    </ul>
                  </div>
                  <div className="services-column">
                    <h4>Synthetic Floor Services</h4>
                    <ul>
                      <li>Professional deep cleaning</li>
                      <li>Surface restoration treatments</li>
                      <li>Protective coating applications</li>
                      <li>Seam and edge maintenance</li>
                      <li>Performance testing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="maintenance-benefits">
                <h3>Why Invest in Annual Maintenance?</h3>
                <div className="benefit-cards">
                  <div className="benefit-card">
                    <div className="benefit-icon">💰</div>
                    <h4>Cost Savings</h4>
                    <p>Prevent expensive replacements through proactive care</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">⏱️</div>
                    <h4>Extended Lifespan</h4>
                    <p>Regular maintenance can double your floor's useful life</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">🏆</div>
                    <h4>Optimal Performance</h4>
                    <p>Maintain consistent playing characteristics year after year</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">✨</div>
                    <h4>Professional Appearance</h4>
                    <p>Keep your facility looking its best at all times</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="service-image">
              <img src="/images/maintenance-service.jpg" alt="Floor maintenance and refinishing" />
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Repair & Replacement */}
      <section className="service-section repair-section">
        <div className="container">
          <div className="service-layout reverse">
            <div className="service-image">
              <img src="/images/repair-service.jpg" alt="Flooring repair services" />
            </div>
            <div className="service-text">
              <div className="service-number">04</div>
              <h2>Repair & Replacement Services</h2>
              <p>
                Damaged flooring can create safety hazards and detract from your facility's 
                appearance. Whether you're dealing with cracked or splintered boards, cuts 
                and tears in synthetic surfaces, or water damage, Parsons Flooring provides 
                expert repair solutions.
              </p>
              <p>
                From minor cosmetic fixes to major structural repairs, no challenge is too 
                small or too large for our experienced technicians. We restore your floor 
                to like-new condition, ensuring safety and longevity.
              </p>
              
              <div className="repair-types">
                <h3>Common Repair Services</h3>
                <div className="repair-grid">
                  <div className="repair-item">
                    <h4>Wood Floor Repairs</h4>
                    <ul>
                      <li>Individual board replacement</li>
                      <li>Crack and split filling</li>
                      <li>Cupping and warping correction</li>
                      <li>Water damage restoration</li>
                      <li>Finish touch-ups and blending</li>
                    </ul>
                  </div>
                  <div className="repair-item">
                    <h4>Synthetic Floor Repairs</h4>
                    <ul>
                      <li>Cut and tear patching</li>
                      <li>Seam repairs and re-sealing</li>
                      <li>Burn mark removal</li>
                      <li>Surface puncture repairs</li>
                      <li>Section replacement</li>
                    </ul>
                  </div>
                  <div className="repair-item">
                    <h4>Subfloor Services</h4>
                    <ul>
                      <li>Structural assessment</li>
                      <li>Moisture barrier installation</li>
                      <li>Leveling and flatness correction</li>
                      <li>Sleeper system repairs</li>
                      <li>Anchor replacement</li>
                    </ul>
                  </div>
                  <div className="repair-item">
                    <h4>Emergency Services</h4>
                    <ul>
                      <li>Same-day damage assessment</li>
                      <li>Rapid response repairs</li>
                      <li>Safety hazard mitigation</li>
                      <li>Temporary solutions</li>
                      <li>Insurance documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="repair-cta">
                <p className="cta-text">
                  Don't let floor damage disrupt your operations or compromise safety. 
                  Contact us today to discuss your repair needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Whether you need installation, design assistance, maintenance, or repairs, 
              Parsons Flooring has the expertise to deliver exceptional results. Let's 
              discuss your project today.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                Request a Consultation
              </Link>
              <a href="tel:555-123-4567" className="cta-button secondary">
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InstallRepair;
