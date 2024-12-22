import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate, useParams } from "react-router-dom";
import sample from "../assets/sample.jpeg";
import heart from "../assets/heart.png";
import { base_url } from "../utils/baseUrl";
import "../css/home.css";
import Loader from "../components/Loader";
import "../index.css";
import revealAnimation from "../components/Reveal";
import gsap from "gsap";

const Home = () => {
  const { user } = useKindeAuth();
  const { username } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addSub, setAddsub] = useState(false);
  const [loading, setLoading] = useState(true);
  const [existingUser, setExistingUser] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectImageURL, setSubjectImageURL] = useState("");
  const [cheatsheet, setCheatsheet] = useState("");
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const [formData, setFormData] = useState({
    username: "",
    name: `${user.given_name} ${user?.family_name}` || "",
    email: user.email,
    profileUrl: user.picture || "",
    role: "student",
    workplace: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${base_url}/subject/`);
        setSubjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setLoading(false);
      }
    };

    const checkEmail = async () => {
      try {
        const response = await fetch(`${base_url}/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        const userFound = data.find((u) => u.email === user.email);

        if (userFound) {
          setExistingUser(userFound);
          sessionStorage.setItem("isAdmin", userFound.role === "admin");
          navigate(`/auth/${userFound.username}`);
        } else {
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchSubjects();
    checkEmail();
  }, [user.email, navigate]);

  // Trigger GSAP animation after subjects have been rendered
  useEffect(() => {
    if (subjects.length > 0) {
      // Apply GSAP animation to all subject cards
      gsap.fromTo(
        '.subject-card', // Target all elements with class "subject-card"
        { y: 100, opacity: 0 }, // Starting state (100px below and invisible)
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out', 
          stagger: 0.1 // Each card starts 0.1 seconds after the previous one
        }
      );
    }
  }, [subjects]); // This effect runs whenever the subjects array changes

  revealAnimation(); // Assuming this is some additional animation

  const toggleSetAddSub = () => {
    setAddsub(!addSub);
  };

  const handleCardClick = (name) => {
    navigate(`/auth/${username}/${name}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const { username, name, profileUrl, workplace } = formData;

    if (!username || !name || !profileUrl || !workplace) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${base_url}/user/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        navigate(`/auth/${username}`);
      } else {
        if (responseData.message === "Username already exists") {
          alert("Username already exists. Please choose a different one.");
        } else if (responseData.message === "Email already exists") {
          alert("Email already exists. Please use a different email.");
        } else {
          alert("Failed to add user. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const subjectData = {
        name: subjectName,
        description: subjectDescription,
        imgUrl: subjectImageURL,
        cheatsheet: cheatsheet,
      };

      const response = await axios.post(`${base_url}/subject/`, subjectData);

      console.log("Subject added successfully:", response.data);
      setSubjectName("");
      setSubjectDescription("");
      setSubjectImageURL("");
      setCheatsheet("");
      // togglePopup(); // Close the popup after successful submission
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="home">
        <h1 className="reveal">Subjects</h1>
        {/* <Loader/> */}
        <div className="subject-cards">
          {isAdmin ? (
            <>
              <div className="subject-card empty-card">
                <div className="subject-data">
                  <button className="btn2" onClick={toggleSetAddSub}>
                    add subject
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {subjects?.map((subject, index) => (
            <div
              key={subject._id}
              className="subject-card"
              onClick={() => handleCardClick(subject.name)}
            >
              <img
                src={subject.imgUrl || sample}
                alt={subject.name}
                className="subject-image"
              />
              <div className="subject-data">
                <h2>
                  {index + 1}. {subject.name}
                </h2>
                <p>{subject.description}</p>
                {/* <div className="like-btn">
                  <h3>{subject.likes}</h3>
                  <img src={heart} alt="heart" />
                </div> */}
              </div>
              <div className="circle">77</div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Welcome!</h2>
            <p>Your email is not registered. Please complete your profile.</p>
            <div>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Workplace:
                <input
                  type="text"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button onClick={handleFormSubmit}>Complete Profile</button>
          </div>
        </div>
      )}

      {addSub && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Subject</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <input
                type="textarea"
                placeholder="Subject Description"
                value={subjectDescription}
                onChange={(e) => setSubjectDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject Image URL"
                value={subjectImageURL}
                onChange={(e) => setSubjectImageURL(e.target.value)}
              />
              <input
                type="text"
                placeholder="Cheatsheet"
                value={cheatsheet}
                onChange={(e) => setCheatsheet(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "20px 10px 0 10px",
                }}
              >
                <button onClick={toggleSetAddSub}>Close</button>
                <button type="submit">Add Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;