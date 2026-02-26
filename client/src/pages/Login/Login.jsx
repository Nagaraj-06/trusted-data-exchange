import React from 'react';
import './Login.css';

const LoginPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="light">
            {/* Top Navigation */}
            <header className="header">
                <div className="header-brand">
                    <div className="logo-icon">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="brand-title">Academic Exchange</h2>
                </div>
                <div className="header-nav">
                    <div className="nav-links">
                        <a className="nav-link" href="#">Institutions</a>
                        <a className="nav-link" href="#">Employers</a>
                        <a className="nav-link" href="#">Students</a>
                    </div>
                    <button className="contact-btn">
                        <span className="truncate">Contact Support</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="login-main-content">
                <div className="auth-card">
                    {/* Left Side: Login Form */}
                    <div className="form-section">
                        <div className="form-header">
                            <h1 className="form-title">Welcome back</h1>
                            <p className="form-subtitle">Sign in to access your trusted academic data.</p>
                        </div>

                        {/* Google OAuth Button */}
                        <div className="google-btn-wrapper">
                            <button className="google-btn">
                                <img
                                    alt="Google logo"
                                    className="google-logo"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdKNeztH3YMYY-eQH5HGlV3QI0_0K853CRg6JlkUXBgOUR1oTcmYIyXQylBzCr188bt7YeHznlm_qnM-UAYuLQEZBx7UfhqZEvQbdF0gX8ijW7GQ9sQqEHKn3J8X1RS9n0EGAQOiUCK5Y37ZwIPLmThio3BKMDX5lCA4k86bawfpoT-1gDLfvBPutBrNymwhK_a4DJJE3yS9GwqJBb4fA4kILhcT5E5nVXes3Ht1mtaHEhVEp1DVNt62HKM185_F1EAaqRnFdRFqw"
                                />
                                <span className="truncate">Continue with Google</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="divider">
                            <div className="divider-line"></div>
                            <span className="divider-text">or email</span>
                            <div className="divider-line"></div>
                        </div>

                        {/* Manual Form */}
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    className="form-input"
                                    id="email"
                                    placeholder="name@university.edu"
                                    type="email"
                                />
                            </div>
                            <div className="form-group">
                                <div className="password-label-wrapper">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <a className="forgot-link" href="#">Forgot password?</a>
                                </div>
                                <input
                                    className="form-input"
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                            <button className="submit-btn" type="submit">
                                Sign In
                            </button>
                        </form>

                        <p className="signup-text">
                            Don't have an account?
                            <a className="signup-link" href="#">Get started</a>
                        </p>
                    </div>

                    {/* Right Side: Visual & Trust */}
                    <div className="visual-section">
                        {/* Abstract Background Decoration */}
                        <div className="background-decoration">
                            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
                                    </pattern>
                                </defs>
                                <rect fill="url(#grid)" height="100%" width="100%"></rect>
                            </svg>
                        </div>

                        <div className="visual-content">
                            <div className="verified-icon">
                                <span className="material-symbols-outlined icon-large">verified_user</span>
                            </div>
                            <h2 className="visual-title">Secured Academic Data</h2>
                            <p className="visual-description">
                                Your credentials, verified and protected with military-grade encryption for global portability.
                            </p>
                        </div>

                        {/* Abstract Illustration Area */}
                        <div className="illustration-area">
                            <div className="illustration-box">
                                <div className="icon-badge school-badge">
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <div className="icon-badge work-badge">
                                    <span className="material-symbols-outlined">work</span>
                                </div>
                                <div className="connection-dots">
                                    <div className="dot pulse"></div>
                                    <div className="connection-line"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="trust-badges">
                            <div className="badges-container">
                                <div className="badge">
                                    <span className="material-symbols-outlined badge-icon">lock</span>
                                    <span className="badge-text">SSL Encrypted</span>
                                </div>
                                <div className="badge">
                                    <span className="material-symbols-outlined badge-icon">security</span>
                                    <span className="badge-text">GDPR Compliant</span>
                                </div>
                                <div className="badge">
                                    <span className="material-symbols-outlined badge-icon">hub</span>
                                    <span className="badge-text">SOC2 Type II</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p className="footer-text">
                    © 2024 Academic Exchange Inc. All rights reserved.
                    <a className="footer-link" href="#">Privacy Policy</a> |
                    <a className="footer-link" href="#">Terms of Service</a>
                </p>
            </footer>
        </div>
    );
};

export default LoginPage;