import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import "@fortawesome/fontawesome-free/css/all.css";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import AboutImage from "../../assets/about-img.svg";
import Intro from "../../assets/intro2.png";
import Development from "../../assets/WorldMapOilBandW.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import SideBar from "../sidBar/SideBar";
import Search from "../search/Search";

const About = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
  };

  const courses = [
    {
      title: "INTRODUCTION TO THE OIL AND GAS INDUSTRY",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 3,
      image: Intro,
      link: "/introduction",
    },
    {
      title: "Module 2:Under development",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 0,
      image:  Development,
      link: "/under",
    },
    {
      title: "Module 3:Under development",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 0,
      image: Development,
      link: "/under",
    },
    {
      title: "Module 4:Under development",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 0,
      image: Development,
      link: "/under",
    },
    {
      title: "Module 5:Under development",
      tutor: "Jacob Kiage",
      date: "21-3-2024",
      topics: 0,
      image: Development,
      link: "/under",
    },
  ];

  useEffect(() => {
    // Counting animation effect when component mounts
    const countAnimation = (targetCount, setCount) => {
      const interval = setInterval(() => {
        if (targetCount > 0) {
          setCount((prevCount) => {
            const increment = Math.ceil(targetCount / 100);
            return prevCount + increment > targetCount
              ? targetCount
              : prevCount + increment;
          });
        } else {
          clearInterval(interval);
        }
      }, 50);
    };

    // Simulate fetching data or calculating numbers
    const fetchCounts = () => {
      // Example numbers
      const courseTarget = 5;
      const studentTarget = 1000;
      const tutorTarget = 10;
      const questionTarget = 100;

      countAnimation(courseTarget, setCourseCount);
      countAnimation(studentTarget, setStudentCount);
      countAnimation(tutorTarget, setTutorCount);
      countAnimation(questionTarget, setQuestionCount);
    };

    // Fetch data when the component mounts
    fetchCounts();

    // Initialize AOS library
    AOS.init();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

      <section className="about">
        <div className="row">
          <div className="image">
            <img src={AboutImage} alt="" />
          </div>
          <div className="content">
            <h3>what we offer</h3>
            <p>
            NOCLearning is an application aimed at providing basic information about the oil and gas industry and, specifically, Upstream operations. It provides short courses packaged into modules, allowing for persons having any background to obtain a basic understanding of each topic offered.

An initial "Introduction to the Oil and Gas Industry" module is available at program launch with additional modules to be introduced in the near future.
            </p>
            <Link to="/courses" className="inline-btn">
              our modules
            </Link>
          </div>
        </div>
        <div className="box-container">
          <div className="box">
            <i className="fas fa-graduation-cap"></i>
            <div>
              <h3>{courseCount}</h3>
              <p>online courses</p>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-user-graduate"></i>
            <div>
              <h3>{studentCount}+</h3>
              <p>brilliant students</p>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-chalkboard-user"></i>
            <div>
              <h3>{tutorCount}</h3>
              <p>expert tutors</p>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-briefcase"></i>
            <div>
              <h3>{questionCount}%</h3>
              <p>Industry relevant question</p>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h1 className="heading">student's reviews</h1>
        <div className="box-container">{/* Reviews content */}</div>
      </section>

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default About;
