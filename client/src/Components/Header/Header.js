import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
// import logo  from '../image/logo.png'
// import logo  from '../image/logo4.png'
import logo  from '../image/logo7.jpg'

const Header = () => {
  const [showbar, setShowbar] = useState(false);

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <Link to="/">
            {/* <span>N</span>ishchay
            <span>P</span>hotography */}
            <img src={logo} className="logo" alt="logo"/>
            </Link>           
          </h2>
        </div>
        <div className={showbar ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <li className="">
              <Link to="/" className="navbar-icon" style={{"color":"white"}}>Home</Link>
            </li>
            <li>
              <Link to="/gallery" style={{"color":"white"}}>Gallery</Link>
            </li>
            <li>
              <Link to="/video" style={{"color":"white"}}>Video</Link>
            </li>
            <li>
              <Link to="/PreWedding" style={{"color":"white"}}>PreWedding</Link>
            </li>
            <li>
              <Link to="/faq" style={{"color":"white"}}>Faq</Link>
            </li>
            <li>
              <Link to="/contactUs" style={{"color":"white"}}>contactUS</Link>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <div className="hamburger-menu">
            <button
              className="btn"
              href="#"
              onClick={() => setShowbar(!showbar)}
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
