import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('vision');
  const [expandedMockup, setExpandedMockup] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleMockup = (mockupId) => {
    setExpandedMockup(expandedMockup === mockupId ? null : mockupId);
  };

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Tasklio</h1>
        <div className="about-nav">
          <button
            className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
            onClick={() => handleTabChange('vision')}
          >
            Our Vision
          </button>
          <button
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => handleTabChange('features')}
          >
            Features
          </button>
          <button
            className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => handleTabChange('team')}
          >
            Our Team
          </button>
          <button
            className={`tab-button ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => handleTabChange('roadmap')}
          >
            Roadmap
          </button>
        </div>
      </header>

      <div className="about-content">
        {activeTab === 'vision' && (
          <section className="vision-section">
            <h2>Our Vision</h2>
            <p>
              Tasklio was created with a simple mission: to help people stay organized
              without complicated tools or unnecessary features.
            </p>
            <p>
              We believe task management should be accessible to everyone, which is why
              Tasklio is completely free, privacy-focused, and straightforward to use.
            </p>
            <div className="mission-statement">
              <h3>Our Mission</h3>
              <blockquote>
                "To create the simplest, most intuitive task management tool that helps
                people focus on what matters most - completing their tasks, not managing them."
              </blockquote>
            </div>
          </section>
        )}

        {activeTab === 'features' && (
          <section className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Task Management</h3>
                <p>Create, edit, and complete tasks with a simple interface</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏷️</div>
                <h3>Categories</h3>
                <p>Organize tasks with customizable categories</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Filtering</h3>
                <p>Filter tasks by category or search by keywords</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Privacy</h3>
                <p>All your data stays on your device, always</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'team' && (
          <section className="team-section">
            <h2>Our Team</h2>
            <p>Tasklio is built by a small team of developers who are passionate about productivity and clean design.</p>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Jane Doe</h3>
                <p>Frontend Developer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3>John Smith</h3>
                <p>UX Designer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Emily Johnson</h3>
                <p>Product Manager</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'roadmap' && (
          <section className="roadmap-section">
            <h2>Product Roadmap</h2>
            <p>Here's what we're planning to build in the coming months:</p>
            <div className="roadmap-timeline">
              <div className="roadmap-item">
                <div className="roadmap-date">Q2 2023</div>
                <div className="roadmap-content">
                  <h3>Mobile Responsive Design</h3>
                  <p>Optimizing Tasklio for all screen sizes</p>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">Q3 2023</div>
                <div className="roadmap-content">
                  <h3>Dark Mode</h3>
                  <p>Adding a dark theme option for night use</p>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">Q4 2023</div>
                <div className="roadmap-content">
                  <h3>Task Priority Levels</h3>
                  <p>Add high, medium, and low priority options</p>
                </div>
              </div>
              <div className="roadmap-item">
                <div className="roadmap-date">Q1 2024</div>
                <div className="roadmap-content">
                  <h3>Offline Progressive Web App</h3>
                  <p>Install Tasklio on your device for offline use</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <div className="about-cta">
        <h2>Ready to get started?</h2>
        <p>Try Tasklio today and take control of your tasks</p>
        <Link to="/app" className="cta-button">Try Tasklio Now</Link>
      </div>
    </div>
  );
};

export default AboutPage;
