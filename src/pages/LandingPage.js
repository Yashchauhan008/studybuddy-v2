import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../css/landing.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
// import Background3D from "../components/Background3D";
// import "../css/landing.css";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
// import { useRef, useEffect, useState } from "react";
import c from "../assets/c.png";
import cplus from "../assets/c++.png";
import css from "../assets/css.png";
import dart from "../assets/dart.png";
import express from "../assets/express.png";
import flutter from "../assets/flutter.png";
import html from "../assets/html.png";
import java from "../assets/java.png";
import js from "../assets/js.png";
import mongo from "../assets/mongoDB.png";
import npm from "../assets/npm.png";
import os from "../assets/os.png";
import react1 from "../assets/react.png";
import ruby from "../assets/ruby.png";
import sql from "../assets/sql.png";
import ts from "../assets/ts.png";
import gsap from 'gsap';
import SplitType from "split-type";
import revealAnimation from "../components/Reveal"

const ShuffleHero = () => {
  const navigate = useNavigate();

  // const { user } = useKindeAuth/();
  const { login, register, user, isAuthenticated, logout } = useKindeAuth();


  // Run addAnimation once on component mount
  revealAnimation();
  // console.log(user);
  return (
    <>
      <nav className="navbar">
        <div className="lnav">
          <img src={logo} />
          <h1 className="reveal">study buddy</h1>
        </div>
        <div className="rnav">
          {/* <div className="nav-btn">
            <button className="btn1">About us</button>
          </div> */}
          <div style={{ height: "100%", borderLeft: "1px solid white" }}>
            &nbsp;
          </div>
          {isAuthenticated ? (
            <button className="btn2" onClick={() => navigate("/auth/")}>
              👏&nbsp; Dashboard
            </button>
          ) : (
            <>
              {/* <button className="btn2" onClick={register} type="button">
                Register
              </button> */}
              <button className="btn2" onClick={login} type="button">
                &nbsp;&nbsp;Log In&nbsp;&nbsp;
              </button>
            </>
          )}
        </div>
      </nav>
      <section className="shuffle-hero">
        <div className="text-content">
          <span className="subheading reveal">hay buddy</span>
          <h3 className="heading">
            From <span className="Confusion">Confusion</span>
            <br/> to{" "}
            <span className="Clarity">Clarity</span>
          </h3>
          <p className="description reveal">
            Ultimate Study Resources and Lab Solutions for Students!
          </p>
        </div>
          <button className="btn2" onClick={login} type="button">
            &nbsp;&nbsp;Get Started&nbsp;&nbsp;
          </button>
        <ShuffleGrid />
      </section>
    </>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: c,
  },
  {
    id: 2,
    src: cplus,
  },
  {
    id: 3,
    src: css,
  },
  {
    id: 4,
    src: dart,
  },
  {
    id: 5,
    src: express,
  },
  {
    id: 6,
    src: flutter,
  },
  {
    id: 7,
    src: html,
  },
  {
    id: 8,
    src: java,
  },
  {
    id: 9,
    src: js,
  },
  {
    id: 10,
    src: mongo,
  },
  {
    id: 11,
    src: npm,
  },
  {
    id: 12,
    src: os,
  },
  {
    id: 13,
    src: react1,
  },
  {
    id: 14,
    src: ruby,
  },
  {
    id: 15,
    src: sql,
  },
  {
    id: 16,
    src: ts,
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="square"
      style={{
        backgroundImage: `url(${sq.src})`,
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return <div className="shuffle-grid">{squares}</div>;
};

export default ShuffleHero;