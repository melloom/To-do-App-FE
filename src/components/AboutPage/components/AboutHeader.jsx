import React from 'react';
import '../styles/AboutHeader.css';

const AboutHeader = ({ activeTab, handleTabChange }) => {
  return (
    <header className="about-header">
      <div className="about-header-content">
        <h1>About Tasklio</h1>
        <p className="about-tagline">
          A simple, elegant task manager built with passion in just two weeks
        </p>
      </div>

      <div className="about-nav">
        <button
          className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
          onClick={() => handleTabChange('vision')}
        >
          <span className="tab-icon">💡</span>
          Our Vision
        </button>
        <button
          className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => handleTabChange('features')}
        >
          <span className="tab-icon">✨</span>
          Features
        </button>
        <button
          className={`tab-button ${activeTab === 'developer' ? 'active' : ''}`}
          onClick={() => handleTabChange('developer')}
        >
          <span className="tab-icon">👨‍💻</span>
          The Developer
        </button>
        <button
          className={`tab-button ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => handleTabChange('roadmap')}
        >
          <span className="tab-icon">🗺️</span>
          Roadmap
        </button>
      </div>
    </header>
  );
};

export default AboutHeader;
