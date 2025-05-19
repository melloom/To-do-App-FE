<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import './RegistrationMockups.css';

const RegistrationMockups = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalMockups = 3;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalMockups);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToMockup = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="registration-mockups">
      <div className="mockups-container">
        <h2 className="mockups-title">Boost your productivity</h2>
        <p className="mockups-subtitle">Organize tasks, stay focused, and track your progress</p>

        <div className="mockups-carousel">
          {/* Tasks Dashboard Mockup */}
          <div className={`mockup-card dashboard-mockup mockup-hover ${activeIndex === 0 ? 'active' : ''}`}>
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-title">Tasks Dashboard</div>
            </div>
            <div className="mockup-content">
              <div className="dashboard-stats">
                <div className="stat-box">
                  <div className="stat-icon">📝</div>
                  <span className="stat-number">7</span>
                  <span className="stat-label">Tasks Today</span>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">✅</div>
                  <span className="stat-number">85%</span>
                  <span className="stat-label">Completion</span>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">⭐</div>
                  <span className="stat-number">12</span>
                  <span className="stat-label">Streak</span>
                </div>
              </div>
              <div className="dashboard-tasks">
                <div className="tasks-header">
                  <h3>Today's Tasks</h3>
                  <span className="badge">3 of a 7</span>
                </div>
                <div className="task-list">
                  <div className="task-item completed">
                    <div className="task-checkbox checked">✓</div>
                    <div className="task-details">
                      <span className="task-name">Morning team standup</span>
                      <span className="task-time">9:00 AM</span>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <div className="task-details">
                      <span className="task-name">Finalize Q3 report</span>
                      <span className="task-time">11:30 AM</span>
                      <span className="task-priority high"></span>
                    </div>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <div className="task-details">
                      <span className="task-name">Review product designs</span>
                      <span className="task-time">2:00 PM</span>
                    </div>
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
                  </div>
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
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
=======

          {/* Focus Mode Mockup */}
          <div className={`mockup-card focus-mockup mockup-hover ${activeIndex === 1 ? 'active' : ''}`}>
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-title">Focus Mode</div>
            </div>
            <div className="mockup-content">
              <div className="focus-timer">
                <div className="timer-circle">
                  <div className="timer-progress" style={{"--progress": "75%"}}></div>
                  <div className="timer-display">
                    <span className="timer-time">23:41</span>
                    <span className="timer-label">remaining</span>
                  </div>
                </div>
              </div>
              <div className="focus-task">
                <h3>Currently focusing on:</h3>
                <div className="focus-task-card">
                  <div className="focus-task-priority high"></div>
                  <div className="focus-task-content">
                    <span className="focus-task-name">Finalize Q3 report</span>
                    <span className="focus-task-desc">Complete financial analysis and executive summary</span>
                  </div>
                </div>
              </div>
              <div className="focus-controls">
                <button className="focus-button pause">Pause</button>
                <button className="focus-button complete">Complete</button>
              </div>
            </div>
          </div>

          {/* Productivity Insights Mockup */}
          <div className={`mockup-card insights-mockup mockup-hover ${activeIndex === 2 ? 'active' : ''}`}>
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-title">Productivity Insights</div>
            </div>
            <div className="mockup-content">
              <div className="insights-chart">
                <h3>Weekly Task Completion</h3>
                <div className="chart-container">
                  <div className="chart-bars">
                    {['M','T','W','T','F','S','S'].map((day, i) => (
                      <div className="chart-bar-wrapper" key={i}>
                        <div className="chart-bar-container">
                          <div
                            className={`chart-bar ${i === 3 ? 'active' : i > 3 ? 'upcoming' : ''}`}
                            style={{height: `${[65, 45, 85, 90, 30, 20, 15][i]}%`}}
                          ></div>
                        </div>
                        <div className="chart-label">{day}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                </div>
              </div>
              <div className="insights-stats">
                <div className="insight-card">
                  <div className="insight-icon">⚡</div>
                  <div className="insight-data">
                    <span className="insight-label">Peak Hours</span>
                    <span className="insight-value">10AM - 12PM</span>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">🏆</div>
                  <div className="insight-data">
                    <span className="insight-label">Most Productive</span>
                    <span className="insight-value">Wednesday</span>
                  </div>
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
        </div>
        
        {/* Get Started Banner */}
        <div className="get-started-banner">
          <h3>Ready to get organized?</h3>
          <p>Join thousands of users who have transformed their productivity with Tasklio</p>
=======

          {/* Carousel Navigation */}
          <div className="carousel-controls">
            <div className="carousel-dots">
              {Array.from({ length: totalMockups }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => goToMockup(index)}
                  aria-label={`View mockup ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-arrows">
              <button
                className="carousel-arrow prev"
                onClick={() => setActiveIndex((activeIndex - 1 + totalMockups) % totalMockups)}
                aria-label="Previous mockup"
              >
                ←
              </button>
              <button
                className="carousel-arrow next"
                onClick={() => setActiveIndex((activeIndex + 1) % totalMockups)}
                aria-label="Next mockup"
              >
                →
              </button>
            </div>
          </div>
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default RegistrationMockups;
=======
export default RegistrationMockups;
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
