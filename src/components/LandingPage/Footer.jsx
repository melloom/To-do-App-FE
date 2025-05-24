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
  const [email, setEmail] = useState('');

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    alert('Thanks for subscribing! We\'ll keep you updated.');
    setEmail('');
  };

  return (
    <footer className="landing-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-bubble">T</div>
            <span>Tasklio</span>
          </div>
          <p className="footer-tagline">
            The intelligent task manager that helps you organize, prioritize, and accomplish more—without the complexity.
          </p>
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1K+</span>
              <span className="stat-label">Happy Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link to="/app">Dashboard</Link></li>
              <li><Link to="/about">Features</Link></li>
              <li><Link to="/about">Roadmap</Link></li>
              <li><Link to="/about">API</Link></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about">Documentation</Link></li>
              <li><Link to="/about">Blog</Link></li>
              <li><a href="https://github.com/yourusername/tasklio" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><Link to="/about">Help Center</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about">Team</Link></li>
              <li><Link to="/about">Careers</Link></li>
              <li><Link to="/about">Press Kit</Link></li>
              <li><Link to="/about">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column newsletter-column">
            <h4>Stay Updated</h4>
            <p className="newsletter-desc">Get the latest updates and productivity tips delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <div className="footer-features">
              <span className="feature-badge">✨ Free Forever</span>
              <span className="feature-badge">🔒 Privacy First</span>
              <span className="feature-badge">🚀 Fast & Simple</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>© {currentYear} Tasklio. Made with ❤️ for productivity enthusiasts.</p>
          <div className="footer-legal">
            <a href="#" onClick={(e) => {e.preventDefault(); setShowTermsModal(true);}}>Terms</a>
            <span className="footer-divider">•</span>
            <a href="#" onClick={(e) => {e.preventDefault(); setShowPrivacyModal(true);}}>Privacy</a>
            <span className="footer-divider">•</span>
            <a href="#" onClick={(e) => {e.preventDefault(); setShowCookieModal(true);}}>Cookies</a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com/" className="social-icon" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://github.com/" className="social-icon" target="_blank" rel="noopener noreferrer" title="Star us on GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/" className="social-icon" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:hello@tasklio.com" className="social-icon" target="_blank" rel="noopener noreferrer" title="Email us">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
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