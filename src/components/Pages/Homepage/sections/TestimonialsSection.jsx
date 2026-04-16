import React, { useState } from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      text: 'Grateful to the team for completing this project. Everyone involved has been responsive, professional, and went above and beyond to ensure satisfaction. We look forward to partnering on future projects together.',
      author: 'Facilities Director'
    },
    {
      text: 'The team was exceptionally professional and supportive. When we unexpectedly needed to expedite the job for an important event, they delivered outstanding work within a tight timeframe. Our sales representative was pleasant, accessible, and demonstrated exceptional knowledge throughout the entire process.',
      author: 'Operations Manager'
    },
    {
      text: 'Previously I worked with Parsons to restore our gym floor and they exceeded expectations. This time, even during challenging circumstances, they were exceptionally professional in every aspect. The quality of work has been outstanding. I highly recommend them to anyone.',
      author: 'School Administrator'
    },
    {
      text: 'Parsons is among the most professional and dependable companies I have had the privilege to partner with.',
      author: 'Project Manager'
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-label">HEAR FROM OUR CUSTOMERS</div>
          <h2>Testimonials</h2>
        </div>
        <div className="testimonials-slider">
          <div className="testimonial-content">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-item ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-author">— {testimonial.author}</p>
              </div>
            ))}
          </div>
          
          <div className="testimonial-controls">
            <button 
              className="testimonial-arrow prev" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="testimonial-arrow next" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
