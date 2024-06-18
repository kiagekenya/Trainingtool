import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import LOGO from "../../assets/nock j.png";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import Intro from "../../assets/intro2.jpg";
import Exploration from "../../assets/exploration.jpg";
import Development from "../../assets/development.jpg";
import Abandonment from "../../assets/well abandonment.jpg";
import Econ from "../../assets/econ.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SideBar from "../sidBar/SideBar";
// import LogoutButton from "../logout/LogoutButton";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredCourses);
  };

  const preventDefault = (e) => {
    e.preventDefault();
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
            <div
              id="toggle-btn"
              className={darkMode ? "fas fa-moon" : "fas fa-sun"}
              onClick={toggleDarkMode}
            ></div>
            {/* <LogoutButton /> */}
          </div>
          <div className="profile">
            <img src={Profile} className="image" alt="" />
            <h3 className="name">Jacob</h3>
            <p className="role">Guest</p>
            <Link to="/profile" className="btn">
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
        <div className="more-btn" data-aos="fade-left">
          <Link to="/courses" className="inline-option-btn">
            view all courses
          </Link>
        </div>
      </section>

      <section className="home-grid">
        <h1 className="heading" data-aos="fade-right">
          quick options
        </h1>
        <div className="box-container">
          <div className="box" data-aos="zoom-in">
            <h3 className="title">likes and comments</h3>
            <p className="likes">
              total likes : <span>25</span>
            </p>
            <Link to="/" className="inline-btn" onClick={preventDefault}>
              view likes
            </Link>
            <p className="likes">
              total comments : <span>12</span>
            </p>
            <Link to="/" className="inline-btn" onClick={preventDefault}>
              view comments
            </Link>
            <p className="likes">
              saved courses: <span>4</span>
            </p>
            <Link to="/" className="inline-btn" onClick={preventDefault}>
              view courses
            </Link>
          </div>

          <div className="box" data-aos="fade-up">
            <h3 className="title">top categories</h3>
            <div className="flex">
              <Link to="/" onClick={preventDefault}>
                <span>drilling engineering</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>exploratory drilling</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>reservoir simulation</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>marketing</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>petroleum geology</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>production engineering</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>petrophysics</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Gas</span>
              </Link>
            </div>
          </div>

          <div className="box" data-aos="fade-down">
            <h3 className="title">popular topics</h3>
            <div className="flex">
              <Link to="/" onClick={preventDefault}>
                <span>Safety and training</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Natural Environment</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Artificial lift systems</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Effects on climate</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Petroleum</span>
              </Link>
              <Link to="/" onClick={preventDefault}>
                <span>Drilling technology</span>
              </Link>
            </div>
          </div>

          <div className="box" data-aos="flip-left">
            <h3 className="title">Become a tutor</h3>
            <p className="tutor">
              Are you passionate about teaching and knowledgeable in a subject
              area? Join our team of tutors and inspire learners from around the
              world!, we welcome you to share your expertise and make a
              difference in someone's journey.
            </p>

            <Link to="/" className="inline-btn">
              Get started
            </Link>
          </div>
        </div>
      </section>
      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default Home;
