import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApplyInstitutionMutation } from '../../store/api/authApi';
import { toast } from 'react-hot-toast';
import './InstitutionRegistration.css';

const InstitutionRegistration = () => {
    const navigate = useNavigate();
    const [applyInstitution, { isLoading, isSuccess }] = useApplyInstitutionMutation();
    const [formData, setFormData] = useState({
        name: '',
        accreditation: '',
        contactEmail: '',
        address: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('accreditation', formData.accreditation);
            data.append('contactEmail', formData.contactEmail);
            data.append('address', formData.address);
            data.append('password', password);
            if (file) {
                data.append('document', file);
            }

            await applyInstitution(data).unwrap();
            toast.success('Application submitted successfully!');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to submit application');
        }
    };

    if (isSuccess) {
        return (
            <div className="registration-page">
                <div className="registration-card">
                    <div className="success-container">
                        <span className="material-symbols-outlined success-icon">check_circle</span>
                        <h2 className="success-title">Application Received</h2>
                        <p className="success-text">
                            Thank you for your interest in joining the Trusted Academic Data Exchange.
                            Our team will review your institution's details and contact you at <strong>{formData.contactEmail}</strong> once the approval is complete.
                        </p>
                        <Link to="/login" className="submit-btn" style={{ textDecoration: 'none', width: 'auto', padding: '1rem 2rem' }}>
                            Return to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                <Link to="/login" className="login-link-btn">Sign In</Link>
                <Link to="/application-status" className="login-link-btn" style={{ marginLeft: '1rem', background: '#f8fafc' }}>
                    Check Status
                </Link>
            </header>

            <div className="registration-card">
                <div className="registration-header">
                    <h1 className="registration-title">Join the Network</h1>
                    <p className="registration-subtitle">Register your institution to start issuing secure academic records.</p>
                </div>

                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group full-width">
                        <label className="form-label">Institution Name</label>
                        <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="e.g. Stanford University"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Accreditation Level</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Regional/Level 1"
                            value={formData.accreditation}
                            onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contact Email</label>
                        <input
                            type="email"
                            className="form-input"
                            required
                            placeholder="registrar@univ.edu"
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Administrative Password</label>
                        <input
                            type="password"
                            className="form-input"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            required
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Official Address</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Full campus address, City, Country"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Verification Document (PDF/Image)</label>
                        <div className="file-upload-wrapper" style={{
                            border: '2px dashed #e2e8f0',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            textAlign: 'center',
                            backgroundColor: file ? '#f0fdf4' : '#f8fafc',
                            borderColor: file ? '#10b981' : '#e2e8f0',
                            transition: 'all 0.2s'
                        }}>
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: file ? '#10b981' : '#94a3b8' }}>
                                    {file ? 'task_alt' : 'cloud_upload'}
                                </span>
                                <span style={{ fontWeight: 600, color: file ? '#065f46' : '#64748b' }}>
                                    {file ? file.name : 'Click to upload proof of accreditation'}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Supports PDF, JPG, PNG (Max 5MB)</span>
                            </label>
                        </div>
                    </div>

                    <div className="registration-footer">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-sm"></span>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">send</span>
                                    Submit Application
                                </>
                            )}
                        </button>
                        <Link to="/login" className="back-link">
                            Already registered? Click here to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstitutionRegistration;
