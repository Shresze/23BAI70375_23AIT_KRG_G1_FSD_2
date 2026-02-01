import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    setIsAuthenticated(false);
    navigate("/login");
  }, []);

  return <h2>Logging out...</h2>;
}
