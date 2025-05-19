import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginFirebase from './components/Auth/LoginFirebase';
import RegisterFirebase from './components/Auth/RegisterFirebase';
import ForgotPassword from './components/Auth/ForgotPassword';
// Import other components as needed

// Home component (placeholder)
const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Tasklio</h1>
      <p>Your task management solution</p>
      <div className="auth-links">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/register" className="auth-button outline">Register</Link>
      </div>
    </div>
  );
};

// Dashboard component (placeholder)
const Dashboard = () => {
  return <div>Dashboard content will go here</div>;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkIfUserIsAuthenticated(); // Implement this function based on your auth logic
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Helper function to check authentication status
const checkIfUserIsAuthenticated = () => {
  // Implement your auth check logic here
  // For example:
  // const user = getAuth().currentUser;
  // return !!user;
  
  // Temporary placeholder - replace with actual implementation
  return localStorage.getItem('user') !== null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginFirebase />} />
        <Route path="/register" element={<RegisterFirebase />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/app" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
