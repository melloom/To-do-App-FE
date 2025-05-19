import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import { useUser } from '../../contexts/UserContext'; // Add useUser import
import './styles/Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // Add state for profile dropdown
  const { user, logoutUser } = useUser(); // Change signOut to logoutUser

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

  // Handle logout with improved handling
  const handleLogout = async () => {
    try {
      console.log('Attempting to sign out...');
      // Close the dropdown if it's open
      setProfileDropdownOpen(false);

      // Call the logoutUser function from UserContext
      await logoutUser();

      console.log('Sign out successful, redirecting...');

      // Force clean-up of any user data in local state
      localStorage.removeItem('currentUser');
      localStorage.removeItem('temporaryUserData');
      sessionStorage.clear();

      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // More detailed error logging
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });

      // Show more informative error message
      alert(`Sign out failed: ${error.message || 'Unknown error occurred'}`);

      // Try force logout anyway
      localStorage.removeItem('currentUser');
      sessionStorage.clear();
    }
  };

  // Get user initial for avatar
  const getUserInitial = () => {
    if (!user) return '';
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileElement = document.getElementById('profile-dropdown-container');
      if (profileElement && !profileElement.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  return (
    <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
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

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="landing-nav-list">
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
            {user ? (
              <div id="profile-dropdown-container" className="profile-container">
                <button
                  className="profile-button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="User profile"
                >
                  <div
                    className="user-avatar"
                    style={{ backgroundColor: user.color || '#5b5ef4' }}
                  >
                    {getUserInitial()}
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-user-info">
                      <div
                        className="dropdown-avatar"
                        style={{ backgroundColor: user.color || '#5b5ef4' }}
                      >
                        {getUserInitial()}
                      </div>
                      <div className="dropdown-user-details">
                        <div className="dropdown-user-name">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.name || user.email}
                        </div>
                        <div className="dropdown-user-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/app" className="dropdown-item">
                      <span className="dropdown-item-icon">📋</span>
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout-button">
                      <span className="dropdown-item-icon">🚪</span>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="login-button">Log In</Link>
                <Link to="/register" className="get-started-button">Get Started Free</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
