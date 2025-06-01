import React from 'react';
import AboutHeader from './AboutHeader';
import AboutSection from './AboutSection';

// Add the codebase section to the main About page component
const CodebaseSection = () => {
  return (
    <section id="codebase" className="about-section codebase-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">📊</span>
            Codebase Overview
          </h2>
          <p className="section-subtitle">
            Technical insights into Tasklio's architecture and development
          </p>
        </div>

        <div className="codebase-content">
          <div className="codebase-stats">
            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Lines of Code</div>
            </div>