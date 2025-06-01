import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import AboutHeader from './components/AboutHeader';
import VisionSection from './components/VisionSection';
import FeaturesSection from './components/FeaturesSection';
import DeveloperSection from './components/DeveloperSection';
import RoadmapSection from './components/RoadmapSection';
import CodebaseSection from './components/CodebaseSection';
import InteractiveMockup from './components/InteractiveMockup';
import AboutCTA from './components/AboutCTA';
import BackToTop from './components/BackToTop';
import { scrollToElementCentered } from '../../utils/scrollUtils';

import './styles/AboutPage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('vision');
  const location = useLocation();
  const initialRenderRef = useRef(true);

  // Add useEffect to handle initial loading and hash navigation
  useEffect(() => {
    // Handle hash in URL
    if (location.hash) {
      const hash = location.hash.substring(1);
      setActiveTab(hash);

      // Wait for component to render then scroll to the section
      setTimeout(() => {
        scrollToElementCentered(hash, { offset: 60 });
      }, 100);
    } else if (initialRenderRef.current) {
      // Only scroll to top if there's no hash and this is the initial render
      window.scrollTo(0, 0);
    }

    initialRenderRef.current = false;

    // Clean up any body classes when unmounting
    return () => {
      document.body.classList.remove('nav-collapsed', 'nav-expanded');
    };
  }, [location.hash]);

  // Handle URL changes for direct section links
  useEffect(() => {
    // Update URL when active tab changes, but don't trigger a page reload
    window.history.replaceState(null, null, `#${activeTab}`);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Scroll to section with centering
    scrollToElementCentered(tab, { offset: 60 });
  };

  // Render only the active section
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'vision':
        return <VisionSection />;
      case 'features':
        return <FeaturesSection />;
      case 'developer':
        return <DeveloperSection />;
      case 'roadmap':
        return <RoadmapSection />;
      case 'codebase':
        return <CodebaseSection />;
      case 'demo':
        return <InteractiveMockup />;
      default:
        return <VisionSection />;
    }
  };

  return (
    <div className="about-container">
      <SideNavigation activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Decorative elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-dots dots-1"></div>
      <div className="decorative-dots dots-2"></div>

      {/* AboutHeader is now sticky */}
      <AboutHeader activeTab={activeTab} setActiveTab={handleTabChange} />

      <div className="about-content">
        <section id={activeTab} className="about-section">
          {renderActiveSection()}
        </section>
      </div>

      <AboutCTA />
      <BackToTop />
    </div>
  );
};

export default AboutPage;
