import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SupervisorSpiderChart from "./SupervisorSpiderChart";
import SpiderChart from "./SpiderChart";
import Guidelines from "../Guidelines/Guidelines";
import { Link } from "react-router-dom";
import LOGO from "../../assets/nock j.png";
import ScoreFormManager from "../ScoreInput/ScoreFormManager";
import "./Modern.css";

const categories = [
  "Geology",
  "Geophysics",
  "Geochemistry",
  "Petroleum Engineering",
  "Project Management",
  "Renewable Energy",
  "Field Work",
  "Reporting",
];

export default function ModernSpiderChart() {
  const [showPopup, setShowPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [dbScores, setDbScores] = useState(null);
  const [user, setUser] = useState(null);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("chart");
  const [committed, setCommitted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data);
        const userData = res.data.user;
        setUser(userData);

        const hasScores =
          userData.submissions &&
          userData.submissions.length > 0 &&
          userData.submissions[0].current &&
          userData.submissions[0].projected;

        if (hasScores) {
          const submission = userData.submissions[0];
          const dbCurrentScores = Object.fromEntries(
            categories.map((cat) => [cat, submission.current[cat] || 0])
          );
          const dbProjectedScores = Object.fromEntries(
            categories.map((cat) => [cat, submission.projected[cat] || 0])
          );
          const dbSupervisorScores = submission.supervisorAssessment
            ? Object.fromEntries(
                categories.map((cat) => [
                  cat,
                  submission.supervisorAssessment[cat] || 0,
                ])
              )
            : null;

          setDbScores({
            currentScores: dbCurrentScores,
            projectedScores: dbProjectedScores,
            supervisorScores: dbSupervisorScores,
            status: submission.status || "pending",
            comments: submission.approvalComments || "",
            approvedBy: submission.approvedBy || "",
            approvedAt: submission.approvedAt || null,
            committed: submission.committed || false,
          });
          setCommitted(submission.committed || false);
          setShowForm(false);
          setSubmissionMessage(
            submission.supervisorAssessment
              ? "🎉 Your supervisor has reviewed your assessment! Click 'View Supervisor Assessment!' to see the results."
              : "This Spider Chart displays your previously submitted competency assessment."
          );
          setShowSubmissionMessage(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err.response || err);
        setError(err.response?.data?.message || "Failed to load user data.");
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchUserData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmission = (newScores) => {
    setShowSubmissionMessage(true);
    setSubmissionMessage("✅ Assessment submitted successfully!");

    setDbScores({
      currentScores: newScores.currentScores,
      projectedScores: newScores.projectedScores,
    });

    setIsLoadingChart(true);
    setTimeout(() => {
      setIsLoadingChart(false);
      setShowForm(false);
    }, 5500);
  };

  const toggleViewMode = (mode) => {
    if (viewMode !== mode) {
      setViewMode(mode);
      if (mode === "supervisor" && !dbScores?.supervisorScores) {
        setSubmissionMessage(
          "⏳ Your assessment is still under review by your supervisor."
        );
      } else if (mode === "supervisor") {
        setSubmissionMessage("🎉 Supervisor’s assessment available!");
      } else {
        setSubmissionMessage("📊 Viewing your submitted assessment.");
      }
      setShowSubmissionMessage(true);
    }
  };

  const handleCommitToggle = async () => {
    try {
      const submissionId = user.submissions[0]._id;
      const newCommitted = !committed;
      await axios.post(
        `${process.env.REACT_APP_API_URL}/scores/${submissionId}/commit`,
        { committed: newCommitted },
        { withCredentials: true }
      );
      setCommitted(newCommitted);
      setSubmissionMessage(
        newCommitted
          ? "✅ You’re on your way! Your supervisor has been notified."
          : "You’ve uncommitted from the feedback."
      );
      setShowSubmissionMessage(true);
    } catch (err) {
      console.error("Commit Error:", err);
      setSubmissionMessage("❌ Failed to update commitment status.");
      setShowSubmissionMessage(true);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-sector spinner-sector-primary"></div>
          <div className="spinner-sector spinner-sector-secondary"></div>
          <div className="spinner-sector spinner-sector-tertiary"></div>
        </div>
        <div className="loading-content">
          <img src={LOGO} alt="NOCK Logo" className="loading-logo" />
          <h2 className="loading-text">Loading Your Data...</h2>
          <p className="loading-subtext">Please wait while we prepare</p>
        </div>
      </div>
    );
  }

  const nameParts = user.name.split(" ");
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0][0];

  return (
    <div className="modern-chart-container">
      <header className="modern-header">
        <div className="modern-logo">
          <div className="logo-placeholder">
            <img className="logo-icon" src={LOGO} alt="logo" />
            <span className="logo-text">Energizing Kenya</span>
          </div>
        </div>
        <div className="modern-profile" ref={dropdownRef}>
          <div className="profile-container" onClick={toggleDropdown}>
            <div className="profile-avatar">{initials}</div>
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.occupation}</p>
            </div>
            <div className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
              ▼
            </div>
          </div>
          <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
            <div
              className={`dropdown-item toggle-btn ${
                viewMode === "supervisor" ? "active disabled" : ""
              }`}
              onClick={() => toggleViewMode("supervisor")}
            >
              View Supervisor Assessment
            </div>
            <div
              className={`dropdown-item toggle-btn ${
                viewMode === "chart" ? "active disabled" : ""
              }`}
              onClick={() => toggleViewMode("chart")}
            >
              View My Assessment
            </div>
            <div className="dropdown-divider"></div>
            <Link
              to="/logout"
              onClick={handleLogout}
              className="dropdown-item logout"
            >
              Log Out
            </Link>
          </div>
        </div>
      </header>
      <div className="modern-title-container">
        <h2 className="modern-title">Upstream Competency Mapping</h2>
        <div className="title-decoration"></div>
      </div>
      <div className="modern-guidelines-button">
        <button
          onClick={() => setShowPopup(true)}
          className="modern-button guidelines-btn"
        >
          Open Competency Guidelines <span className="button-icon">📊</span>
        </button>
        {showPopup && <Guidelines onClose={() => setShowPopup(false)} />}
      </div>
      <div className="content-container">
        <div className="content">
          {showSubmissionMessage && (
            <div
              className={`submission-notification ${
                !showSubmissionMessage ? "hide" : ""
              }`}
            >
              <div className="notification-content">
                <p>{submissionMessage}</p>
                <button
                  className="close-notification"
                  onClick={() => setShowSubmissionMessage(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          {isLoadingChart ? (
            <div className="chart-loading-container">
              <div className="chart-loading-spinner">
                <div className="spinner-circle"></div>
              </div>
              <div className="chart-loading-content">
                <h3 className="chart-loading-text">Generating Your Chart...</h3>
                <p className="chart-loading-subtext">Please wait a moment</p>
              </div>
            </div>
          ) : showForm ? (
            <ScoreFormManager
              categories={categories}
              onScoresChange={handleSubmission}
              initialScores={dbScores}
            />
          ) : (
            <div className="chart-wrapper">
              {viewMode === "supervisor" && dbScores?.supervisorScores ? (
                <SupervisorSpiderChart
                  categories={categories}
                  currentScores={dbScores.currentScores}
                  projectedScores={dbScores.projectedScores}
                  supervisorScores={dbScores.supervisorScores}
                  status={dbScores.status}
                  approvalComments={dbScores.comments}
                  approvedBy={dbScores.approvedBy}
                  approvedAt={dbScores.approvedAt}
                  committed={committed}
                  onCommitToggle={handleCommitToggle}
                />
              ) : viewMode === "supervisor" ? (
                <p className="no-review-message">
                  ⏳ Your assessment is still under review by your supervisor.
                </p>
              ) : dbScores ? (
                <SpiderChart
                  currentScores={dbScores.currentScores}
                  projectedScores={dbScores.projectedScores}
                  categories={categories}
                />
              ) : (
                <p>No scores available to display.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
