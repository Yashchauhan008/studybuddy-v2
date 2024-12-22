import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { base_url } from "../utils/baseUrl";
import CodeEditor from "../components/CodeEditor";
import Loader from "../components/Loader";
import '../css/questionMaster.css'

const QuestionMaster = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newCode, setNewCode] = useState({
    description: "",
    language: "",
    code: "",
    questionId: questionId,
  });

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `${base_url}/question/${questionId}/all-data`
        );
        setQuestionData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching question data:", err);
        setError("Failed to fetch question data. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [questionId]);

  const handleAddCode = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!newCode.description.trim() || !newCode.language.trim() || !newCode.code.trim()) {
      alert("Please fill out all fields, including the code.");
      return;
    }
    
    console.log("Submitting code:", newCode);

    try {
      const response = await axios.post(`${base_url}/code`, newCode);
      setQuestionData({
        ...questionData,
        codes: [...questionData.codes, response.data.code],
      });
      setNewCode({
        questionId: questionId,
        description: "",
        language: "",
        code: "",
      });
    } catch (err) {
      console.error("Error adding code:", err);
      alert("Failed to add code. Please try again.");
    }
  };
  
  if (loading) return <Loader/>;
  if (error) return <div>{error}</div>;
  if (!questionData) return <div>No question data found.</div>;

  return (
    <div className="question-master">
      <div className="top">
        <h1>{questionData.question}</h1>
        <p className={`difficulty ${questionData.difficultyLevel}`} style={{display:"inline-block"}}>Difficulty: {questionData.difficultyLevel}</p>
        <p className={`visibility ${questionData.isPrivate}`} >{questionData.isPrivate ? "Public" : "Private"}</p>
      </div>

      {/* <h2>Add Code</h2>
      <form onSubmit={handleAddCode}>
        <input
          type="text"
          placeholder="Description"
          value={newCode.description}
          onChange={(e) =>
            setNewCode({ ...newCode, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Language"
          value={newCode.language}
          onChange={(e) => setNewCode({ ...newCode, language: e.target.value })}
        />
        <CodeEditor
          language={newCode.language}
          value={newCode.code}
          onChange={(code) => setNewCode({ ...newCode, code })}
        />
        <button type="submit">Add Code</button>
      </form> */}

<h2>Add Code</h2>
<form onSubmit={handleAddCode}>
  <div>
    <label htmlFor="description">Description:</label>
    <input
      id="description"
      type="text"
      placeholder="Solution in HTML & Javascript"
      value={newCode.description}
      onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
    />
  </div>
  <div>
    <label htmlFor="language">Language:</label>
    <input
      id="language"
      type="text"
      placeholder="html"
      value={newCode.language}
      onChange={(e) => setNewCode({ ...newCode, language: e.target.value })}
    />
  </div>
  <div>
    <label htmlFor="code">Code:</label>
    <textarea
      id="code"
      placeholder="Enter your code here"
      value={newCode.code}
      onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
      rows={10}
      cols={50}
      style={{
        width: '100%',
        fontFamily: 'monospace'
      }}
    />
  </div>
  <button type="submit">Add Code</button>
</form>

      <div className="question-detail">
        <h2>Answers</h2>
        {questionData.answers.map((answer, index) => (
          <div key={answer._id} className="answer">
            <h3>Answer {index + 1}</h3>
            <p>Description: {answer.description}</p>
            <p>Answer: {answer.answer}</p>
            <button>edit answer</button>
          </div>
        ))}

        <h2>Code Snippets</h2>
        {questionData.codes.map((code, index) => (
          <div key={code._id} className="code">
            <h3>Code Snippet {index + 1}</h3>
            <p>Description: {code.description}</p>
            <p>Language: {code.language}</p>
            <CodeEditor language={code.language} initialCode={code.code} />
            <button>edit code</button>
          </div>
        ))}

        <h2>Images</h2>
        {questionData.images.map((image, index) => (
          <div key={image._id} className="image">
            <h3>Image {index + 1}</h3>
            <p>Description: {image.description}</p>
            <img src={image.url} alt={`Image ${index + 1}`} />
            <button>edit image</button>
          </div>
        ))}

        <h2>Resources</h2>
        {questionData.resources.map((resource, index) => (
          <div key={resource._id} className="resource">
            <h3>Resource {index + 1}</h3>
            <p>Description: {resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.url}
            </a>
            <button>edit resource</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionMaster;