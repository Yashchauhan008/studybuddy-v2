import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Loader from "../components/Loader";
import "../css/profile.css";

const Profile = () => {
  const { user,logout } = useKindeAuth();

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <div className="profile">
        <img src={user.picture} />
        <div className="prof-detail">
          <h1>
            {user.given_name}&nbsp;{user.family_name}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div style={{ textAlign: "center" }} >
        <button className="btn2" onClick={logout}>
          log out
        </button>
      </div>
    </>
  );
};

export default Profile;
