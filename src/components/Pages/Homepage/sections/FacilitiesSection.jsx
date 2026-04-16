import React from 'react';
import './FacilitiesSection.css';

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: '🏥',
      title: 'Healthcare Facilities',
      description: 'We recognize the specialized requirements of healthcare environments and deliver advanced flooring solutions that satisfy the demands of sterile and sanitary settings including hospitals, medical centers and offices, laboratories, urgent care facilities, and senior living communities.'
    },
    {
      icon: '📚',
      title: 'Libraries',
      description: 'Fostering community connections in enriched learning environments, we install comprehensive flooring options that enhance experiential learning and welcome people of all educational backgrounds to gather in one welcoming space.'
    },
    {
      icon: '🎓',
      title: 'Educational Facilities',
      description: 'We elevate the learning environment from elementary through higher education with our decades of committed service in schools and educational centers. Our premium floor covering installations feature eye-catching designs and patterns using materials that are long-lasting and simple to maintain.'
    },
    {
      icon: '🏛️',
      title: 'Towns and Villages',
      description: 'We assist in identifying the optimal floor covering solutions for distinctive needs in municipal buildings. Delivering the highest standards of quality, service, value, design, and maintenance ease, we are the most reliable installers in the flooring sector.'
    },
    {
      icon: '🚒',
      title: 'Fire and Police Departments',
      description: 'We deliver flooring installations for administrative or social areas and high-impact zones that are slip-resistant, durable, and easy to maintain like apparatus bays and hygienic floors in locker rooms and shower facilities.'
    },
    {
      icon: '🏀',
      title: 'Gymnasium Flooring',
      description: 'Hardwood sports flooring systems offer exceptional durability and are engineered to provide outstanding biomechanical response for superior athletic performance. The exclusive sports surfaces that surpass industry standards by delivering strength, stability, resilience and comfort during competition.'
    },
    {
      icon: '💪',
      title: 'Fitness / Activity Flooring',
      description: 'High-performance flooring systems that are slip-resistant, sound and shock absorbent while being extremely durable and mitigate impact for moderate to extreme weight drop. Practical modular tiles or traditional rubber rolls establish a benchmark for lasting performance, quality, and durability.'
    },
    {
      icon: '🏢',
      title: 'Government Facilities',
      description: 'We maintain GSA contract status and deliver material and installation services to government facilities throughout the United States.'
    }
  ];

  return (
    <section className="facilities-section">
      <div className="facilities-container">
        <div className="facilities-header">
          <div className="facilities-label">FACILITIES WE SERVICE</div>
          <h2>Segments</h2>
        </div>
        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div key={index} className="facility-card">
              <div className="facility-icon">{facility.icon}</div>
              <h3>{facility.title}</h3>
              <p>{facility.description}</p>
            </div>
          ))}
        </div>
        <div className="facilities-cta">
          <a href="/gallery" className="view-work-btn">VIEW OUR WORK</a>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
