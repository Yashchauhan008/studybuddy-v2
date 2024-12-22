import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div>wait a moment</div>
        <button onClick={() => navigate("/")}>refresh</button>
      </div>
    </>
  );
};

export default Error404;
