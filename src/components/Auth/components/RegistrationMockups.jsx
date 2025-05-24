import React, { useState, useEffect } from 'react';
import '../styles/RegistrationMockups.css';

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
        <div className="mockups-left">
          <h2>Boost your productivity</h2>
          <p>Organize tasks, stay focused, and track your progress</p>
        </div>

        <div className="mockups-right">
          {/* Dashboard Mockup */}
          <div className={`mockup-display ${activeIndex === 0 ? 'active' : ''}`}>
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">DASHBOARD</div>
              </div>
              <div className="mockup-body">
                <div className="dashboard-stats">
                  <div className="stat-box">
                    <div className="stat-icon">✓</div>
                    <div className="stat-number">12</div>
                    <div className="stat-label">Completed</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-number">8</div>
                    <div className="stat-label">Pending</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-number">4</div>
                    <div className="stat-label">High Priority</div>
                  </div>
                </div>
                <div className="dashboard-tasks">
                  <div className="tasks-header">
                    <h3>Today's Tasks</h3>
                    <span className="badge">4 tasks</span>
                  </div>
                  <div className="task-list">
                    <div className="task-item">
                      <div className="task-checkbox"></div>
                      <div className="task-details">
                        <div className="task-name">Finalize Q3 report</div>
                        <div className="task-time">09:00 AM - 11:00 AM</div>
                      </div>
                      <div className="task-priority high"></div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox"></div>
                      <div className="task-details">
                        <div className="task-name">Team meeting</div>
                        <div className="task-time">01:30 PM - 02:30 PM</div>
                      </div>
                    </div>
                    <div className="task-item completed">
                      <div className="task-checkbox checked">✓</div>
                      <div className="task-details">
                        <div className="task-name">Check emails</div>
                        <div className="task-time">08:00 AM - 08:30 AM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Focus Mode Mockup */}
          <div className={`mockup-display ${activeIndex === 1 ? 'active' : ''}`}>
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">FOCUS MODE</div>
              </div>
              <div className="mockup-body">
                <div className="focus-timer">
                  <div className="timer-circle" style={{"--progress": "65%"}}>
                    <div className="timer-progress"></div>
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
          </div>

          {/* Productivity Insights Mockup */}
          <div className={`mockup-display ${activeIndex === 2 ? 'active' : ''}`}>
            <div className="mockup-frame">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">PRODUCTIVITY INSIGHTS</div>
              </div>
              <div className="mockup-body">
                <div className="insights-chart">
                  <h3>Weekly Task Completion</h3>
                  <div className="chart-container">
                    <div className="chart-bars">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <div key={day} className="chart-bar-wrapper">
                          <div className="chart-bar-container">
                            <div
                              className={`chart-bar ${i <= 3 ? 'active' : 'upcoming'}`}
                              style={{ height: `${[65, 40, 85, 55, 35, 20, 30][i]}%` }}
                            ></div>
                          </div>
                          <div className="chart-label">{day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="insights-stats">
                  <div className="insight-card">
                    <div className="insight-icon">⚡</div>
                    <div className="insight-data">
                      <div className="insight-label">Productivity Score</div>
                      <div className="insight-value">92%</div>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-data">
                      <div className="insight-label">Focus Time</div>
                      <div className="insight-value">4h 25m</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="mockup-navigation">
            {Array.from({ length: totalMockups }).map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => goToMockup(index)}
                aria-label={`View mockup ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="mockup-arrows">
            <button
              className="arrow-button prev"
              onClick={() => setActiveIndex((activeIndex - 1 + totalMockups) % totalMockups)}
              aria-label="Previous mockup"
            >
              ←
            </button>
            <button
              className="arrow-button next"
              onClick={() => setActiveIndex((activeIndex + 1) % totalMockups)}
              aria-label="Next mockup"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMockups;
