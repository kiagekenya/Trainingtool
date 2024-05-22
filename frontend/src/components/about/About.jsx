import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/nock j.png'
import '@fortawesome/fontawesome-free/css/all.css';
import Profile from '../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg'
import AboutImage from '../../assets/about-img.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'





const About = () => {
    const [courseCount, setCourseCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [tutorCount, setTutorCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    useEffect(() => {
      // Counting animation effect when component mounts
      const countAnimation = (targetCount, setCount) => {
        const interval = setInterval(() => {
          if (targetCount > 0) {
            setCount((prevCount) => {
              const increment = Math.ceil(targetCount / 100);
              return prevCount + increment > targetCount ? targetCount : prevCount + increment;
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
          <form action="search.html" method="post" className="search-form">
            <input type="text" name="search_box" required placeholder="search courses..." maxLength="100" />
            <button type="submit" className="fas fa-search"></button>
          </form>
          <div className="icons">
          <div id="menu-btn" className="fas fa-bars" onClick={toggleSidebar}></div>
            <div id="search-btn" className="fas fa-search"></div>
            <div id="user-btn" className="fas fa-user"></div>
            <div id="toggle-btn" className="fas fa-sun"></div>
          </div>
          <div className="profile">
            <img src={Profile} className="image" alt="" />
            <h3 className="name">Jacob</h3>
            <p className="role">Guest</p>
            <Link to="/" className="btn">view profile</Link>
          </div>
        </section>
      </header>

      <div className={`side-bar ${sidebarOpen ? 'open' : ''}`}>
      <div id="close-btn" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </div>
        <div className="profile">
          <img src={Profile} className="image" alt="" />
        
          <p className="role">Guest</p>
          <Link to="/" className="btn">view profile</Link>
        </div>
        <nav className="navbar">
        <Link to="/home"><i className="fas fa-home"></i><span>home</span></Link>
        <Link to="/about"><i className="fas fa-question"></i><span>about</span></Link>
        <Link to="/courses"><i className="fas fa-graduation-cap"></i><span>courses</span></Link>
        <Link to="/teachers"><i className="fas fa-chalkboard-user"></i><span>tutors</span></Link>
        <Link to="/contact"><i className="fas fa-headset"></i><span>contact us</span></Link>
        </nav>
      </div>

      <section className="about">
        <div className="row">
          <div className="image">
            <img src={AboutImage} alt="" />
          </div>
          <div className="content">
            <h3>why choose us?</h3>
            <p>We pride ourselves on being the premier destination for petroleum education. Our platform offers a comprehensive range of courses designed to equip learners with the knowledge and skills needed to excel in the dynamic field of petroleum engineering. From fundamental principles to advanced techniques, our expertly curated content ensures that non subjects receive top-quality education tailored to their needs.</p>
            <Link to="/"  className="inline-btn">our courses</Link>
          </div>
        </div>
        <div className="box-container">
          <div className="box" >
            <i className="fas fa-graduation-cap"></i>
            <div>
              <h3>{courseCount}</h3>
              <p>online courses</p>
            </div>
          </div>
          <div className="box" >
            <i className="fas fa-user-graduate"></i>
            <div>
              <h3>{studentCount}+</h3>
              <p>brilliant students</p>
            </div>
          </div>
          <div className="box" >
            <i className="fas fa-chalkboard-user"></i>
            <div>
              <h3>{tutorCount}</h3>
              <p>expert tutors</p>
            </div>
          </div>
          <div className="box" >
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
        <div className="box-container">
          {/* Reviews content */}
        </div>
      </section>

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  )
}

export default About