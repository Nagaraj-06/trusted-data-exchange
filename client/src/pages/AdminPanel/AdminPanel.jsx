import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout as logoutAction } from '../../store/slices/authSlice';
import {
  useGetAdminStatsQuery,
  useGetInstitutionsQuery,
  useUpdateInstitutionStatusMutation,
  useGetAuditLogsQuery
} from '../../store/api/adminApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { toast } from 'react-hot-toast';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // API Hooks
  const { data: statsData, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: institutionsData, isLoading: institutionsLoading } = useGetInstitutionsQuery();
  const { data: auditData, isLoading: auditLoading } = useGetAuditLogsQuery({ page: 1, limit: 10 });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateInstitutionStatusMutation();
  const [logoutApi] = useLogoutMutation();

  const stats = statsData?.data || {
    totalInstitutions: 0,
    totalStudents: 0,
    totalRecords: 0,
    pendingApprovals: 0
  };

  const institutions = institutionsData?.data || [];
  const auditLogs = auditData?.data?.logs || [];

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAction());
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Institution ${status.toLowerCase()} successfully`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="header-content">
            <div className="header-icon">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div className="header-text">
              <h1 className="header-title">Admin Panel</h1>
              <p className="header-subtitle">System Management</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-link-btn ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="nav-link-text">Dashboard</span>
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'Institutions' ? 'active' : ''}`}
            onClick={() => setActiveTab('Institutions')}
          >
            <span className="material-symbols-outlined">corporate_fare</span>
            <span className="nav-link-text">Institutions</span>
          </button>
          <button
            className={`nav-link-btn ${activeTab === 'Audits' ? 'active' : ''}`}
            onClick={() => setActiveTab('Audits')}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="nav-link-text">Audits</span>
          </button>
          <button
            className="nav-link-btn"
            onClick={() => toast.info('Settings coming soon')}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="nav-link-text">Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-content">
            <div
              className="user-avatar"
              style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${user?.name || 'Admin'}")` }}
            ></div>
            <div className="user-info">
              <p className="user-name">{user?.name || 'System Admin'}</p>
              <p className="user-role">System Administrator</p>
            </div>
            <span
              className="material-symbols-outlined logout-icon"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
              title="Logout"
            >
              logout
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-header">
          <div className='top-header-left'>
            <h2 className="page-title">{activeTab} Overview</h2>
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
            <button className="header-btn" onClick={() => toast.success('Everything is running smoothly!')}>
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-badge"></span>
            </button>
            <button className="header-btn" onClick={handleLogout} title="Logout">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          {activeTab === 'Dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <p className="stat-label">System Status</p>
                    <span className="status-indicator"></span>
                  </div>
                  <p className="stat-value">Operational</p>
                  <p className="stat-detail stat-success">Uptime 99.99%</p>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Active Institutions</p>
                  <p className="stat-value">{statsLoading ? '...' : stats.totalInstitutions}</p>
                  <p className="stat-detail stat-success">Verified partners</p>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Total Students</p>
                  <p className="stat-value">{statsLoading ? '...' : (stats.totalStudents > 1000 ? (stats.totalStudents / 1000).toFixed(1) + 'k' : stats.totalStudents)}</p>
                  <p className="stat-detail stat-success">Academic records linked</p>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Pending Approvals</p>
                  <p className="stat-value">{statsLoading ? '...' : stats.pendingApprovals}</p>
                  <p className="stat-detail stat-warning">Requires attention</p>
                </div>
              </div>

              {/* Pending Approvals Section */}
              <section className="section-card">
                <div className="section-header">
                  <div>
                    <h3 className="section-title">Institutional Approval Queue</h3>
                    <p className="section-subtitle">Authorize institutions to start issuing records.</p>
                  </div>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr className="table-header-row">
                        <th className="table-header">Institution</th>
                        <th className="table-header">Contact</th>
                        <th className="table-header">Status</th>
                        <th className="table-header table-header-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {institutionsLoading ? (
                        <tr><td colSpan="4" className="table-cell">Loading institutions...</td></tr>
                      ) : institutions.filter(inst => inst.status === 'PENDING').length > 0 ? (
                        institutions.filter(inst => inst.status === 'PENDING').map(inst => (
                          <tr key={inst.id}>
                            <td className="table-cell">
                              <div className="institution-cell">
                                <div className="institution-avatar">{inst.name.charAt(0)}</div>
                                <span className="institution-name">{inst.name}</span>
                              </div>
                            </td>
                            <td className="table-cell">
                              <span className="badge badge-blue">{inst.contactEmail}</span>
                            </td>
                            <td className="table-cell">
                              <span className="badge badge-amber">{inst.status}</span>
                            </td>
                            <td className="table-cell table-cell-right">
                              <div className="action-buttons">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleStatusUpdate(inst.id, 'APPROVED')}
                                  disabled={isUpdating}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() => handleStatusUpdate(inst.id, 'REJECTED')}
                                  disabled={isUpdating}
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="table-cell">No pending approvals.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeTab === 'Institutions' && (
            <section className="section-card">
              <div className="section-header">
                <div>
                  <h3 className="section-title">All Registered Institutions</h3>
                  <p className="section-subtitle">Comprehensive list of all educational partners.</p>
                </div>
                <button className="btn btn-primary" onClick={() => toast.info('Manual creation coming soon')}>Add New</button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr className="table-header-row">
                      <th className="table-header">Name</th>
                      <th className="table-header">Accreditation</th>
                      <th className="table-header">Email</th>
                      <th className="table-header table-header-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {institutions.map(inst => (
                      <tr key={inst.id}>
                        <td className="table-cell">{inst.name}</td>
                        <td className="table-cell">{inst.accreditation || 'Not set'}</td>
                        <td className="table-cell">{inst.contactEmail}</td>
                        <td className="table-cell table-cell-right">
                          <span className={`badge ${inst.status === 'APPROVED' ? 'badge-blue' : (inst.status === 'PENDING' ? 'badge-amber' : 'badge-muted')}`}>
                            {inst.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'Audits' && (
            <section className="section-card">
              <div className="section-header">
                <div>
                  <h3 className="section-title">System Audit Log</h3>
                  <p className="section-subtitle">Security and administrative activity monitoring.</p>
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
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {auditLoading ? (
                      <tr><td colSpan="4" className="table-cell">Loading logs...</td></tr>
                    ) : auditLogs.length > 0 ? (
                      auditLogs.map(log => (
                        <tr key={log.id}>
                          <td className="table-cell">{new Date(log.timestamp).toLocaleString()}</td>
                          <td className="table-cell">{log.userEmail || 'System'}</td>
                          <td className="table-cell">
                            <span className="audit-badge audit-badge-default">{log.action}</span>
                          </td>
                          <td className="table-cell">{log.resource}</td>
                        </tr>
                      ))
                    ) : <tr><td colSpan="4" className="table-cell">No logs found.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
