import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(formData);
      const response = await axios.post("/register", body, config);

      console.log("Registration successful", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      alert("Registration failed");
    }
  };

  return (
    <section className="register">
      <div className="containerrr">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="form-register_form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder=" Confirm Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btnprimary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login here.</Link>
        </small>
      </div>
    </section>
  );
};

export default RegisterForm;
