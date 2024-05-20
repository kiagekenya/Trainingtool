import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/nock j.png'
import Profile from '../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg'
import Intro from '../../assets/intro2.jpg'
import Exploration from '../../assets/exploration.jpg'
import Development from '../../assets/development.jpg'
import Abandonment from '../../assets/well abandonment.jpg'
import Econ from '../../assets/econ.jpg'
import '@fortawesome/fontawesome-free/css/all.css';





const Courses = () => {


   const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <h3 className="name">Jacob</h3>
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

    <section className="courses">
      <h1 className="heading">our courses</h1>
      <div className="box-container">
      <div className="box">
   <div className="tutor">
      
      <div className="info">
         <h3>Jacob Kiage</h3>
         <span>21-3-2024</span>
      </div>
   </div>
   <div className="thumb">
      <img src={Intro} alt=""/>
      <span>1 topic</span>
   </div>
   <h3 className="title">Introduction to Petroleum Engineering</h3>
   
   <Link to="/introduction" className="inline-btn" >View Module</Link>
</div>
<div className="box">
   <div className="tutor">
      
      <div className="info">
         <h3>Jacob Kiage</h3>
         <span>21-3-2024</span>
      </div>
   </div>
   <div className="thumb">
      <img src={Exploration} alt=""/>
      <span>3 topics</span>
   </div>
   <h3 className="title">Exploration</h3>
   <Link to="/" className="inline-btn" >View Module</Link>
</div>

<div className="box">
   <div className="tutor">
      <div className="info">
         <h3>Jacob Kiage</h3>
         <span>21-3-2024</span>
      </div>
   </div>
   <div className="thumb">
      <img src={Development} alt=""/>
      <span>7 topics</span>
   </div>
   <h3 className="title">Development & Production</h3>
   <Link to="/" className="inline-btn" >View Module</Link>
</div>

<div className="box" data-aos="zoom-in">
   <div className="tutor">
      <div className="info">
         <h3>Jacob Kiage</h3>
         <span>21-3-2024</span>
      </div>
   </div>
   <div className="thumb">
      <img src={Abandonment} alt=""/>
      <span>2 topics</span>
   </div>
   <h3 className="title">Well Abandonment</h3>
   <Link to="/" className="inline-btn" >View Module</Link>
</div>

<div className="box" data-aos="zoom-in">
   <div className="tutor">
      <div className="info">
         <h3>Jacob Kiage</h3>
         <span>21-3-2024</span>
      </div>
   </div>
   <div className="thumb">
      <img src={Econ} alt=""/>
      <span>4 topics</span>
   </div>
   <h3 className="title">Petroleum Economics</h3>
   <Link to="/" className="inline-btn" >View Module</Link>
</div>
      
      </div>
    </section>

    <footer className="footer">
      &copy; copyright @ 2024| all rights reserved!
    </footer>
  </>
  )
}

export default Courses