import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Loader from "../components/Loader";
import "../css/profile.css";
import axios from "axios";
import { getUserName } from "../utils/helpers";

const Profile = () => {
  const { user, logout } = useKindeAuth();
  const username = getUserName()
  const base_url = process.env.REACT_APP_BASE_URL;

  if (!user) {
    return <Loader />;
  }

  const createLogForLogout = async (name) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `${name} :: Logout :: on ${timestamp}`; // Include timestamp in message
    const action = "Logout"
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
      <div className="profile">
        <img src={user.picture} alt="Profile" />
        <div className="prof-detail">
          <h1>
            {user.given_name}&nbsp;{user.family_name}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn2"
          onClick={() =>{
            createLogForLogout(username)
            logout({ redirectUri: "https://studybuddy-v2.vercel.app" })}
          } 
        >
          log out
        </button>
      </div>
    </>
  );
};

export default Profile;
