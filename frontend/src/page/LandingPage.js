import React from 'react';
import '../App.css'; // Importing CSS for styling
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-container">
            <h1 className='LandingTitle'>Contest Tracker</h1>
            <div className="buttons-container">
                <Link to="/login"><button className="login-btnn">Login</button></Link>
                <Link to="/signup"><button className="signup-btnn">Signup</button></Link>
            </div>
        </div>
    );
}

export default LandingPage;
