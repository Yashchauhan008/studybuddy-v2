import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LocalRoutes from './routes/LocalRoutes';
import Error404 from './pages/Error404';
import AuthRoutes from './routes/AuthRoutes';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { getMyAuth } from './utils/helpers';
import { Analytics } from '@vercel/analytics/react';


const App = () => {
  const { isAuthenticated } = useKindeAuth();
  // const isAuthenticated = getMyAuth();

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  return (
     <>
     <Routes>
        <Route path='/*' element={<LocalRoutes />} />
        {isAuthenticated ? <Route path='/auth/*' element={<AuthRoutes />} /> : <Route path='/auth' element={<Error404 />} />}
      </Routes>
      <Analytics />
     </>
  );
}

export default App;