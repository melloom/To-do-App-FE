import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TaskApp from './components/TaskApp';
import AboutPage from './components/AboutPage/index.jsx';
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
    <Router>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999 }}>
        <Link to="/" style={{ margin: '0 10px', color: 'blue' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 10px', color: 'blue' }}>About</Link>
        <Link to="/app" style={{ margin: '0 10px', color: 'blue' }}>App</Link>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<TaskApp />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
