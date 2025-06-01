import React, { useEffect, useState, useCallback } from 'react';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SideNavigation.css';

const SideNavigation = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Define the sections
  const sections = [
    { id: 'vision', label: 'Our Vision', icon: '🔭' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'developer', label: 'Developer', icon: '👨‍💻' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    { id: 'codebase', label: 'Codebase', icon: '📊' },
    { id: 'demo', label: 'Demo', icon: '🎮' }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const wasMobile = isMobile;
      setIsMobile(mobile);
      
      // Auto-collapse on mobile, but only if transitioning to mobile
      if (mobile && !wasMobile) {
        setIsCollapsed(true);
      }
      // Auto-expand when transitioning from mobile to desktop
      else if (!mobile && wasMobile) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial setup - collapse on mobile
    if (isMobile) {
      setIsCollapsed(true);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Update container class
  useEffect(() => {
    const aboutContainer = document.querySelector('.about-container');
    if (aboutContainer) {
      // Remove all navigation classes first
      aboutContainer.classList.remove('nav-collapsed', 'nav-expanded');
      
      // Add appropriate class based on state
      if (isCollapsed) {
        aboutContainer.classList.add('nav-collapsed');
      } else {
        aboutContainer.classList.add('nav-expanded');
      }
    }

    return () => {
      // Cleanup on unmount
      const container = document.querySelector('.about-container');
      if (container) {
        container.classList.remove('nav-collapsed', 'nav-expanded');
      }
    };
  }, [isCollapsed]);

  // Navigation with improved mobile handling
  const navigateToSection = useCallback((sectionId) => {
    // Auto-collapse on mobile after selection for better UX
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }

    // Update active tab
    setActiveTab(sectionId);

    // Smooth scroll to section
    setTimeout(() => {
      scrollToElementCentered(sectionId, { 
        offset: isMobile ? 80 : 60,
        behavior: 'smooth'
      });
    }, isMobile ? 300 : 100); // Wait for collapse animation on mobile
  }, [isMobile, isCollapsed, setActiveTab]);

  // Toggle with improved animation
  const toggleCollapse = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsCollapsed(prev => !prev);
  }, []);

  // Home navigation
  const handleHomeClick = useCallback((e) => {
    e.preventDefault();
    
    // Auto-collapse on mobile
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
    
    navigate('/');
    
    // Smooth scroll to top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, [navigate, isMobile, isCollapsed]);

  return (
    <nav className={`side-navigation ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="nav-toggle"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
        type="button"
      >
        <span className="toggle-icon">‹</span>
      </button>

      <div className="nav-content">
        <a 
          href="/" 
          className="nav-item home-button"
          onClick={handleHomeClick}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
          {isCollapsed && <span className="nav-tooltip">Go to Home</span>}
        </a>

        {!isCollapsed && (
          <div className="nav-header">
            <span className="nav-title">Navigation</span>
          </div>
        )}

        <ul className="nav-sections">
          {sections.map(section => (
            <li
              key={section.id}
              className={`nav-item ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => navigateToSection(section.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateToSection(section.id);
                }
              }}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
              {isCollapsed && <span className="nav-tooltip">{section.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavigation;
