import React, { useEffect, useState } from 'react';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import './styles/SideNavigation.css';

const SideNavigation = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  // Update container class instead of body class
  useEffect(() => {
    const aboutContainer = document.querySelector('.about-container');
    if (aboutContainer) {
      if (isCollapsed) {
        aboutContainer.classList.add('nav-collapsed');
        aboutContainer.classList.remove('nav-expanded');
      } else {
        aboutContainer.classList.remove('nav-collapsed');
        aboutContainer.classList.add('nav-expanded');
      }
    }

    return () => {
      // Clean up ALL classes when component unmounts
      const container = document.querySelector('.about-container');
      if (container) {
        container.classList.remove('nav-collapsed', 'nav-expanded');
      }
    };
  }, [isCollapsed]);

  // Improved navigation method with centered scrolling
  const navigateToSection = (sectionId) => {
    // Close the navigation on mobile after selection
    if (isMobile) {
      setIsCollapsed(true);
    }

    // Update the active tab to change the displayed section
    setActiveTab(sectionId);

    // Scroll to the section with centering
    scrollToElementCentered(sectionId, { offset: 60 });
  };

  const toggleCollapse = (e) => {
    e.stopPropagation(); // Prevent triggering navigation
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`side-navigation ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="nav-toggle"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        <span className="toggle-icon">{isCollapsed ? '›' : '‹'}</span>
      </button>

      <div className="nav-content">
        {!isCollapsed && (
          <div className="nav-header">
            <span className="nav-title">Menu</span>
          </div>
        )}

        <ul className="nav-sections">
          {sections.map(section => (
            <li
              key={section.id}
              className={`nav-item ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => navigateToSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              {!isCollapsed && <span className="nav-label">{section.label}</span>}
              {isCollapsed && <span className="nav-tooltip">{section.label}</span>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavigation;
