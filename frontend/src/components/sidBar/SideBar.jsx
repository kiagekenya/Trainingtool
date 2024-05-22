// src/components/SideBar/SideBar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import { UserContext } from "../../contexts/UserContext"; // Import UserContext

const SideBar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { user } = useContext(UserContext); // Use context to get user data

  const handleShow = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <div className={`side-bar ${isSidebarVisible ? "show" : "hide"}`}>
        <div id="close-btn">
          <i className="fas fa-times" onClick={handleShow}></i>
        </div>
        <div className="profile">
          <img src={Profile} className="image" alt="" />
          <h3 className="name">{user ? user.name : "Guest"}</h3>
          <p className="role">{user ? user.email : "Guest"}</p>
          <Link to="/profile" className="btn">
            view profile
          </Link>
        </div>
        <nav className="navbar">
          <Link to="/home">
            <i className="fas fa-home"></i>
            <span>home</span>
          </Link>
          <Link to="/about">
            <i className="fas fa-question"></i>
            <span>about</span>
          </Link>
          <Link to="/courses">
            <i className="fas fa-graduation-cap"></i>
            <span>courses</span>
          </Link>
          <Link to="/teachers">
            <i className="fas fa-chalkboard-user"></i>
            <span>teachers</span>
          </Link>
          <Link to="/contact">
            <i className="fas fa-headset"></i>
            <span>contact us</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
