import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../buttons/GoogleLoginButton";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }

    setEmailError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("image", formData.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/register", formDataToSend, config);

      console.log("Registration successful", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      setError("Registration failed");
    }
  };

  return (
    <section className="register">
      <div className="containerrr">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="form-register_form">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
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
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
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
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btnprimary">
            Register
          </button>
        </form>
        <GoogleLoginButton />
        <small>
          Already have an account? <Link to="/login">Login here.</Link>
        </small>
      </div>
    </section>
  );
};

export default RegisterForm;
