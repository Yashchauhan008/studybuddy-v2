import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Question = ({ index, question, isCompleted, handleCheckboxChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [codes, setCodes] = useState(question.codes);
  const { username, subjectName, subjectId } = useParams();
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const base_url = process.env.REACT_APP_BASE_URL;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteCode = async (id) => {
    try {
      await axios.delete(`${base_url}/code`, { data: { id } });
      setCodes(codes.filter((code) => code._id !== id));
      Swal.fire("Deleted!", "The code has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting the code!", "error");
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCode(id);
      }
    });
  };

  const handlePrivacyChange = async (e) => {
    const isPrivate = e.target.checked;
    try {
      await axios.put(`${base_url}/question/privacy/${question._id}`, { isPrivate });
      Swal.fire(
        "Updated!",
        `The question has been marked as ${!isPrivate ? "private" : "public"}.`,
        "success"
      );
      question.isPrivate = isPrivate; // Update local state
    } catch (error) {
      Swal.fire("Error!", "There was an error updating the question!", "error");
    }
  };

  return (
    <div className="question">
      <div
        className={`que-top ${isExpanded ? "active" : ""}`}
        onClick={toggleExpansion}
      >
        <h3>
          {index + 1}.&nbsp;{question.question}
        </h3>
        <div className="que-top-left">
          {isAdmin ? (
            <>
              <button className="btn2" onClick={() => navigate(`${question._id}`)}>edit</button>
            </>
          ) : null}
          <p className={`difficulty ${question.difficultyLevel}`}>
            {question.difficultyLevel}
          </p>
          <label className="container">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => handleCheckboxChange(question._id, !isCompleted)}
            />
            <div className="checkmark"></div>
          </label>
          {isAdmin && (
            <label className="switch">
              <input
                type="checkbox"
                checked={question.isPrivate}
                onChange={handlePrivacyChange}
              />
              <span className="slider"></span>
            </label>
          )}
        </div>
      </div>
      <div className="que-btm">
        <p className="answer-text">
          Answer: <span>{question.answer}</span>
        </p>
        {codes.map((code) => (
          <div key={code._id}>
            <h4>Code: {code.description}</h4>
            <div style={{ width: "auto" }}>
              <CodeEditor language={code.language} initialCode={code.code} />
            </div>
            {isAdmin ? (
              <>
                <button onClick={() => handleDeleteClick(code._id)}>
                  delete
                </button>
              </>
            ) : null}
          </div>
        ))}
        {question.answers.map((answer) => (
          <div key={answer._id}>
            <h4>{answer.description}</h4>
            <p>{answer.answer}</p>
          </div>
        ))}
        {question.images.map((image) => (
          <div key={image._id}>
            <h4>{image.description}</h4>
            <img src={image.url} alt={image.description} />
          </div>
        ))}
        {question.resources.map((resource) => (
          <div key={resource._id}>
            <h4>{resource.description}</h4>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
