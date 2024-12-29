import React, { useEffect } from "react";
import revealAnimation from "../../components/Reveal";

const Python = () => {
    useEffect(()=>{
        revealAnimation(); 
      },[])
      return (
        <>
          <div className="home">
            <h1 className="reveal">Python</h1>
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
}

export default Python