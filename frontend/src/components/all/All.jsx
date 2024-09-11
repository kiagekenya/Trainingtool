import React from 'react';
import { Link } from "react-router-dom";
import './all.css';

const All = () => {
  return (
    <>
      <div className="alll-container">
        <div className='containerr'>
          <div className='roww'>
            <h1>Welcome To NockLearning</h1><br /><br />
            <p>Welcome to NockLearning's Oil and Gas Industry Basics program. At NockLearning, we specialize in providing fundamental training and orientation for Non-technical Oil & Gas Managers and Directors. Explore our platform to kickstart your journey, gain essential insights, and stay updated with the latest developments in this dynamic field.</p><br /><br />
            <div className='buttonn'>
              <Link to="/register">
                <button className='primary-btnn'>
                  GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='margin'></div>
    </>
  );
};

export default All;
