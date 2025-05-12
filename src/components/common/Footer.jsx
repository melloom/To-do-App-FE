import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer = ({ 
  variant = 'standard', 
  links = true,
  children,
  className = '',
  ...props 
}) => {
  const renderLinks = () => {
    if (!links) return null;
    
    return (
      <div className="footer-links">
        <Link to="/terms" className="footer-link">Terms of Service</Link>
        <span className="footer-divider">•</span>
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        {variant === 'landing' && (
          <>
            <span className="footer-divider">•</span>
            <Link to="/about" className="footer-link">About</Link>
          </>
        )}
      </div>
    );
  };

  const renderCopyright = () => (
    <div className="footer-copyright">
      &copy; {new Date().getFullYear()} Tasklio. All rights reserved.
    </div>
  );

  const baseClass = `app-footer footer-${variant}`;
  const footerClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <footer className={footerClass} {...props}>
      {variant === 'modal' ? (
        <div className="footer-content modal">
          {children}
        </div>
      ) : variant === 'sidebar' ? (
        <div className="footer-content sidebar">
          {children || (
            <div className="footer-info">
              <p>Tasklio v1.0</p>
              {renderLinks()}
            </div>
          )}
        </div>
      ) : (
        <div className="footer-content">
          {children}
          {renderLinks()}
          {renderCopyright()}
        </div>
      )}
    </footer>
  );
};

export default Footer;