import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/ml.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const MachineLearning = () => {
    const [mlData, setMlData] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Set the imported data directly
    setMlData(data);
    revealAnimation();
  }, []);

  const username = getUserName();
  const createLogAndDownload = async (name, MlName) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `:: Downloaded ${MlName} ::`; // Include timestamp in message
    const action = "Download";
    try {
      // Create a log first
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
      return (
        <>
          <div className="home">
            <h1 className="reveal">Machine Learning</h1>
            <div className="display-cards">
          {mlData.map((ml) => (
            <div key={ml.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{ml.ml_name}</h2>
                <p>{ml.description}</p>
              </div>
              <button
                onClick={() => {
                  createLogAndDownload(username,ml.ml_name);
                  window.open(ml.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
              {/* Dynamically load images from the assets folder */}
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
}

export default MachineLearning