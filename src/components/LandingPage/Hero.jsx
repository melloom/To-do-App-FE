import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToElementCentered } from '../../utils/scrollUtils';
import './styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToAbout = (e) => {
    e.preventDefault();
    // Navigate to the About page without any hash
    // This will take the user to the top of the About page
    navigate('/about');
  };

  return (
    <section className="landing-hero" id="hero">
      <div className="hero-content">
        <div className="hero-tag">
          <span className="hero-tag-icon">⚡</span>
          <span className="hero-tag-text">Task Management Simplified</span>
        </div>

        <h1 className="hero-title">
          Take control of your day with <span className="brand-name">Tasklio</span>
        </h1>

        <p className="hero-subtitle">
          The intelligent task manager that helps you organize, prioritize, and accomplish more—without the complexity.
        </p>

        <div className="hero-cta-group">
          <Link to="/register" className="cta-button">
            Get Started <span className="cta-arrow">→</span>
          </Link>
          <button onClick={navigateToAbout} className="cta-button secondary-btn">
            Learn More
          </button>
          
          {/* Temporary Development Button */}
          <Link to="/dashboard" className="cta-button dev-button">
            <span>Dashboard (Dev)</span>
            <span className="arrow-icon">🚀</span>
          </Link>
        </div>

        <div className="feature-pills-container">
          <div className="feature-pill">
            <span className="pill-icon">🚀</span>
            <span className="pill-text">100% Free to Use</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon">🔒</span>
            <span className="pill-text">Private • No Account Needed</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon">⚡</span>
            <span className="pill-text">Simple & Easy to Start</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-image-wrapper">
          <div className="animated-app-mockup">
            <div className="mockup-header">
              <div className="mockup-title">My Tasks</div>
              <div className="mockup-actions">
                <div className="mockup-action"></div>
                <div className="mockup-action"></div>
              </div>
            </div>

            <div className="mockup-body">
              <div className="task-item highlighted">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <div className="task-title">Complete project proposal</div>
                  <div className="task-due">Due: Today</div>
                </div>
                <div className="task-priority high"></div>
              </div>

              <div className="task-item">
                <div className="task-checkbox completed"></div>
                <div className="task-content">
                  <div className="task-title">Schedule team meeting</div>
                  <div className="task-due">Completed</div>
                </div>
                <div className="task-priority medium"></div>
              </div>

              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <div className="task-title">Pick up groceries</div>
                  <div className="task-due">Due: Tomorrow</div>
                </div>
                <div className="task-priority low"></div>
              </div>

              <div className="task-item">
                <div className="task-checkbox"></div>
                <div className="task-content">
                  <div className="task-title">Plan weekend activities</div>
                  <div className="task-due">Due: Friday</div>
                </div>
                <div className="task-priority medium"></div>
              </div>
            </div>

            <div className="mockup-footer">
              <div className="mockup-add-button visible">
                <span className="add-icon">+</span>
                <span className="add-text">New Task</span>
              </div>
            </div>
          </div>

          <div className="floating-element calendar">
            <div className="calendar-header"></div>
            <div className="calendar-body"></div>
          </div>

          <div className="floating-element notification">
            <div className="notification-icon">🔔</div>
            <div className="notification-content">
              <div className="notification-title"></div>
              <div className="notification-message"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-decoration circle-1"></div>
      <div className="hero-decoration circle-2"></div>
      <div className="hero-decoration dots"></div>
    </section>
  );
};

export default Hero;
