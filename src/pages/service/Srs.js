import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/srs.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const Srs = () => {
  const [srsData, setSrsData] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Set the imported data directly
    setSrsData(data);
    revealAnimation();
  }, []);

  
  const username =getUserName()
  const createLogAndDownload = async (name, srsName) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `:: Downloaded ${srsName} ::`; // Include timestamp in message
    const action = "Download"
    try {
      // Create a log first
      await axios.post(`${base_url}/log/add`, {
        username: name,
        message: message,
        action: action,
      });
      console.log("log added")
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

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
              </div>
              <button
                onClick={() => {
                  createLogAndDownload(username,srs.srs_name);
                  window.open(srs.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
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
