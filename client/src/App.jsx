import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import Dashboard from './pages/DashBoard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import InstitutionDashboard from './pages/InstitutionDashboard/InstitutionDashboard';
import EmployerVerification from './pages/Employerverification/EmployerVerification';
import AdminPanel from './pages/AdminPanel/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
        <Route path="/employer-verification" element={<EmployerVerification />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Route>
      {/* Catch all - redirect to login or 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
