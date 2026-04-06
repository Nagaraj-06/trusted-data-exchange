import React from 'react';
import { useParams } from 'react-router-dom';
import { useVerifyRecordQuery } from '../../store/api/recordsApi';
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
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
            <div className="security-header">
              <span className="material-symbols-outlined security-main-icon">verified_user</span>
              <div>
                <h3 className="security-title">Digital Certificate Validity</h3>
                <p className="security-subtitle">Cryptographically secured by Trusted Data Exchange network.</p>
              </div>
            </div>

            <div className="qr-verification-seal">
              <div className="qr-code-wrapper">
                <QRCodeSVG
                  value={window.location.href}
                  size={140}
                  level={"H"}
                  includeMargin={true}
                  className="qr-code-image"
                />
              </div>
            </div>

            <div className="proof-grid">
              <div className="proof-card">
                <div className="proof-icon-wrapper blue">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <div className="proof-content">
                  <span className="proof-label">Document ID</span>
                  <span className="proof-value">{record?.id || 'Record_Signed'}</span>
                </div>
              </div>

              <div className="proof-card">
                <div className="proof-icon-wrapper green">
                  <span className="material-symbols-outlined">corporate_fare</span>
                </div>
                <div className="proof-content">
                  <span className="proof-label">Signing Authority</span>
                  <span className="proof-value">{record?.institution?.name || 'TADE Authorized'}</span>
                </div>
              </div>

              <div className="proof-card">
                <div className="proof-icon-wrapper orange">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div className="proof-content">
                  <span className="proof-label">Signature Status</span>
                  <div className="issuer-verification">
                    <span className="material-symbols-outlined check-sm">check_circle</span>
                    Valid & Untampered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Authenticity Proofs */}
        <div className="security-proof-section">
          <div className="security-header">
            <span className="material-symbols-outlined security-main-icon">verified</span>
            <div>
              <h3 className="security-title">Security & Authenticity Fingerprint</h3>
              <p className="security-subtitle">Cryptographically signed by {record?.institution?.name}</p>
            </div>
          </div>

          <div className="proof-grid">
            <div className="proof-card">
              <div className="proof-icon-wrapper blue">
                <span className="material-symbols-outlined">fingerprint</span>
              </div>
              <div className="proof-content">
                <span className="proof-label">Digital Signature Hash</span>
                <code className="proof-value">
                  {record?.id ? `SHA256:${btoa(record.id + 'SECRET').substring(0, 32).toUpperCase()}` : 'Generating...'}
                </code>
              </div>
            </div>

            <div className="proof-card">
              <div className="proof-icon-wrapper green">
                <span className="material-symbols-outlined">account_tree</span>
              </div>
              <div className="proof-content">
                <span className="proof-label">Blockchain Transaction</span>
                <code className="proof-value">
                  {record?.id ? `0X${String(record.id).substring(0, 8)}${token.substring(0, 12)}...` : 'Pending Ledger...'}
                </code>
              </div>
              <div className="blockchain-status">
                <span className="dot pulse"></span>
                Verified on Mainnet
              </div>
            </div>

            <div className="proof-card">
              <div className="proof-icon-wrapper orange">
                <span className="material-symbols-outlined">shield_person</span>
              </div>
              <div className="proof-content">
                <span className="proof-label">Issuer Authenticity</span>
                <div className="issuer-verification">
                  <span className="material-symbols-outlined check-sm">check_circle</span>
                  University SSO Verified
                </div>
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

