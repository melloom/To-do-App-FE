import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import './styles/Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Prevent body scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [scrolled, mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    scrollToElementCentered(sectionId, { offset: 80 });
  };

  return (
    <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container"> {/* Changed from header-container */}
        <div className="logo-container">
          <Link to="/" className="logo">
            <div className="logo-icon">T</div>
            <div className="logo-text">Tasklio</div>
          </Link>
        </div>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}> {/* Changed from landing-nav */}
          <ul className="landing-nav-list">
            {/* Order navigation items to match page content flow */}
            <li className="landing-nav-item">
              <button onClick={() => scrollToSection('landing-features')} className="nav-link">Features</button>
            </li>
            <li className="landing-nav-item">
              <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</button>
            </li>
            <li className="landing-nav-item">
              <button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button>
            </li>
            <li className="landing-nav-item">
              <button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button>
            </li>
            <li className="landing-nav-item">
              <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
            </li>
            <li className="landing-nav-item">
              <Link to="/about" className="nav-link nav-button" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </li>
          </ul>

          <div className="header-actions">
            <Link to="/login" className="login-button">Log In</Link> {/* Changed from login-btn */}
            <Link to="/register" className="get-started-button">Get Started Free</Link> {/* Changed from signup-btn */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
