import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // For styling

function NavBar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the auth token or other session details
    };

    return (
        <nav className="navbar">
            <Link to='/'><h1 className="navbar-brand">Contest Tracker</h1></Link>
            {isActive('/') || isActive('/login') || isActive('/signup') ? <div className="nav-links">
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link>
                <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>Signup</Link>
            </div>:<div className="nav-links">
                <Link to="/contest" className={isActive('/contest') ? 'active' : ''}>Contest</Link>
                <Link to="/pastcontest" className={isActive('/pastcontest') ? 'active' : ''}>Past Contest</Link>
                <Link to="/bookmarks" className={isActive('/bookmarks') ? 'active' : ''}>Bookmarks</Link>
                <Link to="/" className="logout-button" onClick={handleLogout}>Logout</Link>  {/* Using Link to handle redirection */}
            </div>}
        </nav>
    );
}

export default NavBar;
