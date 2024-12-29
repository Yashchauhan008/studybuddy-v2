import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/question.css";
import Question from "../components/Question";
import { base_url } from "../utils/baseUrl";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import gsap from "gsap"; // Import GSAP
import { getUserName } from "../utils/helpers";

const Questions = () => {
  const {subjectId, subjectName } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    difficultyLevel: "easy",
    isPrivate: false,
  });
  const username = getUserName()

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await fetch(`${base_url}/subject/prep/${subjectId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubject(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  useEffect(() => {
    const fetchCompletedQuestions = async () => {
      try {
        const response = await fetch(`${base_url}/user/complate/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch completed questions");
        }
        const data = await response.json();
        setCompletedQuestions(data.completedQuestionIds);
      } catch (error) {
        console.error("Error fetching completed questions:", error);
      }
    };

    fetchCompletedQuestions();
  }, [username]);

  const handleCheckboxChange = async (questionId, isChecked) => {
    try {
      const response = await fetch(`${base_url}/user/complate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          questionId,
          isChecked,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update completed questions");
      }

      const updatedQuestions = isChecked
        ? [...completedQuestions, questionId]
        : completedQuestions.filter((id) => id !== questionId);
      setCompletedQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error updating completed questions:", error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(`${base_url}/question`, {
        ...newQuestion,
        subject: subjectId,
      });

      if (response.status === 201) {
        setSubject((prevSubject) => ({
          ...prevSubject,
          questions: [...prevSubject.questions, response.data],
        }));

        setNewQuestion({
          question: "",
          difficultyLevel: "easy",
          isPrivate: false,
        });
        setShowPopup(false);
      }
    } catch (error) {
      console.error("Error adding new question:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePrivacyChange = async (questionId, isPrivate) => {
    try {
      const response = await axios.put(`${base_url}/question/${questionId}`, {
        isPrivate,
      });

      if (response.status === 200) {
        setSubject((prevSubject) => ({
          ...prevSubject,
          questions: prevSubject.questions.map((question) =>
            question._id === questionId ? { ...question, isPrivate } : question
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating question privacy:", error);
    }
  };

  // GSAP Animation for questions
  useEffect(() => {
    if (subject && subject.questions.length > 0) {
      gsap.fromTo(
        ".question-item", // Select all elements with class "question-item"
        { y: 100, opacity: 0 }, // Starting animation (below the screen, hidden)
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1, // Delay each question by 0.1 seconds
          ease: "power3.out",
        }
      );
    }
  }, [subject]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter questions based on the search query and difficulty level
  const filteredQuestions = subject.questions.filter((question) => {
    const matchesSearchQuery = question.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficultyFilter =
      difficultyFilter === "" || question.difficultyLevel === difficultyFilter;
    return matchesSearchQuery && matchesDifficultyFilter;
  });

  return (
    <div className="questionPage">
      <BackButton path={`/auth/subjects/${subjectName}`} />
      {subject && (
        <>
          {isMobile ? <h1>{subject.name}</h1> : null}
          <div className="sub-info">
            {!isMobile ? <h1>{subject.name}</h1> : null}
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
            />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="difficulty-dropdown"
            >
              <option value="">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="important">Important</option>
            </select>
            {!isMobile ? (
              isAdmin ? (
                <div className="adminbtn2">
                  <button className="btn2" onClick={() => setShowPopup(true)}>
                    Add Question
                  </button>
                </div>
              ) : null
            ) : null}
          </div>
          <h2>Questions</h2>
          <div>
            {filteredQuestions
              .filter((question) => isAdmin || !question.isPrivate)
              .map((question, index) => (
                <div
                  key={question._id}
                  className="question-item" // Add class for GSAP animation
                >
                  <Question
                    index={index}
                    question={question}
                    isCompleted={completedQuestions.includes(question._id)}
                    handleCheckboxChange={handleCheckboxChange}
                    isAdmin={isAdmin}
                    handlePrivacyChange={handlePrivacyChange}
                  />
                </div>
              ))}
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Add New Question</h2>
                <textarea
                  name="question"
                  value={newQuestion.question}
                  onChange={handleInputChange}
                  placeholder="Enter new question"
                />
                <select
                  name="difficultyLevel"
                  value={newQuestion.difficultyLevel}
                  onChange={handleInputChange}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="important">Important</option>
                </select>
                <label>
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={newQuestion.isPrivate}
                    onChange={handleInputChange}
                  />
                  Private
                </label>
                <button onClick={handleAddQuestion}>Add Question</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Questions;
