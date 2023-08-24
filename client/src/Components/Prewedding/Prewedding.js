import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Prewedding.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loading from "../Loading/Loading";

const Prewedding = () => {
  const [preweddingImage, setpreweddingImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(5);
  useEffect(() => {
    axios
      .get("https://nishchayphotographyapi.onrender.com/getPreweddingPhoto")
      .then((res) => {
        const datas = res.data;
        setpreweddingImage(datas);
        setLoading(true);
      })
      .catch((err) => {
        setError(err.message);
      });
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 5);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="prewedding-section">
        <div className="prewedding-image-section container">
          <hr></hr>
          <h1>PreWedding.</h1>
          <hr style={{ backgroundColor: "#b55467" }}></hr>
        </div>
        <div className="prewedding-img-section">
          <div className=" container">
            {error ? (
              <h3>{error}</h3>
            ) : loading ? (
              preweddingImage.slice(0, `${page}`).map((items) => {
                return (
                  <img
                    src={`https://nishchayphotographyapi.onrender.com/${items.image}`}
                    // src={items.image}
                    key={items._id}
                    alt="Image_Not_Found"
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <br></br>
      </div>

      <Footer />
    </>
  );
};

export default Prewedding;
