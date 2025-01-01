import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/srs.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";
import PopCard from "../../components/PopCards";

const Srs = () => {
  const [srsData, setSrsData] = useState([]);
  const [showPopCard, setShowPopCard] = useState(false); // State for PopCard visibility
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setSrsData(data);
    revealAnimation();
  }, []);

  const username = getUserName();

  const createLogAndDownload = async (name, srsName) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: Downloaded ${srsName} ::`;
    const action = "Download";
    try {
      await axios.post(`${base_url}/log/add`, {
        username: name,
        message: message,
        action: action,
      });
      console.log("log added");
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  const handleDownloadClick = (srsName) => {
    createLogAndDownload(username, srsName);
    setShowPopCard(true); // Show the PopCard
  };

  const handleClosePopCard = () => {
    setShowPopCard(false); // Hide the PopCard
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">SRS</h1>
        {showPopCard && <PopCard onClose={handleClosePopCard} />} {/* Pass onClose */}
        <div className="display-cards">
          {srsData.map((srs) => (
            <div key={srs.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{srs.srs_name}</h2>
                <p>{srs.description}</p>
              </div>
              <button
                onClick={() => {
                  handleDownloadClick(srs.srs_name);
                  window.open(srs.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
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
