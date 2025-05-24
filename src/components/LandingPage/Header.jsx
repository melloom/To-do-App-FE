import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import './styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header-nav') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${sectionId}`;
      return;
    }
    scrollToElementCentered(sectionId, { offset: 80 });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="header-logo">
          <div className="logo-bubble">T</div>
          <span className="logo-text">Tasklio</span>
        </Link>

        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            onClick={() => handleNavClick('features')}
            className="nav-link"
            type="button"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="nav-link"
            type="button"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="nav-link"
            type="button"
          >
            Pricing
          </button>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="header-btn cta-btn">
            Sign In
          </Link>
          <Link to="/register" className="header-btn cta-btn">
            Get Started Free
          </Link>
        </div>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
