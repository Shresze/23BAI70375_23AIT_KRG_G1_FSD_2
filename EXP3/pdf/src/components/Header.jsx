import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <header className="header-banner">
            <h1 className="header-title">ECO TRACK</h1>
            <nav className="nav-links">
                {!isAuthenticated ? (
                    <Link to="/login" className="nav-item">Login</Link>
                ) : (
                    <>
                        <Link to="/summary" className="nav-item">Summary</Link>
                        <Link to="/analytics" className="nav-item">Analytics</Link>
                        <Link to="/logs" className="nav-item">Logs</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;