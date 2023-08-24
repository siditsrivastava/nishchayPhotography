import axios from 'axios';
import React, { useState } from 'react'
import Head from './Head';
import './imageupload.css'

const UploadPreweddingImg = () => {

const [userpreweddingimage , setUserPreweddingImage] = useState("")

const handleInput = (e) => {
    setUserPreweddingImage(e.target.files[0]);
}

const onSubmit = (e) => {

   e.preventDefault();
   try{
    if(!userpreweddingimage){
        alert("Please Provide the Prewedding Image")
    }else {
        const formData = new FormData();
        formData.append("image" , userpreweddingimage)
        axios.post("https://nishchayphotographyapi.onrender.com/prewedddingImgUpload" ,formData)
        .then((res) => {
         console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        alert(" Congratulation !! You are Successfully upload the Image...")
    }

   }catch(err){
    console.log(err);
   }
   
}

  return (
    <>
    <Head/>
    <br></br>
    <div className='image-upload-section container'>
            <h5>Upload PreWedding Image !</h5>
        <div className='uploading-section'>
            <input
            type="file"
            name ="prewedding"
            value={userpreweddingimage.prewedding}
            placeholder='upload the Image'
            onChange={handleInput}
            />
            </div>
            <br></br>
            <button className='btn bg-success' onClick={onSubmit}>
                Submit
            </button>
        
    </div>

    </>
  )
}

export default UploadPreweddingImg