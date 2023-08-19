import React, { useState } from "react";

const FaqcardItems = (props) => {
  const [show, setshow] = useState(false);
  return (
    <div className="">
      <div className="question-section">
        <div className="question-btn-portion">
          <p className=" plus-button btn" onClick={() => setshow(!show)}>
            {show ? (
              <i className="minus-sign fa-solid fa-minus"></i>
            ) : (
              <i className="plus-sign fa-solid fa-plus"></i>
            )}
          </p>
          <p className="question">{props.items.question}</p>
        </div>
      </div>
      <div className="answer-section">
        {show && <p>{props.items.answer}</p>}
      </div>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
  );
};

export default FaqcardItems;
