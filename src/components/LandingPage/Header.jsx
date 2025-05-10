import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <header className="landing-header">
      <div className="landing-logo">
        <div className="logo-bubble">T</div>
        <h1>Tasklio</h1>
      </div>
      
      <nav className="landing-nav">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Link to="/about" className="about-nav-link">About</Link></li>
        </ul>
      </nav>
      
      <div className="header-actions">
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
