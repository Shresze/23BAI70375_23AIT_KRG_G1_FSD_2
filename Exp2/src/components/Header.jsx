import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      style={{
        padding: 10,
        margin: 5,
        backgroundColor: "#81ddff",
        borderRadius: 30,
        textAlign: "center",
        color: "#000080",
      }}
    >
      <h1>ECO TRACK</h1>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {isAuthenticated ? (
          <>
            <Link to="/">Summary</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/logs">Logs</Link>
            <button onClick={() => navigate("/logout")}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
