import React, { useState } from 'react';
import './WhoParsonsSection.css';

const WhoParsonsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Fire Department Terrazzo Installation',
      description: 'Terrazzo stair treads and landing slabs provide an excellent solution for high foot traffic stairwells. Custom fabricated from the factory specifically for this Fire House, our expert installation team worked collaboratively to install each heavy-duty tread precisely and safely.',
      image: '../../Assets/Homepage/slideshow-1.jpg'
    },
    {
      title: 'University Recreation Center',
      description: 'A comprehensive renovation bringing new high-performance athletic flooring to this major campus recreation facility. With thousands of daily users, we delivered durable, professional-grade surfaces that enhance the athletic experience while meeting the demands of heavy institutional use.',
      image: '../../Assets/Homepage/slideshow-2.jpg'
    },
    {
      title: 'ProCoat by Parsons Flooring',
      description: 'Parsons Flooring transformed this dental facility by removing outdated sheet vinyl and installing a brand new decorative flake epoxy flooring system with vinyl cove base throughout the cafeteria and dining areas, creating a durable and attractive finish.',
      image: '../../Assets/Homepage/slideshow-3.jpg'
    },
    {
      title: 'Custom Sports Flooring Graphics',
      description: 'Parsons Flooring professionals enhance sports flooring spaces with engaging custom designs and precise application that boost team spirit while creating an impactful experience for fans and athletes alike.',
      image: '../../Assets/Homepage/slideshow-4.jpg'
    },
    {
      title: 'Senior Living Community',
      description: 'LVT and broadloom carpet were professionally installed throughout this senior living facility. The lobby, living spaces, community rooms, game rooms, kitchens, and activity areas all showcase multiple luxurious designs, textures and colors.',
      image: '../../Assets/Homepage/slideshow-5.jpg'
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="who-parsons-section">
      <div className="who-parsons-container">
        <div className="slideshow-wrapper">
          <div className="slideshow-content">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === activeSlide ? 'active' : ''}`}
              >
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <div className="slide-text">
                  {index === 2 && <div className="slide-label">Who is Parsons?</div>}
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="slide-arrow prev" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>
          <button className="slide-arrow next" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>

          {/* Dots Navigation */}
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoParsonsSection;
