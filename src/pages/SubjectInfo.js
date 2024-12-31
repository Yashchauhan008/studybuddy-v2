import gsap from "gsap";
import SplitType from "split-type";
import React, { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/subjectinfo.css";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import { getUserName } from "../utils/helpers";

const SubjectInfo = () => {
  const { user } = useAuth0();
  const { subjectName } = useParams();
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(null);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const username = getUserName();

  const createLogForExplore = async (name, subject) => {
    const timestamp = new Date().toLocaleString(); // Generate a timestamp
    const message = `${name} :: exploreed :: ${subject}  :: on ${timestamp}`; // Include timestamp in message
    const action = "explore";
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

  useLayoutEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `${base_url}/subject/name/${subjectName}`
        );
        setSubject(response.data);
        setEditedSubject(response.data);

        // GSAP animation after subject data is fetched
      } catch (err) {
        console.error("Error fetching subject:", err);
        setError("Failed to fetch subject. Please try again later.");
      }
    };

    fetchSubject();
  }, [subjectName]);

  // Ensure that animations (SplitType) and GSAP are in sync
  useEffect(() => {
    if (subject) {
      // SplitType text reveal animation
      const splitText = new SplitType(".reveal", { types: "lines, words" });

      // Now apply GSAP animation to the split text
      gsap.fromTo(
        splitText.words,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power3.out" }
      );

      gsap.fromTo(
        ".sub-data", // Target all elements with class "sub-data"
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5, // Animation duration
          ease: "power3.out",
          stagger: 0.3, // If you have multiple elements in .sub-data
        }
      );
    }
  }, [subject]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSubject(subject);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${base_url}/subject/${subject._id}`,
        editedSubject
      );
      setSubject(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating subject:", err);
      setError("Failed to update subject. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubject((prev) => ({ ...prev, [name]: value }));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!subject) {
    return <Loader />;
  }

  return (
    <>
      <div className="subjectinfo">
        <BackButton path={`/auth/subjects`} />
        <div className="sub-data">
          {isEditing ? (
            <>
              <form>
                <div className="popup-content">
                  <h2>Edit Subject</h2>
                  <input
                    name="name"
                    value={editedSubject.name}
                    onChange={handleChange}
                  />
                  <input
                    name="imgUrl"
                    value={editedSubject.imgUrl}
                    onChange={handleChange}
                  />
                  <textarea
                    name="description"
                    value={editedSubject.description}
                    onChange={handleChange}
                  />
                  <input
                    name="question"
                    type="number"
                    value={editedSubject.question}
                    onChange={handleChange}
                  />
                  <div style={{ transform: "translatex(-35px)" }}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="reveal">{subject.name}</h1>
              <img src={subject.imgUrl} alt={subject.name} />
              <p>{subject.description}</p>
              <h2>Total questions: {subject.question}</h2>
              {subject.cheatsheet && (
                <>
                  <h3>Download our exclusive cheatsheet for {subject.name}</h3>
                  <button>Download</button>
                </>
              )}
              {isAdmin ? (
                <>
                  <button className="btn2" onClick={handleEdit}>
                    Edit
                  </button>
                </>
              ) : null}
            </>
          )}
        </div>
        <button
          className="startprep"
          onClick={() => {
            createLogForExplore(username, subjectName);
            navigate(`/auth/subjects/${subjectName}/${subject._id}`);
          }}
        >
          <span className="button-content">Start Preparation</span>
        </button>
      </div>
    </>
  );
};

export default SubjectInfo;
