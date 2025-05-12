import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsOfServiceModal from '../common/TermsOfServiceModal';
import PrivacyPolicyModal from '../common/PrivacyPolicyModal';
import CookiePolicyModal from '../common/CookiePolicyModal';
import './styles/Footer.css';

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-bubble">T</div>
            <span>Tasklio</span>
          </div>
          <p className="footer-tagline">
            The simple task manager that respects your privacy
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link to="/app">App</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about#features">Features</Link></li>
              <li><Link to="/about#roadmap">Roadmap</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/about#codebase">Codebase</Link></li>
              <li><Link to="/about#developer">Developer</Link></li>
              <li><a href="https://github.com/yourusername/tasklio" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#" onClick={(e) => {e.preventDefault(); setShowTermsModal(true);}}>Terms of Service</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); setShowPrivacyModal(true);}}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); setShowCookieModal(true);}}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>© {currentYear} Tasklio. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" onClick={(e) => {e.preventDefault(); setShowTermsModal(true);}}>Terms</a>
            <span className="footer-divider">•</span>
            <a href="#" onClick={(e) => {e.preventDefault(); setShowPrivacyModal(true);}}>Privacy</a>
            <span className="footer-divider">•</span>
            <a href="#" onClick={(e) => {e.preventDefault(); setShowCookieModal(true);}}>Cookies</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com/" className="social-icon" target="_blank" rel="noopener noreferrer">𝕏</a>
          <a href="https://github.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Modals */}
      <TermsOfServiceModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <CookiePolicyModal isOpen={showCookieModal} onClose={() => setShowCookieModal(false)} />
    </footer>
  );
};

export default Footer;