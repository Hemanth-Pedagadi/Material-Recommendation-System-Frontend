import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="overlay">
        <div className="content">
          <h1 className="main-heading">Welcome!</h1>
          <h2 className="sub-heading">Construction Material Recommendation System</h2>
          <div className="button-group">
            <Link to="/adminlogin">
              <button className="modern-btn">Admin Login</button>
            </Link>
            <Link to="/login">
              <button className="modern-btn">User Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
