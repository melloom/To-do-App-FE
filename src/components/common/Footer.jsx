import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsOfServiceModal from './TermsOfServiceModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import CookiePolicyModal from './CookiePolicyModal';

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const openCookieModal = (e) => {
    e.preventDefault();
    setShowCookieModal(true);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <img src="/favicon.ico" alt="Tasklio" className="footer-favicon" />
              <span className="footer-logo-icon">✓</span>
              <span className="footer-logo-text">Tasklio</span>
            </div>
            <p className="footer-description">
              The secure, cloud-based task manager that keeps your life organized 
              without subscriptions or compromises.
            </p>
            <div className="footer-social">
              <a href="https://github.com/tasklio" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span className="social-icon">📱</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Product</h4>
            <ul className="footer-links">
              <li><Link to="/#features">How it Works</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <a href="#" onClick={openTermsModal}>Terms of Service</a>
            <a href="#" onClick={openPrivacyModal}>Privacy Policy</a>
            <a href="#" onClick={openCookieModal}>Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <CookiePolicyModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
    </footer>
  );
};

export default Footer;