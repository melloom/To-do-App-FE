import React, { useState } from 'react';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 'tasks',
      icon: '📝',
      title: 'Intuitive Task Management',
      description: 'Create, edit, and complete tasks with a clean, distraction-free interface',
      details: 'Add tasks with a single click, organize them with drag-and-drop, and mark them complete with a satisfying checkbox animation.',
      mockup: () => (
        <div className="feature-mockup task-mockup">
          <div className="mockup-header">
            <div className="mockup-title">My Tasks</div>
            <div className="mockup-actions">
              <div className="mockup-button"></div>
              <div className="mockup-button"></div>
            </div>
          </div>
          <div className="mockup-content">
            <div className="mockup-task completed">
              <div className="mockup-checkbox checked"></div>
              <div className="mockup-task-text">Research competitor apps</div>
            </div>
            <div className="mockup-task">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Design landing page</div>
            </div>
            <div className="mockup-task">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Implement responsive layout</div>
            </div>
            <div className="mockup-task">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Test on mobile devices</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'categories',
      icon: '🏷️',
      title: 'Smart Categories',
      description: 'Organize tasks with customizable categories and filters',
      details: 'Group related tasks together with color-coded categories. Filter your task list by category with a single click.',
      mockup: () => (
        <div className="feature-mockup category-mockup">
          <div className="mockup-sidebar">
            <div className="mockup-sidebar-item active">All Tasks</div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#6366f1'}}></span>
              Work
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#10b981'}}></span>
              Personal
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#f59e0b'}}></span>
              Shopping
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#ef4444'}}></span>
              Health
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'priority',
      icon: '🔍',
      title: 'Priority Levels',
      description: 'Set importance levels and due dates to stay focused on what matters',
      details: 'Assign high, medium, or low priority to tasks. Sort your tasks by priority with a single click.',
      mockup: () => (
        <div className="feature-mockup priority-mockup">
          <div className="mockup-priority high">
            <span className="priority-indicator"></span>
            <span className="priority-text">High Priority</span>
          </div>
          <div className="mockup-priority medium">
            <span className="priority-indicator"></span>
            <span className="priority-text">Medium Priority</span>
          </div>
          <div className="mockup-priority low">
            <span className="priority-indicator"></span>
            <span className="priority-text">Low Priority</span>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      icon: '🔒',
      title: 'Complete Privacy',
      description: 'Your data stays on your device - no accounts, no tracking',
      details: 'Tasklio never sends your task data to any server. Everything is stored locally in your browser, giving you complete control.',
      mockup: () => (
        <div className="feature-mockup privacy-mockup">
          <div className="privacy-icon">🔒</div>
          <div className="privacy-lines">
            <div className="privacy-line"></div>
            <div className="privacy-line"></div>
            <div className="privacy-line"></div>
          </div>
          <div className="privacy-device"></div>
          <div className="privacy-text">Your data never leaves your device</div>
        </div>
      )
    }
  ];

  return (
    <section className="features-section">
      <h2>Key Features</h2>
      <p className="features-intro">
        Tasklio includes all the essential features you need without the overwhelming complexity
      </p>

      <div className="features-grid">
        {features.map(feature => (
          <div
            key={feature.id}
            className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>

            {activeFeature === feature.id && (
              <div className="feature-details">
                <p>{feature.details}</p>
                <div className="feature-mockup-container">
                  {feature.mockup()}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="features-note">
        <p>
          <strong>All features are completely free</strong> - no premium tier, no feature limitations.
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;
