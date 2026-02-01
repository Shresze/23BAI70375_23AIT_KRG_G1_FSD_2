import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  function handleLogin() {
    setIsAuthenticated(true);   // ✅ ONLY LOGIN
    navigate("/");
  }

  if (isAuthenticated) {
    return (
      <>
        <h1>You are already logged in</h1>
        <button onClick={() => navigate("/")}>Go to Dashboard</button>
      </>
    );
  }

  return (
    <div className="container login-container">
      <h1 className="page-title">Login</h1>
      <button className="btn-primary" onClick={handleLogin}>Login Now</button>
    </div>
  );
}
