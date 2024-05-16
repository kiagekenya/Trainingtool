import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/nock j.png';
import Profile from '../../assets/vecteezy_happy-young-man-avatar-character_35280231.jpg';
import Intro from '../../assets/intro2.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const QuestionsSection = () => {
  return (
    <section className="questions-section">
      <h1 className="heading">Questions</h1>
      <div className="question">
        <h3 className="question-title">1.What are oil and gas primarily composed of?</h3>
        <ul className="options">
          <li className="option">a) Oxygen and carbon</li>
          <li className="option">b) Hydrogen and carbon</li>
          <li className="option">c) Nitrogen and carbon</li>
          <li className="option">d) Helium and carbon</li>
        </ul>
      </div><br />
      <div className="question">
        <h3 className="question-title">2.How is crude oil formed?</h3>
        <ul className="options">
          <li className="option">a) Through volcanic activity</li>
          <li className="option">b)  From the compression of air</li>
          <li className="option">c)Over millions of years from the decomposition of organic matter</li>
          <li className="option">d) From chemical reactions in the atmosphere</li>
        </ul>
      </div><br />
      <div className="question">
        <h3 className="question-title">3. How is natural gas different from crude oil?</h3>
        <ul className="options">
          <li className="option">a) It is formed from volcanic eruptions</li>
          <li className="option">b)  From the compression of air</li>
          <li className="option">c)It is found in solid form underground</li>
          <li className="option">d)It is a gaseous form and consists primarily of methane</li>
        </ul>
      </div><br />
      <div className="question">
        <h3 className="question-title">4. Which of the following is NOT a use of oil and gas in various industries?</h3>
        <ul className="options">
          <li className="option">a) Transportation</li>
          <li className="option">b) Electricity generation</li>
          <li className="option">c) Agriculture</li>
          <li className="option">d) Industrial applications</li>
        </ul>
      </div><br />
      <div className="question">
        <h3 className="question-title">5. What role do oil and gas play in industrial applications?</h3>
        <ul className="options">
          <li className="option">a) They serve as food additives</li>
          <li className="option">b) They are used in the production of pharmaceuticals</li>
          <li className="option">c) They are used for agricultural irrigation</li>
          <li className="option">d) They serve as feedstocks for manufacturing various products</li>
        </ul>
      </div>
    </section>
  );
};

const Introduction = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [showNotes1, setShowNotes1] = useState(false);
  const [showNotes2, setShowNotes2] = useState(false);

  // Function to toggle the visibility of the notes
  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };
  const toggleNottes = () => {
    setShowNotes1(!showNotes1);
  };
  const toggleNotes1 = () => {
    setShowNotes2(!showNotes2);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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

      <section className="playlist-details">
        <h1 className="heading">Module details</h1>
        <div className="row">
          <div className="column">
            <form action="" method="post" className="save-module">
              <button type="submit"><i className="far fa-bookmark"></i> <span>save module</span></button>
            </form>
            <div className="thumb">
              <img src={Intro} alt="" />
              <span>1 topic</span>
            </div>
          </div>
          <div className="column">
            <div className="tutor">
              <div>
                <h3>Jacob</h3>
                <span>21-3-2024</span>
              </div>
            </div>
            <div className="details">
              <h3>Introduction to Petroleum Engineering</h3>
              <p>petroleum engineering is the branch of engineering that focuses on processes that allow the development and exploitation of crude oil and natural gas fields as well as the technical analysis, computer modeling, and forecasting of their future production performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="playlist-videos">
        <h1 className="heading">Topics</h1>
        <div className="box-container">
          <div className="box" onClick={toggleNotes}>
            <h3 className='topic-title'>1.What is Oil and Gas?</h3>
            {showNotes && (
              <div className="notes">
                {/* Notes content */}
                <p>Oil and gas are natural resources found beneath the Earth's surface that consist primarily of hydrocarbons, which are organic compounds composed of hydrogen and carbon atoms. They are crucial sources of energy and raw materials for various industries. Here's a breakdown of each:</p><br />
                <ol>
                  <li className='sub'><strong>Oil (Crude Oil)</strong>:
                    <ul >
                      <li>Crude oil, often referred to simply as oil, is a complex mixture of hydrocarbons that exists in liquid form underground.</li>
                      <li>It is formed over millions of years from the decomposition and transformation of organic matter, such as plankton and algae, buried in sedimentary rock layers.</li>
                      <li>Crude oil is typically extracted from underground reservoirs through drilling wells and can vary in composition, viscosity, and quality depending on its geological origin.</li>
                    </ul>
                  </li><br />
                  <li className='sub'><strong>Natural Gas</strong>:
                    <ul >
                      <li>Natural gas primarily consists of methane (CH4) along with smaller amounts of other hydrocarbons such as ethane, propane, and butane.</li>
                      <li>Like oil, natural gas is formed from the decomposition of organic matter but is found in gaseous form underground or associated with oil deposits.</li>
                      <li>It is extracted alongside crude oil during drilling operations and can also be found in standalone natural gas fields.</li>
                      <li>Natural gas is often considered a cleaner-burning fossil fuel compared to coal and oil, emitting fewer pollutants and greenhouse gases when combusted for energy production.</li>
                    </ul>
                  </li><br />
                </ol>
                <p className='ptag'>Both oil and gas are vital sources of energy used for:</p>
                <ul>
                  <li>Transportation: They fuel vehicles, airplanes, ships, and trains, powering global transportation networks.</li>
                  <li>Electricity Generation: They are used in power plants to generate electricity for residential, commercial, and industrial use.</li>
                  <li>Heating and Cooling: They provide heat for residential and commercial heating systems and are used in industrial processes.</li>
                  <li>Industrial Applications: They serve as feedstocks for manufacturing various products, including plastics, fertilizers, pharmaceuticals, and synthetic materials.</li>
                </ul><br />
                <p>The extraction, refining, and distribution of oil and gas form the backbone of the global energy industry, playing a central role in driving economic growth and meeting the energy needs of societies worldwide.</p>
              </div>
            )}
          </div>
        </div><br />

        <div className="box-container">
          <div className="box" onClick={toggleNottes}>
            <h3 className='topic-title'>2.Basics of Oil and Gas.</h3>
            {showNotes1 && (
              <div className="notes">
                {/* Notes content */}
                <p>Oil and gas are natural resources found beneath the Earth's surface that consist primarily of hydrocarbons, which are organic compounds composed of hydrogen and carbon atoms. They are crucial sources of energy and raw materials for various industries. Here's a breakdown of each:</p><br />
                <ol>
                  <li className='sub'><strong>Oil (Crude Oil)</strong>:
                    <ul >
                      <li>Crude oil, often referred to simply as oil, is a complex mixture of hydrocarbons that exists in liquid form underground.</li>
                      <li>It is formed over millions of years from the decomposition and transformation of organic matter, such as plankton and algae, buried in sedimentary rock layers.</li>
                      <li>Crude oil is typically extracted from underground reservoirs through drilling wells and can vary in composition, viscosity, and quality depending on its geological origin.</li>
                    </ul>
                  </li><br />
                  <li className='sub'><strong>Natural Gas</strong>:
                    <ul >
                      <li>Natural gas primarily consists of methane (CH4) along with smaller amounts of other hydrocarbons such as ethane, propane, and butane.</li>
                      <li>Like oil, natural gas is formed from the decomposition of organic matter but is found in gaseous form underground or associated with oil deposits.</li>
                      <li>It is extracted alongside crude oil during drilling operations and can also be found in standalone natural gas fields.</li>
                      <li>Natural gas is often considered a cleaner-burning fossil fuel compared to coal and oil, emitting fewer pollutants and greenhouse gases when combusted for energy production.</li>
                    </ul>
                  </li><br />
                </ol>
                <p className='ptag'>Both oil and gas are vital sources of energy used for:</p>
                <ul>
                  <li>Transportation: They fuel vehicles, airplanes, ships, and trains, powering global transportation networks.</li>
                  <li>Electricity Generation: They are used in power plants to generate electricity for residential, commercial, and industrial use.</li>
                  <li>Heating and Cooling: They provide heat for residential and commercial heating systems and are used in industrial processes.</li>
                  <li>Industrial Applications: They serve as feedstocks for manufacturing various products, including plastics, fertilizers, pharmaceuticals, and synthetic materials.</li>
                </ul><br />
                <p>The extraction, refining, and distribution of oil and gas form the backbone of the global energy industry, playing a central role in driving economic growth and meeting the energy needs of societies worldwide.</p>
              </div>
            )}
          </div>
        </div><br />


        <div className="box-container">
          <div className="box" onClick={toggleNotes1}>
            <h3 className='topic-title'>3.Oil and Gas Industry.</h3>
            {showNotes2 && (
              <div className="notes">
                {/* Notes content */}
                <p>Oil and gas are natural resources found beneath the Earth's surface that consist primarily of hydrocarbons, which are organic compounds composed of hydrogen and carbon atoms. They are crucial sources of energy and raw materials for various industries. Here's a breakdown of each:</p><br />
                <ol>
                  <li className='sub'><strong>Oil (Crude Oil)</strong>:
                    <ul >
                      <li>Crude oil, often referred to simply as oil, is a complex mixture of hydrocarbons that exists in liquid form underground.</li>
                      <li>It is formed over millions of years from the decomposition and transformation of organic matter, such as plankton and algae, buried in sedimentary rock layers.</li>
                      <li>Crude oil is typically extracted from underground reservoirs through drilling wells and can vary in composition, viscosity, and quality depending on its geological origin.</li>
                    </ul>
                  </li><br />
                  <li className='sub'><strong>Natural Gas</strong>:
                    <ul >
                      <li>Natural gas primarily consists of methane (CH4) along with smaller amounts of other hydrocarbons such as ethane, propane, and butane.</li>
                      <li>Like oil, natural gas is formed from the decomposition of organic matter but is found in gaseous form underground or associated with oil deposits.</li>
                      <li>It is extracted alongside crude oil during drilling operations and can also be found in standalone natural gas fields.</li>
                      <li>Natural gas is often considered a cleaner-burning fossil fuel compared to coal and oil, emitting fewer pollutants and greenhouse gases when combusted for energy production.</li>
                    </ul>
                  </li><br />
                </ol>
                <p className='ptag'>Both oil and gas are vital sources of energy used for:</p>
                <ul>
                  <li>Transportation: They fuel vehicles, airplanes, ships, and trains, powering global transportation networks.</li>
                  <li>Electricity Generation: They are used in power plants to generate electricity for residential, commercial, and industrial use.</li>
                  <li>Heating and Cooling: They provide heat for residential and commercial heating systems and are used in industrial processes.</li>
                  <li>Industrial Applications: They serve as feedstocks for manufacturing various products, including plastics, fertilizers, pharmaceuticals, and synthetic materials.</li>
                </ul><br />
                <p>The extraction, refining, and distribution of oil and gas form the backbone of the global energy industry, playing a central role in driving economic growth and meeting the energy needs of societies worldwide.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <QuestionsSection />

      <footer className="footer">
        &copy; copyright @ 2024| all rights reserved!
      </footer>
    </>
  );
};

export default Introduction;