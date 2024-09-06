import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./loginstyles.scss";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/login", userData, {
        withCredentials: true,
      });
      setLoading(false);

      if (response.data.status === "success") {
        setUser(response.data);
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
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
          <button type="submit" className="blob-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            <span className="blob-btn__inner">
              <span className="blob-btn__blobs">
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
                <span className="blob-btn__blob"></span>
              </span>
            </span>
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <small>
          Don't have an account? <Link to="/register">Register here.</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
