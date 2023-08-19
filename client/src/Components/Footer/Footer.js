import React from "react";
import "./Footer.css";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <>
    
      <div className="footer-section">
        <div className="socialmedia-links">
          <Link to="https://instagram.com/nishchaysrivastavaphotography?igshid=MzRlODBiNWFlZA==" target="_blank"><i className="fa-brands fa-instagram"></i></Link>
          <Link to="https://www.youtube.com/@NishchaySrivastavaPhotography" target="_blank"><i className="fa-brands fa-youtube"></i></Link>
          <Link to="https://www.facebook.com/nishchaysrivastavaphotography?mibextid=ZbWKwL" target="_blank"><i className="fa-brands fa-facebook"></i></Link>
        </div>
        <p className="copy-right">The Nishchay Srivastava Photography @ 2023</p>
        <br></br>
      </div>
    </>
  );
};

export default Footer;
