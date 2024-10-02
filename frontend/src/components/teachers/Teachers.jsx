import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import SideBar from "../sidBar/SideBar";
import Search from "../search/Search";
import ProfileModal from "../profilemodal/ProfileModal"; 
import Intro from "../../assets/intro2.png";
import Development from "../../assets/WorldMapOilBandW.jpg";

const Teachers = () => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  
  const teacherProfiles = {
    "Jacob Kiage": {
      name: "Paul Wanjau",
      position: "Oil and Gas Consultant",
      topics: 3,
      likes: 1208,
      academicQualifications: [
        "M. Eng. Petroleum Engineering | 1987 | Heriott-Watt University - Edinburgh, Scotland",
        "B. Sc. Mechanical Engineering | 1985 | Nairobi University, Nairobi, Kenya",
      ],
      professionalQualifications: [
        "Executive Certificate (Arizona SU) - Global Oil & Gas Management – 2018",
        "Executive Certificate (MIT) - Technology, Operations and Value Chain Management – 2012",
        "Executive Program (MIT) - Managing Technical Professionals and Organisations – 2012",
      ],
      careerExperience: `Oil & Gas Operations, Project Management, and Consulting: 1987 – present | Norway, UK, Nigeria, Gabon, Houston - USA, Princeton - USA, Nairobi - Kenya.`,
    },
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
      image: Development,
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

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (isMobileSearchVisible) {
      const searchInput = document.querySelector(".search-container input");
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isMobileSearchVisible]);

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  const handleViewProfile = (teacherName) => {
    if (teacherProfiles[teacherName]) {
      setSelectedTeacher(teacherProfiles[teacherName]);
    }
  };

  const closeProfileModal = () => {
    setSelectedTeacher(null);
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
            <Link to="/">
              <div id="user-btn" className="fas fa-user"></div>
            </Link>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>
          <div className="profile">
            <img src={Profile} className="image" alt="" />
            <h3 className="name">Jacob</h3>
            <p className="role">Guest</p>
            <button className="btn" onClick={() => handleViewProfile("Jacob Kiage")}>
              view profile
            </button>
          </div>
        </section>
      </header>

      {isMobileSearchVisible && <Search courses={courses} />}

      <SideBar isSidebarVisible={isSidebarVisible} handleSidebarToggle={handleSidebarToggle} />

      <section className="teachers">
        <h1 className="heading">expert teachers</h1>
        <div className="box-container">
          <div className="box">
            <div className="tutor">
              <div>
                <h3>Paul Wanjau</h3>
                <span>Oil and Gas Consultant</span>
              </div>
            </div>
            <p>
              total topics : <span>3</span>
            </p>
            <p>
              total likes : <span>1208</span>
            </p>
            <button className="inline-btn" onClick={() => handleViewProfile("Jacob Kiage")}>
              view profile
            </button>
          </div>
        </div>
      </section>

      {selectedTeacher && <ProfileModal teacher={selectedTeacher} onClose={closeProfileModal} />}

      
    </>
  );
};

export default Teachers;
