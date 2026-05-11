import { useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/auth.css";

export default function Login() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async () => {

    try {

      const res = await api.post("/api/auth/login", {
        username: form.username,
        password: form.password,
      });

      const token = res.data.token;

      if (form.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="auth-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your BMS account</p>

        <input
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          name="username"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          name="password"
          onChange={handleChange}
        />

        <div className="form-check mb-3">

          <input
            type="checkbox"
            className="form-check-input"
            name="rememberMe"
            onChange={handleChange}
          />

          <label className="form-check-label">
            Remember Me
          </label>

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="login-links">

          <a href="/forgot-password">
            Forgot Password?
          </a>

          <a href="/register">
            Create Account
          </a>

        </div>

      </div>

    </div>
  );
}