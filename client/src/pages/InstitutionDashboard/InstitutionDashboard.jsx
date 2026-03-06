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
import {
  useBulkCreateStudentsMutation,
  useGetStudentsQuery
} from '../../store/api/institutionApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import './InstitutionDashboard.css';

const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    studentRollNumber: '',
    degree: '',
    program: '',
    issueDate: '',
    graduationYear: '',
    grade: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Bulk Student State
  const [bulkStudents, setBulkStudents] = useState([]);

  // API Hooks
  const { data: recordsResponse, isLoading: recordsLoading } = useGetRecordsQuery();
  const { data: studentsResponse, isLoading: studentsLoading } = useGetStudentsQuery();
  const [issueRecord, { isLoading: isIssuing }] = useIssueRecordMutation();
  const [bulkIssue, { isLoading: isBulkIssuing }] = useBulkIssueRecordsMutation();
  const [bulkCreateStudents, { isLoading: isBulkCreatingStudents }] = useBulkCreateStudentsMutation();
  const [updateStatus] = useUpdateRecordStatusMutation();
  const [logoutApi] = useLogoutMutation();

  const fileInputRef = React.useRef(null);
  const studentFileInputRef = React.useRef(null);

  const records = recordsResponse?.data || [];
  const students = studentsResponse?.data || [];

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
        studentRollNumber: formData.studentRollNumber,
        graduationYear: parseInt(formData.graduationYear)
      }).unwrap();
      setFormSuccess('Record issued successfully!');
      setFormData({ studentRollNumber: '', degree: '', program: '', issueDate: '', graduationYear: '', grade: '' });
    } catch (err) {
      setFormError(err.data?.message || 'Failed to issue record');
    }
  };

  const handleStudentBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        let studentsToUpload = [];

        if (file.name.endsWith('.json')) {
          studentsToUpload = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          studentsToUpload = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i]?.trim());
            return obj;
          });
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(event.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          studentsToUpload = XLSX.utils.sheet_to_json(worksheet);
        }

        if (studentsToUpload.length > 0) {
          setBulkStudents(studentsToUpload);
          toast.success(`${studentsToUpload.length} students loaded for preview`);
        }
      } catch (err) {
        toast.error('Failed to process student file');
      }
    };

    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleBulkStudentCreate = async () => {
    try {
      if (bulkStudents.length === 0) return;
      await bulkCreateStudents(bulkStudents).unwrap();
      setBulkStudents([]);
      toast.success('Students onboarded successfully!');
    } catch (err) {
      toast.error('Bulk onboarding failed');
    }
  };

  // Helper: Convert Excel serial date number to ISO date string (YYYY-MM-DD)
  const excelDateToISO = (serial) => {
    if (typeof serial === 'string' && serial.match(/^\d{4}-\d{2}-\d{2}/)) {
      return serial; // Already a valid date string
    }
    if (typeof serial === 'number' && serial > 10000) {
      // Excel serial date: days since 1900-01-01 (with the Excel leap year bug)
      const utcDays = Math.floor(serial - 25569);
      const date = new Date(utcDays * 86400 * 1000);
      return date.toISOString().split('T')[0];
    }
    return serial; // Return as-is if not a recognizable format
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
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
          const workbook = XLSX.read(event.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          recordsToUpload = XLSX.utils.sheet_to_json(worksheet);
        }

        // Normalize each record: fix Excel dates & ensure correct types
        recordsToUpload = recordsToUpload.map(record => ({
          ...record,
          issueDate: record.issueDate ? excelDateToISO(record.issueDate) : undefined,
          graduationYear: record.graduationYear ? parseInt(record.graduationYear) : undefined,
        }));

        console.log('Bulk records payload:', recordsToUpload);

        if (recordsToUpload.length > 0) {
          const result = await bulkIssue(recordsToUpload).unwrap();
          console.log('Bulk issue result:', result);
          setFormSuccess(`${recordsToUpload.length} records processed in bulk!`);
        }
      } catch (err) {
        console.error('Bulk upload error:', err);
        setFormError(err?.data?.message || 'Failed to process bulk upload. Please check file format.');
      }
    };

    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
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
            className={`nav-link-btn ${activeTab === 'Students' ? 'active' : ''}`}
            onClick={() => setActiveTab('Students')}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="nav-link-text">Students</span>
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
          {activeTab === 'Dashboard' && (
            <div className="dashboard-view">
              <div className="content-header">
                <div className="header-info">
                  <h1 className="content-title">Dashboard Overview</h1>
                  <p className="content-subtitle">Welcome back! Manage your institution's academic records.</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Total Records</div>
                  <div className="stat-value">{records.length}</div>
                  <div className="stat-detail">Issued credentials</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Active Students</div>
                  <div className="stat-value">{students.length}</div>
                  <div className="stat-detail">Onboarded directory</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Verified</div>
                  <div className="stat-value">{records.filter(r => r.status === 'VERIFIED').length}</div>
                  <div className="stat-detail stat-success">Successfully verified</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Pending</div>
                  <div className="stat-value">{records.filter(r => r.status === 'PENDING' || r.status === 'ISSUED').length}</div>
                  <div className="stat-detail stat-warning">Awaiting verification</div>
                </div>
              </div>

              <div className="dashboard-grid">
                {/* Recent Activity */}
                <div className="section-card">
                  <div className="section-header">
                    <h3 className="section-title">Recent Issuance</h3>
                    <button className="view-all-btn" onClick={() => setActiveTab('Records')}>View All</button>
                  </div>
                  <div className="table-wrapper">
                    <table className="records-table">
                      <thead>
                        <tr className="table-head-row">
                          <th className="table-head">Roll Number</th>
                          <th className="table-head">Degree</th>
                          <th className="table-head">Status</th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {records.slice(0, 5).map(record => (
                          <tr key={record.id}>
                            <td className="table-cell">{record.student?.rollNumber}</td>
                            <td className="table-cell">{record.degree}</td>
                            <td className="table-cell">
                              <span className={`status-badge ${record.status.toLowerCase()}`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {records.length === 0 && (
                          <tr><td colSpan="3" className="table-cell">No recent activity.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="section-card">
                  <div className="section-header">
                    <h3 className="section-title">Quick Actions</h3>
                  </div>
                  <div className="quick-actions-list">
                    <button className="action-card-btn" onClick={() => setActiveTab('Records')}>
                      <span className="material-symbols-outlined">add_circle</span>
                      <div className="action-text">
                        <p className="action-name">Issue New Record</p>
                        <p className="action-desc">Add a single graduation certificate</p>
                      </div>
                    </button>
                    <button className="action-card-btn" onClick={() => setActiveTab('Students')}>
                      <span className="material-symbols-outlined">group_add</span>
                      <div className="action-text">
                        <p className="action-name">Onboard Students</p>
                        <p className="action-desc">Bulk register student directory</p>
                      </div>
                    </button>
                    <button className="action-card-btn" onClick={() => setActiveTab('Records')}>
                      <span className="material-symbols-outlined">upload</span>
                      <div className="action-text">
                        <p className="action-name">Bulk Issuance</p>
                        <p className="action-desc">Upload batch records via Excel/CSV</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Records' && (
            <div className="records-management">
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
                        <label className="field-label">Student Roll Number</label>
                        <input
                          name="studentRollNumber"
                          className="field-input"
                          placeholder="e.g. 7376231IT100"
                          type="text"
                          value={formData.studentRollNumber}
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
                  <h3 className="card-title">Bulk Academic Records</h3>
                  <p className="card-desc">Process graduation credentials in batch using CSV/JSON.</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".json,.csv,.xlsx,.xls"
                    onChange={handleBulkUpload}
                  />
                  <button
                    className="select-files-btn"
                    style={{ marginTop: '1rem' }}
                    onClick={() => fileInputRef.current.click()}
                    disabled={isBulkIssuing}
                  >
                    <span className="material-symbols-outlined">upload_file</span>
                    {isBulkIssuing ? 'Processing...' : 'Upload Records'}
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
                        <th className="table-head">Roll Number</th>
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
                                <div className="student-avatar primary-avatar">
                                  {record.student?.rollNumber?.slice(-3) || '??'}
                                </div>
                                <div className="student-details">
                                  <p className="student-id">{record.student?.rollNumber || 'No Roll Num'}</p>
                                  <p className="record-ref">ID: {record.id}</p>
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
          )}

          {activeTab === 'Students' && (
            <div className="students-management">
              <div className="content-header">
                <div className="header-info">
                  <h1 className="content-title">Student Directory</h1>
                  <p className="content-subtitle">Onboard freshers and manage the student lifecycle.</p>
                </div>
                <div className="header-actions">
                  <input
                    type="file"
                    ref={studentFileInputRef}
                    style={{ display: 'none' }}
                    accept=".json,.csv,.xlsx,.xls"
                    onChange={handleStudentBulkUpload}
                  />
                  <button
                    className="primary-btn"
                    onClick={() => studentFileInputRef.current.click()}
                  >
                    <span className="material-symbols-outlined">person_add</span>
                    Bulk Onboard Students
                  </button>
                </div>
              </div>

              {bulkStudents.length > 0 && (
                <div className="preview-section-box">
                  <div className="preview-header">
                    <div className="preview-info">
                      <span className="material-symbols-outlined preview-icon">pending_actions</span>
                      <div className="preview-text">
                        <h3 className="preview-title">Onboarding Preview</h3>
                        <p className="preview-subtitle">{bulkStudents.length} students ready to be registered</p>
                      </div>
                    </div>
                    <div className="preview-actions">
                      <button className="cancel-btn" onClick={() => setBulkStudents([])}>
                        <span className="material-symbols-outlined">close</span>
                        Cancel
                      </button>
                      <button className="confirm-btn" onClick={handleBulkStudentCreate} disabled={isBulkCreatingStudents}>
                        <span className="material-symbols-outlined">how_to_reg</span>
                        {isBulkCreatingStudents ? 'Creating...' : 'Finalize & Create Accounts'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-container">
                <div className="table-wrapper">
                  <table className="records-table">
                    <thead>
                      <tr className="table-head-row">
                        <th className="table-head">Name</th>
                        <th className="table-head">Roll Number</th>
                        <th className="table-head">Email</th>
                        <th className="table-head text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {studentsLoading ? (
                        <tr><td colSpan="4" className="table-cell">Loading student directory...</td></tr>
                      ) : students.length > 0 ? (
                        students.map(student => (
                          <tr key={student.id}>
                            <td className="table-cell">
                              <div className="student-info">
                                <div className="student-avatar secondary-avatar">
                                  {student.name.charAt(0)}
                                </div>
                                <span className="user-name">{student.name}</span>
                              </div>
                            </td>
                            <td className="table-cell">
                              <code className="roll-badge">{student.rollNumber}</code>
                            </td>
                            <td className="table-cell email-cell">{student.email}</td>
                            <td className="table-cell text-right">
                              <span className="status-badge approved">Active</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="table-cell">No students onboarded yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard;
