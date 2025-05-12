import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-bubble">T</div>
                <h3>Tasklio</h3>
              </Link>
              <p className="footer-tagline">
                The intelligent task manager that helps you organize, prioritize, and accomplish more.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Twitter">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="social-icon" aria-label="GitHub">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="footer-links-group">
              <div className="footer-links-column">
                <h4>Product</h4>
                <ul className="footer-links">
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                  <li><Link to="/app">Launch App</Link></li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h4>Company</h4>
                <ul className="footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><a href="#team">Our Team</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>

              <div className="footer-links-column">
                <h4>Resources</h4>
                <ul className="footer-links">
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#community">Community</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Get productivity tips and Tasklio updates delivered to your inbox.</p>
              <form className="newsletter-form">
                <div className="newsletter-input-group">
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </div>
                <div className="newsletter-disclaimer">
                  We respect your privacy. Unsubscribe at any time.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © {currentYear} Tasklio. All rights reserved.
            </div>

            <div className="footer-legal-links">
              <Link to="/terms" className="legal-footer-link" title="Read our Terms of Service">
                <span className="legal-icon">📜</span>
                Terms of Service
              </Link>
              <Link to="/privacy" className="legal-footer-link" title="View our Privacy Policy">
                <span className="legal-icon">🔒</span>
                Privacy Policy
              </Link>
              <Link to="/cookies" className="legal-footer-link" title="Learn about our Cookie Policy">
                <span className="legal-icon">🍪</span>
                Cookie Policy
              </Link>
            </div>

            <div className="footer-app-badge">
              <span className="badge-text">Made with</span>
              <span className="badge-heart">♥</span>
              <span className="badge-text">for productivity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;