import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout as logoutAction } from '../../store/slices/authSlice';
import {
  useGetRecordsQuery,
  useIssueRecordMutation,
  useBulkIssueRecordsMutation,
  useUpdateRecordStatusMutation
} from '../../store/api/recordsApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { toast } from 'react-hot-toast';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('Records');
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    studentId: '',
    degree: '',
    program: '',
    issueDate: '',
    graduationYear: '',
    grade: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // API Hooks
  const { data: recordsResponse, isLoading: recordsLoading } = useGetRecordsQuery();
  const [issueRecord, { isLoading: isIssuing }] = useIssueRecordMutation();
  const [bulkIssue, { isLoading: isBulkIssuing }] = useBulkIssueRecordsMutation();
  const [updateStatus] = useUpdateRecordStatusMutation();
  const [logoutApi] = useLogoutMutation();

  const fileInputRef = React.useRef(null);

  const records = recordsResponse?.data || [];

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAction());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIssueRecord = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    try {
      await issueRecord({
        ...formData,
        studentId: parseInt(formData.studentId),
        graduationYear: parseInt(formData.graduationYear)
      }).unwrap();
      setFormSuccess('Record issued successfully!');
      setFormData({ studentId: '', degree: '', program: '', issueDate: '', graduationYear: '', grade: '' });
    } catch (err) {
      setFormError(err.data?.message || 'Failed to issue record');
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        let recordsToUpload = [];

        if (file.name.endsWith('.json')) {
          recordsToUpload = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          // Very basic CSV parser for trial
          const lines = text.split('\n');
          const headers = lines[0].split(',');
          recordsToUpload = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
            return obj;
          });
        }

        if (recordsToUpload.length > 0) {
          await bulkIssue(recordsToUpload).unwrap();
          setFormSuccess(`${recordsToUpload.length} records processed in bulk!`);
        }
      } catch (err) {
        setFormError('Failed to process bulk upload. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Record status updated to ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

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
              <h1 className="header-title">{user?.institution?.name || 'EduTrust'}</h1>
              <p className="header-subtitle">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="sidebar-navigation">
          <button
            className={`nav-link-btn ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="nav-link-text">Dashboard</span>
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'Records' ? 'active' : ''}`}
            onClick={() => setActiveTab('Records')}
          >
            <span className="material-symbols-outlined">description</span>
            <span className="nav-link-text">Records</span>
          </button>
          <button
            className="nav-link-btn"
            onClick={() => toast.info('Settings coming soon')}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="nav-link-text">Settings</span>
          </button>
        </nav>
        <div className="sidebar-user">
          <div className="user-content">
            <div
              className="user-avatar"
              style={{ backgroundImage: 'url("https://ui-avatars.com/api/?name=' + (user?.name || 'Admin') + '")' }}
            ></div>
            <div className="user-info">
              <p className="user-name">{user?.name || 'Admin Name'}</p>
              <p className="user-role">Registrar Office</p>
            </div>
            <span className="material-symbols-outlined logout-icon" onClick={handleLogout} style={{ cursor: 'pointer' }}>logout</span>
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
            <button className="notification-btn" onClick={handleLogout} title="Logout">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="institution-main-content">
          <div className="content-header">
            <div className="header-info">
              <h1 className="content-title">Record Management</h1>
              <p className="content-subtitle">Manage and verify academic credentials for students and alumni.</p>
            </div>
          </div>

          {/* Record Entry Section */}
          <div className="entry-grid">
            <div className="form-card">
              <h3 className="card-title">Add Single Record</h3>
              {formError && <p style={{ color: 'red', marginBottom: '1rem' }}>{formError}</p>}
              {formSuccess && <p style={{ color: 'green', marginBottom: '1rem' }}>{formSuccess}</p>}
              <form className="record-form" onSubmit={handleIssueRecord}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Student ID (Numeric)</label>
                    <input
                      name="studentId"
                      className="field-input"
                      placeholder="e.g. 1"
                      type="number"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Grade</label>
                    <input
                      name="grade"
                      className="field-input"
                      placeholder="A+, 4.0, etc."
                      type="text"
                      value={formData.grade}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="field-label">Degree Title</label>
                  <input
                    name="degree"
                    className="field-input"
                    placeholder="B.Sc. Computer Science"
                    type="text"
                    value={formData.degree}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Academic Program</label>
                  <input
                    name="program"
                    className="field-input"
                    placeholder="Computer Science & Engineering"
                    type="text"
                    value={formData.program}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Issue Date</label>
                    <input
                      name="issueDate"
                      className="field-input"
                      type="date"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Graduation Year</label>
                    <input
                      name="graduationYear"
                      className="field-input"
                      placeholder="2024"
                      type="number"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <button className="create-btn" type="submit" disabled={isIssuing}>
                  {isIssuing ? 'Issuing...' : 'Create Record'}
                </button>
              </form>
            </div>

            <div className="upload-card">
              <h3 className="card-title">Institution Profile</h3>
              <div className="profile-box">
                <div className="profile-item">
                  <span className="profile-label">Name:</span>
                  <span className="profile-value">{user?.institution?.name || 'Stanford University'}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Accreditation:</span>
                  <span className="profile-value">{user?.institution?.accreditation || 'Level 1'}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-label">Contact:</span>
                  <span className="profile-value">{user?.institution?.contactEmail || 'vijayragavan.it23@bitsathy.ac.in'}</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json,.csv"
                onChange={handleBulkUpload}
              />
              <button
                className="select-files-btn"
                style={{ marginTop: '1rem' }}
                onClick={() => fileInputRef.current.click()}
                disabled={isBulkIssuing}
              >
                {isBulkIssuing ? 'Processing...' : 'Bulk Upload Records (JSON/CSV)'}
              </button>
            </div>
          </div>

          {/* Records Table Section */}
          <div className="table-container">
            <div className="table-header">
              <h3 className="table-title">Recent Academic Records</h3>
            </div>
            <div className="table-wrapper">
              <table className="records-table">
                <thead>
                  <tr className="table-head-row">
                    <th className="table-head">Student ID</th>
                    <th className="table-head">Degree</th>
                    <th className="table-head">Issue Date</th>
                    <th className="table-head">Status</th>
                    <th className="table-head text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {recordsLoading ? (
                    <tr><td colSpan="5" className="table-cell">Loading records...</td></tr>
                  ) : records.length > 0 ? (
                    records.map(record => (
                      <tr key={record.id}>
                        <td className="table-cell">
                          <div className="student-info">
                            <div className="student-avatar primary-avatar">{record.studentId}</div>
                            <div className="student-details">
                              <p className="student-id">ID: {record.studentId}</p>
                              <p className="record-ref">Ref: {record.refCode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell degree-cell">{record.degree}</td>
                        <td className="table-cell date-cell">{new Date(record.issueDate).toLocaleDateString()}</td>
                        <td className="table-cell">
                          <span className={`status-badge ${record.status.toLowerCase()}`}>
                            <span className="status-dot"></span> {record.status}
                          </span>
                        </td>
                        <td className="table-cell text-right">
                          <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end' }}>
                            <button className="action-btn-small" onClick={() => handleStatusChange(record.id, 'VERIFIED')} title="Verify">
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
                            </button>
                            <button className="action-btn-small" onClick={() => handleStatusChange(record.id, 'REVOKED')} title="Revoke" style={{ color: 'red' }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cancel</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="table-cell">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard;
