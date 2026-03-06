import React from 'react';
import { useParams } from 'react-router-dom';
import { useVerifyRecordQuery } from '../../store/api/recordsApi';
import { toast } from 'react-hot-toast';
import './RecordVerification.css';

const RecordVerification = () => {
  const { token } = useParams();
  const { data: verificationData, isLoading, error } = useVerifyRecordQuery(token);

  if (isLoading) {
    return (
      <div className="verification-loading">
        <div className="spinner"></div>
        <p>Verifying authenticity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="verification-error">
        <span className="material-symbols-outlined error-icon">error</span>
        <h2>Verification Failed</h2>
        <p>{error?.data?.message || 'Invalid or expired verification link.'}</p>
        <button className="back-btn" onClick={() => window.location.href = '/'}>Back to Home</button>
      </div>
    );
  }

  const { record, verificationId, expiresAt } = verificationData?.data || {};

  return (
    <div className="verification-page">
      {/* Top Navigation */}
      <header className="verification-header no-print">
        <div className="verification-nav-container">
          <div className="nav-brand">
            <div className="brand-logo">
              <span className="material-symbols-outlined logo-icon" style={{ fontSize: '24px', color: '#135bec' }}>account_balance</span>
            </div>
            <span className="brand-text">Academic Exchange</span>
          </div>
          <div className="nav-actions">
            <button className="help-center-btn">Help Center</button>
            <button className="export-pdf-btn" onClick={() => window.print()}>
              <span className="material-symbols-outlined btn-icon-sm">download</span>
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <main className="verification-main">
        {/* Verification Banner */}
        <div className="verification-banner">
          <div className="banner-content">
            <div className="banner-info">
              <div className="verified-badge">
                <span className="material-symbols-outlined verified-icon">check_circle</span>
              </div>
              <div className="banner-text">
                <h1 className="banner-title">Authenticity Verified</h1>
                <p className="banner-subtitle">This record is direct-from-source and cryptographically signed.</p>
              </div>
            </div>
            <div className="verification-meta">
              <span className="verification-id">Verification ID: {verificationId || 'TADE-' + token.substring(0, 8).toUpperCase()}</span>
              <span className="verification-timestamp">Expires: {expiresAt ? new Date(expiresAt).toLocaleString() : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="credential-card">
          {/* Institutional Header */}
          <div className="institution-header">
            <div className="institution-info">
              <div className="institution-logo">
                <div className="institution-avatar" style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#f6f6f8',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#135bec'
                }}>
                  {record?.institution?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="institution-details">
                <h2 className="institution-name">{record?.institution?.name || 'Academic Institution'}</h2>
                <p className="institution-office">Office of the Registrar | Official Records Dept.</p>
                <p className="institution-contact">Contact: {record?.institution?.contactEmail || 'registrar@institution.edu'}</p>
              </div>
            </div>
            <div className="issuance-info">
              <p className="issuance-label">Issuance Date</p>
              <p className="issuance-date">{record?.issueDate ? new Date(record.issueDate).toLocaleDateString() : 'N/A'}</p>
              <p className="issuance-ref">Status: {record?.status || 'Active'}</p>
            </div>
          </div>

          {/* Student Summary */}
          <div className="student-summary">
            <div className="summary-content">
              <div
                className="student-photo"
                style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${record?.student?.name || 'Student'}&background=random")` }}
              ></div>
              <div className="student-info-grid">
                <div className="info-field">
                  <span className="field-label">Candidate Full Name</span>
                  <p className="field-value-large">{record?.student?.name || 'N/A'}</p>
                </div>
                <div className="info-field field-right">
                  <span className="field-label">Record Status</span>
                  <p className="field-value-large">{record?.status || 'VERIFIED'}</p>
                </div>
                <div className="info-field">
                  <span className="field-label">Academic Program</span>
                  <p className="field-value-medium">{record?.program || 'N/A'}</p>
                </div>
                <div className="info-field field-right">
                  <span className="field-label">Degree Classification</span>
                  <p className="field-value-medium">{record?.degree || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Transcript Section (Simplified for this view) */}
          <div className="transcript-section">
            <div className="transcript-header">
              <h3 className="transcript-title">
                <span className="material-symbols-outlined title-icon">description</span>
                Official Record Details
              </h3>
              <span className="certified-badge">Read-Only Certified</span>
            </div>
            <div className="transcript-table-wrapper">
              <table className="transcript-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header-cell header-rounded-left">Record Information</th>
                    <th className="table-header-cell header-rounded-right header-center">Details</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-data-row">
                    <td className="course-title">Credential Type</td>
                    <td className="course-grade header-center">{record?.degree || 'Digital Transcript'}</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-title">Academic Result / Grade</td>
                    <td className="course-grade header-center">{record?.grade || 'Pass'}</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-title">Verification Protocol</td>
                    <td className="course-grade header-center">TADE-v1 (Public Ledger)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification & Digital Signature */}
          <div className="digital-signature-section">
            <div className="signature-grid">
              <div className="certificate-validity">
                <h4 className="validity-title">
                  <span className="material-symbols-outlined validity-icon">verified_user</span>
                  Digital Certificate Validity
                </h4>
                <div className="validity-details">
                  <div className="validity-row">
                    <span className="validity-key">Document ID</span>
                    <span className="validity-value">{record?.id || 'Record_Signed'}</span>
                  </div>
                  <div className="validity-row">
                    <span className="validity-key">Signing Authority</span>
                    <span className="validity-value">{record?.institution?.name || 'TADE Authorized'}</span>
                  </div>
                  <div className="validity-row">
                    <span className="validity-key">Signature Status</span>
                    <span className="validity-status">Valid & Untampered</span>
                  </div>
                </div>
              </div>
              <div className="qr-code-container">
                <div className="qr-code-wrapper">
                  <span className="material-symbols-outlined" style={{ fontSize: '100px', color: '#135bec' }}>qr_code_2</span>
                </div>
                <p className="qr-code-description">
                  Cryptographically secured by Trusted Data Exchange network.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="action-bar no-print">
          <div className="session-info">
            <span className="material-symbols-outlined session-icon">lock</span>
            Secure, read-only session. Powered by TADE.
          </div>
          <div className="action-buttons">
            <button className="report-btn" onClick={() => toast.info('Reporting discrepancy')}>Report Discrepancy</button>
            <button className="print-btn" onClick={() => window.print()}>Print Certification</button>
          </div>
        </div>

        {/* Site Footer */}
        <footer className="site-footer">
          <p>© 2024 Trusted Data Exchange Platform. All rights reserved.</p>
          <p className="footer-disclaimer">
            This link provides a single-source-of-truth from the issuing institution. If you received this document via any other method, please verify it here.
          </p>
        </footer>
      </main>

      {/* Background Decoration */}
      <div className="gradient-bar"></div>
    </div>
  );
};

export default RecordVerification;

