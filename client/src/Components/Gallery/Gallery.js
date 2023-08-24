import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loading from "../Loading/Loading";

const Gallery = () => {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [data , setData] = useState(galleryPhotos);
  const [loading , setLoading] = useState(false);
  const [show , setShow ] = useState(false)
  const [error , setError ] = useState("")
  const [page , setPage] = useState(1);
  useEffect(() => {
    axios
      .get("https://nishchayphotographyapi.onrender.com/getImage")
      .then((res) => {
        // if(res.data.length === 0){
        //   <h1>NO DATA Found</h1>
        // }
        setLoading(true);
        const data = res.data
        setGalleryPhotos(data);

      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message);
      });
      window.addEventListener("scroll" , handelInfiniteScrolls)
      return() => window.removeEventListener("scroll" , handelInfiniteScrolls)
  }, [page]);

  const handelInfiniteScrolls = () => {
    try{
      if(window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight){
            // setLoading(false)
            setPage((prev) => prev + 1);
        }
    }catch(err){
        console.log(err)
    }
  }

  const filterItems = ((items) => {
      const updatedItem = galleryPhotos.filter((curElem) => {
      return curElem.category === items
    });
    setData(updatedItem);
  })

  return (
    <>
    <Header />
      <div className="gallery-section">
        <div className="Gallery-image-section container">
          <hr></hr>
          <h1>Gallery.</h1>
          <hr style={{backgroundColor:"#b55467"}}></hr>
        </div>
        <br></br>
        {error ? <h4 className="error" style={{"textAlign": "center"}}>{error}</h4> : 
        <>
        <div className="search-btn">
          <button className="btn" onClick={() =>setData(galleryPhotos)}>All</button>
          <button className="btn" onClick={() => [filterItems('haldi'),  setShow(true)] }>Haldi</button>
          <button className="btn" onClick={() => [filterItems('sangeet'),setShow(true)]}>Sangeet</button>
          <button className="btn" onClick={() => [filterItems('engagement'),setShow(true)]}>Engagement</button>
          <button className="btn" onClick={() =>[ filterItems('wedding') , setShow(true)]}>Wedding</button>
        </div>
        <br></br>
        <div className="image-section container">
          <div className="container">
             { loading ?  show ? data.slice(0 , `${page}`).map((items) => {
              return (
                <>
                  <img src={`https://nishchayphotographyapi.onrender.com/${items.image}`} className="gallery-img" alt="NotImageFound !!" />
                </>
             );
             }) : galleryPhotos.slice(0 , `${page}`).map((items) => {
              return (
                <>
                  <img src={`https://nishchayphotographyapi.onrender.com/${items.image}`} className="gallery-img" alt="NotImageFound !!" />
                </>
             );
             }) : <Loading/>  }
          </div>
        </div>
        </>}
        <br></br>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
