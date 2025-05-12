import React from 'react';
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

export default App;
