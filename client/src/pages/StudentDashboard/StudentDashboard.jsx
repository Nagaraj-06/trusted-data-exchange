import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, logout as logoutAction } from '../../store/slices/authSlice';
import {
  useGetRecordsQuery,
  useCreateShareLinkMutation,
  useGetShareLinksQuery
} from '../../store/api/recordsApi';
import { useLogoutMutation } from '../../store/api/authApi';
import { toast } from 'react-hot-toast';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API Queries
  const { data: recordsResponse, isLoading: recordsLoading } = useGetRecordsQuery();
  const { data: shareLinksResponse } = useGetShareLinksQuery();
  const [createShareLink] = useCreateShareLinkMutation();
  const [logoutApi] = useLogoutMutation();

  const records = recordsResponse?.data || [];
  const shareLinks = shareLinksResponse?.data || [];

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logoutAction());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleShare = async (recordId) => {
    try {
      const response = await createShareLink({ recordId, expiresInHours: 24 }).unwrap();
      const shareUrl = `${window.location.origin}/verify/${response.data.token}`;

      toast((t) => (
        <span>
          <b>Link Created!</b>
          <div style={{ marginTop: '8px', fontSize: '0.8rem', wordBreak: 'break-all', color: '#666' }}>
            {shareUrl}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.success('Copied to clipboard!', { id: 'copy-toast' });
              toast.dismiss(t.id);
            }}
            style={{
              marginTop: '10px',
              padding: '4px 12px',
              background: '#135bec',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Copy & Dismiss
          </button>
        </span>
      ), { duration: 6000 });
    } catch (err) {
      toast.error('Failed to create share link');
    }
  };

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
          <button
            className={`nav-item ${activeTab === 'Dashboard' ? 'active-nav' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <p className="nav-text">Dashboard</p>
          </button>
          <button
            className={`nav-item ${activeTab === 'My Records' ? 'active-nav' : ''}`}
            onClick={() => setActiveTab('My Records')}
          >
            <span className="material-symbols-outlined">description</span>
            <p className="nav-text">My Records</p>
          </button>
          <button
            className={`nav-item ${activeTab === 'Share' ? 'active-nav' : ''}`}
            onClick={() => setActiveTab('Share')}
          >
            <span className="material-symbols-outlined">share</span>
            <p className="nav-text">Share</p>
          </button>
          <button
            className={`nav-item ${activeTab === 'History' ? 'active-nav' : ''}`}
            onClick={() => setActiveTab('History')}
          >
            <span className="material-symbols-outlined">history</span>
            <p className="nav-text">History</p>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn-sidebar" onClick={handleLogout}>
            <span className="material-symbols-outlined btn-icon">logout</span>
            Logout
          </button>
          <div className="user-profile">
            <div
              className="profile-avatar"
              style={{ backgroundImage: user?.avatar ? `url(${user.avatar})` : 'url("https://ui-avatars.com/api/?name=' + (user?.name || 'User') + '")' }}
            ></div>
            <div className="profile-info">
              <h2 className="profile-name">{user?.name || 'Student Name'}</h2>
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
            <button className="icon-btn" title="Logout" onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          {activeTab === 'Dashboard' && (
            <>
              {/* Summary Section */}
              <div className="summary-section">
                <h2 className="section-title">Dashboard Overview</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-header">
                      <p className="stat-label">Total Records</p>
                      <span className="material-symbols-outlined stat-icon primary-icon">folder_open</span>
                    </div>
                    <p className="stat-value">{records.length}</p>
                    <p className="stat-trend positive">
                      Live data from DB
                    </p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-header">
                      <p className="stat-label">Shared Links</p>
                      <span className="material-symbols-outlined stat-icon indigo-icon">send</span>
                    </div>
                    <p className="stat-value">{shareLinks.length}</p>
                    <p className="stat-meta">Active verification paths</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-header">
                      <p className="stat-label">User Role</p>
                      <span className="material-symbols-outlined stat-icon orange-icon">person</span>
                    </div>
                    <p className="stat-value" style={{ fontSize: '1.2rem' }}>{user?.role}</p>
                    <p className="stat-meta">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Academic Records List */}
              <div className="records-container">
                <div className="records-header">
                  <h3 className="records-title">Your Academic Records</h3>
                </div>
                <div className="records-list">
                  {recordsLoading ? (
                    <p>Loading your records...</p>
                  ) : records.length > 0 ? (
                    records.map((record) => (
                      <div className="record-item" key={record.id}>
                        <div className="record-content">
                          <div className="record-icon primary-bg">
                            <span className="material-symbols-outlined icon-lg">workspace_premium</span>
                          </div>
                          <div className="record-info">
                            <h4 className="record-title">{record.degree}</h4>
                            <p className="record-meta">{record.institution?.name} • Issued {new Date(record.issueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="record-actions">
                          <div className="record-status">
                            <span className={`status-badge ${record.status.toLowerCase()}`}>
                              <span className="status-dot"></span> {record.status}
                            </span>
                            <span className="record-ref">Ref: #{record.refCode}</span>
                          </div>
                          <button className="share-mini-btn" onClick={() => handleShare(record.id)}>
                            <span className="material-symbols-outlined">share</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-records">
                      <p>No academic records found for your account yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'My Records' && (
            <div className="records-container">
              <div className="records-header">
                <h3 className="records-title">Full Academic Vault</h3>
              </div>
              <div className="records-list">
                {records.length > 0 ? (
                  records.map((record) => (
                    <div className="record-item" key={record.id}>
                      <div className="record-content">
                        <div className="record-icon indigo-bg">
                          <span className="material-symbols-outlined icon-lg">history_edu</span>
                        </div>
                        <div className="record-info">
                          <h4 className="record-title">{record.degree}</h4>
                          <p className="record-meta">{record.program} • {record.grade}</p>
                        </div>
                      </div>
                      <div className="record-actions">
                        <button className="share-mini-btn" onClick={() => handleShare(record.id)}>
                          <span className="material-symbols-outlined">share</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : <p className="no-records">No records found.</p>}
              </div>
            </div>
          )}

          {activeTab === 'Share' && (
            <div className="records-container">
              <div className="records-header">
                <h3 className="records-title">Active Share Links</h3>
              </div>
              <div className="records-list">
                {shareLinks.length > 0 ? shareLinks.map(link => (
                  <div className="record-item" key={link.id}>
                    <div className="record-info">
                      <h4 className="record-title">Link for Record #{link.recordId}</h4>
                      <p className="record-meta">Token: <span style={{ fontFamily: 'monospace' }}>{link.token}</span></p>
                      <p className="record-meta" style={{ fontSize: '0.75rem' }}>Expires: {new Date(link.expiresAt).toLocaleString()}</p>
                    </div>
                    <div className="record-actions">
                      <div className={`status-badge ${link.isRevoked ? 'revoked' : 'verified'}`}>
                        <span className="status-dot"></span> {link.isRevoked ? 'Revoked' : 'Active'}
                      </div>
                      {!link.isRevoked && (
                        <button
                          className="icon-btn"
                          title="Copy link"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/verify/${link.token}`);
                            toast.success('Link copied to clipboard!');
                          }}
                        >
                          <span className="material-symbols-outlined">content_copy</span>
                        </button>
                      )}
                    </div>
                  </div>
                )) : <p className="no-records">No active share links.</p>}
              </div>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="records-container">
              <div className="records-header">
                <h3 className="records-title">Activity History</h3>
              </div>
              <div className="no-records">
                <span className="material-symbols-outlined" style={{ fontSize: '3rem', opacity: 0.2 }}>history</span>
                <p>Tracking of who viewed your shared links will appear here.</p>
              </div>
            </div>
          )}

          {activeTab === 'Profile' && (
            <div className="records-container" style={{ padding: '2rem' }}>
              <h3 className="records-title" style={{ marginBottom: '1.5rem' }}>Personal Profile</h3>
              <div className="profile-edit-form" style={{ maxWidth: '400px' }}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Full Name</label>
                  <input className="search-input" value={user?.name || ''} readOnly style={{ background: '#f3f4f6' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Email Address</label>
                  <input className="search-input" value={user?.email || ''} readOnly style={{ background: '#f3f4f6' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Account Role</label>
                  <div className="status-badge verified" style={{ width: 'fit-content' }}>{user?.role}</div>
                </div>
                <button className="upload-btn" style={{ marginTop: '2rem' }} onClick={() => toast.info('Profile update coming soon!')}>
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
