import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaBasketballBall } from 'react-icons/fa';

import "./HeaderBar.css";
import logo from "./logo.png";

export default function HeaderBar() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [click, setClick] = React.useState(false);

  const toggleDropdown = () => {
    if (window.innerWidth > 768) {
      setDropdownOpen(!dropdownOpen);
    }
  };

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
              to="/"
            />
            Parsons Floors
          </NavLink>
          <div className="menu">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/Products"
                activeClassName="active"
                className={`nav-links ${dropdownOpen ? "dropdown-open" : ""}`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                Products
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <NavLink 
					to="/Carpet"
					activeClassName="active"
					className="products-links"><li className="nav-item">Carpet</li></NavLink>
                    <NavLink
					to="/LuxuryVinyl"
					activeClassName="active"
					className="products-links"><li className="nav-item">Luxury Vinyl</li></NavLink>
                    <NavLink
					to="/VinylTile"
					activeClassName="active"
					className="products-links"><li className="nav-item">Vinyl Composite Tile</li></NavLink>
                  </ul>
                )}
              </NavLink>
            </li>

  <li className="nav-item">
              <NavLink
                to="/Servcies"
                activeClassName="active"
                className={`nav-links ${dropdownOpen ? "dropdown-open" : ""}`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                Services
                {dropdownOpen && (
                  <ul className="dropdown-menu">
                    <NavLink 
					to="/Installation Services"
					activeClassName="active"
					className="products-links"><li className="nav-item">Installation Services</li></NavLink>
                    <NavLink
					to="/Design/Consultation"
					activeClassName="active"
					className="products-links"><li className="nav-item">Design Consultation</li></NavLink>
                    <NavLink
					to="/Annual Maintenance"
					activeClassName="active"
					className="products-links"><li className="nav-item">Annual Maintenance</li></NavLink>
           <NavLink
					to="/Repair & Replacement"
					activeClassName="active"
					className="products-links"><li className="nav-item">Repair & Replacement</li></NavLink>
                  </ul>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Gallery"
                activeClassName="active"
                className="nav-links"
              >
                Inspiration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/About"
                activeClassName="active"
                className="nav-links"
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Contact"
                activeClassName="active"
                className="nav-links"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/gym-designer"
                activeClassName="active"
                className="nav-links"
              >
                Gym Designer
              </NavLink>
            </li>
          </ul></div>
          <div className="mobile-header">
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <div className="address-header">
              <p className="town-header">Garden City, NY </p>
              <p className="town-header">
                <b>(516)484-2323</b>
              </p>
            </div>
          </div> </nav>
        </div>
     
  );
}
