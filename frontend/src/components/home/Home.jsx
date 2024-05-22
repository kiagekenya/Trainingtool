import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
// import OffcanvasComponent from "../off_canvas/OffCanvas";
import SideBar from "../sidBar/SideBar";

const Home = (userData) => {
  const location = useLocation();
  const { name: userName } = location.state || {};
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const handleShow = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log("toggled");
  };

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

  // const [userName, setUserName] = useState("");

  return (
    <div>
      <header className="header width:100%">
        <section className="flex">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
          <form action="search.html" method="post" className="search-form">
            <input
              type="text"
              name="search_box"
              required
              placeholder="search courses..."
              maxLength="100"
            />
            <button type="submit" className="fas fa-search"></button>
          </form>
          <div className="icons">
            <div
              id="menu-btn"
              onClick={handleShow}
              className="fas fa-bars"
            ></div>
            <div id="search-btn" className="fas fa-search"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div
              id="toggle-btn"
              className={darkMode ? "fas fa-moon" : "fas fa-sun"}
              onClick={toggleDarkMode}
            ></div>
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

      <SideBar userName={userName}></SideBar>

      <section className="courses">
        <h1 className="heading">Our Modules</h1>
        <div class="box-container">
          <div className="box">
            <div className="tutor">
              <div className="info">
                <h3>Jacob Kiage</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="thumb">
              <img src={Intro} alt="" />
              <span>1 topic</span>
            </div>
            <h3 className="title">Introduction to The Oil and Gas Industry </h3>

            <Link to="/introduction" className="inline-btn">
              View Module
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div className="info">
                <h3>Jacob Kiage</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="thumb">
              <img src={Exploration} alt="" />
              <span>3 topics</span>
            </div>
            <h3 className="title">Exploration</h3>
            <Link to="/" className="inline-btn">
              View Module
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div className="info">
                <h3>Jacob Kiage</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="thumb">
              <img src={Development} alt="" />
              <span>7 topics</span>
            </div>
            <h3 className="title">Development & Production</h3>
            <Link to="/" className="inline-btn">
              View Module
            </Link>
          </div>

          <div className="box" data-aos="zoom-in">
            <div className="tutor">
              <div className="info">
                <h3>Jacob Kiage</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="thumb">
              <img src={Abandonment} alt="" />
              <span>2 topics</span>
            </div>
            <h3 className="title">Well Abandonment</h3>
            <Link to="/" className="inline-btn">
              View Module
            </Link>
          </div>

          <div className="box" data-aos="zoom-in">
            <div className="tutor">
              <div className="info">
                <h3>Jacob Kiage</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="thumb">
              <img src={Econ} alt="" />
              <span>4 topics</span>
            </div>
            <h3 className="title">Petroleum Economics</h3>
            <Link to="/" className="inline-btn">
              View Module
            </Link>
          </div>
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
            <Link to="/" className="inline-btn">
              view likes
            </Link>
            <p className="likes">
              total comments : <span>12</span>
            </p>
            <Link to="/" className="inline-btn">
              view comments
            </Link>
            <p className="likes">
              saved courses: <span>4</span>
            </p>
            <Link to="/" className="inline-btn">
              view courses
            </Link>
          </div>

          <div className="box" data-aos="fade-up">
            <h3 className="title">top categories</h3>
            <div className="flex">
              <Link to="/">
                <span>drilling engineering</span>
              </Link>
              <Link to="/">
                <span>exploratory drilling</span>
              </Link>
              <Link to="/">
                <span>reservoir simulation</span>
              </Link>
              <Link to="/">
                <span>marketing</span>
              </Link>
              <Link to="/">
                <span>petroleum geology</span>
              </Link>
              <Link to="/">
                <span>production engineering</span>
              </Link>
              <Link to="/">
                <span>petrophysics</span>
              </Link>
              <Link to="/">
                <span>Gas</span>
              </Link>
            </div>
          </div>

          <div className="box" data-aos="fade-down">
            <h3 className="title">popular topics</h3>
            <div className="flex">
              <Link to="/">
                <span>Safety and training</span>
              </Link>
              <Link to="/">
                <span>Natural Environment</span>
              </Link>
              <Link to="/">
                <span>Artificial lift systems</span>
              </Link>
              <Link to="/">
                <span>Effects on climate</span>
              </Link>
              <Link to="/">
                <span>Petroleum</span>
              </Link>
              <Link to="/">
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

            <Link to="/" class="inline-btn">
              Get started
            </Link>
          </div>
        </div>
      </section>
      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
        {/* <OffcanvasComponent /> */}
      </footer>
    </div>
  );
};

export default Home;
