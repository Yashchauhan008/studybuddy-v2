import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import sample from '../../assets/sample.jpeg';
import gsap from 'gsap';
import { base_url } from "../../utils/baseUrl";
import Loader from "../../components/Loader";
import revealAnimation from "../../components/Reveal";
import BackButton from '../../components/BackButton';


const SubjectsComponent = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addSub, setAddsub] = useState(false);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  
  // Form states for adding new subject
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectImageURL, setSubjectImageURL] = useState("");
  const [cheatsheet, setCheatsheet] = useState("");

  useEffect(() => {
      fetchSubjects();
    }, []);
    
    useEffect(() => {
        if (subjects.length > 0) {
        revealAnimation(); 
      gsap.fromTo(
        '.subject-card',
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out', 
          stagger: 0.1
        }
      );
    }
  }, [subjects]);



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

  const handleCardClick = (name) => {
    navigate(`/auth/subjects/${name}`);
  };

  const toggleSetAddSub = () => {
    setAddsub(!addSub);
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
      
      // Reset form fields
      setSubjectName("");
      setSubjectDescription("");
      setSubjectImageURL("");
      setCheatsheet("");
      
      // Close popup and refresh subjects
      toggleSetAddSub();
      fetchSubjects();
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
      {/* <BackButton path={"/auth/home"} /> */}
        <h1 className="reveal">Subjects</h1>
        <div className="subject-cards">
          {isAdmin && (
            <div className="subject-card empty-card">
              <div className="subject-data">
                <button className="btn2" onClick={toggleSetAddSub}>
                  add subject
                </button>
              </div>
            </div>
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
              </div>
              <div className="circle">77</div>
            </div>
          ))}
        </div>
      </div>

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

export default SubjectsComponent;