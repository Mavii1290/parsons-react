import React from 'react';
import './MembershipsSection.css';

const MembershipsSection = () => {
  const memberships = [
    {
      name: 'MFMA',
      logo: '../../Assets/Homepage/logos/mfma-logo.png',
      link: 'https://members.maplefloor.org/'
    },
    {
      name: 'AMFP',
      logo: '../../Assets/Homepage/logos/amfp-logo.png',
      link: 'https://amfp.info/'
    },
    {
      name: 'FCICA',
      logo: '../../Assets/Homepage/logos/fcica-logo.png',
      link: 'https://www.fcica.com/'
    },
    {
      name: 'HESGNY',
      logo: '../../Assets/Homepage/logos/hesgny-logo.png',
      link: 'https://hesgny.org/'
    },
    {
      name: 'LIBI',
      logo: '../../Assets/Homepage/logos/libi-logo.png',
      link: 'https://libi.org/'
    },
    {
      name: 'LIVCTA',
      logo: '../../Assets/Homepage/logos/livcta-logo.png',
      link: 'https://www.livcta.com/'
    },
    {
      name: 'NCLA',
      logo: '../../Assets/Homepage/logos/ncla-logo.png',
      link: 'https://ncla.info/'
    },
    {
      name: 'SFA',
      logo: '../../Assets/Homepage/logos/sfa-logo.png',
      link: 'https://nyssfa.com/'
    },
    {
      name: 'Starnet',
      logo: '../../Assets/Homepage/logos/starnet-logo.png',
      link: 'https://www.starnetflooring.com/'
    },
    {
      name: 'SCLA',
      logo: '../../Assets/Homepage/logos/scla-logo.png',
      link: 'https://scla.net/'
    }
  ];

  return (
    <section className="memberships-section">
      <div className="memberships-container">
        <div className="memberships-header">
          <h2>Memberships</h2>
        </div>
        <div className="memberships-grid">
          {memberships.map((membership, index) => (
            <a
              key={index}
              href={membership.link}
              target="_blank"
              rel="noopener noreferrer"
              className="membership-card"
              aria-label={membership.name}
            >
              <img 
                src={membership.logo} 
                alt={`${membership.name} logo`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipsSection;
