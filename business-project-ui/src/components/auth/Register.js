import { useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/auth.css";

export default function Register() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post("/api/auth/register", {
        username: form.username,
        password: form.password
      });

      alert("Account Created Successfully");

      window.location.href = "/login";

    } catch (error) {
      alert(error?.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="auth-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
        </div>

        <h2 className="login-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to get started with BMS</p>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <div className="auth-bottom-link">
          Already have an account?{" "}
          <a href="/login">Sign In</a>
        </div>

      </div>

    </div>
  );
}