import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import PopCard from "../../components/PopCards";
import "../../css/component.css";
import data from "../../data/ml.json";
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const MachineLearning = () => {
  const [mlData, setMlData] = useState([]);
  const [showPopCard, setShowPopCard] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setMlData(data);
    revealAnimation();
  }, []);

  const username = getUserName();

  const createLogAndDownload = async (name, mlName) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: Downloaded ${mlName} ::`;
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

  const handleDownloadClick = (mlName) => {
    createLogAndDownload(username, mlName);
    setShowPopCard(true);
  };

  const handleClosePopCard = () => {
    setShowPopCard(false);
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">Machine Learning</h1>
        {showPopCard && <PopCard onClose={handleClosePopCard} />}
        <div className="display-cards">
          {mlData.map((ml) => (
            <div key={ml.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{ml.ml_name}</h2>
                <p>{ml.description}</p>
              </div>
              {ml.location ? (
                <>
                  <button
                    onClick={() => {
                      handleDownloadClick(ml.ml_name);
                      window.open(ml.location, "_blank", "noopener,noreferrer");
                    }}
                    className="btn2"
                  >
                    Download
                  </button>
                </>
              ) : null}
              {ml.imgUrl && (
                <div className="srs-img">
                  <img
                    src={require(`../../assets/${ml.imgUrl}.png`)}
                    alt={ml.ml_name}
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

export default MachineLearning;
