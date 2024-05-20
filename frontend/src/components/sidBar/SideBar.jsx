import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SideBar = ({ userName }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   // Fetch user data from the backend
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get("/api/user");
  //       console.log("res from backend ", response.data);
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleShow = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log("toggled");
  };
  return (
    <div>
      <div className={`side-bar ${isSidebarVisible ? "show" : "hide"}`}>
        <div id="close-btn">
          <i className="fas fa-times" onClick={handleShow}></i>
        </div>
        <div className="profile">
          <img src={Profile} className="image" alt="" />
          <h3 className="name">{userName}</h3>

          <p className="role">Guest</p>
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
