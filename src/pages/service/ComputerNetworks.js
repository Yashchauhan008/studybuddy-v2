import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import PopCard from "../../components/PopCards";
import "../../css/component.css";
import data from "../../data/cn.json";
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const ComputerNetworks = () => {
  const [cnData, setCnData] = useState([]);
  const [showPopCard, setShowPopCard] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setCnData(data);
    revealAnimation();
  }, []);

  const username = getUserName();

  const createLogAndDownload = async (name, cnName) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: Downloaded ${cnName} ::`;
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

  const handleDownloadClick = (cnName) => {
    createLogAndDownload(username, cnName);
    setShowPopCard(true);
  };

  const handleClosePopCard = () => {
    setShowPopCard(false);
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">Computer Networks</h1>
        {showPopCard && <PopCard onClose={handleClosePopCard} />}
        <div className="display-cards">
          {cnData.map((cn) => (
            <div key={cn.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{cn.cn_name}</h2>
                <p>{cn.description}</p>
              </div>
              {cn.location ? (
                <>
                  <button
                    onClick={() => {
                      handleDownloadClick(cn.cn_name);
                      window.open(cn.location, "_blank", "noopener,noreferrer");
                    }}
                    className="btn2"
                  >
                    Download
                  </button>
                </>
              ) : null}
              {cn.imgUrl && (
                <div className="srs-img">
                  <img
                    src={require(`../../assets/${cn.imgUrl}.png`)}
                    alt={cn.cn_name}
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

export default ComputerNetworks;
