import React, { useState, useEffect } from "react";
import "./Video.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loader from "../Loader/Loader";

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    axios
      .get("https://nishchayphotographyapi.onrender.com/videofetching")
      .then((res) => {
        setLoading(true);
        setVideoData(res.data);
      })
      .then((err) => {
        console.log(err);
      });

    window.addEventListener("scroll", handelScrolling);
    return () => window.removeEventListener("scroll", handelScrolling);
  }, [page]);

  const handelScrolling = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="video-section">
        <div className="video-title-section container">
          <hr></hr>
          <h1>My Video.</h1>
          <hr style={{backgroundColor:"#b55467"}}></hr>
        </div>
        <div className="youtube-viedo-section container">
          <div className="video-card">
            {loading ? (
              videoData.slice(0, `${page}`).map((items) => {
                return (
                  <>
                    <iframe src={items.video} title="youtube" />
                  </>
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <br></br>
      </div>
      <Footer />
    </>
  );
};

export default Video;
