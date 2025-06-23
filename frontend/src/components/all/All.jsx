import React from "react";
import { Link } from "react-router-dom";
import "./all.css";

const All = () => {
  return (
    <>
      <div className="alll-container">
        <div className="containerr">
          <div className="roww">
            <h1>Welcome To NOCLearning</h1>
            <p>
              Welcome to NOCLearning's Oil and Gas Industry program. Choose your
              path below to begin your journey in this dynamic field.
            </p>

            <div className="options-container">
              <div className="option-card">
                <div className="option-icon competency-icon">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z"
                      fill="#94d500"
                    />
                    <circle cx="12" cy="12" r="2" fill="#94d500" />
                  </svg>
                </div>
                {/* redepoy...... */}
                <h3>Competency Assessment</h3>
                <p>
                  Evaluate and track your professional skills with our
                  interactive competency mapping tool.
                </p>
                <button
                  className="primary-btnn"
                  onClick={() =>
                    (window.location.href =
                      "https://nockcompetency-qad9e.ondigitalocean.app")
                  }
                >
                  Go to Competency{" "}
                  <i className="fa fa-long-arrow-alt-right"></i>
                </button>
              </div>

              <div className="option-card">
                <div className="option-icon learning-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3>Learning Portal</h3>
                <p>
                  Access our comprehensive learning resources for Oil & Gas
                  professionals at all levels.
                </p>
                <Link to="/login">
                  <button className="primary-btnn">
                    Go to Learning{" "}
                    <i className="fa fa-long-arrow-alt-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin"></div>
    </>
  );
};

export default All;
