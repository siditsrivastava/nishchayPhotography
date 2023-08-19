import React , {useState} from "react";
import Head from "./Head";

const UploadVideo = () => {

  const [youtube , setYoutube] = useState({
    video :""
  })

  let name , value;
  const handleInput = (e) => {
  
    name = e.target.name;
    value = e.target.value;
    setYoutube({...youtube , [name] : value});
  }
  const onSubmit = async (e) => {
      e.preventDefault();

      const {video} = youtube;
      try{
        if(!video){
          alert("Please Provide the Video Link");
        }else {
          const res = await fetch("/videoupload" , {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              video
            })
          })
          const videoData = res.json(res);
          if(!videoData){
            alert("Invalid data");
          }else {
              alert("You are Successfully Submit the video Link")
              setYoutube({
                video:""
              })
          }
        }
      }
      catch(err) {
        console.log(err);
      }
  }

  return (
    <>
    <Head/>
    <br></br>
      <div className="image-upload-section container">  
        <h5>Upload the youtube Video Link !</h5>
        <div className="uploading-section">
          <input
            tyep="text"
            placeholder="Youtube video Link"
            name="video"
            onChange={handleInput}
            value={youtube.video}
          />
        </div>
        <br></br>
        <button className="btn bg-success" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default UploadVideo;
