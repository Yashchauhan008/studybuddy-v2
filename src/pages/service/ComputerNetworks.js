import React, { useEffect, useState } from "react";
import revealAnimation from "../../components/Reveal";
import "../../css/component.css";
import data from "../../data/cn.json"; // Import JSON directly
import axios from "axios";
import { getUserName } from "../../utils/helpers";

const ComputerNetworks = () => {
    const [cnData, setCnData] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;
  
    useEffect(() => {
      // Set the imported data directly
      setCnData(data);
      revealAnimation();
    }, []);
  
    const username = getUserName();
    const createLogAndDownload = async (name, CnName) => {
      const timestamp = new Date().toLocaleString(); // Generate a timestamp
      const message = `:: Downloaded ${CnName} ::`; // Include timestamp in message
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
        <h1 className="reveal">Computer Networks</h1>
        <div className="display-cards">
          {cnData.map((cn) => (
            <div key={cn.id} className="srs-card">
              <div className="srs-card-right">
                <h2>{cn.cn_name}</h2>
                <p>{cn.description}</p>
              </div>
              <button
                onClick={() => {
                  createLogAndDownload(username,cn.cn_name);
                  window.open(cn.location, "_blank", "noopener,noreferrer");
                }}
                className="btn2"
              >
                Download
              </button>
              {/* Dynamically load images from the assets folder */}
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
