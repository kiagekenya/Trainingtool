import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import Intro from "../../assets/intro2.jpg";
import Exploration from "../../assets/exploration.jpg";
import Development from "../../assets/development.jpg";
import Abandonment from "../../assets/well abandonment.jpg";
import Econ from "../../assets/econ.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import SideBar from "../sidBar/SideBar";

const Courses = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
      title: "Introduction to The Oil and Gas Industry",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 1,
      image: Intro,
      link: "/introduction",
    },
    {
      title: "Exploration",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 3,
      image: Exploration,
      link: "/under",
    },
    {
      title: "Development & Production",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 7,
      image: Development,
      link: "/under",
    },
    {
      title: "Well Abandonment",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 2,
      image: Abandonment,
      link: "/under",
    },
    {
      title: "Petroleum Economics",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 4,
      image: Econ,
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
            <div id="user-btn" className="fas fa-user"></div>
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

      <SideBar isSidebarVisible={isSidebarVisible} />

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
                  <div className="info">
                    <h3>{course.tutor}</h3>
                    <span>{course.date}</span>
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
