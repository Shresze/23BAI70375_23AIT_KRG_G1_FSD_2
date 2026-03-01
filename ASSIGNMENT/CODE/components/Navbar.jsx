import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#0f766e",
    color: "white",
    marginBottom: "24px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginRight: "16px",
    fontWeight: 500,
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/dashboard/water" style={linkStyle}>
          Water Tracker
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#f97316",
          border: "none",
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
