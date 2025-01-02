import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import PopCard from "../../components/PopCards";
import "../../css/component.css";
import data from "../../data/py.json";
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const Python = () => {
  const [pyData, setPyData] = useState([]);
  const [showPopCard, setShowPopCard] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setPyData(data);
    revealAnimation();
  }, []);

  const username = getUserName();

  const createLogAndDownload = async (name, pyName) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: Downloaded ${pyName} ::`;
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

  const handleDownloadClick = (pyName) => {
    createLogAndDownload(username, pyName);
    setShowPopCard(true);
  };

  const handleClosePopCard = () => {
    setShowPopCard(false);
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">Python</h1>
        {showPopCard && <PopCard onClose={handleClosePopCard} />}
        <div className="display-cards">
          {pyData.map((py) => (
            <div key={py.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{py.py_name}</h2>
                <p>{py.description}</p>
              </div>
              {py.location ? (
                <>
                  <button
                    onClick={() => {
                      handleDownloadClick(py.py_name);
                      window.open(py.location, "_blank", "noopener,noreferrer");
                    }}
                    className="btn2"
                  >
                    Download
                  </button>
                </>
              ) : null}
              {py.imgUrl && (
                <div className="srs-img">
                  <img
                    src={require(`../../assets/${py.imgUrl}.png`)}
                    alt={py.py_name}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="home-block"></div>
        </div>
      </div>
    </>
  );
};

export default Python;
