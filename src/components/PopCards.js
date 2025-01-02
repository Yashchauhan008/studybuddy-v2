import React, { useState, useEffect } from "react";
import "../css/component.css";
import user from "../assets/yash.jpg";
import insta from "../assets/insta.png";
import github from "../assets/github.png";
import linkdn from "../assets/linkedin.png";
import axios from "axios";
import { getUserName } from "../utils/helpers";

const PopCard = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const base_url = process.env.REACT_APP_BASE_URL;

  const createLogVisit = async (name, obj) => {
    const timestamp = new Date().toLocaleString();
    const message = `:: visited ${obj} ::`;
    const action = "Visit";
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

  const handleNavigate = (url) => {
    window.open(url, "_blank");
  };

  const username = getUserName();

  // Animation for appearance
  useEffect(() => {
    setIsVisible(true); // Trigger the appearance animation
  }, []);

  // Animation for disappearance
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(); // Delay removal until animation completes
    }, 300); // Match the CSS animation duration
  };

  return (
    <div
      className={`pop-card ${isVisible ? "pop-card-enter" : "pop-card-exit"}`}
    >
      <article className="card">
        <section className="card__hero">
          <header className="card__hero-header">
            <div className="social-buttons">
              <button
                className="pop-cosial"
                onClick={() => {
                  createLogVisit(username, "instagram");
                  handleNavigate(
                    "https://www.instagram.com/yash_chauhan________"
                  );
                }}
              >
                <img src={insta} alt="Instagram" className="bell" />
              </button>
              <button
                className="pop-cosial"
                onClick={() => {
                  createLogVisit(username, "linkedin");
                  handleNavigate(
                    "https://www.linkedin.com/in/yash-chauhan-842162321?"
                  );
                }}
              >
                <img src={linkdn} alt="LinkedIn" className="bell" />
              </button>
              <button
                className="pop-cosial"
                onClick={() => {
                  createLogVisit(username, "github");
                  handleNavigate("https://github.com/Yashchauhan008");
                }}
              >
                <img src={github} alt="GitHub" className="bell" />
              </button>
            </div>
            <div className="card__icon" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
              </svg>
            </div>
          </header>
          <p className="card__job-title">
            Give Your
            <br />
            Precious <br />
            Feedback
          </p>
        </section>

        <footer className="card__footer">
          <div className="card__job-summary">
            <div
              className="card__job-icon"
              onClick={() => {
                createLogVisit(username, "portfolio");
                handleNavigate("https://yash-chauhan.vercel.app");
              }}
            >
              <img className="card__job-image" src={user} alt="Profile" />
            </div>
            <div className="card__job">
              <p className="card__job-title">
                Yash Chauhan <br />
                Freelancer & Developer
              </p>
            </div>
          </div>

          <button
            className="card__btn"
            onClick={() => {
              createLogVisit(username, "linkedin");
              handleNavigate("https://insigh.to/b/quick-labs");
            }}
          >
            feedback
          </button>
        </footer>
      </article>
    </div>
  );
};

export default PopCard;
