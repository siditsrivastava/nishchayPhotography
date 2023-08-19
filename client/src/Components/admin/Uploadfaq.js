import React, { useState } from "react";
import Head from "./Head";
import './imageupload.css'

const Uploadfaq = () => {
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFaq({ ...faq, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { question, answer } = faq;
    try {
      if (!question || !answer) {
        console.log("Please Provide the Question and Answer !!");
      } else {
        console.log(faq);
        const res = await fetch("/faq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            answer,
          }),
        });
        const faqData = await res.json(res);
        if (!faqData) {
          alert("Invalid data");
        } else {
          alert("hello");
          setFaq({
            question: "",
            answer: "",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Head/>
    <br></br>
      <div className="faq-upload-section container">
        <h4> Upload Question and Answer !! </h4>
        <div className="uploading-section">
          <h5>Question :- </h5>
          <input
            type="text"
            onChange={handleInput}
            name="question"
            value={faq.question}
          />
          <h5>Answer :- </h5>
          <input
            type="text"
            onChange={handleInput}
            name="answer"
            value={faq.answer}
          />
          </div>
          <br></br>
          <div>
            <button className="btn bg-success" onClick={onSubmit}>
              Submit
            </button>
            <br></br>
          </div>   
      </div>
      <br></br>
    </>
  );
};

export default Uploadfaq;
