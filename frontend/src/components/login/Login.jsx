import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Use useNavigate here

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
        console.log(data);
        // Redirect based on the respon
        navigate("/home", { state: { name: data.name } });
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
