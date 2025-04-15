import React, { useState, useEffect, useContext } from "react";
import LOGO from "../../assets/nock j.png";
import "./ProfilePage.css";
import SideBar from "../sidBar/SideBar";
import { Link } from "react-router-dom";
import Profile from "../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg";
import { UserContext } from "../../contexts/UserContext";
import LogoutButton from "../logout/LogoutButton";

const ProfilePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [location, setLocation] = useState("Fetching location...");
  const { user } = useContext(UserContext);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState([]);

  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  console.log("user data", user);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.city && data.country) {
                setLocation(`${data.city}, ${data.country}`);
              } else {
                setLocation("Location not available");
              }
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
              setLocation("Unable to fetch location");
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported by this browser");
    }
  }, []);

  useEffect(() => {
    const fetchQuizzesAndProgress = async () => {
      try {
        const quizzesResponse = await fetch("/api/contents");
        if (!quizzesResponse.ok) throw new Error("Network response was not ok");
        const quizzesData = await quizzesResponse.json();

        const userDataResponse = await fetch(
          `/api/userQuizData?email=${user.email}`
        );
        if (!userDataResponse.ok)
          throw new Error("Failed to fetch user quiz data");
        const userData = await userDataResponse.json();

        setQuizzes(quizzesData);
        setUserProgress(userData.completedQuizIds);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuizzesAndProgress();
  }, [user.email]);

  const handleChangePasswordToggle = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setPasswordSuccess("Password changed successfully");
        setPasswordError(null);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setPasswordError(data.message);
        setPasswordSuccess(null);
      }
    } catch (error) {
      setPasswordError("An error occurred while changing the password");
      setPasswordSuccess(null);
    }
  };

  // Determine the image URL: either from MongoDB or the default profile image
  const imageUrl = user?.imageUrl ? `/profile-image/${user.email}` : Profile;

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

      <SideBar
        isSidebarVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />

      <div className="box-container">
        <div className="profile-page">
          {/* Header Section */}
          <header className="header-section">
            <img src={imageUrl} className="image" alt="Profile" />
            <h1>{user ? user.name : "Guest"}</h1>
            <p className="bio">"Lifelong learner."</p>
          </header>

          {/* Personal Information */}
          <section className="personal-info">
            <h3>Personal Information</h3>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Occupation:</strong> {user ? user.occupation : "Guest"}
            </p>
            <p>
              <strong> Phone Number : </strong>
              {user ? user.phone : ""}
            </p>
            <p>
              <strong>Contact Information:</strong>
              {user ? user.email : "Guest"}
            </p>
          </section>

          {/* Academic Information */}
          <section className="academic-info">
            <h3>Academic Information</h3>
            <div className="current-courses">
              <h4>Current Courses</h4>
              <ul>
                {loading ? (
                  <li>Loading...</li>
                ) : error ? (
                  <li>Error: {error}</li>
                ) : (
                  quizzes.map((quiz, index) => (
                    <li key={quiz._id}>
                      {quiz.title}
                      <progress
                        value={userProgress.includes(quiz._id) ? 100 : 0}
                        max="100"
                      ></progress>
                    </li>
                  ))
                )}
              </ul>
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
            </div>
            <div className="favorites">
              <h4>Favorites</h4>
            </div>
          </section>

          {/* Settings and Privacy */}
          <section className="settings-privacy">
            <h3>Settings and Privacy</h3>
            <div className="account-settings">
              <h4>Account Settings</h4>
              <button onClick={handleChangePasswordToggle}>
                Change Password
              </button>
              {isChangePasswordVisible && (
                <div className="change-password-form">
                  <form onSubmit={handlePasswordSubmit}>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      required
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      required
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm New Password"
                      required
                    />
                    <button type="submit">Submit</button>
                  </form>
                  {passwordError && <p className="error">{passwordError}</p>}
                  {passwordSuccess && (
                    <p className="success">{passwordSuccess}</p>
                  )}
                </div>
              )}
            </div>
            <LogoutButton />
          </section>

          {/* Personalized Recommendations */}
          <section className="personalized-recommendations">
            <h3>Personalized Recommendations</h3>
            <div className="suggested-courses">
              <h4>Suggested Courses</h4>
            </div>
            <div className="resources">
              <h4>Resources</h4>
            </div>
          </section>
        </div>
      </div>

      <footer className="footer">
        &copy; copyright @ 2024 | all rights reserved!
      </footer>
    </>
  );
};

export default ProfilePage;
