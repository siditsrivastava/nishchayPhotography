import React from 'react'
import './Loader.css';
const Loader = () => {
  return (
    <>
    <div className="loading-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    </>
  )
}

export default Loader