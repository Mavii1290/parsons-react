import React from 'react';
import { Link } from 'react-router-dom';
import './QuickShipSection.css';

const QuickShipSection = () => {
  const products = [
    {
      name: 'Cryptogram',
      image: '../../Assets/Homepage/product-1.jpg',
      link: '/products/cryptogram'
    },
    {
      name: 'Stone Collection',
      image: '../../Assets/Homepage/product-2.jpg',
      link: '/products/stone'
    },
    {
      name: 'Event Series',
      image: '../../Assets/Homepage/product-3.jpg',
      link: '/products/event-series'
    },
    {
      name: 'Mesh',
      image: '../../Assets/Homepage/product-4.jpg',
      link: '/products/mesh'
    },
    {
      name: 'Side Stripe',
      image: '../../Assets/Homepage/product-5.jpg',
      link: '/products/side-stripe'
    },
    {
      name: 'Abstract Collection',
      image: '../../Assets/Homepage/product-6.jpg',
      link: '/products/abstract'
    }
  ];

  return (
    <section className="quick-ship-section">
      <div className="quick-ship-container">
        <div className="quick-ship-header">
          <div className="quick-ship-label">STOCKED FOR IMMEDIATE INSTALLATION</div>
          <h2>Quick Ship Products</h2>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <Link 
              key={index} 
              to={product.link} 
              className="product-card"
            >
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <span className="product-name">{product.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="quick-ship-cta">
          <Link to="/products" className="all-products-btn">ALL PRODUCTS</Link>
        </div>
      </div>
    </section>
  );
};

export default QuickShipSection;
