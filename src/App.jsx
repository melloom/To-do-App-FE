import React from 'react';
<<<<<<< HEAD
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
=======
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  createRoutesFromElements,
  createBrowserRouter
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage/index.jsx';
import { UserProvider } from './contexts/UserContext';
import './App.css';

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
    </>
  ),
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="global-navigation" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'rgba(255,255,255,0.9)', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <Link to="/" style={{ margin: '0 10px', color: '#4338ca', fontWeight: 'bold', fontSize: '16px' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 10px', color: '#4338ca', fontWeight: 'bold', fontSize: '16px' }}>About</Link>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368

export default App;
