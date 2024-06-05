import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import { UserContext } from "../../contexts/UserContext";
import "./SideBar.css";

const SideBar = ({ isSidebarVisible }) => {
  const { user } = useContext(UserContext);

  console.log("User data in SideBar:", user);
  return (
    <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
      <div id="close-btn">
        <i className="fas fa-times"></i>
      </div>
      <div className="profile">
        <img
          src={
            user?.imageUrl ? (
              `/${user.imageUrl}`
            ) : (
              <img src={Profile} className="image" alt="" />
            )
          }
          className="image"
          alt=""
        />
        <h3 className="name">{user ? user.name : "Guest"}</h3>
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
          <span>tutors</span>
        </Link>
        <Link to="/contact">
          <i className="fas fa-headset"></i>
          <span>contact us</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
