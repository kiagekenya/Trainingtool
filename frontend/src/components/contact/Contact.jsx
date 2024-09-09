import React, { useState, useEffect } from "react";
import axios from "axios";
import LOGO from "../../assets/nock j.png";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import ContactImage from "../../assets/contact-img.svg";
import SideBar from "../sidBar/SideBar";
import "aos/dist/aos.css";
import Intro from "../../assets/intro2.png";
import Development from "../../assets/development.jpg";
import Image1 from "../../assets/image1.jpg";
import AOS from "aos";
import Search from "../search/Search";

const Contact = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
  const [loading, setLoading] = useState(false);

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

  const [formDaata, setFormDaata] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChaange = (e) => {
    const { name, value } = e.target;
    setFormDaata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const form = new FormData();
    Object.keys(formDaata).forEach((key) => {
      form.append(key, formDaata[key]);
    });

    try {
      await axios.post("/send-emaiil", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowPopup(true); // Show pop-up on success
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("There was an error sending the email", error);
      setLoading(false); // Stop loading
    }
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

  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
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

      <SideBar
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />

      <section className="contact">
        <div className="row">
          <div className="image">
            <img src={ContactImage} alt="" />
          </div>
          <form action="" method="post" onSubmit={handleSuubmit}>
            <h3>get in touch</h3>
            <input
              type="text"
              placeholder="enter your name"
              name="name"
              required
              maxLength="50"
              className="box"
              value={formDaata.name}
              onChange={handleChaange}
            />
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              required
              maxLength="50"
              className="box"
              value={formDaata.email}
              onChange={handleChaange}
            />
            <input
              type="number"
              placeholder="enter your number"
              name="number"
              required
              maxLength="50"
              className="box"
              value={formDaata.number}
              onChange={handleChaange}
            />
            <textarea
              name="msg"
              className="box"
              placeholder="enter your message"
              required
              maxLength="1000"
              cols="30"
              rows="10"
              value={formDaata.msg}
              onChange={handleChaange}
            ></textarea>
            <button type="submit" className="btnprimary" disabled={loading}>
              {loading ? "Loading..." : "Send message"}
            </button>
          </form>
        </div>
        {showPopup && <SuccessPopup setShowPopup={setShowPopup} />}
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

const SuccessPopup = ({ setShowPopup }) => {
  return (
    <div className="card">
      <button
        type="button"
        className="dismiss"
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>
      <div className="header">
        <div className="image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1.5"
                stroke="#000000"
                d="M20 7L9.00004 18L3.99994 13"
              ></path>
            </g>
          </svg>
        </div>
        <div className="content">
          <span className="title">Message sent</span>
          <p className="message">
            Thank you for contacting us. Our representative will reach out.{" "}
          </p>
        </div>
        <div className="actions">
          <Link to="/">
            <button
              type="button"
              className="history"
              onClick={() => setShowPopup(false)}
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Contact;
