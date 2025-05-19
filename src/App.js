import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
<<<<<<< HEAD
import AboutPage from './components/AboutPage/index.jsx';
import TaskApp from './components/TaskApp';
import RegisterFirebase from './components/Auth/RegisterFirebase';
import LoginFirebase from './components/Auth/LoginFirebase';
import ForgotPassword from './components/Auth/ForgotPassword';
=======
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import AboutPage from './components/AboutPage/index.jsx';
import TaskApp from './components/TaskApp';
import AccountSetupPage from './components/Auth/AccountSetupPage'; // Add the new component import
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
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

<<<<<<< HEAD
=======
// Setup route component that checks if the user needs to complete setup
const SetupRoute = ({ element }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If registration is complete, redirect to app
  if (!user.needsProfileCompletion) {
    return <Navigate to="/app" replace />;
  }

  return element;
};

>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
const AppContent = () => {
  const { user } = useUser();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={
<<<<<<< HEAD
            <PublicRoute element={<LoginFirebase />} redirectAuthenticated={true} />
          } />
          <Route path="/register" element={
            <PublicRoute element={<RegisterFirebase />} redirectAuthenticated={true} />
          } />
          <Route path="/forgot-password" element={
            <PublicRoute element={<ForgotPassword />} redirectAuthenticated={true} />
=======
            <PublicRoute element={<LoginPage />} redirectAuthenticated={true} />
          } />
          <Route path="/register" element={
            <PublicRoute element={<RegisterPage />} redirectAuthenticated={true} />
          } />
          <Route path="/complete-setup" element={
            <SetupRoute element={<AccountSetupPage />} />
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
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
