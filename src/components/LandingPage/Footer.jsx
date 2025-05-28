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
    <footer className="modern-footer">
      <div className="footer-background">
        <div className="floating-particles"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span>T</span>
                  <div className="logo-glow"></div>
                </div>
                <span className="logo-text">Tasklio</span>
              </div>
              <div className="brand-badge">Pro</div>
            </div>
            <p className="footer-tagline">
              Empowering productivity through intelligent task management. 
              Join thousands of users who've transformed their workflow.
            </p>
          </div>

          {/* Links Grid */}
          <div className="footer-links">
            <div className="links-column">
              <h4 className="column-title">
                <span className="title-icon">🚀</span>
                Product
              </h4>
              <ul className="links-list">
                <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#pricing" className="footer-link">Pricing</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4 className="column-title">
                <span className="title-icon">📚</span>
                Resources
              </h4>
              <ul className="links-list">
                <li><Link to="/about" className="footer-link">Help Center</Link></li>
                <li><Link to="/about" className="footer-link">Documentation</Link></li>
              </ul>
            </div>

            <div className="links-column">
              <h4 className="column-title">
                <span className="title-icon">🏢</span>
                Company
              </h4>
              <ul className="links-list">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/about" className="footer-link">Contact</Link></li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="newsletter-section">
              <h4 className="column-title">
                <span className="title-icon">📧</span>
                Stay Updated
              </h4>
              <p className="newsletter-desc">
                Get the latest updates and productivity tips.
              </p>
              
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="input-container">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-button">
                    <span>Subscribe</span>
                    <svg className="button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </form>

              <div className="trust-indicators">
                <div className="trust-item">
                  <span className="trust-icon">🔒</span>
                  <span>Privacy Protected</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">📱</span>
                  <span>Mobile Ready</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">⚡</span>
                  <span>Lightning Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-info">
            <div className="copyright">
              <span>© {currentYear} Tasklio</span>
              <span className="made-with">Made with ❤️ by productivity enthusiasts</span>
            </div>
            <div className="legal-links">
              <button 
                className="legal-link" 
                onClick={() => setShowTermsModal(true)}
              >
                Terms of Service
              </button>
              <span className="legal-divider">•</span>
              <button 
                className="legal-link" 
                onClick={() => setShowPrivacyModal(true)}
              >
                Privacy Policy
              </button>
              <span className="legal-divider">•</span>
              <button 
                className="legal-link" 
                onClick={() => setShowCookieModal(true)}
              >
                Cookie Policy
              </button>
              <span className="legal-divider">•</span>
              <Link to="/about" className="legal-link">Security</Link>
            </div>
          </div>

          <div className="social-connect">
            <span className="social-label">Connect with us</span>
            <div className="social-links">
              <a href="https://twitter.com/tasklio" className="social-link twitter" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="social-tooltip">Twitter</span>
              </a>
              {/* Add consent parameter for OAuth-enabled social integrations */}
              <a 
                href="https://github.com/tasklio/tasklio" 
                className="social-link github" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Star us on GitHub"
                data-oauth-prompt="consent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="social-tooltip">GitHub</span>
              </a>
              <a href="https://linkedin.com/company/tasklio" className="social-link linkedin" target="_blank" rel="noopener noreferrer" title="Connect on LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a href="https://discord.gg/tasklio" className="social-link discord" target="_blank" rel="noopener noreferrer" title="Join our Discord">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="social-tooltip">Discord</span>
              </a>
              <a href="mailto:hello@tasklio.com" className="social-link email" target="_blank" rel="noopener noreferrer" title="Email us">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="social-tooltip">Email</span>
              </a>
            </div>
          </div>
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