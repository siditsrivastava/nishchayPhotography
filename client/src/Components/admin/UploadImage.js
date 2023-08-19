import React, { useState } from "react";
import axios from "axios";
// import Adminheader from "./Adminheader";
import Head from "./Head";
import './imageupload.css'

const UploadImage = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [imagecategory, setImageCategory] = useState({
    category: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setImageCategory({ ...imagecategory, [name]: value });
  };

  const handleImage = (e) => {
    setImageUpload(e.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const { category } = imagecategory;
    try {
      if (!imageUpload || !category) {
        alert("Please Provide the Iamge Correctly !! ");
      } else {
        const formData = new FormData();
        formData.append("file", imageUpload);
        formData.append("category", category);
        axios.post("/upload", formData
      
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        
          
        console.log(imageUpload);
        alert("successfully!!");
        setImageUpload("");
        setImageCategory({
          category:""
        })
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head/>
      <br></br>
      <div className="image-upload-section container">
        <h4>Upload Image</h4>
        <div className="uploading-section">
          <input type="file" name="file" onChange={handleImage} />
          <label>Category :-</label>
          <input
            type="text"
            placeholder="category"
            name="category"
            className="category_filed"
            value={imagecategory.category}
            onChange={handleInput}
          />
        </div>
        <div>
          <button className="btn bg-success" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
