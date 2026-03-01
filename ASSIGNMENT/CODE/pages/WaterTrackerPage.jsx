import React, { useState, useEffect, useCallback, useMemo } from "react";
import Navbar from "../components/Navbar";
import CounterDisplay from "../components/CounterDisplay";

const LOCAL_STORAGE_KEY = "waterCount";
const LOCAL_STORAGE_GOAL_KEY = "waterGoal";

const WaterTrackerPage = () => {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);

  useEffect(() => {
    const storedCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedGoal = localStorage.getItem(LOCAL_STORAGE_GOAL_KEY);

    if (storedCount !== null) {
      const parsed = parseInt(storedCount, 10);
      if (!Number.isNaN(parsed)) setCount(parsed);
    }

    if (storedGoal !== null) {
      const parsed = parseInt(storedGoal, 10);
      if (!Number.isNaN(parsed)) setGoal(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_GOAL_KEY, String(goal));
  }, [goal]);

  const handleAdd = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleRemove = useCallback(() => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  const progressText = useMemo(
    () => `${count} / ${goal} glasses completed`,
    [count, goal]
  );

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  };

  const contentStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 16px 32px",
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      <main style={contentStyle}>
        <h1 style={{ marginBottom: "8px" }}>Water Tracker</h1>
        <p style={{ color: "#4b5563", marginBottom: "16px" }}>
          Keep track of your daily water intake and stay hydrated.
        </p>

        <CounterDisplay
          count={count}
          goal={goal}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onReset={handleReset}
        />

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <label style={{ marginRight: "8px", color: "#374151" }}>
            Daily goal (glasses):
          </label>
          <input
            type="number"
            min="1"
            value={goal}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              setGoal(Number.isNaN(value) || value <= 0 ? 1 : value);
            }}
            style={{
              width: "80px",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          />
          <div style={{ marginTop: "8px", color: "#6b7280" }}>{progressText}</div>
        </div>
      </main>
    </div>
  );
};

export default WaterTrackerPage;
