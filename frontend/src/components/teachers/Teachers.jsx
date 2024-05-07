import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/nock j.png'
import '@fortawesome/fontawesome-free/css/all.css';
import Profile from '../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg'





const Teachers = () => {
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
          <div id="menu-btn" className="fas fa-bars"></div>
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

    <div className="side-bar">
      <div id="close-btn">
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
        <Link to="/teachers"><i className="fas fa-chalkboard-user"></i><span>teachers</span></Link>
        <Link to="/contact"><i className="fas fa-headset"></i><span>contact us</span></Link>
      </nav>
    </div>

    <section className="teachers">
      <h1 className="heading">expert teachers</h1>
      <form action="" method="post" className="search-tutor">
        <input type="text" name="search_box" placeholder="search tutors..." required maxLength="100" />
        <button type="submit" className="fas fa-search" name="search_tutor"></button>
      </form>
      <div className="box-container">
      <div className="box offer">
         <h3>become a tutor</h3>
         <p className="tutor">Are you passionate about teaching and knowledgeable in a subject area? Join our team of tutors and inspire learners from around the world!, we welcome you to share your expertise and make a difference in someone's journey.</p>
         <Link to="/" className="inline-btn">get started</Link>
      </div>

      <div className="box">
         <div className="tutor">
            <div>
               <h3>Jacob Kiage</h3>
               <span>Petroleum engineer</span>
            </div>
         </div>
         <p>total topics : <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
            <div>
               <h3>Abiud Masinde</h3>
               <span>Geophysicist</span>
            </div>
         </div>
         <p>total topics : <span>6</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
            <div>
               <h3>Joshua  Atuta</h3>
               <span>Geologist</span>
            </div>
         </div>
         <p>total topics : <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
           
            <div>
               <h3>Helen Sonkoi</h3>
               <span>Geophysicist</span>
            </div>
         </div>
         <p>total topics : <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
            <div>
               <h3>Godfred Oskuku</h3>
               <span>Geophysicist</span>
            </div>
         </div>
         <p>total topics: <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
           
            <div>
               <h3>Sharon Rotich</h3>
               <span>Geospatial</span>
            </div>
         </div>
         <p>total  topics : <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      <div className="box">
         <div className="tutor">
          
            <div>
               <h3>Edmond Wanjala</h3>
               <span>Geologist</span>
            </div>
         </div>
         <p>total  topics : <span>4</span></p>
         <p>total likes : <span>1208</span></p>
         <Link to="/" className="inline-btn">view profile</Link>
      </div>

      </div>
    </section>

    <footer className="footer">
      &copy; copyright @ 2024| all rights reserved!
    </footer>
  </>
  )
}

export default Teachers