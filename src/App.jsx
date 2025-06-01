import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginFirebase from './components/Auth/LoginFirebase';
import RegisterFirebase from './components/Auth/RegisterFirebase';
import ForgotPassword from './components/Auth/ForgotPassword';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage/index.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import { UserProvider, useUser } from './contexts/UserContext';

// For testing - always allow dashboard access
const TestRoute = ({ children }) => {
  return children;
};

const AppContent = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginFirebase />} />
          <Route path="/register" element={<RegisterFirebase />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Dashboard accessible for testing */}
          <Route path="/dashboard" element={
            <TestRoute>
              <Dashboard />
            </TestRoute>
          } />
          <Route path="/tasks" element={
            <TestRoute>
              <Dashboard />
            </TestRoute>
          } />
          {/* Default to dashboard for testing */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
