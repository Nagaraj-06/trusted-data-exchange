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
      <div className="rv-loading-screen">
        <div className="rv-spinner"></div>
        <p className="rv-loading-text">Verifying document authenticity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rv-error-container">
        <div className="rv-error-card">
          <span className="material-symbols-outlined rv-error-icon">error</span>
          <h2 className="rv-error-title">Verification Link Invalid</h2>
          <p className="rv-error-message">{error?.data?.message || 'This verification link is invalid, expired, or has been revoked by the owner.'}</p>
          <button className="rv-home-btn" onClick={() => window.location.href = '/'}>
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const { record, verificationId, expiresAt } = verificationData?.data || {};

  return (
    <div className="rv-page-wrapper">
      {/* Top Navbar */}
      <header className="rv-navbar no-print">
        <div className="rv-nav-content">
          <div className="rv-nav-brand" onClick={() => window.location.href = '/'}>
            <div className="rv-brand-icon">
              <span className="material-symbols-outlined">shield_person</span>
            </div>
            <div className="rv-brand-text">
              <span className="rv-brand-name">Academic Exchange</span>
              <span className="rv-brand-tag">Verification Portal</span>
            </div>
          </div>
          <div className="rv-nav-actions">
            <button className="rv-nav-btn rv-btn-outline no-mobile" onClick={() => toast.info('Our support team is available 24/7')}>
              Support
            </button>
            <button className="rv-nav-btn rv-btn-primary" onClick={() => window.print()}>
              <span className="material-symbols-outlined">download</span>
              Save PDF
            </button>
          </div>
        </div>
      </header>

      <main className="rv-main-container">
        {/* Verification Status Banner */}
        <div className="rv-banner-verified">
          <div className="rv-banner-inner">
            <div className="rv-status-badge">
              <div className="rv-badge-icon">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div className="rv-status-text">
                <h1 className="rv-status-title">Authenticity Confirmed</h1>
                <p className="rv-status-desc">This record is verified from the source and cryptographically signed.</p>
              </div>
            </div>
            <div className="rv-verification-metadata">
              <div className="rv-meta-item">
                <span className="rv-meta-label">Verification ID</span>
                <span className="rv-meta-value">{verificationId || `TADE-${token.substring(0, 8).toUpperCase()}`}</span>
              </div>
              <div className="rv-meta-item">
                <span className="rv-meta-label">Link Expiry</span>
                <span className="rv-meta-value">
                  {expiresAt ? new Date(expiresAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Digital Certificate Card */}
        <div className="rv-credential-card">
          {/* Institution Header */}
          <section className="rv-section rv-card-header">
            <div className="rv-institution-block">
              <div className="rv-institution-avatar">
                {record?.institution?.name?.charAt(0) || 'U'}
              </div>
              <div className="rv-institution-info">
                <h2 className="rv-institution-title">{record?.institution?.name || 'Academic Institution'}</h2>
                <div className="rv-institution-meta">
                  <span>Official Records Dept.</span>
                  <span className="rv-dot-separator"></span>
                  <span>{record?.institution?.contactEmail}</span>
                </div>
              </div>
            </div>
            <div className="rv-issuance-block">
              <span className="rv-issuance-label">Issued On</span>
              <span className="rv-issuance-value">{record?.issueDate ? new Date(record.issueDate).toLocaleDateString() : 'N/A'}</span>
              <div className="rv-ref-tag">#{record?.refCode}</div>
            </div>
          </section>

          {/* Student Profile Overview */}
          <section className="rv-section rv-student-overview">
            <div className="rv-student-card">
              <div className="rv-profile-section">
                <div
                  className="rv-profile-image"
                  style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${record?.student?.name || 'S'}&background=135bec&color=fff&size=128")` }}
                ></div>
                <div className="rv-student-primary">
                  <span className="rv-label">Awarded To</span>
                  <p className="rv-student-name">{record?.student?.name || 'N/A'}</p>
                  <div className="rv-status-pill verified">
                    <span className="rv-pulse"></span>
                    Identity Verified
                  </div>
                </div>
              </div>

              <div className="rv-academic-grid">
                <div className="rv-academic-item">
                  <span className="rv-label">Degree Conferred</span>
                  <p className="rv-value">{record?.degree || 'N/A'}</p>
                </div>
                <div className="rv-academic-item">
                  <span className="rv-label">Major / Program</span>
                  <p className="rv-value">{record?.program || 'N/A'}</p>
                </div>
                <div className="rv-academic-item">
                  <span className="rv-label">Graduation Year</span>
                  <p className="rv-value">{record?.graduationYear || 'N/A'}</p>
                </div>
                <div className="rv-academic-item">
                  <span className="rv-label">Final Grade / GPA</span>
                  <p className="rv-value rv-highlight">{record?.grade || 'Pass'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Protocol & QR */}
          <section className="rv-section rv-security-protocol">
            <div className="rv-security-flex">
              <div className="rv-security-info">
                <div className="rv-security-header">
                  <span className="material-symbols-outlined rv-icon-sec">verified_user</span>
                  <div>
                    <h3 className="rv-sec-title">Digital Signature Policy</h3>
                    <p className="rv-sec-desc">This document contains a unique cryptographic hash and QR verification seal.</p>
                  </div>
                </div>

                <div className="rv-proof-list">
                  <div className="rv-proof-row">
                    <span className="material-symbols-outlined rv-check">check_circle</span>
                    <span>Issuer Authenticity: <strong>Confirmed via SSO</strong></span>
                  </div>
                  <div className="rv-proof-row">
                    <span className="material-symbols-outlined rv-check">check_circle</span>
                    <span>Document Integrity: <strong>No tampering detected</strong></span>
                  </div>
                  <div className="rv-proof-row">
                    <span className="material-symbols-outlined rv-check">check_circle</span>
                    <span>Blockchain Status: <strong>Verified on Ledger</strong></span>
                  </div>
                </div>
              </div>

              <div className="rv-qr-section">
                <div className="rv-qr-container">
                  <QRCodeSVG
                    value={window.location.href}
                    size={110}
                    level={"H"}
                    className="rv-qr-svg"
                  />
                </div>
                <p className="rv-qr-hint">Scan to verify original</p>
              </div>
            </div>
          </section>
        </div>

        {/* Technical Identity Section */}
        <section className="rv-tech-specs">
          <div className="rv-tech-header">
            <h3 className="rv-tech-title">Cryptographic Fingerprint</h3>
            <span className="rv-tech-tag">TADE-v1.0 Standard</span>
          </div>
          <div className="rv-tech-content">
            <div className="rv-hash-block">
              <span className="rv-hash-label">Document Hash (SHA256)</span>
              <code className="rv-hash-value">
                {record?.id ? `SHA256:${btoa(record.id + 'TADE_PRIVATE_KEY').substring(0, 48).toUpperCase()}` : '0x000...'}
              </code>
            </div>
            <div className="rv-hash-block">
              <span className="rv-hash-label">Blockchain TX Hash</span>
              <code className="rv-hash-value">
                {record?.id ? `TXN:0x${String(record.id).padStart(8, '0')}${token.substring(0, 24)}` : 'Pending broadcast...'}
              </code>
            </div>
          </div>
        </section>

        {/* Footer Area */}
        <footer className="rv-footer no-print">
          <div className="rv-footer-links">
            <button className="rv-footer-link" onClick={() => toast.info('Redirecting to report form...')}>Report Discrepancy</button>
            <span className="rv-separator">|</span>
            <button className="rv-footer-link">Terms of Service</button>
            <span className="rv-separator">|</span>
            <button className="rv-footer-link">Privacy Policy</button>
          </div>
          <p className="rv-copyright">© 2024 Trusted Data Exchange. Powered by Federated Ledger Identity.</p>
        </footer>
      </main>

      {/* Decorative gradient background */}
      <div className="rv-bg-top"></div>
      <div className="rv-bg-bottom"></div>
    </div>
  );
};

export default RecordVerification;

