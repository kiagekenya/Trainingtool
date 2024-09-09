import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import Intro from "../../assets/intro2.png";
import Development from "../../assets/development.jpg";
import Image1 from "../../assets/image1.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import SideBar from "../sidBar/SideBar";

const Courses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const courses = [
    {
      title: "INTRODUCTION TO THE OIL AND GAS INDUSTRY",
      tutor: "Paul Wanjau",
      mobile: "0701454548",
      topics: 3,
      image: Intro,
      link: "/introduction",
    },
    {
      title: "Module 2",
      tutor: "Jacob Kiage",
      mobile: "0741357536",
      topics: 3,
      image: Image1,
      link: "/under",
    },
    {
      title: "Module 3",
      tutor: "Jacob Kiage",
      mobile: "0741357536",
      topics: 7,
      image: Development,
      link: "/under",
    },
    {
      title: "Module 4",
      tutor: "Jacob Kiage",
      mobile: "0741357536",
      topics: 2,
      image: Image1,
      link: "/under",
    },
    {
      title: "Module 5",
      tutor: "Jacob Kiage",
      mobile: "0741357536",
      topics: 4,
      image: Development,
      link: "/under",
    },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredCourses);
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  return (
    <>
      <header className="header">
        <section className="flex">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
          <form className="search-form">
            <input
              type="text"
              name="search_box"
              required
              placeholder="search courses..."
              maxLength="100"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="button" className="fas fa-search"></button>
          </form>
          <div className="icons">
            <div
              id="menu-btn"
              className="fas fa-bars"
              onClick={handleSidebarToggle}
            ></div>
            <div id="search-btn" className="fas fa-search"></div>
            <Link to="/profile">
              <div id="user-btn" className="fas fa-user"></div>
            </Link>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>
          <div className="profile">
            <img src={Profile} className="image" alt="" />
            <h3 className="name">Jacob</h3>
            <p className="role">Guest</p>
            <Link to="/" className="btn">
              view profile
            </Link>
          </div>
        </section>
      </header>

      <SideBar
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />

      <section className="courses">
        <h1 className="heading">Our Modules</h1>
        {searchResults.length === 0 && searchQuery && (
          <p className="searchQuery">No results found for "{searchQuery}"</p>
        )}

        <div className="box-container">
          {(searchResults.length > 0 ? searchResults : courses).map(
            (course, index) => (
              <div className="box" key={index} data-aos="zoom-in">
                <div className="tutor">
                  <i
                    className="fas fa-info-circle"
                    onClick={() => handleDropdownToggle(index)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  ></i>
                  <div
                    className={`dropdown ${
                      activeDropdown === index ? "active" : ""
                    }`}
                  >
                    <p>
                      <strong>Tutor:</strong> {course.tutor}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {course.mobile}
                    </p>
                  </div>
                </div>
                <div className="thumb">
                  <img src={course.image} alt="" />
                  <span>{course.topics} topics</span>
                </div>
                <h3 className="title">{course.title}</h3>
                <Link to={course.link} className="inline-btn">
                  View Module
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default Courses;
