import React from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="material-symbols-outlined logo-icon">account_balance</span>
          </div>
          <div>
            <h1 className="logo-title">Admin Panel</h1>
            <p className="logo-subtitle">Academic Data Exchange</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="nav-link nav-link-active" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="nav-link-text">Dashboard</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">corporate_fare</span>
            <span className="nav-link-text">Institutions</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="nav-link-text">Users</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="nav-link-text">Audits</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="nav-link-text">Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div
              className="user-avatar"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSMbOT-JBp-CoXAzXsuja5OZ5JUiLELddCeArwslz-k1MWPms88_h0lW_bnlc4WDoLCp6wpS1R3GtNWuGJhjaTswFlU2zIu87JOU2-liDDF-8pSwlScoQWvFKdBCndfz4vT5aLyLmZqSh_4A8-hodAa9cz62Qi4FtXKDBtN5Us0cHxJHgqaLyYab7AxxdiptSMUED7mgNmeN5ytGNx-iRtzh6GFdvR6Qd42BZoZE4hyP4f4izoq6uT-TCg_nfH0fuXBopAyXhNTYU')" }}
            ></div>
            <div className="user-info">
              <p className="user-name">Alex Rivera</p>
              <p className="user-role">System Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-header">
          <div className='top-header-left'>
            <h2 className="page-title">System Overview</h2>
            <div className="search-container">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                className="search-input"
                placeholder="Search data, logs, or institutions..."
                type="text"
              />
            </div>
          </div>
          <div className="header-actions">
            <button className="header-btn">
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-badge"></span>
            </button>
            <button className="header-btn">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-header">
                <p className="stat-label">System Status</p>
                <span className="status-indicator"></span>
              </div>
              <p className="stat-value">Operational</p>
              <p className="stat-detail stat-success">Uptime 99.98%</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Active Institutions</p>
              <p className="stat-value">1,248</p>
              <p className="stat-detail stat-success">+12 this month</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Total Students</p>
              <p className="stat-value">4.2M</p>
              <p className="stat-detail stat-success">+145k new records</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Pending Approvals</p>
              <p className="stat-value">14</p>
              <p className="stat-detail stat-warning">Requires attention</p>
            </div>
          </div>

          {/* Pending Approvals Section */}
          <section className="section-card">
            <div className="section-header">
              <div>
                <h3 className="section-title">Pending Institutional Approvals</h3>
                <p className="section-subtitle">Verify and authorize new institutions to join the exchange.</p>
              </div>
              <button className="view-all-btn">View All Queues</button>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header">Institution</th>
                    <th className="table-header">Accreditation</th>
                    <th className="table-header">Applied Date</th>
                    <th className="table-header table-header-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr>
                    <td className="table-cell">
                      <div className="institution-cell">
                        <div className="institution-avatar">GT</div>
                        <span className="institution-name">Global Tech University</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-blue">Level 4 Certified</span>
                    </td>
                    <td className="table-cell table-cell-muted">Oct 24, 2023</td>
                    <td className="table-cell table-cell-right">
                      <div className="action-buttons">
                        <button className="btn btn-primary">Approve</button>
                        <button className="btn btn-secondary">Reject</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      <div className="institution-cell">
                        <div className="institution-avatar">NS</div>
                        <span className="institution-name">North State College</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-amber">Pending Review</span>
                    </td>
                    <td className="table-cell table-cell-muted">Oct 25, 2023</td>
                    <td className="table-cell table-cell-right">
                      <div className="action-buttons">
                        <button className="btn btn-primary">Approve</button>
                        <button className="btn btn-secondary">Reject</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Audit Log Section */}
          <section className="section-card">
            <div className="section-header section-header-complex">
              <div>
                <h3 className="section-title">System Audit Log</h3>
                <p className="section-subtitle">Real-time trail of all administrative and system actions.</p>
              </div>
              <div className="filter-controls">
                <select className="filter-select">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <select className="filter-select">
                  <option>All Actions</option>
                  <option>Security</option>
                  <option>Data Export</option>
                  <option>User Mgmt</option>
                </select>
                <button className="filter-btn">
                  <span className="material-symbols-outlined filter-icon">filter_list</span>
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="table-header-row">
                    <th className="table-header">Timestamp</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Action</th>
                    <th className="table-header">Resource</th>
                    <th className="table-header">IP Address</th>
                  </tr>
                </thead>
                <tbody className="table-body audit-table-body">
                  <tr>
                    <td className="table-cell audit-timestamp">2023-11-01 14:32:01</td>
                    <td className="table-cell audit-user">m.jenkins@admin.com</td>
                    <td className="table-cell">
                      <span className="audit-badge audit-badge-default">User Updated</span>
                    </td>
                    <td className="table-cell audit-resource">Profile: id_88291</td>
                    <td className="table-cell audit-ip">192.168.1.104</td>
                  </tr>
                  <tr>
                    <td className="table-cell audit-timestamp">2023-11-01 14:28:45</td>
                    <td className="table-cell audit-user">System / Automated</td>
                    <td className="table-cell">
                      <span className="audit-badge audit-badge-success">Data Sync</span>
                    </td>
                    <td className="table-cell audit-resource">Global Tech Records</td>
                    <td className="table-cell audit-ip">Internal</td>
                  </tr>
                  <tr>
                    <td className="table-cell audit-timestamp">2023-11-01 13:55:12</td>
                    <td className="table-cell audit-user">s.chen@manager.edu</td>
                    <td className="table-cell">
                      <span className="audit-badge audit-badge-warning">Export Started</span>
                    </td>
                    <td className="table-cell audit-resource">Transcripts_Q3.csv</td>
                    <td className="table-cell audit-ip">45.22.10.89</td>
                  </tr>
                  <tr>
                    <td className="table-cell audit-timestamp">2023-11-01 13:40:02</td>
                    <td className="table-cell audit-user">a.rivera@admin.com</td>
                    <td className="table-cell">
                      <span className="audit-badge audit-badge-default">Institution Added</span>
                    </td>
                    <td className="table-cell audit-resource">Ivy Ridge Institute</td>
                    <td className="table-cell audit-ip">10.0.0.42</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span className="table-footer-info">Showing 1-10 of 42,901 entries</span>
              <div className="pagination-controls">
                <button className="pagination-btn" disabled>Previous</button>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
