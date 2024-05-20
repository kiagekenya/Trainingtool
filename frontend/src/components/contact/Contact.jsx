import React from 'react';
import LOGO from '../../assets/nock j.png'
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Profile from '../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg'
import ContactImage from '../../assets/contact-img.svg'




const Contact = () => {
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
        <Link to="/teachers"><i className="fas fa-chalkboard-user"></i><span>tutors</span></Link>
        <Link to="/contact"><i className="fas fa-headset"></i><span>contact us</span></Link>
      </nav>
    </div>

    <section className="contact">
      <div className="row">
        <div className="image">
          <img src={ContactImage} alt="" />
        </div>
        <form action="" method="post">
          <h3>get in touch</h3>
          <input type="text" placeholder="enter your name" name="name" required maxLength="50" className="box" />
          <input type="email" placeholder="enter your email" name="email" required maxLength="50" className="box" />
          <input type="number" placeholder="enter your number" name="number" required maxLength="50" className="box" />
          <textarea name="msg" className="box" placeholder="enter your message" required maxLength="1000" cols="30" rows="10"></textarea>
          <input type="submit" value="send message" className="inline-btn" name="submit" />
        </form>
      </div>
      <div className="box-container">
        <div className="box">
          <i className="fas fa-phone"></i>
          <h3>phone number</h3>
          <Link to="tel:+254722608369" >+254722608369</Link>
          <Link to="tel:+254741357536" >+254741357536</Link>
        </div>
        <div className="box">
          <i className="fas fa-envelope"></i>
          <h3>email address</h3>
          <Link to="mailto:jacobkiage4@gmail.com" >jacobkiage4@gmail.com</Link>
          <Link to="mailto:kiagejay@gmail.com" >kiagejay@gmail.com</Link>
        </div>
        <div className="box">
          <i className="fas fa-map-marker-alt"></i>
          <h3>office address</h3>
        
          <Link to="/" >Kawi Complex, off Red Cross Rd, Nairobi, P.O Box 58567-00200</Link>
        </div>
      </div>
    </section>

    <footer className="footer">
      &copy; copyright @ 2024| all rights reserved!
    </footer>
  </>
  )
}

export default Contact