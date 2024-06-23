import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../buttons/GoogleLoginButton";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    email: "",
    organisation: "",
    occupation: "",
  });
  const [emailError, setEmailError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post("/send-email", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowPopup(true); // Show pop-up on success
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("There was an error sending the email", error);
      setLoading(false); // Stop loading
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
            type="text"
            name="organisation"
            placeholder="Organisation"
            required
            value={formData.organisation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            required
            value={formData.occupation}
            onChange={handleChange}
          />
          <button type="submit" className="btnprimary" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login here.</Link>
        </small>
      </div>
      {showPopup && <SuccessPopup setShowPopup={setShowPopup} />}
    </section>
  );
};

const SuccessPopup = ({ setShowPopup }) => {
  return (
    <div className="card">
      <button type="button" className="dismiss" onClick={() => setShowPopup(false)}>×</button>
      <div className="header">
        <div className="image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path>
            </g>
          </svg>
        </div>
        <div className="content">
          <span className="title">Registration Successful</span>
          <p className="message">Thank you for registering. Your account will be activated shortly. Check your Email</p>
        </div>
        <div className="actions">
        <Link to="/">
        <button type="button" className="history" onClick={() => setShowPopup(false)}>Home</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
