import React, { useState, useEffect } from 'react';
import './RegistrationMockups.css';

const RegistrationMockups = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate mockups
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
                <div className="mockup-header-text">Your Productive Dashboard</div>
              </div>
              <div className="mockup-content dashboard-content">
                <div className="dashboard-stats">
                  <div className="stat-box">
                    <span className="stat-number">7</span>
                    <span className="stat-label">Tasks Today</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">85%</span>
                    <span className="stat-label">Completion</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Focus Sessions</span>
                  </div>
                </div>
                <div className="dashboard-tasks">
                  <div className="task-list-header">Today's Priority</div>
                  <div className="task-item complete">
                    <span className="task-checkbox">✓</span>
                    <span className="task-text">Morning team standup</span>
                  </div>
                  <div className="task-item">
                    <span className="task-checkbox"></span>
                    <span className="task-text">Finalize Q3 report</span>
                    <span className="task-priority high"></span>
                  </div>
                  <div className="task-item">
                    <span className="task-checkbox"></span>
                    <span className="task-text">Review new designs</span>
                    <span className="task-priority medium"></span>
                  </div>
                  <div className="task-item">
                    <span className="task-checkbox"></span>
                    <span className="task-text">Project planning meeting</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="mockup-panel focus-mockup">
              <div className="mockup-header">
                <div className="mockup-header-text">Deep Focus Mode</div>
              </div>
              <div className="mockup-content focus-content">
                <div className="focus-timer-display">
                  <div className="timer-circle">
                    <div className="timer-text">23:41</div>
                    <div className="timer-label">Focusing on:</div>
                    <div className="focus-task-title">Finalize Q3 report</div>
                  </div>
                </div>
                <div className="focus-controls">
                  <button className="focus-button pause">Pause</button>
                  <button className="focus-button complete">Complete Task</button>
                </div>
                <div className="focus-notes-preview">
                  <div className="notes-header">Session Notes</div>
                  <div className="notes-content">
                    Made progress on executive summary and financial highlights. Need to add more details to the market analysis section.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="mockup-panel analytics-mockup">
              <div className="mockup-header">
                <div className="mockup-header-text">Productivity Insights</div>
              </div>
              <div className="mockup-content analytics-content">
                <div className="analytics-chart">
                  <div className="chart-header">Weekly Task Completion</div>
                  <div className="chart-visual">
                    <div className="chart-bar" style={{ height: '65%' }}><span>M</span></div>
                    <div className="chart-bar" style={{ height: '45%' }}><span>T</span></div>
                    <div className="chart-bar" style={{ height: '85%' }}><span>W</span></div>
                    <div className="chart-bar" style={{ height: '70%' }}><span>T</span></div>
                    <div className="chart-bar active" style={{ height: '75%' }}><span>F</span></div>
                    <div className="chart-bar upcoming" style={{ height: '20%' }}><span>S</span></div>
                    <div className="chart-bar upcoming" style={{ height: '10%' }}><span>S</span></div>
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
                  <div className="insight-card">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-details">
                      <div className="insight-title">Weekly Goal</div>
                      <div className="insight-value">78% Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mockup-indicators">
          <button
            className={`indicator ${activeIndex === 0 ? 'active' : ''}`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setActiveIndex(0);
                setIsVisible(true);
              }, 400);
            }}
          />
          <button
            className={`indicator ${activeIndex === 1 ? 'active' : ''}`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setActiveIndex(1);
                setIsVisible(true);
              }, 400);
            }}
          />
          <button
            className={`indicator ${activeIndex === 2 ? 'active' : ''}`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setActiveIndex(2);
                setIsVisible(true);
              }, 400);
            }}
          />
        </div>

        <div className="mockup-testimonial">
          <div className="testimonial-quote">
            "Tasklio transformed how I manage my day. I'm 3x more productive now!"
          </div>
          <div className="testimonial-author">
            <div className="author-avatar">SK</div>
            <div className="author-info">
              <div className="author-name">Sarah K.</div>
              <div className="author-role">Project Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMockups;
