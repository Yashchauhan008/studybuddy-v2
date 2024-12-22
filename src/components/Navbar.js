import React, { useEffect } from "react";
import "../css/component.css";
import logo from "../assets/logo.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import { setMyAuth } from "../utils/helpers";

const notify = () => {
  toast("🦄 Wow so easy!", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

const Navbar = () => {
  const { user, logout } = useKindeAuth();
  const navigate = useNavigate();

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <nav className="navbar">
        <div className="lnav">
          <img src={logo} alt="logo" />
          <h1 onClick={() => navigate('/auth')}>study buddy</h1>
        </div>
        <div className="rnav">
          <div className="nav-btn">
            {/* {isAdmin && (
              <button className="btn1" onClick={() => navigate("/admin")}>
                Admin Dashboard
              </button>
            )} */}
            <div className="dropdown">
              <button className="dropbtn">menu</button>
              <div className="dropdown-content">
                <a href="#">
                  <button
                    className="btn1"
                    onClick={() =>{
                      setMyAuth(false)
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }}
                  >
                    Log Out
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* <h3>{user.given_name}</h3> */}
          <div style={{ height: "100%", borderLeft: "1px solid white" }}>
            &nbsp;
          </div>
          <div className="nav-profile" onClick={()=>navigate('/auth/profile')}>
            <img src={user.picture} alt="profile" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;