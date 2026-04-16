import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBasketballBall } from 'react-icons/fa';   // ← not used, you can remove if not needed

import "./HeaderBar.css";
import logo from "./logo.png";

export default function HeaderBar() {
  const [click, setClick] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="nav-container">
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>

        <NavLink exact to="/" className="nav-logo">
          <img
            src={logo}
            alt="Parsons floors logo"
            className="nav-bar-logo"
          />
          Parsons Floors
        </NavLink>

        <div className="menu">
          <ul className={click ? "nav-menu active" : "nav-menu"}>

          
            {/* ==================== ABOUT US ==================== */}
            <li className="nav-item">
              <NavLink
                to="/About"
                activeClassName="active"
                className="nav-links"
              >
                About Us
              </NavLink>
            </li>

          {/* ==================== SERVICES DROPDOWN ==================== */}
            <li className="nav-item">
              <NavLink
                to="/Services"          
                activeClassName="active"
                className="nav-links"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                {servicesOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/services/commercial-flooring" className="products-links" activeClassName="active">Commercial Flooring Services</NavLink></li>
                    <li><NavLink to="/services/sports-flooring" className="products-links" activeClassName="active">Sports Flooring Services</NavLink></li>
                    <li><NavLink to="/services/epoxy" className="products-links" activeClassName="active">Epoxy Services</NavLink></li>
                    <li><NavLink to="/services/install-repair" className="products-links" activeClassName="active">Installation & Repair Services</NavLink></li>
                  </ul>
                )}
              </NavLink>
            </li>


            {/* ==================== PRODUCTS DROPDOWN ==================== */}
            <li className="nav-item">
              <NavLink
                to="/Products"
                activeClassName="active"
                className="nav-links"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                Flooring
                {productsOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/Hardwood" className="products-links" activeClassName="active">Hardwood Flooring</NavLink></li>
                    <li><NavLink to="/LuxuryVinyl" className="products-links" activeClassName="active">Luxury Vinyl Plank & Tile</NavLink></li>
                    <li><NavLink to="/Carpet" className="products-links" activeClassName="active">Carpet Flooring</NavLink></li>
                    <li><NavLink to="/VinylTile" className="products-links" activeClassName="active">Vinyl Composite Tile</NavLink></li>
                    <li><NavLink to="/Epoxy" className="products-links" activeClassName="active">Laminate Flooring</NavLink></li>
                    <li><NavLink to="/Epoxy" className="products-links" activeClassName="active">Sheet Vinyl / Resilient Flooring</NavLink></li>
                    <li><NavLink to="/Epoxy" className="products-links" activeClassName="active">Speciality / Commercial Flooring</NavLink></li>
                    <li><NavLink to="/Repair & Replacement" className="products-links" activeClassName="active">Installation & Repairs</NavLink></li>


                  </ul>
                )}
              </NavLink>
            </li>
    
            {/* Other links */}
            <li className="nav-item">
              <NavLink to="/Gallery" activeClassName="active" className="nav-links">
                Portfolio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Contact" activeClassName="active" className="nav-links">
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/gym-designer" activeClassName="active" className="nav-links">
                Gym Designer
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mobile-header">
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <div className="address-header">
            <p className="town-header">Garden City, NY</p>
            <p className="town-header"><b>(516)484-2323</b></p>
          </div>
        </div>
      </nav>
    </div>
  );
}