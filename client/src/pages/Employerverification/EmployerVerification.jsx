import React from 'react';
import './EmployerVerification.css';

const EmployerVerification = () => {
  return (
    <div className="verification-page">
      {/* Top Navigation */}
      <header className="verification-header no-print">
        <div className="verification-nav-container">
          <div className="nav-brand">
            <div className="brand-logo">
              <svg className="logo-svg" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="brand-text">Academic Exchange</span>
          </div>
          <div className="nav-actions">
            <button className="help-center-btn">Help Center</button>
            <button className="export-pdf-btn">
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
              <span className="verification-id">Verification ID: TADE-9982-X2Z</span>
              <span className="verification-timestamp">Timestamp: Oct 24, 2023 09:42 UTC</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="credential-card">
          {/* Institutional Header */}
          <div className="institution-header">
            <div className="institution-info">
              <div className="institution-logo">
                <img 
                  className="logo-image" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBkhGhCa54OVP540MGz1Tl37bL07vlWUAJFFeKB-kqSz6zSExvjf4qo3AQyeeDZhDTmVYxBr4A56RlhwOyeCgNQjpd27si5qkJCbxIDkaM3qJH7kqBjBNhKHWFPRguYBykCPLiABBFcnci49hacaFJ9CnQ81mWYO5aOcEYfbVUcg7yjnT0HBomEXQzbNv2q1KJvH9Rv-pPIMQoVs2eak2qy6RYIWZC4Vlt7kDkKxcUWawd-o7-6QRQMXUZGlRbKB5CAno1BpSggRc"
                  alt="University of Oxford Crest Logo"
                />
              </div>
              <div className="institution-details">
                <h2 className="institution-name">University of Oxford</h2>
                <p className="institution-office">Office of the Registrar | Wellington Square, Oxford</p>
                <p className="institution-contact">Contact: registrar@ox.ac.uk | +44 1865 270000</p>
              </div>
            </div>
            <div className="issuance-info">
              <p className="issuance-label">Issuance Date</p>
              <p className="issuance-date">June 28, 2023</p>
              <p className="issuance-ref">Ref: #OX-2023-JD-4412</p>
            </div>
          </div>

          {/* Student Summary */}
          <div className="student-summary">
            <div className="summary-content">
              <div 
                className="student-photo" 
                style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCx26rTOOHjPT4n3vO7jLiC6prPIcElw91DKcj9a2GqmvNLHBRHiXzwUD15fB_b6_Hfh5ZUYlUwpf3kOcJYwqyGMqXi94GSx3D4UUz_1isUGYw-7nS39i_D4Ylq5qB71UoSUilKYeHfBn4hyXfjd_77AJmDuglTudD9BSecpol1yPxBZrt28A3JrxI98gDW2Q6QrxyQRBx7YPRWge7ADwyFFBYk_v-TvVpDq_1eoLdfr20x-KFZVwT3kuDlTPI3ovxwmX7lLBdsNMM')"}}
              ></div>
              <div className="student-info-grid">
                <div className="info-field">
                  <span className="field-label">Candidate Full Name</span>
                  <p className="field-value-large">Jane Alice Doe</p>
                </div>
                <div className="info-field field-right">
                  <span className="field-label">Student ID Number</span>
                  <p className="field-value-large">98723451</p>
                </div>
                <div className="info-field">
                  <span className="field-label">Academic Program</span>
                  <p className="field-value-medium">Bachelor of Science in Computer Science</p>
                </div>
                <div className="info-field field-right">
                  <span className="field-label">Degree Classification</span>
                  <p className="field-value-medium">First Class Honours (1:1)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Transcript Section */}
          <div className="transcript-section">
            <div className="transcript-header">
              <h3 className="transcript-title">
                <span className="material-symbols-outlined title-icon">description</span>
                Official Transcript Data
              </h3>
              <span className="certified-badge">Read-Only Certified</span>
            </div>
            <div className="transcript-table-wrapper">
              <table className="transcript-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header-cell header-rounded-left">Code</th>
                    <th className="table-header-cell">Course Title</th>
                    <th className="table-header-cell">Term</th>
                    <th className="table-header-cell header-center">Credits</th>
                    <th className="table-header-cell header-center header-rounded-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {/* Semester 1 */}
                  <tr>
                    <td className="semester-label" colSpan="5">Final Year - Semester 2</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-code">CS-401</td>
                    <td className="course-title">Advanced Machine Learning</td>
                    <td className="course-term">Spring 2023</td>
                    <td className="course-credits">15</td>
                    <td className="course-grade">A+</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-code">CS-405</td>
                    <td className="course-title">Cloud Architecture & Scalability</td>
                    <td className="course-term">Spring 2023</td>
                    <td className="course-credits">15</td>
                    <td className="course-grade">A</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-code">CS-499</td>
                    <td className="course-title">Honours Dissertation Project</td>
                    <td className="course-term">Spring 2023</td>
                    <td className="course-credits">30</td>
                    <td className="course-grade">A+</td>
                  </tr>
                  {/* Semester 2 */}
                  <tr>
                    <td className="semester-label" colSpan="5">Final Year - Semester 1</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-code">CS-312</td>
                    <td className="course-title">Quantum Computing Foundation</td>
                    <td className="course-term">Autumn 2022</td>
                    <td className="course-credits">15</td>
                    <td className="course-grade">A-</td>
                  </tr>
                  <tr className="table-data-row">
                    <td className="course-code">CS-350</td>
                    <td className="course-title">Ethics in Artificial Intelligence</td>
                    <td className="course-term">Autumn 2022</td>
                    <td className="course-credits">10</td>
                    <td className="course-grade">A</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="table-footer-row">
                    <td className="footer-label" colSpan="3">Cumulative GPA:</td>
                    <td className="footer-credits">120 Total</td>
                    <td className="footer-gpa">3.96 / 4.0</td>
                  </tr>
                </tfoot>
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
                    <span className="validity-key">Document Hash (SHA-256)</span>
                    <span className="validity-value">f7a9...2e4d</span>
                  </div>
                  <div className="validity-row">
                    <span className="validity-key">Signing Authority</span>
                    <span className="validity-value">Ox-CA-Root-01</span>
                  </div>
                  <div className="validity-row">
                    <span className="validity-key">Signature Status</span>
                    <span className="validity-status">Valid & Untampered</span>
                  </div>
                </div>
              </div>
              <div className="qr-code-container">
                <div className="qr-code-wrapper">
                  <img 
                    className="qr-code-image" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_wj7ZVrSKvXyh6es8-FOuv3DXI64ljsew9CSz3KD3TffZAeTedGeTpj_ZhbVACIcJz7PbKyODUeE7zDGx2VJ_U3RlLIyKEo1pJmufQmLUJeU9AGWU2aRqb_yhz4UPCLzeN0-mGz0nr43ZmAo-dguiWgSOgygmpY6zUFoqtqrBhmMLd3V-QDYFdsK0ucFi6P27dbKnIyN5KMjvfEwTVbtnbrTbJuC5uDSXEnuxmPCtmKTORPk7OZ7BO0RqCHwDWUwPRwp1KClyrRI"
                    alt="Cryptographic QR code for verification link"
                  />
                </div>
                <p className="qr-code-description">
                  Scan to verify this record on the independent public ledger.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="action-bar no-print">
          <div className="session-info">
            <span className="material-symbols-outlined session-icon">lock</span>
            Secure, read-only session. Auto-expires in 24h.
          </div>
          <div className="action-buttons">
            <button className="report-btn">Report Discrepancy</button>
            <button className="print-btn">Print Certification</button>
          </div>
        </div>

        {/* Site Footer */}
        <footer className="site-footer">
          <p>© 2023 Academic Data Exchange Platform. All rights reserved.</p>
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

export default EmployerVerification;
