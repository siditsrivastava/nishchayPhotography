import React , {useState} from 'react'
import { Link } from 'react-router-dom';

const Head = () => {
    const [showbar, setShowbar] = useState(false);
    return (
      <>
     <nav className="main-nav">
          <div className="logo">
            <h2>
              <Link to="/">
              <span>N</span>ishchay
              <span>P</span>hotography
              </Link>
            </h2>
          </div>
          <div className={showbar ? "menu-link mobile-menu-link" : "menu-link"}>
            <ul>
              <li>
                <Link to="/Upload/gallery">UpdateGallery</Link>
              </li>
              <li>
                <Link to="/Upload/youtube/videoLink">UpdateVideo</Link>
              </li>
              <li>
                <Link to="/Upload/prewedding">UpdatePreWedding</Link>
              </li>
              <li>
                <Link to="/Upload/Faq">UpdateFaq</Link>
              </li>
            </ul>
          </div>
          <div className="social-media">
            <div className="hamburger-menu">
              <button
                className="btn"
                href="#"
                onClick={() => setShowbar(!showbar)}>
                <i class="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </nav>
      </>
    )
}

export default Head