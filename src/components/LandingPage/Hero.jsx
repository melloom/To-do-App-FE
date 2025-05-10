import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Hero.css';

const Hero = () => {
  return (
    <section className="landing-hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge">Productivity Tool</div>
        <h1>Simplify your tasks with <span className="brand-name">Tasklio</span></h1>
        <p className="hero-subtitle">
          A powerful, yet simple task management app that helps you organize your life and boost productivity.
        </p>
        <div className="hero-cta-group">
          <Link to="/app" className="cta-button">
            Get Started <span className="cta-arrow">→</span>
          </Link>
          <a href="#features" className="cta-button secondary">
            Learn More
          </a>
        </div>
        
        <div className="hero-metrics-container">
          <div className="hero-metrics">
            <div className="metric metric-free">
              <div className="metric-icon">🚀</div>
              <div className="metric-content">
                <div className="metric-number">100%</div>
                <div className="metric-label">Free to Use</div>
              </div>
            </div>
            
            <div className="metric metric-private">
              <div className="metric-icon">🔒</div>
              <div className="metric-content">
                <div className="metric-number">Private</div>
                <div className="metric-label">No Account Needed</div>
              </div>
            </div>
            
            <div className="metric metric-simple">
              <div className="metric-icon">⚡</div>
              <div className="metric-content">
                <div className="metric-number">Simple</div>
                <div className="metric-label">Easy to Start</div>
              </div>
            </div>
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
