import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginFirebase from './components/Auth/LoginFirebase';
import RegisterFirebase from './components/Auth/RegisterFirebase';
import ForgotPassword from './components/Auth/ForgotPassword';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage/index.jsx';
import TaskApp from './components/TaskApp';
import { UserProvider, useUser } from './contexts/UserContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public route component that redirects if user is already logged in
const PublicRoute = ({ children, redirectAuthenticated = false }) => {
  const { user } = useUser();

  if (user && redirectAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

const AppContent = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={
            <PublicRoute redirectAuthenticated={true}>
              <LoginFirebase />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute redirectAuthenticated={true}>
              <RegisterFirebase />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute redirectAuthenticated={true}>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/app" element={
            <ProtectedRoute>
              <TaskApp />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TaskApp />
            </ProtectedRoute>
          } />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
