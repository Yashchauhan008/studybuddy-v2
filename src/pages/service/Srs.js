import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/srs.json"; // Import JSON directly

const Srs = () => {
  const [srsData, setSrsData] = useState([]);

  useEffect(() => {
    // Set the imported data directly
    setSrsData(data);
    revealAnimation();
  }, []);

  return (
    <>
      <div className="home">
        <h1 className="reveal">SRS</h1>
        <div className="display-cards">
          {srsData.map((srs) => (
            <div key={srs.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{srs.srs_name}</h2>
                <p>{srs.description}</p>
                <button
                  onClick={() =>
                    window.open(srs.location, "_blank", "noopener,noreferrer")
                  }
                  className="btn2"
                >
                  Download
                </button>
              </div>
              {/* Dynamically load images from the assets folder */}
              {srs.imgUrl && (
                <div className="srs-img">
                  <img
                    src={require(`../../assets/${srs.imgUrl}.png`)}
                    alt={srs.srs_name}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Srs;
