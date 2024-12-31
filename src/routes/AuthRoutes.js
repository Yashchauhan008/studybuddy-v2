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
import Srs from "../pages/service/Srs";
import CyberSecurity from "../pages/service/CyberSecurity";
import MachineLearning from "../pages/service/MachineLearning";
import Python from "../pages/service/Python";
import ComputerNetworks from "../pages/service/ComputerNetworks";
import DataMining from "../pages/service/DataMining";
import MernProjects from "../pages/service/MernProjects";
import SubjectsComponent from "../pages/service/SubjectsComponent";
import DisplayLogs from "../components/DisplayLogs";

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
        path="/profile"
        element={
          <WithLayout showLayout={true}>
            <Profile />
          </WithLayout>
        }
      />
      <Route
        path="/srs"
        element={
          <WithLayout showLayout={true}>
            <Srs />
          </WithLayout>
        }
      />
      <Route
        path="/cyber-Security"
        element={
          <WithLayout showLayout={true}>
            <CyberSecurity />
          </WithLayout>
        }
      />
      <Route
        path="/machine-learning"
        element={
          <WithLayout showLayout={true}>
            <MachineLearning />
          </WithLayout>
        }
      />
      <Route
        path="/python"
        element={
          <WithLayout showLayout={true}>
            <Python />
          </WithLayout>
        }
      />
      <Route
        path="/computer-networks"
        element={
          <WithLayout showLayout={true}>
            <ComputerNetworks />
          </WithLayout>
        }
      />
      <Route
        path="/data-mining"
        element={
          <WithLayout showLayout={true}>
            <DataMining />
          </WithLayout>
        }
      />
      <Route
        path="/mern-projects"
        element={
          <WithLayout showLayout={true}>
            <MernProjects />
          </WithLayout>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <WithLayout showLayout={true}>
            <DisplayLogs />
          </WithLayout>
        }
      />
    </Routes>
  );
};

export default AuthRoutes;
