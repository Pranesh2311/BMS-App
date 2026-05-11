import { useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/auth.css";

export default function ForgotPassword() {

  const [username, setUsername] = useState("");

  const handleReset = async () => {

    try {

      await api.post("/api/auth/forgot-password", {
        username
      });

      alert("Password reset link sent");

    } catch (error) {
      alert("User not found");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="auth-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        </div>

        <h2 className="login-title">Forgot Password</h2>
        <p className="auth-subtitle">Enter your username and we'll send you a reset link</p>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleReset}
        >
          Reset Password
        </button>

        <div className="auth-bottom-link">
          Remember your password?{" "}
          <a href="/login">Back to Login</a>
        </div>

      </div>

    </div>
  );
}