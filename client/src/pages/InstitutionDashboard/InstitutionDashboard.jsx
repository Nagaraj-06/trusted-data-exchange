import React from 'react';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
  return (
    <div className="institution-container">
      {/* Side Navigation */}
      <aside className="institution-sidebar">
        <div className="sidebar-header">
          <div className="header-content">
            <div className="header-icon">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div className="header-text">
              <h1 className="header-title">EduTrust</h1>
              <p className="header-subtitle">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="sidebar-navigation">
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="nav-link-text">Dashboard</span>
          </a>
          <a className="nav-link active" href="#">
            <span className="material-symbols-outlined">description</span>
            <span className="nav-link-text">Records</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="nav-link-text">Analytics</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="nav-link-text">Students</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="nav-link-text">Settings</span>
          </a>
        </nav>
        <div className="sidebar-user">
          <div className="user-content">
            <div
              className="user-avatar"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC56HrqckMOPtIM6JG7FuwKbhUOTmm5Qmeus7QhX-iaBpHXlOfKoTmC12rs0aCEwlqM5RtW-MAWCS4oHFCiT0zvKC05jHgIEodMZO2dG1BKK79pbccGSaXsZFFoTjBxdfTQNA03j2CVapP4LpxJ65_N7O7-mBnBeWlzpFbDibPaD3QWtz3Em-RfOrcuhAcRXNkOIuWU7K1_CT0THrb16gGsObm7ktAo_5Rk70Rhe4ObWfKCn10UhL1fjLDenrmBXaf3VrZUcERZobs")' }}
            ></div>
            <div className="user-info">
              <p className="user-name">Dr. Sarah Miller</p>
              <p className="user-role">Registrar Office</p>
            </div>
            <span className="material-symbols-outlined logout-icon">logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="institution-main">
        {/* Header */}
        <header className="main-header">
          <h2 className="page-title">Institution Dashboard</h2>
          <div className="header-controls">
            <div className="search-container">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                className="search-input"
                placeholder="Search records..."
                type="text"
              />
            </div>
            <button className="notification-btn">
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-badge"></span>
            </button>
            <button className="help-btn">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="institution-main-content">
          {/* Page Heading */}
          <div className="content-header">
            <div className="header-info">
              <h1 className="content-title">Record Management</h1>
              <p className="content-subtitle">Manage and verify academic credentials for students and alumni.</p>
            </div>
            <div className="header-actions">
              <button className="export-btn">
                <span className="material-symbols-outlined btn-icon">download</span>
                Export CSV
              </button>
              <button className="upload-btn">
                <span className="material-symbols-outlined btn-icon">upload</span>
                Bulk Upload
              </button>
            </div>
          </div>

          {/* Record Entry Section */}
          <div className="entry-grid">
            {/* File Upload Card */}
            <div className="upload-card">
              <h3 className="card-title">Upload Bulk Records</h3>
              <div className="upload-zone">
                <div className="upload-icon-wrapper">
                  <span className="material-symbols-outlined upload-icon">cloud_upload</span>
                </div>
                <p className="upload-title">Drag and Drop File Upload</p>
                <p className="upload-subtitle">Supports .csv, .xlsx up to 10MB</p>
                <button className="select-files-btn">Select Files</button>
              </div>
            </div>

            {/* Manual Form Card */}
            <div className="form-card">
              <h3 className="card-title">Add Single Record</h3>
              <form className="record-form">
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Student Name</label>
                    <input
                      className="field-input"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Student ID</label>
                    <input
                      className="field-input"
                      placeholder="STU-2024-001"
                      type="text"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label">Degree Program</label>
                  <select className="field-input">
                    <option>B.Sc. Computer Science</option>
                    <option>B.A. Economics</option>
                    <option>M.Sc. Data Science</option>
                    <option>MBA Business Administration</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Issue Date</label>
                    <input
                      className="field-input"
                      type="date"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Graduation Year</label>
                    <input
                      className="field-input"
                      placeholder="2024"
                      type="number"
                    />
                  </div>
                </div>
                <button className="create-btn" type="button">Create Record</button>
              </form>
            </div>
          </div>

          {/* Records Table Section */}
          <div className="table-container">
            <div className="table-header">
              <h3 className="table-title">Recent Academic Records</h3>
              <div className="table-actions">
                <button className="action-btn">
                  <span className="material-symbols-outlined btn-icon">filter_list</span>
                  Filter
                </button>
                <button className="action-btn">
                  <span className="material-symbols-outlined btn-icon">sort</span>
                  Sort
                </button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="records-table">
                <thead>
                  <tr className="table-head-row">
                    <th className="table-head">Name</th>
                    <th className="table-head">Degree</th>
                    <th className="table-head">Issue Date</th>
                    <th className="table-head">Status</th>
                    <th className="table-head text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr>
                    <td className="table-cell">
                      <div className="student-info">
                        <div className="student-avatar primary-avatar">AH</div>
                        <div className="student-details">
                          <p className="student-name">Alice Henderson</p>
                          <p className="student-id">ID: 2024-9981</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell degree-cell">B.Sc. Computer Science</td>
                    <td className="table-cell date-cell">Jun 15, 2024</td>
                    <td className="table-cell">
                      <span className="status-badge verified">
                        <span className="status-dot"></span> Verified
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <button className="action-menu-btn">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      <div className="student-info">
                        <div className="student-avatar orange-avatar">MT</div>
                        <div className="student-details">
                          <p className="student-name">Marcus Thompson</p>
                          <p className="student-id">ID: 2024-9972</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell degree-cell">B.A. Economics</td>
                    <td className="table-cell date-cell">Jun 12, 2024</td>
                    <td className="table-cell">
                      <span className="status-badge pending">
                        <span className="status-dot"></span> Pending
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <button className="action-menu-btn">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      <div className="student-info">
                        <div className="student-avatar blue-avatar">SL</div>
                        <div className="student-details">
                          <p className="student-name">Sarah Lopez</p>
                          <p className="student-id">ID: 2024-9965</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell degree-cell">M.Sc. Data Science</td>
                    <td className="table-cell date-cell">Jun 10, 2024</td>
                    <td className="table-cell">
                      <span className="status-badge verified">
                        <span className="status-dot"></span> Verified
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <button className="action-menu-btn">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      <div className="student-info">
                        <div className="student-avatar purple-avatar">JW</div>
                        <div className="student-details">
                          <p className="student-name">James Wilson</p>
                          <p className="student-id">ID: 2024-9950</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell degree-cell">MBA Business</td>
                    <td className="table-cell date-cell">Jun 08, 2024</td>
                    <td className="table-cell">
                      <span className="status-badge revoked">
                        <span className="status-dot"></span> Revoked
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <button className="action-menu-btn">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <p className="footer-text">Showing 1-4 of 1,240 records</p>
              <div className="pagination">
                <button className="pagination-btn" disabled>Previous</button>
                <button className="pagination-btn active">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard;
