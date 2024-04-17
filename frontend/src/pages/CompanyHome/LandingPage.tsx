// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';

import routes from '@router/index';
import { useAuth } from '../../context/Auth';


const LandingPage = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div>
            {/* Header */}
            <header>
                <nav>
                    <ul>
                        <li><Link to={routes.landingPage}>LandingPage</Link></li>
                        {isAuthenticated ? (
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        ) : (
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </nav>
                {/* Show logout button if authenticated */}
                {isAuthenticated && (
                    <button onClick={logout}>Logout</button>
                )}
            </header>

            {/* Main content */}
            <main>
                {/* Your landing page content */}
                <section>
                    <h1>Welcome to our Landing Page!</h1>
                    <p>This is where you can introduce your product or service.</p>
                </section>
            </main>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 Company Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
