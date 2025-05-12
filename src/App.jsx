import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TaskApp from './components/TaskApp';
import AboutPage from './components/AboutPage/index.jsx';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import TermsOfService from './components/Legal/TermsOfService';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import { UserProvider } from './contexts/UserContext';
import './App.css';
import { debugLog, inspectElements } from './utils/debug';

function App() {
  useEffect(() => {
    debugLog('App', 'Application initialized');

    // Check for class vs className issues
    setTimeout(() => {
      inspectElements('[class]');

      // Look for the Hero component's elements specifically
      debugLog('App', 'Checking Hero component elements');
      inspectElements('.hero-section, .hero-section *');

      // Debug any navigation links
      debugLog('App', 'Checking navigation elements');
      inspectElements('a, button');
    }, 1000);
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="global-navigation" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, background: 'rgba(255,255,255,0.9)', padding: '8px 12px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <Link to="/" style={{ margin: '0 10px', color: '#4338ca', fontWeight: 'bold', fontSize: '16px' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 10px', color: '#4338ca', fontWeight: 'bold', fontSize: '16px' }}>About</Link>
          <Link to="/app" style={{ margin: '0 10px', color: '#4338ca', fontWeight: 'bold', fontSize: '16px' }}>App</Link>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<TaskApp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
