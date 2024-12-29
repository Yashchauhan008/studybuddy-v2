import React, { useEffect } from "react";
import revealAnimation from "../../components/Reveal";

const MachineLearning = () => {
    useEffect(()=>{
        revealAnimation(); 
      },[])
      return (
        <>
          <div className="home">
            <h1 className="reveal">Machine Learning</h1>
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

export default MachineLearning