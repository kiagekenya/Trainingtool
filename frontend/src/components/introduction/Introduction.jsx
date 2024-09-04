import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import Intro from "../../assets/intro2.png";
import "@fortawesome/fontawesome-free/css/all.css";
import AOS from "aos";
import "../home/home.css";
import "aos/dist/aos.css";

import "../home/home.css";
import QuizPage from "../quizlist/Quizlist";
import SideBar from "../sidBar/SideBar";

const Introduction = () => {
  const [showNotes, setShowNotes] = useState(false);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Function to toggle the visibility of the notes
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <>
      <header className="header">
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

      <SideBar
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />

      <section className="playlist-details">
        <h1 className="heading">Module details</h1>
        <div className="row">
          <div className="column">
            <form action="" method="post" className="save-module">
              <button type="submit">
                <i className="far fa-bookmark"></i> <span>save module</span>
              </button>
            </form>
            <div className="thumb">
              <img src={Intro} alt="" />
              <span>3 topic</span>
            </div>
          </div>
          <div className="column">
            <div className="tutor">
              <div>
                <h3>Paul Wanjau</h3>
                <span>0701454548</span>
              </div>
            </div>
            <div className="details">
              <h3>INTRODUCTION TO THE OIL AND GAS INDUSTRY</h3>
              <p>
                The Oil & Gas industry is one of the world’s largest and most
                important global industries. Despite the size and importance of
                the oil and gas business, there is a basic lack of knowledge
                about the industry. The lack of knowledge is surprising given
                how important the industry is in the global economy and how the
                industry touches our daily lives in so many ways. Unfortunately,
                virtually all books that deal with the business side of the
                industry are mostly written by technical experts for
                nontechnical readers. The approach in this training guide is the
                opposite. This is a non-technical guide that should help readers
                with or without technical backgrounds better understand the
                business of oil and gas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="playlist-videos">
        <h1 className="heading">Topics...</h1>
        <div className="box-container">
          <QuizPage />
        </div>
      </section>

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default Introduction;
