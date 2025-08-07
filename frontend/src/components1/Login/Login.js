import React, { useState } from "react";
// import API from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        // "http://localhost:4000/api/auth/login",
        form,
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", res.data); // Debug
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === "employee") navigate("/employee");
      else navigate("/supervisor");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <div className="accent-line"></div>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="inpput-group">
            <input
              name="email"
              type="email"
              placeholder=" "
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="input-label">Email Address</label>
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
          <button type="submit" className="login-button">
            <span>Continue</span>
            <div className="button-icon">→</div>
          </button>
          <div className="signup-redirect">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
