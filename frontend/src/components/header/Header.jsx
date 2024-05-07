import React from 'react'
import { Link } from 'react-router-dom';

import './header.css'

const Header = () => {
  
  return (
    
      <div className="navbarr">
        <div className="navbarl">
        
        <div className="navbarr-links">
          <ul>
          <li>
        <Link to="/home"  >Login</Link>
      
        </li>
      <li>
        <Link to="/register" >SignUp</Link>
        </li>
        <li>
        <Link  to="/" >Contact Us</Link>
        </li>
          </ul>

         
        </div>
        </div>
        
      </div>
    
  )
}

export default Header