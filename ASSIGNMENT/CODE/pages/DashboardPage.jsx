import React from "react";
import Navbar from "../components/Navbar";

const DashboardPage = () => {
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  };

  const contentStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 16px 32px",
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <main style={contentStyle}>
        <h1 style={{ marginBottom: "8px" }}>Dashboard</h1>
        <p style={{ color: "#4b5563" }}>
          Welcome to EcoTrack! Use the navigation bar to open the Water Tracker.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
