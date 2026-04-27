import React from "react";

export default function App() {
  const callAllowedEndpoint = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/allowed");
      const data = await response.json();
      console.log("Allowed endpoint response:", data);
    } catch (error) {
      console.error("Allowed endpoint call failed:", error);
    }
  };

  const callNotConfiguredEndpoint = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/not-configured");
      const data = await response.json();
      console.log("Not configured endpoint response:", data);
    } catch (error) {
      console.error(
        "Not configured endpoint failed (expected due to CORS):",
        error
      );
    }
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <h1>Spring Boot CORS Demo</h1>
      <p>
        This app runs on <code>http://localhost:3000</code> and calls Spring
        Boot on <code>http://localhost:8080</code>.
      </p>
      <button onClick={callAllowedEndpoint}>Call /api/allowed (should work)</button>
      <button
        onClick={callNotConfiguredEndpoint}
        style={{ marginLeft: "0.5rem" }}
      >
        Call /api/not-configured (should fail in browser)
      </button>
      <p>Open browser console to inspect success/error logs.</p>
    </main>
  );
}
