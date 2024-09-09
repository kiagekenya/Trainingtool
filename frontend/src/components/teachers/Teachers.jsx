import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import "@fortawesome/fontawesome-free/css/all.css";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import Intro from "../../assets/intro2.png";
import Development from "../../assets/development.jpg";
import Image1 from "../../assets/image1.jpg";
import SideBar from "../sidBar/SideBar";
import Search from "../search/Search";



const Teachers = () => {

  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);


  const courses = [
    {
      title: "INTRODUCTION TO THE OIL AND GAS INDUSTRY",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 1,
      image: Intro,
      link: "/introduction",
    },
    {
      title: "Module 2",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 3,
      image: Image1,
      link: "/under",
    },
    {
      title: "Module 3",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 7,
      image: Development,
      link: "/under",
    },
    {
      title: "Module 4",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 2,
      image: Image1,
      link: "/under",
    },
    {
      title: "Module 5",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 4,
      image: Development,
      link: "/under",
    },
  ];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
  };

  useEffect(() => {
    if (isMobileSearchVisible) {
      const searchInput = document.querySelector(".search-container input");
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isMobileSearchVisible]);
  


  const preventDefault = (e) => {
    e.preventDefault();
  };
  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible); // Toggle mobile search visibility
  };

  return (
    <>
      <header className="header">
        <section className="flex">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
          <Search courses={courses} />
          <div className="icons">
            <div
              id="menu-btn"
              className="fas fa-bars"
              onClick={handleSidebarToggle}
            ></div>
             <div id="search-btn" className="fas fa-search" onClick={toggleMobileSearch}></div>
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

      {isMobileSearchVisible && ( // Conditionally render the mobile search form
       <Search courses={courses} />
      )}

      <SideBar
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />

      <section className="teachers">
        <h1 className="heading">expert teachers</h1>

        <div className="box-container">
          <div className="box offer">
            <h3>become a tutor</h3>
            <p className="tutor">
              Are you passionate about teaching and knowledgeable in a subject
              area? Join our team of tutors and inspire learners from around the
              world!, we welcome you to share your expertise and make a
              difference in someone's journey.
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              get started
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Jacob Kiage</h3>
                <span>Petroleum engineer</span>
              </div>
            </div>
            <p>
              total topics : <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Abiud Masinde</h3>
                <span>Geophysicist</span>
              </div>
            </div>
            <p>
              total topics : <span>6</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Joshua Atuta</h3>
                <span>Geologist</span>
              </div>
            </div>
            <p>
              total topics : <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Helen Sonkoi</h3>
                <span>Geophysicist</span>
              </div>
            </div>
            <p>
              total topics : <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Godfred Oskuku</h3>
                <span>Geophysicist</span>
              </div>
            </div>
            <p>
              total topics: <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Sharon Rotich</h3>
                <span>Geospatial</span>
              </div>
            </div>
            <p>
              total topics : <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
            </Link>
          </div>

          <div className="box">
            <div className="tutor">
              <div>
                <h3>Edmond Wanjala</h3>
                <span>Geologist</span>
              </div>
            </div>
            <p>
              total topics : <span>4</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <Link to="/" onClick={preventDefault} className="inline-btn">
              view profile
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

export default Teachers;
