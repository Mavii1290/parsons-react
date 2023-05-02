import React from "react";
import { NavLink } from "react-bootstrap";

import "./HeaderBar.css";
import logo from "./logo.png";

export default function HeaderBar() {
	const [click, setClick] = React.useState(false);

	const handleClick = () => setClick(!click);
	const Close = () => setClick(false);

	return (
		<div>
			<div className={click ? "main-container" : ""} onClick={() => Close()} />
			<nav className="navbar" onClick={(e) => e.stopPropagation()}>
				<div className="nav-container">
					<NavLink exact to="/" className="nav-logo">				
					<img src={logo} alt="Parsons floors logo" className="nav-bar-logo" href="/" />
						Parsons Floors
						<i className="fa fa-code"></i>
					</NavLink>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<a
								href="/"
								activeclassname="active"
								className="nav-links"
								onClick={click ? handleClick : null}
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								href="/about"
								activeclassname="active"
								className="nav-links"
								onClick={click ? handleClick : null}
							>
								About
							</a>
						</li>
						<li className="nav-item">
							<a
								href="/blog"
								activeclassname="active"
								className="nav-links"
								onClick={click ? handleClick : null}
							>
								Blog
							</a>
						</li>
						<li className="nav-item">
							<a
								href="/contact.js"
								activeclassname="active"
								className="nav-links"
								onClick={click ? handleClick : null}
							>
								Contact Us
							</a>
						</li>
					</ul>
					
					<div className="nav-icon" onClick={handleClick}>
						<i className={click ? "fa fa-times" : "fa fa-bars"}></i>
					</div>
				</div>
			</nav>
		</div>
	);
}
