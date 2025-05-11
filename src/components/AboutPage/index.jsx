import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import modular components
// Removed AboutHero import
import AboutHeader from './components/AboutHeader';
import VisionSection from './components/VisionSection';
import FeaturesSection from './components/FeaturesSection';
import DeveloperSection from './components/DeveloperSection';
import RoadmapSection from './components/RoadmapSection';
import InteractiveMockup from './components/InteractiveMockup';
import AboutCTA from './components/AboutCTA';
import BackToTop from './components/BackToTop'; // Add BackToTop import

import './styles/AboutPage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="about-container">
      {/* Decorative elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-dots dots-1"></div>
      <div className="decorative-dots dots-2"></div>

      {/* AboutHeader is now sticky */}
      <AboutHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="about-content">
        {activeTab === 'vision' && <VisionSection />}
        {activeTab === 'features' && <FeaturesSection />}
        {activeTab === 'developer' && <DeveloperSection />}
        {activeTab === 'demo' && <InteractiveMockup />}
        {activeTab === 'roadmap' && (
          <div className="roadmap-content-container">
            <RoadmapSection />
          </div>
        )}
      </div>

      <AboutCTA />
      <BackToTop /> {/* Add the BackToTop component */}
    </div>
  );
};

export default AboutPage;
