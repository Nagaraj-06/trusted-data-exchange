import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCheckApplicationStatusQuery } from '../../store/api/authApi';
import './InstitutionRegistration.css'; // Reusing styles

const ApplicationStatus = () => {
    const [email, setEmail] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const { data, isLoading, isError, error } = useCheckApplicationStatusQuery(searchEmail, {
        skip: !searchEmail
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchEmail(email);
    };

    return (
        <div className="registration-page">
            <header className="registration-nav">
                <div className="nav-brand">
                    <div className="logo-icon">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <span className="brand-text">Academic Exchange</span>
                </div>
                <Link to="/register-institution" className="login-link-btn">Back to Register</Link>
            </header>

            <div className="registration-card">
                <div className="registration-header">
                    <h1 className="registration-title">Application Status</h1>
                    <p className="registration-subtitle">Enter your contact email to check your verification progress.</p>
                </div>

                <div className="registration-form" style={{ display: 'flex', flexDirection: 'column' }}>
                    <form onSubmit={handleSearch} className="form-group full-width">
                        <label className="form-label">Contact Email</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="email"
                                className="form-input"
                                required
                                placeholder="registrar@univ.edu"
                                style={{ flex: 1 }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="submit-btn" style={{ width: 'auto', padding: '0 2rem' }}>
                                Check
                            </button>
                        </div>
                    </form>

                    {isLoading && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <span className="spinner"></span>
                            <p style={{ marginTop: '1rem', color: '#64748b' }}>Searching application...</p>
                        </div>
                    )}

                    {isError && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            backgroundColor: '#fef2f2',
                            borderRadius: '16px',
                            textAlign: 'center',
                            border: '1px solid #fee2e2'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>
                                record_voice_over
                            </span>
                            <h3 style={{ color: '#991b1b', marginBottom: '0.5rem' }}>Application Not Found</h3>
                            <p style={{ color: '#b91c1c' }}>{error?.data?.message || 'We couldn\'t find any application for this email.'}</p>
                        </div>
                    )}

                    {data && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{data.data.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Submitted on {new Date(data.data.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    backgroundColor:
                                        data.data.status === 'APPROVED' ? '#dcfce7' :
                                            data.data.status === 'REJECTED' ? '#fee2e2' : '#fef9c3',
                                    color:
                                        data.data.status === 'APPROVED' ? '#166534' :
                                            data.data.status === 'REJECTED' ? '#991b1b' : '#854d0e',
                                }}>
                                    {data.data.status}
                                </div>
                            </div>

                            <div className="status-timeline">
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#135bec' }}></div>
                                        <div style={{ width: '2px', height: '40px', backgroundColor: '#e2e8f0' }}></div>
                                        <div style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: data.data.status === 'PENDING' ? '#cbd5e1' : '#135bec'
                                        }}></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div>
                                            <p style={{ fontWeight: 700, color: '#0f172a' }}>Application Submitted</p>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>We have received your request and document proof.</p>
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, color: data.data.status === 'PENDING' ? '#94a3b8' : '#0f172a' }}>Admin Review</p>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                                {data.data.status === 'PENDING'
                                                    ? 'Your application is currently under professional verification.'
                                                    : data.data.status === 'APPROVED'
                                                        ? 'Verification complete! You can now log in.'
                                                        : 'Unfortunately, your application was not approved at this time.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {data.data.status === 'APPROVED' && (
                                <Link to="/login" className="submit-btn" style={{ textDecoration: 'none', marginTop: '2rem' }}>
                                    Go to Login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationStatus;
