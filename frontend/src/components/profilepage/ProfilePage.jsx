import React, { useState, useEffect, useContext  } from "react";
import LOGO from "../../assets/nock j.png";
import './ProfilePage.css';
import SideBar from "../sidBar/SideBar";
import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import { UserContext } from "../../contexts/UserContext";

const ProfilePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [location, setLocation] = useState('Fetching location...');
  const { user } = useContext(UserContext);

  const handleSidebarToggle = () => {
    console.log("clicked");
    setIsSidebarVisible(!isSidebarVisible);
    console.log(isSidebarVisible);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use a geocoding API to convert latitude and longitude to a readable address
          fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
            .then(response => response.json())
            .then(data => {
              if (data.city && data.country) {
                setLocation(`${data.city}, ${data.country}`);
              } else {
                setLocation("Location not available");
              }
            })
            .catch(() => {
              setLocation("Unable to fetch location");
            });
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported by this browser");
    }
  }, []);

  return (
    <>
      <header className="header">
        <section className="flex">
          <div className="logo">
            <img src={LOGO} alt="logo" />
          </div>
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

      <div className="box-container">
        <div className="profile-page">
          {/* Header Section */}
          <header className="header-section">
            <img src="profile_picture_url" alt="Profile" className="profile-picture" />
            <h1>{user ? user.name : "Guest"}</h1>
            <p className="bio">"Lifelong learner and aspiring data scientist."</p>
          </header>

          {/* Personal Information */}
          <section className="personal-info">
            <h3>Personal Information</h3>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Occupation:</strong> Petroleum Engineer</p>
            <p><strong>Contact Information:</strong>{user ? user.email : "Guest"}</p>
          </section>

          {/* Academic Information */}
          <section className="academic-info">
            <h3>Academic Information</h3>
            <div className="current-courses">
              <h4>Current Courses</h4>
              <ul>
                <li>Data Science 101 <progress value="75" max="100"></progress></li>
                <li>Python Programming <progress value="50" max="100"></progress></li>
              </ul>
            </div><br /><br />
            <div className="completed-courses">
              <h4>Completed Courses</h4>
              <ul>
                <li>Introduction to Machine Learning - Grade: A</li>
                <li>Web Development Bootcamp - Certificate Earned</li>
              </ul>
            </div>
            <div className="skills">
              <h4>Skills</h4>
              <p>Python, Machine Learning, Data Visualization, SQL</p>
            </div>
          </section>

          {/* Achievements and Badges */}
          <section className="achievements-badges">
            <h3>Achievements and Badges</h3>
            <div className="certificates">
              <h4>Certificates</h4>
              <img src="certificate_icon_url" alt="Certificate" />
            </div>
            <div className="badges">
              <h4>Badges</h4>
              <img src="beginner_badge_url" alt="Beginner Badge" />
              <img src="quiz_master_badge_url" alt="Quiz Master Badge" />
            </div>
          </section>

          {/* Learning Activities */}
          <section className="learning-activities">
            <h3>Learning Activities</h3>
            <div className="recent-activity">
              <h4>Recent Activity</h4>
              <ul>
                <li>Enrolled in "Advanced Python Techniques"</li>
                <li>Completed quiz on "Data Structures and Algorithms"</li>
                <li>Posted in the "Data Science Community" forum</li>
              </ul>
            </div>
            <div className="favorites">
              <h4>Favorites</h4>
              <ul>
                <li>Article: "Top 10 Data Science Projects for Beginners"</li>
                <li>Course: "Deep Learning with TensorFlow"</li>
              </ul>
            </div>
          </section>

          {/* Settings and Privacy */}
          <section className="settings-privacy">
            <h3>Settings and Privacy</h3>
            <div className="account-settings">
              <h4>Account Settings</h4>
              <button>Edit Profile</button>
              <button>Change Password</button>
            </div>
          </section>

          {/* Personalized Recommendations */}
          <section className="personalized-recommendations">
            <h3>Personalized Recommendations</h3>
            <div className="suggested-courses">
              <h4>Suggested Courses</h4>
              <ul>
                <li>"Big Data Analytics"</li>
                <li>"Statistics for Data Science"</li>
              </ul>
            </div>
            <div className="resources">
              <h4>Resources</h4>
              <ul>
                <li>Video: "Data Cleaning Techniques"</li>
                <li>Blog: "How to Build a Data Science Portfolio"</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default ProfilePage;
