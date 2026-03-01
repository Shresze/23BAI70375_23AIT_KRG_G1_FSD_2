import React from "react";

const CounterDisplay = React.memo(function CounterDisplay({
  count,
  goal,
  onAdd,
  onRemove,
  onReset,
}) {
  const cardStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    backgroundColor: "white",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  };

  const primaryBtn = {
    ...buttonStyle,
    backgroundColor: "#0ea5e9",
    color: "white",
  };

  const dangerBtn = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
    color: "white",
  };

  const secondaryBtn = {
    ...buttonStyle,
    backgroundColor: "#e5e7eb",
    color: "#111827",
  };

  const isGoalReached = count >= goal;

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: "8px" }}>Daily Water Tracker</h2>
      <p style={{ marginBottom: "16px", color: "#6b7280" }}>
        Track how many glasses of water you drink today.
      </p>

      <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "4px" }}>
        {count}
      </div>
      <div style={{ marginBottom: "12px", color: "#4b5563" }}>
        {count} / {goal} glasses completed
      </div>

      {isGoalReached && (
        <div
          style={{
            marginBottom: "12px",
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontWeight: 500,
          }}
        >
          Goal Reached
        </div>
      )}

      <div style={{ marginBottom: "12px" }}>
        <button style={primaryBtn} onClick={onAdd}>
          + Add
        </button>
        <button style={secondaryBtn} onClick={onRemove}>
          – Remove
        </button>
      </div>

      <button style={dangerBtn} onClick={onReset}>
        Reset
      </button>
    </div>
  );
});

export default CounterDisplay;
