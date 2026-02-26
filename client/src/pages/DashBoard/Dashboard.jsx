import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">Academic Data</h1>
            <p className="brand-subtitle">Student Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="nav-item active-nav" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <p className="nav-text">Dashboard</p>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">description</span>
            <p className="nav-text">My Records</p>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">share</span>
            <p className="nav-text">Share</p>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">history</span>
            <p className="nav-text">History</p>
          </a>
          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">person</span>
            <p className="nav-text">Profile</p>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="upload-btn">
            <span className="material-symbols-outlined btn-icon">cloud_upload</span>
            Upload Document
          </button>
          <div className="user-profile">
            <div
              className="profile-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTsdwczZqhm9TgwcsYcyyh38nHbv2nPvCQtyXf8oGQFaI07fggNjweQAM0Or3gWaCu4Fu2ZMLwVub5c5TPELZAIqGALi-MmxV9t-_mF2U_nEMS3c4jERt397aG7O7FlL9PPydQrOsh9-0kKdz_DFEXllxFyEUgo5LLcRc2pqdzg_OOdAhbQUDvB-Rn3kDPH3bIzbz2hZEztbbEYelf-KvhoQYqgUaTt34z8oIuK8cc2-d_T7MkH64pf3_jBW6xxTL02fl8StsoXKA")' }}
            ></div>
            <div className="profile-info">
              <h2 className="profile-name">Alex Johnson</h2>
              <span className="profile-status">Verified Identity</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Navigation Bar */}
        <header className="top-header">
          <div className="search-wrapper">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              className="search-input"
              placeholder="Search transcripts, certificates, or history..."
              type="text"
            />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="icon-btn">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="divider-vertical"></div>
            <div className="language-selector">
              <span className="lang-text">EN</span>
              <span className="material-symbols-outlined expand-icon">expand_more</span>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {/* Summary Section */}
          <div className="summary-section">
            <h2 className="section-title">Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <p className="stat-label">Total Records</p>
                  <span className="material-symbols-outlined stat-icon primary-icon">folder_open</span>
                </div>
                <p className="stat-value">12</p>
                <p className="stat-trend positive">
                  <span className="material-symbols-outlined trend-icon">trending_up</span> +2 this month
                </p>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <p className="stat-label">Shared</p>
                  <span className="material-symbols-outlined stat-icon indigo-icon">send</span>
                </div>
                <p className="stat-value">05</p>
                <p className="stat-meta">To 3 institutions</p>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <p className="stat-label">Active Links</p>
                  <span className="material-symbols-outlined stat-icon orange-icon">link</span>
                </div>
                <p className="stat-value">03</p>
                <p className="stat-trend negative">
                  <span className="material-symbols-outlined trend-icon">schedule</span> 1 expiring soon
                </p>
              </div>
            </div>
          </div>

          {/* Academic Records List */}
          <div className="records-container">
            <div className="records-header">
              <h3 className="records-title">Recent Academic Records</h3>
              <button className="view-all-btn">
                View All <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
              </button>
            </div>
            <div className="records-list">
              {/* Record Item 1 */}
              <div className="record-item">
                <div className="record-content">
                  <div className="record-icon primary-bg">
                    <span className="material-symbols-outlined icon-lg">workspace_premium</span>
                  </div>
                  <div className="record-info">
                    <h4 className="record-title">Bachelor of Science in Computer Science</h4>
                    <p className="record-meta">Stanford University • Issued May 2023</p>
                  </div>
                </div>
                <div className="record-actions">
                  <div className="record-status">
                    <span className="status-badge verified">
                      <span className="status-dot"></span> Verified
                    </span>
                    <span className="record-ref">Ref: #STN-9923</span>
                  </div>
                  <button className="menu-btn">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Record Item 2 */}
              <div className="record-item">
                <div className="record-content">
                  <div className="record-icon indigo-bg">
                    <span className="material-symbols-outlined icon-lg">history_edu</span>
                  </div>
                  <div className="record-info">
                    <h4 className="record-title">Official Academic Transcript</h4>
                    <p className="record-meta">Stanford University • Issued June 2023</p>
                  </div>
                </div>
                <div className="record-actions">
                  <div className="record-status">
                    <span className="status-badge shared">
                      <span className="status-dot"></span> Shared
                    </span>
                    <span className="record-ref shared-info">Visible to: Google Inc.</span>
                  </div>
                  <button className="menu-btn">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Record Item 3 */}
              <div className="record-item">
                <div className="record-content">
                  <div className="record-icon orange-bg">
                    <span className="material-symbols-outlined icon-lg">language</span>
                  </div>
                  <div className="record-info">
                    <h4 className="record-title">IELTS Language Certification</h4>
                    <p className="record-meta">British Council • Issued Jan 2024</p>
                  </div>
                </div>
                <div className="record-actions">
                  <div className="record-status">
                    <span className="status-badge verified">
                      <span className="status-dot"></span> Verified
                    </span>
                    <span className="record-ref">Ref: #BC-0045-8</span>
                  </div>
                  <button className="menu-btn">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Record Item 4 */}
              <div className="record-item">
                <div className="record-content">
                  <div className="record-icon gray-bg">
                    <span className="material-symbols-outlined icon-lg">verified_user</span>
                  </div>
                  <div className="record-info">
                    <h4 className="record-title">Cybersecurity Professional Cert</h4>
                    <p className="record-meta">Coursera (IBM) • Issued March 2024</p>
                  </div>
                </div>
                <div className="record-actions">
                  <div className="record-status">
                    <span className="status-badge processing">
                      <span className="status-dot"></span> Processing
                    </span>
                    <span className="record-ref">Est. 24-48 hours</span>
                  </div>
                  <button className="menu-btn">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid Section */}
          <div className="bottom-grid">
            <div className="verification-card">
              <h3 className="card-title">Record Verification Status</h3>
              <div className="verification-content">
                <div className="progress-item">
                  <span className="progress-label">Blockchain Secured</span>
                  <span className="progress-value success">100%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill full"></div>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Employer Access Audit</span>
                  <span className="progress-value primary">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill partial"></div>
                </div>
              </div>
            </div>

            <div className="cta-card">
              <div className="cta-content">
                <h3 className="cta-title">Secure Share</h3>
                <p className="cta-description">
                  Instantly send verified credentials to over 5,000 global employers and institutions.
                </p>
              </div>
              <div className="cta-action">
                Start Sharing <span className="material-symbols-outlined cta-arrow">arrow_right_alt</span>
              </div>
              <div className="cta-decoration"></div>
              <div className="cta-icon">
                <span className="material-symbols-outlined">hub</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
