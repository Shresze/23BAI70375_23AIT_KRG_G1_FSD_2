import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("authToken", "fake-token");
    navigate("/dashboard");
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0f2fe",
    padding: "16px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "380px",
    padding: "32px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 0",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0f766e",
    color: "white",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "8px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ margin: 0, fontSize: "1.75rem", color: "#0f766e" }}>
            EcoTrack
          </h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: "0.9rem" }}>
            Daily Water Tracker
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoComplete="email"
          />

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            autoComplete="current-password"
          />

          <button type="submit" style={buttonStyle}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
