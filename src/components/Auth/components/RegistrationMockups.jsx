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
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                </div>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default RegistrationMockups;
