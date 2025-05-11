// filepath: /workspaces/To-do-App-FE/src/components/LandingPage/AppShowcase.jsx
import React from 'react';
import './styles/Showcase.css';

const AppShowcase = () => {
  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <div className="showcase-header">
          <div className="showcase-badge">App Showcase</div>
          <h2>Beautiful, Simple, and Functional</h2>
          <p>Tasklio combines elegant design with practical features to create the perfect task management experience</p>
        </div>

        <div className="showcase-mockup">
          <div className="showcase-phone">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="app-preview">
                <div className="preview-header">
                  <div className="preview-title">My Tasks</div>
                </div>

                <div className="preview-content">
                  <div className="preview-category">
                    <h3>Today</h3>
                    <div className="preview-task completed">
                      <span className="task-dot"></span>
                      <p>Answer emails from team</p>
                    </div>
                    <div className="preview-task highlight">
                      <span className="task-dot"></span>
                      <p>Prepare presentation for meeting</p>
                    </div>
                    <div className="preview-task">
                      <span className="task-dot"></span>
                      <p>Schedule dentist appointment</p>
                    </div>
                  </div>

                  <div className="preview-category">
                    <h3>Tomorrow</h3>
                    <div className="preview-task">
                      <span className="task-dot"></span>
                      <p>Team sync meeting</p>
                    </div>
                    <div className="preview-task">
                      <span className="task-dot"></span>
                      <p>Review project timeline</p>
                    </div>
                  </div>
                </div>

                <div className="preview-footer">
                  <div className="preview-add-button" style={{ fontSize: '18px', fontWeight: 'bold', color: '#007BFF' }}>+ Add New Task</div>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-features">
            <div className="showcase-feature">
              <h3>Intuitive Design</h3>
              <p>User-friendly interface that makes task management a breeze</p>
            </div>

            <div className="showcase-feature">
              <h3>Quick Task Entry</h3>
              <p>Add new tasks in seconds with our streamlined input system</p>
            </div>

            <div className="showcase-feature">
              <h3>Clean Organization</h3>
              <p>Clear categorization keeps your tasks neat and accessible</p>
            </div>
          </div>
        </div>

        <div className="showcase-cta">
          <h3>Ready to simplify your task management?</h3>
          <a href="/app" className="showcase-button">Get Started Now</a>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;