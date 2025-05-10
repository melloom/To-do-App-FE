import React from 'react';
import './styles/Features.css';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-container section-container">
        <div className="features-header">
          <div className="features-badge">Features</div>
          <h2>Everything you need for task management</h2>
          <p>Designed for individuals and teams who need a simple yet powerful way to organize tasks.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3 className="feature-title">Simple Task Management</h3>
            <p className="feature-description">
              Create, organize, and track your tasks with an intuitive interface designed for efficiency.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3 className="feature-title">Smart Reminders</h3>
            <p className="feature-description">
              Never miss a deadline with customizable reminders for your important tasks.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Sync Across Devices</h3>
            <p className="feature-description">
              Keep your tasks in sync across all your devices with real-time updates.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">
              Monitor your productivity with visual progress indicators and reports.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3 className="feature-title">Categories & Tags</h3>
            <p className="feature-description">
              Organize tasks with custom categories and tags for easy filtering and searching.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Private & Secure</h3>
            <p className="feature-description">
              Your data stays private and secure, with optional local storage only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;