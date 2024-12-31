import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/cs.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const CyberSecurity = () => {
  const [csData, setSrsData] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Set the imported data directly
    setSrsData(data);
    revealAnimation();
  }, []);

  const username = getUserName();
  
  const createLogAndDownload = async (name, csName) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `:: Downloaded ${csName} ::`; // Include timestamp in message

    try {
      // Create a log first
      await axios.post(`${base_url}/log/add`, {
        username: name,
        message: message,
      });
      console.log("log added");
    } catch (error) {
      console.error("Error creating log:", error);
    }
  };

  return (
    <>
      <div className="home">
        <h1 className="reveal">Cyber Security</h1>
        <div className="display-cards">
          {csData.map((cs) => (
            <div key={cs.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{cs.cs_name}</h2>
                <p>{cs.description}</p>
              </div>
              <button
                onClick={() => {
                  createLogAndDownload(username, cs.cs_name);

                  window.open(cs.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
              {/* Dynamically load images from the assets folder */}
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
