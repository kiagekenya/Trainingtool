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
                  <i className="fas fa-chart-spider"></i>
                </div>
                <h3>Competency Assessment</h3>
                <p>
                  Evaluate and track your professional skills with our interactive
                  competency mapping tool.
                </p>
                <button 
                  className="primary-btnn"
                  onClick={() => window.location.href = "https://nockcompetency-qad9e.ondigitalocean.app"}
                >
                  Go to Competency <i className="fa fa-long-arrow-alt-right"></i>
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
                    Go to Learning <i className="fa fa-long-arrow-alt-right"></i>
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