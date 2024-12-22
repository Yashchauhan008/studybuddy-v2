import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

const LocalRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      {/* <Route path='/test' element={<ThreeDCardDemo />} /> */}
    </Routes>
  );
};

export default LocalRoutes;
