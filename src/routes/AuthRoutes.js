import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SubjectInfo from "../pages/SubjectInfo";
import Questions from "../pages/Questions";
import Welcome from "../pages/Welcome";
import Navbar from "../components/Navbar";
import Profile from "../pages/Profile";
import QuestionMaster from "../pages/QuestionMaster";
import Display from "../pages/Display";
import SubjectsComponent from "../pages/service/subjects";

const WithLayout = ({ children, showLayout }) => {
  return showLayout ? (
    <div>
      <Navbar />
      {children}
    </div>
  ) : (
    children
  );
};
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/home"
        element={
          <WithLayout showLayout={true}>
            <Display />
          </WithLayout>
        }
      />
      <Route
        path="/subjects"
        element={
          <WithLayout showLayout={true}>
            <SubjectsComponent />
          </WithLayout>
        }
      />
      <Route
        path="/subjects/:subjectName"
        element={
          <WithLayout showLayout={true}>
            <SubjectInfo />
          </WithLayout>
        }
      />
      <Route
        path="/subjects/:subjectName/:subjectId"
        element={
          <WithLayout showLayout={true}>
            <Questions />
          </WithLayout>
        }
      />
      <Route
        path="/subjects/:subjectName/:subjectId/:questionId"
        element={
          <WithLayout showLayout={true}>
            <QuestionMaster />
          </WithLayout>
        }
      />
      <Route
        // path="/:username/:subjectName"
        path="/profile"
        element={
          <WithLayout showLayout={true}>
            <Profile />
          </WithLayout>
        }
      />
    </Routes>
  );
};

export default AuthRoutes;
