import React, { useEffect } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css"


const Srs = () => {
  useEffect(()=>{
    revealAnimation(); 
  },[])
  return (
    <>
      <div className="home">
        <h1 className="reveal">SRS</h1>
        <div className="display-cards">
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
            <div className="srs-card">
                coming soon
            </div>
        </div>
      </div>
    </>
  );
};

export default Srs;
