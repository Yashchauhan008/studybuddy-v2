import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/py.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const Python = () => {
  const [pyData, setPyData] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Set the imported data directly
    setPyData(data);
    revealAnimation();
  }, []);

  const username = getUserName();
  const createLogAndDownload = async (name, PyName) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `:: Downloaded ${PyName} ::`; // Include timestamp in message
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
        <h1 className="reveal">Python</h1>
        <div className="display-cards">
          {pyData.map((py) => (
            <div key={py.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{py.py_name}</h2>
                <p>{py.description}</p>
              </div>
              <button
                onClick={() => {
                  createLogAndDownload(username,py.py_name);
                  window.open(py.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
              {/* Dynamically load images from the assets folder */}
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
        </div>
      </div>
    </>
  );
};

export default Python;
