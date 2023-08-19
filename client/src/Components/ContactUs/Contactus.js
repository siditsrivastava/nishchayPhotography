/* eslint-disable no-undef */
import React, { useState , useEffect} from "react";
import "./Contactus.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle } from "@mui/material";
// import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const Contactus = () => {
  const [userdata, setUserdata] = useState({
    userbridename: "",
    usergroomname: "",
    usernumber: "",
    useremail: "",
    userweddingdate : "",
    userweddingdetails: "",
  });

  const [error, setError] = useState("");
  const [show, setshow] = useState(true);
  const [successfullySubmit, setSuccessfullySubmit] = useState(false);
  const [successfullyReset, setSuccessfullyReset] = useState(false);
  let value, name;
  const handlerInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserdata({ ...userdata, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
   try {
    const { 
      useremail, 
      usergroomname, 
      userbridename, 
      usernumber, 
      userweddingdate,
      userweddingdetails 

    } 
      = userdata;
    if (
      !userbridename || 
      !usergroomname ||
      !useremail ||
      !usernumber ||
      !userweddingdate ||
      !userweddingdetails
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } 
    else {
      console.log(userdata);
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          userbridename,
          usergroomname,
          useremail,
          usernumber,
          userweddingdate,
          userweddingdetails,
          
        }),
      });
      const contactData = await res.json();
      if (!contactData) {
        alert("Invalid data");
      }
       else {
        setSuccessfullySubmit(true);
        setTimeout(() => {
          setSuccessfullySubmit(false);
        }, 3000);
        setUserdata({
          userbridename: "",
          usergroomname: "",
          useremail: "",
          usernumber: "",
          userweddingdate:"",
          userweddingdetails: "",
      });
      setshow(false);
      } 
    }
   }catch(err) {
      console.log(err);
   }
  };
  const onReset = (e) => {
    e.preventDefault();
    setUserdata({
      userbridename: "",
      usergroomname: "",
      useremail: "",
      usernumber: "",
      userweddingdate: "",
      userweddingdetails: "",
    });
      setSuccessfullyReset(true);
    setTimeout(() => {
      setSuccessfullyReset(false)
    }, 1000);
    
  };

  return (
    <>
      <Header />
      <div className="contact-section" >
        <div className="contact-title-section container">
          <hr></hr>
          <h1>Contact Us.</h1>
          <hr style={{backgroundColor:"#b55467"}}></hr>
        </div>
        <br></br>
        <div className="error-handler">
          <br></br>

          {error ? (
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              This is a Error alert — <strong>Please check it out Again ! You are Missing Something....</strong>
            </Alert>
          ) : null}
          {successfullySubmit ? (
            <Alert severity="success" variant="filled">
              <AlertTitle>Success !! </AlertTitle>
              Congrats !!! Email are Successfully Sent...
            </Alert>
          ) : null}
          {successfullyReset ? (
            <Alert severity="success" variant="filled">
              <AlertTitle>Success !! </AlertTitle>
              You Are Successfully Reset your Form Data...
            </Alert>
          ) : null}
        </div>
        <div className="form-section container" >
          <div className="form-contents">
            <form className="form" method="POST">
              <div className="contact-form" >
                <div className="data-form" onClick={() => setshow(true)}>
                <TextField
                  id="bridename"
                  label=" BRIDE'S NAME "
                  variant="standard"
                  fullWidth
                  className="name-input"
                  required
                  name="userbridename"
                  type="bridename"
                  value={userdata.userbridename}
                  onChange={handlerInputs}
                  autoComplete="off"
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <div className="data-form" onClick={() => setshow(true)}>
                <TextField
                  id="groomname"
                  fullWidth
                  label=" GROOM'S NAME "
                  variant="standard"
                  className="name-input"
                  required
                  name="usergroomname"
                  type="groomname"
                  value={userdata.usergroomname}
                  onChange={handlerInputs}
                  autoComplete="off"
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <div className="data-form" onClick={() => setshow(true)}>
                <TextField
                  id="email"
                  fullWidth
                  label="EMAIL "
                  variant="standard"
                  className="name-input"
                  required
                  name="useremail"
                  type="email"
                  value={userdata.useremail}
                  onChange={handlerInputs}
                  autoComplete="off"
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <div className="data-form" onClick={() => setshow(true)}>
                <TextField
                  id="number"
                  fullWidth
                  label="NUMBER "
                  type="number"
                  variant="standard"
                  className="name-input"
                  required
                  name="usernumber"
                  value={userdata.usernumber}
                  onChange={handlerInputs}
                  autoComplete="off"
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <div className="data-form">
                <TextField
                  id="weddingdate"
                  fullWidth
                  type={  show ? "" : "date"}
                  label="YOUR WEDDING  DATE "
                  variant="standard"
                  className="name-input"
                  placeholder=""
                  required
                  name="userweddingdate"
                  value={userdata.userweddingdate}
                  onChange={handlerInputs}
                  onClick={() => setshow(false)}
                  autoComplete="off"
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <div className="data-form"  onClick={() => setshow(true)}  >
                <TextField
                  id="weddingdetails"
                  fullWidth
                  label="Your Wedding details "
                  variant="standard"
                  className="name-input"
                  type="text"
                  required
                  name="userweddingdetails"
                  value={userdata.userweddingdetails}
                  onChange={handlerInputs}
                  autoComplete="off"
                  
                  InputLabelProps={{className:"nameinput"}}
                />
              </div>
              <br></br>
              </div>
              <div className="contact-form-btn">
                <button className="submit-btn btn" onClick={onSubmit}>
                  Submit
                </button>
                <button className="reset-btn btn" onClick={onReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <div className="google-map container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3688.640647215153!2d79.46309066787792!3d25.993589700337996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDU5JzM2LjkiTiA3OcKwMjcnNTMuOSJF!5e0!3m2!1sen!2sin!4v1685449318801!5m2!1sen!2sin"
            referrerpolicy="no-referrer-when-downgrade"
            title="map"
          ></iframe>
        </div>
        <br></br>
      </div>
      <Footer />
    </>
  );
};

export default Contactus;
