import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from './store/api/authApi';
import { setCredentials } from './store/slices/authSlice';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import InstitutionDashboard from './pages/InstitutionDashboard/InstitutionDashboard';
import EmployerVerification from './pages/Employerverification/EmployerVerification';
import AdminPanel from './pages/AdminPanel/AdminPanel';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetMeQuery(undefined, {
    // Avoid re-fetching unnecessarily but ensure it runs on mount
    refetchOnMountOrArgChange: false
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setCredentials({ user: data.data }));
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) {
    return (
      <div className="loading-screen" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f6f6f8',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid #e7ebf3',
          borderTop: '5px solid #135bec',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#4c669a', fontWeight: 500 }}>Restoring Session...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify/:token" element={<EmployerVerification />} />

        {/* Protected Routes (JWT required) */}
        <Route element={<PrivateRoute />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Route>

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
