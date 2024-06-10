import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import { UserContext } from "../../contexts/UserContext";
import "./SideBar.css";
import axios from "axios";
import { MdEdit } from "react-icons/md";

const SideBar = ({ isSidebarVisible }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email);

    try {
      const response = await axios.post("/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setUser({ ...user, imageUrl: response.data.imageUrl });
        setIsEditing(false);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const imageUrl = user?.imageUrl ? `/${user.imageUrl}` : Profile;

  console.log("User data in SideBar:", user);
  return (
    <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
      <div id="close-btn">
        <i className="fas fa-times"></i>
      </div>
      <div className="profile">
        <img src={imageUrl} className="image" alt="Profile" />
        {isEditing ? (
          <div className="file-upload-widget">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="button-group">
              <button onClick={handleFileUpload} className="upload-button">
                Upload
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <MdEdit />
          </button>
        )}
        <h3 className="name">{user ? user.name : "Guest"}</h3>
        <Link to="/profile" className="btn">
          View Profile
        </Link>
      </div>
      <nav className="navbar">
        <Link to="/home">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/about">
          <i className="fas fa-question"></i>
          <span>About</span>
        </Link>
        <Link to="/courses">
          <i className="fas fa-graduation-cap"></i>
          <span>Courses</span>
        </Link>
        <Link to="/teachers">
          <i className="fas fa-chalkboard-user"></i>
          <span>Tutors</span>
        </Link>
        <Link to="/contact">
          <i className="fas fa-headset"></i>
          <span>Contact Us</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
