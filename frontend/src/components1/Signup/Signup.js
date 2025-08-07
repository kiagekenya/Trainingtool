import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    occupation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        // api
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        form
      );
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account.</h2>
          <div className="accent-line"></div>
        </div>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="inpput-group">
            <input
              name="name"
              placeholder=" "
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="input-label">Full Name</label>
            <div className="input-highlight"></div>
          </div>

          <div className="inpput-group">
            <input
              name="email"
              type="email"
              placeholder=" example@nockenya.co.ke "
              onChange={handleChange}
              required
              className="form-input"
            />

            <div className="input-highlight"></div>
          </div>

          <div className="inpput-group">
            <input
              name="password"
              type="password"
              placeholder=" "
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="input-label">Password</label>
            <div className="input-highlight"></div>
          </div>

          <div className="inpput-group">
            <input
              name="occupation"
              placeholder=" "
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="input-label">Position</label>
            <div className="input-highlight"></div>
          </div>

          <div className="select-group">
            <label>Role</label>
            <select name="role" onChange={handleChange} className="role-select">
              <option value="employee">Employee</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            <span>Get Started</span>
            <div className="button-icon">→</div>
          </button>
        </form>

        <div className="login-redirect">
          Already registered?{" "}
          <Link to="/login" className="login-link">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
