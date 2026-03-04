import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import InstitutionDashboard from './pages/InstitutionDashboard/InstitutionDashboard';
import EmployerVerification from './pages/Employerverification/EmployerVerification';
import AdminPanel from './pages/AdminPanel/AdminPanel';

function App() {
  return (
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
  );
}

export default App;
