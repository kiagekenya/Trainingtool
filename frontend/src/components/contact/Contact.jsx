import React, { useState, useEffect } from "react";
import LOGO from "../../assets/nock j.png";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import ContactImage from "../../assets/contact-img.svg";
import SideBar from "../sidBar/SideBar";
import "aos/dist/aos.css";
import Intro from "../../assets/intro2.jpg";
import Exploration from "../../assets/exploration.jpg";
import Development from "../../assets/development.jpg";
import Abandonment from "../../assets/well abandonment.jpg";
import Econ from "../../assets/econ.jpg";
import AOS from "aos";

const Contact = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

      <section className="contact">
        <div className="row">
          <div className="image">
            <img src={ContactImage} alt="" />
          </div>
          <form action="" method="post">
            <h3>get in touch</h3>
            <input
              type="text"
              placeholder="enter your name"
              name="name"
              required
              maxLength="50"
              className="box"
            />
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              required
              maxLength="50"
              className="box"
            />
            <input
              type="number"
              placeholder="enter your number"
              name="number"
              required
              maxLength="50"
              className="box"
            />
            <textarea
              name="msg"
              className="box"
              placeholder="enter your message"
              required
              maxLength="1000"
              cols="30"
              rows="10"
            ></textarea>
            <input
              type="submit"
              value="send message"
              className="inline-btn"
              name="submit"
            />
          </form>
        </div>
        <div className="box-container">
          <div className="box">
            <i className="fas fa-phone"></i>
            <h3>phone number</h3>
            <Link to="tel:+254722608369">+254722608369</Link>
            <Link to="tel:+254741357536">+254741357536</Link>
          </div>
          <div className="box">
            <i className="fas fa-envelope"></i>
            <h3>email address</h3>
            <Link to="mailto:jacobkiage4@gmail.com">jacobkiage4@gmail.com</Link>
            <Link to="mailto:kiagejay@gmail.com">kiagejay@gmail.com</Link>
          </div>
          <div className="box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>office address</h3>

            <Link to="/">
              Kawi Complex, off Red Cross Rd, Nairobi, P.O Box 58567-00200
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

export default Contact;
