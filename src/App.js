import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage/index.jsx';
import TaskApp from './components/TaskApp';
import RegisterFirebase from './components/Auth/RegisterFirebase';
import LoginFirebase from './components/Auth/LoginFirebase';
import ForgotPassword from './components/Auth/ForgotPassword';
import { UserProvider, useUser } from './contexts/UserContext';

// Protected route component
const ProtectedRoute = ({ element }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/login" replace />;
};

// Public route component that redirects if user is already logged in
const PublicRoute = ({ element, redirectAuthenticated = false }) => {
  const { user } = useUser();
  if (user && redirectAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  return element;
};

const AppContent = () => {
  const { user } = useUser();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={
            <PublicRoute element={<LoginFirebase />} redirectAuthenticated={true} />
          } />
          <Route path="/register" element={
            <PublicRoute element={<RegisterFirebase />} redirectAuthenticated={true} />
          } />
          <Route path="/forgot-password" element={
            <PublicRoute element={<ForgotPassword />} redirectAuthenticated={true} />
          } />
          <Route path="/app" element={
            <ProtectedRoute element={<TaskApp />} />
          } />
          <Route path="/tasks" element={
            <ProtectedRoute element={<TaskApp />} />
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
