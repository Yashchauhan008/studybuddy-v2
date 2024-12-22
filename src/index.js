import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { Analytics } from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <KindeProvider
    clientId={process.env.REACT_APP_KINDE_CLIENT_ID}
    domain={process.env.REACT_APP_KINDE_DOMAIN}
    redirectUri={process.env.REACT_APP_KINDE_REDIRECT_URL}
    logoutUri={process.env.REACT_APP_KINDE_LOGOUT_URL}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </KindeProvider>
);