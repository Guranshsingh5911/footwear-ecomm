import React, { useState } from "react";
import { registerUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // Import the external styles

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      {message && <p className="message">{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
