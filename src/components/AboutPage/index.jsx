import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import modular components
import AboutHeader from './components/AboutHeader';
import VisionSection from './components/VisionSection';
import FeaturesSection from './components/FeaturesSection';
import DeveloperSection from './components/DeveloperSection';
import RoadmapSection from './components/RoadmapSection';
import AboutCTA from './components/AboutCTA';

import './styles/AboutPage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="about-container">
      <AboutHeader activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="about-content">
        {activeTab === 'vision' && <VisionSection />}
        {activeTab === 'features' && <FeaturesSection />}
        {activeTab === 'developer' && <DeveloperSection />}
        {activeTab === 'roadmap' && <RoadmapSection />}
      </div>

      <AboutCTA />
    </div>
  );
};

export default AboutPage;
