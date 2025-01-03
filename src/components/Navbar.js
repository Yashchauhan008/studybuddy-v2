import React, { useEffect, useState } from "react";
import "../css/component.css";
import logo from "../assets/logo.png";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import base from "../assets/QuickLabs.png";
import cs from "../assets/cs.jpeg";
import cn from "../assets/cn.jpeg";
import py from "../assets/py.jpeg";
import mern from "../assets/mern.jpeg";
import dm from "../assets/dm.jpeg";
import srs from "../assets/srs.jpeg";
import ml from "../assets/ml.jpeg";

const Navbar = () => {
  const { user } = useKindeAuth();
  const [menuTGL, setMenuTGL] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(base);
  const [isImageChanging, setIsImageChanging] = useState(false); // Animation state
  const [isAnimating, setIsAnimating] = useState(false); // Prevent double click during animation
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  const menuToggle = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (!menuTGL) {
      setIsVisible(true);
      setMenuTGL(true);
    } else {
      setMenuTGL(false);
    }
  };

  useEffect(() => {
    if (menuTGL) {
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false), // Allow further clicks after animation
      });
      tl.fromTo(
        ".menu-cnt",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5 }
      );
      tl.fromTo(
        ".menu-item",
        { y: "50px", opacity: 0 },
        { y: "0", opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );
      tl.fromTo(
        ".menu-cnt-right",
        { y: "400px", opacity: 0 },
        { y: "0", opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
        "-=0.9"
      );
    } else if (!menuTGL && isVisible) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false); // Allow further clicks after animation
          setIsVisible(false);
        },
      });
      tl.to(".menu-item", {
        y: "50px",
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      tl.to(".menu-cnt", { y: "100%", opacity: 0, duration: 1 }, "-=0.2");
      tl.to(".menu-cnt-right", { y: "100%", opacity: 0, duration: 1 }, "-=1.3");
    }
  }, [menuTGL, isVisible]);

  const handleHover = (image) => {
    setIsImageChanging(true); // Trigger animation
    setTimeout(() => {
      setHoveredImage(image);
      setIsImageChanging(false); // Reset animation state
    }, 300); // Match transition duration
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <nav className="navbar">
        <div className="lnav">
          <img src={logo} alt="logo" />
          <h1 onClick={() => navigate("/auth")}>quick labs</h1>
        </div>
        <div className="rnav">
          <div className="nav-btn">
            {isAdmin && (
              <button
                className="btn2"
                onClick={() => {
                  navigate("/auth/admin/logs");
                }}
              >
                logs
              </button>
            )}
            <button className="btn2" onClick={menuToggle} style={{width:"70px"}}>
              {menuTGL ? "x" : "menu"}
            </button>
            {isVisible && (
              <div className="menu-cnt">
                <div className="menu-cnt-top">your resources</div>
                <div className="menu-cnt-left">
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(base)}
                    onClick={() => {
                      navigate("/auth/subjects");
                      setMenuTGL(false);
                    }}
                  >
                    <span>subjects</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(srs)}
                    onClick={() => {
                      navigate("/auth/srs");
                      setMenuTGL(false);
                    }}
                  >
                    <span>SRS</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(cs)}
                    onClick={() => {
                      navigate("/auth/cyber-Security");
                      setMenuTGL(false);
                    }}
                  >
                    <span>cyber security</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(ml)}
                    onClick={() => {
                      navigate("/auth/machine-learning");
                      setMenuTGL(false);
                    }}
                  >
                    <span>machine learning</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(py)}
                    onClick={() => {
                      navigate("/auth/python");
                      setMenuTGL(false);
                    }}
                  >
                    <span>python</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(cn)}
                    onClick={() => {
                      navigate("/auth/computer-networks");
                      setMenuTGL(false);
                    }}
                  >
                    <span>computer networks</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(dm)}
                    onClick={() => {
                      navigate("/auth/data-mining");
                      setMenuTGL(false);
                    }}
                  >
                    <span>data mining</span>
                  </button>
                  <button
                    className="menu-item"
                    onMouseEnter={() => handleHover(mern)}
                    onClick={() => {
                      navigate("/auth/mern-projects");
                      setMenuTGL(false);
                    }}
                  >
                    <span>mern projects</span>
                  </button>
                </div>
                <div className="menu-cnt-right">
                  {hoveredImage && (
                    <img
                      src={hoveredImage}
                      alt={hoveredImage}
                      className={`hovered-image ${
                        isImageChanging ? "fade-out" : "fade-in"
                      }`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div style={{ height: "100%", borderLeft: "1px solid white" }}>
            &nbsp;
          </div>
          <div
            className="nav-profile"
            onClick={() => navigate("/auth/profile")}
          >
            <img src={user.picture} alt="profile" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
