import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import PopCard from "../../components/PopCards";
import "../../css/component.css";
import data from "../../data/cs.json";
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const CyberSecurity = () => {
  const [csData, setCsData] = useState([]);
  const [showPopCard, setShowPopCard] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setCsData(data);
    revealAnimation();
  }, []);

  const username = getUserName();

  const createLogAndDownload = async (name, csName) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: Downloaded ${csName} ::`;
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

  const handleDownloadClick = (csName) => {
    createLogAndDownload(username, csName);
    setShowPopCard(true);
  };

  const handleClosePopCard = () => {
    setShowPopCard(false);
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">Cyber Security</h1>
        {showPopCard && <PopCard onClose={handleClosePopCard} />}
        <div className="display-cards">
          {csData.map((cs) => (
            <div key={cs.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{cs.cs_name}</h2>
                <p>{cs.description}</p>
              </div>
              <button
                onClick={() => {
                  handleDownloadClick(cs.cs_name);
                  window.open(cs.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
              {cs.imgUrl && (
                <div className="srs-img">
                  <img
                    src={require(`../../assets/${cs.imgUrl}.png`)}
                    alt={cs.cs_name}
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

export default CyberSecurity;
