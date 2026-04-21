import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesCards.css';

import commercialServiceCard from '../../Assets/Services/commercial-detail.png';
import sportsServiceCard from '../../Assets/Homepage/sports-service-card.jpg';
import epoxyServiceCard from '../../Assets/Homepage/epoxy-service-card.jpg';

const ServicesCards = () => {
  const services = [
    {
      title: 'Commercial Flooring',
      image: {commercialServiceCard},
      link: '/services/commercial-flooring'
    },
    {
      title: 'Sports Flooring',
      image: {sportsServiceCard},
      link: '/services/sports-flooring'
    },
    {
      title: 'Epoxy Services',
      image: {epoxyServiceCard},
      link: '/services/epoxy'
    }
  ];

  return (
    <section className="services-cards-section">
      <div className="services-cards-container">
        <div className="services-cards-header">
          <div className="services-cards-label">Choice and style</div>
          <h2>Our Services</h2>
        </div>
        <div className="services-cards-grid">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link} 
              className="service-card-link"
            >
              <div className="service-card-image-wrapper">
                <img src={service.image} alt={service.title} />
                <div className="service-card-overlay">
                  <h3>{service.title}</h3>
                  <span className="service-card-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
