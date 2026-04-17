import React from 'react';
import './MissionSection.css';

import missionTeam from '../../Assets/Homepage/mission-team.png';

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-label">Get to know us</div>
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              We recognize the expertise and quality craftsmanship our clients seek when they partner with us. 
              Through unwavering commitment to industry best practices, we strive to surpass the distinguished 
              reputation for dependable commercial flooring solutions that our customers have valued for decades. 
              Years of hands-on experience combined with steadfast dedication to our profession fuel our resolve 
              to uphold the industry's highest standards.
            </p>
            <p>
              Delivering superior workmanship and exceptional service, we are committed to maximizing value 
              every single day. We view each team member as an essential contributor, all working together 
              to achieve continued growth and sustained excellence in everything we do.
            </p>
          </div>
          <div className="mission-image">
            <img src={missionTeam} alt="Parsons Flooring team at work" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
