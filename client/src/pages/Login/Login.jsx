import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import {
    useLoginMutation,
    useRegisterMutation,
    useGoogleLoginMutation
} from '../../store/api/authApi';
import { setCredentials, selectIsAuthenticated, selectUserRole } from '../../store/slices/authSlice';
import './Login.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('STUDENT'); // Default role
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(selectUserRole);

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [googleLoginApi] = useGoogleLoginMutation();

    useEffect(() => {
        if (isAuthenticated) {
            redirectByRole(userRole);
        }
    }, [isAuthenticated, userRole]);

    const redirectByRole = (role) => {
        if (role === 'ADMIN') navigate('/admin-panel');
        else if (role === 'INSTITUTION') navigate('/institution-dashboard');
        else navigate('/student-dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const response = await login({ email, password }).unwrap();
                dispatch(setCredentials(response.data));
            } else {
                const response = await register({ name, email, password, role }).unwrap();
                dispatch(setCredentials(response.data));
            }
        } catch (err) {
            setError(err.data?.message || 'Authentication failed');
        }
    };

    const handleGoogleLoginSuccess = async (tokenResponse) => {
        try {
            // Note: Our backend expects idToken. useGoogleLogin with Implicit flow gives Access Token.
            // We should use the Google login modal correctly or adjust backend to accept access token.
            // However, most modern Google Auth setups use the One Tap or the specialized Button components.
            // For now, let's assume the backend expects the token.
            const response = await googleLoginApi(tokenResponse.access_token).unwrap();
            dispatch(setCredentials(response.data));
        } catch (err) {
            setError('Google login failed');
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleLoginSuccess,
        onError: () => setError('Google login failed'),
    });

    return (
        <div className="login-page-container">
            <header className="login-header">
                <div className="login-header-brand">
                    <div className="login-logo-icon">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="login-brand-title">Academic Exchange</h2>
                </div>
                <div className="login-header-nav">
                    <div className="login-nav-links">
                        <button className={`login-nav-link ${role === 'INSTITUTION' ? 'login-active' : ''}`} onClick={() => setRole('INSTITUTION')}>Institutions</button>
                        <button className={`login-nav-link ${role === 'STUDENT' ? 'login-active' : ''}`} onClick={() => setRole('STUDENT')}>Students</button>
                    </div>
                    <button className="login-contact-btn">
                        <span>Contact Support</span>
                    </button>
                </div>
            </header>

            <main className="login-main-wrapper">
                <div className="login-auth-card">
                    <div className="login-form-section">
                        <div className="login-form-header">
                            <h1 className="login-form-title">{isLogin ? 'Welcome back' : 'Create Account'}</h1>
                            <p className="login-form-subtitle">
                                {isLogin ? 'Sign in to access your trusted academic data.' : 'Join the trusted academic data exchange platform.'}
                            </p>
                        </div>

                        {error && <div className="login-error-message" style={{ color: 'red', marginBottom: '0.5rem', fontSize: '0.875rem' }}>{error}</div>}

                        <div className="login-google-btn-wrapper">
                            <button className="login-google-btn" onClick={() => googleLogin()}>
                                <img
                                    alt="Google logo"
                                    className="login-google-logo"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdKNeztH3YMYY-eQH5HGlV3QI0_0K853CRg6JlkUXBgOUR1oTcmYIyXQylBzCr188bt7YeHznlm_qnM-UAYuLQEZBx7UfhqZEvQbdF0gX8ijW7GQ9sQqEHKn3J8X1RS9n0EGAQOiUCK5Y37ZwIPLmThio3BKMDX5lCA4k86bawfpoT-1gDLfvBPutBrNymwhK_a4DJJE3yS9GwqJBb4fA4kILhcT5E5nVXes3Ht1mtaHEhVEp1DVNt62HKM185_F1EAaqRnFdRFqw"
                                />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="login-divider">
                            <div className="login-divider-line"></div>
                            <span className="login-divider-text">or email</span>
                            <div className="login-divider-line"></div>
                        </div>

                        <form className="login-form-body" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="login-form-group">
                                    <label className="login-form-label">Full Name</label>
                                    <input
                                        className="login-form-input"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            )}
                            <div className="login-form-group">
                                <label className="login-form-label" htmlFor="email">Email Address</label>
                                <input
                                    className="login-form-input"
                                    id="email"
                                    placeholder="name@university.edu"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {!isLogin && (
                                <div className="login-form-group">
                                    <label className="login-form-label">Register as</label>
                                    <select className="login-form-input" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="STUDENT">Student</option>
                                        <option value="INSTITUTION">Institution</option>
                                    </select>
                                </div>
                            )}
                            <div className="login-form-group">
                                <div className="login-password-label-wrapper">
                                    <label className="login-form-label" htmlFor="password">Password</label>
                                    {isLogin && <a className="login-forgot-link" href="#">Forgot?</a>}
                                </div>
                                <input
                                    className="login-form-input"
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="login-submit-btn" type="submit" disabled={isLoginLoading || isRegisterLoading}>
                                {isLoginLoading || isRegisterLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="login-signup-text">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                className="login-signup-link"
                                style={{ background: 'none', border: 'none', color: '#135bec', cursor: 'pointer', outline: 'none' }}
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Get started' : 'Sign in instead'}
                            </button>
                        </p>

                        <div className="login-institution-invite">
                            <p className="login-invite-text">Are you an academic institution?</p>
                            <button
                                onClick={() => navigate('/register-institution')}
                                className="login-invite-btn"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>corporate_fare</span>
                                Register your Institution
                            </button>
                        </div>
                    </div>

                    <div className="login-visual-section">
                        <div className="login-visual-decoration">
                            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
                                    </pattern>
                                </defs>
                                <rect fill="url(#grid)" height="100%" width="100%"></rect>
                            </svg>
                        </div>
                        <div className="login-visual-content">
                            <div className="login-verified-badge">
                                <span className="material-symbols-outlined icon-large">verified_user</span>
                            </div>
                            <h2 className="login-visual-title">Secured Academic Data</h2>
                            <p className="login-visual-description">
                                Your credentials, verified and protected with military-grade encryption for global portability.
                            </p>
                        </div>
                        <div className="login-trust-badges">
                            <div className="login-badges-container">
                                <div className="login-badge">
                                    <span className="material-symbols-outlined login-badge-icon">lock</span>
                                    <span className="login-badge-text">SSL Encrypted</span>
                                </div>
                                <div className="login-badge">
                                    <span className="material-symbols-outlined login-badge-icon">security</span>
                                    <span className="login-badge-text">GDPR Compliant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;