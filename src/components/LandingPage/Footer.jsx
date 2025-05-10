import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-container section-container">
        <div className="footer-grid">
          <div className="footer-main">
            <div className="footer-logo">
              <div className="footer-logo-img">T</div>
              <h3 className="footer-logo-text">Tasklio</h3>
            </div>
            <p className="footer-tagline">Simplify your tasks. Boost your productivity.</p>
            <div className="footer-social">
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">💻</a>
              <a href="#" className="social-icon">📱</a>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h3>Product</h3>
          <div className="footer-links">
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <Link to="/app" className="footer-link">Launch App</Link>
          </div>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About Us</Link>
            <a href="#faq" className="footer-link">FAQ</a>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Support</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Stay Updated</h3>
          <p className="newsletter-text">
            Subscribe to our newsletter for updates, tips, and productivity insights.
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Tasklio. All rights reserved.
        </div>
        <div className="footer-legal">
          <a href="#" className="legal-link">Privacy Policy</a>
          <a href="#" className="legal-link">Terms of Service</a>
          <a href="#" className="legal-link">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;