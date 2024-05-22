// src/components/Login/Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // Import UserContext

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext); // Get setUser from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.status === "success") {
        // Save user data in context
        setUser({ name: data.name, email: data.email });
        // Redirect to home page
        navigate("/home");
      } else {
        console.error(data.message); // Handle login error
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <section className="register">
      <div className="containerrr">
        <h2>Login</h2>
        <form className="form-register_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btnprimary">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Register here.</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
