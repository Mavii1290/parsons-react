import React from 'react';
import { Link } from 'react-router-dom';
import './QuickShipSection.css';

import product1 from '../../Assets/Homepage/product-1.jpg';
import product2 from '../../Assets/Homepage/product-2.jpg';
import product3 from '../../Assets/Homepage/product-3.jpg';
import product4 from '../../Assets/Homepage/product-4.jpg';
import product5 from '../../Assets/Homepage/product-5.jpg';
import product6 from '../../Assets/Homepage/product-6.jpg';

const QuickShipSection = () => {
  const products = [
    {
      name: 'Cryptogram',
      image: {product1},
      link: '/products/cryptogram'
    },
    {
      name: 'Stone Collection',
      image: {product2},
      link: '/products/stone'
    },
    {
      name: 'Event Series',
      image: {product3},
      link: '/products/event-series'
    },
    {
      name: 'Mesh',
      image: {product4},
      link: '/products/mesh'
    },
    {
      name: 'Side Stripe',
      image: {product5},
      link: '/products/side-stripe'
    },
    {
      name: 'Abstract Collection',
      image: {product6},
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
