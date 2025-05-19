import React from 'react';
import '../styles/RegistrationMockups.css';

const RegistrationMockups = () => {
  return (
    <div className="mockup-container">
      <div className="mockup-content">
        <h2>Organize your tasks with Tasklio</h2>
        <p>Our powerful task management system helps you stay productive and organized.</p>
        
        <div className="mockup-features">
          <div className="feature">
            <div className="feature-icon">📋</div>
            <div className="feature-text">
              <h3>Task Organization</h3>
              <p>Categorize and prioritize your tasks efficiently</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔔</div>
            <div className="feature-text">
              <h3>Smart Reminders</h3>
              <p>Never miss a deadline with customizable notifications</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-text">
              <h3>Progress Tracking</h3>
              <p>Monitor your productivity with visual dashboards</p>
            </div>
          </div>
        </div>
        
        <div className="mockup-image">
          <div className="app-preview">
            <div className="preview-header">
              <div className="header-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="header-title">Tasklio Dashboard</div>
            </div>
            <div className="preview-content">
              <div className="task-list">
                <div className="task-item completed">
                  <span className="task-checkbox">✓</span>
                  <span className="task-text">Complete project proposal</span>
                </div>
                <div className="task-item">
                  <span className="task-checkbox"></span>
                  <span className="task-text">Schedule team meeting</span>
                </div>
                <div className="task-item">
                  <span className="task-checkbox"></span>
                  <span className="task-text">Research new tools</span>
                </div>
                <div className="task-item">
                  <span className="task-checkbox"></span>
                  <span className="task-text">Update documentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Features Section */}
        <div className="mockup-key-features">
          <h3>Why choose Tasklio?</h3>
          <div className="key-features-grid">
            <div className="key-feature-card">
              <div className="key-feature-icon">🔄</div>
              <h4>Seamless Syncing</h4>
              <p>Your tasks automatically sync across all your devices</p>
            </div>
            <div className="key-feature-card">
              <div className="key-feature-icon">📱</div>
              <h4>Mobile Friendly</h4>
              <p>Take your tasks with you on the go</p>
            </div>
            <div className="key-feature-card">
              <div className="key-feature-icon">🔒</div>
              <h4>Secure Data</h4>
              <p>Your information is encrypted and secure</p>
            </div>
            <div className="key-feature-card">
              <div className="key-feature-icon">👥</div>
              <h4>Team Collaboration</h4>
              <p>Share and assign tasks with your team</p>
            </div>
          </div>
        </div>
        
        {/* App Screenshots */}
        <div className="mockup-screenshots">
          <div className="screenshot-text">
            <h3>All your tasks in one place</h3>
            <ul>
              <li>Intuitive and clean interface</li>
              <li>Customize your workflow</li>
              <li>Collaborate with your team</li>
            </ul>
          </div>
        </div>
        
        {/* Mobile App Mockup */}
        <div className="mobile-mockup">
          <h3>Take Tasklio on the go</h3>
          <div className="phone-container">
            <div className="phone-frame">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-status-bar"></div>
                  <div className="phone-app-header">
                    <span className="app-name">Tasklio</span>
                    <span className="app-menu">≡</span>
                  </div>
                </div>
                <div className="phone-content">
                  <div className="phone-task-group">
                    <div className="phone-group-header">Today's Tasks</div>
                    <div className="phone-task completed">
                      <span className="phone-task-check">✓</span>
                      <span>Morning standup</span>
                    </div>
                    <div className="phone-task">
                      <span className="phone-task-check"></span>
                      <span>Client meeting</span>
                    </div>
                    <div className="phone-task">
                      <span className="phone-task-check"></span>
                      <span>Send weekly report</span>
                    </div>
                  </div>
                  <div className="phone-task-group">
                    <div className="phone-group-header">Tomorrow</div>
                    <div className="phone-task">
                      <span className="phone-task-check"></span>
                      <span>Design review</span>
                    </div>
                    <div className="phone-task">
                      <span className="phone-task-check"></span>
                      <span>Team lunch</span>
                    </div>
                  </div>
                </div>
                <div className="phone-nav">
                  <div className="nav-item active">
                    <span className="nav-icon">◉</span>
                    <span className="nav-text">Tasks</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-icon">◉</span>
                    <span className="nav-text">Calendar</span>
                  </div>
                  <div className="nav-item">
                    <span className="nav-icon">◉</span>
                    <span className="nav-text">Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="testimonials">
          <h3>What our users say</h3>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"Tasklio has transformed how I organize my work. I can't imagine going back!"</div>
              <div className="testimonial-author">
                <div className="author-avatar">SA</div>
                <div className="author-info">
                  <div className="author-name">Sarah A.</div>
                  <div className="author-role">Product Manager</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-quote">"The best task management app I've used. Simple yet powerful."</div>
              <div className="testimonial-author">
                <div className="author-avatar">JT</div>
                <div className="author-info">
                  <div className="author-name">James T.</div>
                  <div className="author-role">Software Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Get Started Banner */}
        <div className="get-started-banner">
          <h3>Ready to get organized?</h3>
          <p>Join thousands of users who have transformed their productivity with Tasklio</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMockups;