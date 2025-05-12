import React, { useState, useEffect } from 'react';
import './RegistrationMockups.css';

const RegistrationMockups = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate mockups with automatic transition handling
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % 3);
        setIsVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="registration-mockups">
      <div className="mockup-container">
        <h2 className="mockup-title">See what awaits you</h2>

        <div className={`mockup-carousel ${isVisible ? 'visible' : 'hidden'}`}>
          {activeIndex === 0 && (
            <div className="mockup-panel dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-header-text">Productivity Dashboard</div>
              </div>
              <div className="mockup-content dashboard-content">
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
                    <div className="stat-icon">⏱️</div>
                    <span className="stat-number">3</span>
                    <span className="stat-label">Focus Sessions</span>
                  </div>
                </div>
                <div className="dashboard-tasks">
                  <div className="task-list-header">Today's Priority</div>
                  <div className="task-item complete">
                    <div className="task-checkbox-wrapper">
                      <span className="task-checkbox">✓</span>
                    </div>
                    <span className="task-text">Morning team standup</span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox-wrapper">
                      <span className="task-checkbox"></span>
                    </div>
                    <span className="task-text">Finalize Q3 report</span>
                    <span className="task-priority high"></span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox-wrapper">
                      <span className="task-checkbox"></span>
                    </div>
                    <span className="task-text">Review new designs</span>
                    <span className="task-priority medium"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="mockup-panel focus-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-header-text">Focus Mode</div>
              </div>
              <div className="mockup-content focus-content">
                <div className="focus-timer-display">
                  <div className="timer-circle">
                    <div className="timer-progress"></div>
                    <div className="timer-inner">
                      <div className="timer-text">23:41</div>
                      <div className="timer-label">Focusing on:</div>
                      <div className="focus-task-title">Finalize Q3 report</div>
                    </div>
                  </div>
                </div>
                <div className="focus-controls">
                  <button className="focus-button pause">Pause</button>
                  <button className="focus-button complete">Complete Task</button>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="mockup-panel analytics-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-header-text">Productivity Insights</div>
              </div>
              <div className="mockup-content analytics-content">
                <div className="analytics-chart">
                  <div className="chart-header">Weekly Task Completion</div>
                  <div className="chart-visual">
                    {['M','T','W','T','F','S','S'].map((day, i) => (
                      <div className="chart-bar-wrapper" key={i}>
                        <div 
                          className={`chart-bar ${i === 4 ? 'active' : i > 4 ? 'upcoming' : ''}`} 
                          style={{height: `${[65, 45, 85, 70, 75, 20, 10][i]}%`}}
                        ></div>
                        <div className="day-label">{day}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="productivity-insights">
                  <div className="insight-card">
                    <div className="insight-icon">⚡</div>
                    <div className="insight-details">
                      <div className="insight-title">Peak Productivity</div>
                      <div className="insight-value">10am - 12pm</div>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">🏆</div>
                    <div className="insight-details">
                      <div className="insight-title">Most Productive Day</div>
                      <div className="insight-value">Wednesday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Removed the mockup pagination indicators */}
      </div>
    </div>
  );
};

export default RegistrationMockups;
