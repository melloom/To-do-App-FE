import React, { useState } from 'react';
import '../styles/RoadmapSection.css';

const RoadmapSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const roadmapItems = [
    {
      quarter: 'Q3 2023',
      title: 'Dark Mode & Themes',
      description: 'Introducing dark mode and customizable color themes for better visibility and personalization.',
      status: 'completed',
      icon: '🌙',
      date: 'September 2023'
    },
    {
      quarter: 'Q4 2023',
      title: 'Mobile Responsive Design',
      description: 'Optimizing Tasklio for all screen sizes and mobile devices to ensure a seamless experience everywhere.',
      status: 'in-progress',
      icon: '📱',
      date: 'December 2023'
    },
    {
      quarter: 'Q1 2024',
      title: 'Keyboard Shortcuts',
      description: 'Add keyboard shortcuts for power users to boost productivity and efficiency.',
      status: 'planned',
      icon: '⌨️',
      date: 'March 2024'
    },
    {
      quarter: 'Q1 2024',
      title: 'Enhanced Security',
      description: 'Implement advanced encryption and security measures for all user data stored on our secure servers.',
      status: 'planned',
      icon: '🔐',
      date: 'March 2024'
    },
    {
      quarter: 'Q2 2024',
      title: 'Offline PWA Support',
      description: 'Install Tasklio as a Progressive Web App for offline use and enhanced performance.',
      status: 'planned',
      icon: '🔌',
      date: 'June 2024'
    },
    {
      quarter: 'Q2 2024',
      title: 'Cloud Sync & Backup',
      description: 'Automatic cloud synchronization and backup ensure your tasks are always safe and accessible across devices.',
      status: 'planned',
      icon: '☁️',
      date: 'June 2024'
    },
    {
      quarter: 'Q3 2024',
      title: 'Recurring Tasks',
      description: 'Set up tasks that repeat on a schedule automatically, perfect for regular activities.',
      status: 'planned',
      icon: '🔄',
      date: 'September 2024'
    },
    {
      quarter: 'Q4 2024',
      title: 'Data Export & Backup',
      description: 'Export your tasks to CSV or JSON for backup or analysis to never lose your important data.',
      status: 'planned',
      icon: '📤',
      date: 'December 2024'
    },
    {
      quarter: 'Q1 2025',
      title: 'Task Templates',
      description: 'Create reusable task templates for common projects and workflows.',
      status: 'planned',
      icon: '📋',
      date: 'March 2025'
    },
    {
      quarter: 'Q2 2025',
      title: 'Advanced Analytics',
      description: 'Gain insights into your productivity patterns with detailed analytics.',
      status: 'planned',
      icon: '📊',
      date: 'June 2025'
    }
  ];

  // Filter items based on active filter
  const filteredItems = activeFilter === 'all'
    ? roadmapItems
    : roadmapItems.filter(item => item.status === activeFilter);

  // Group roadmap items by status
  const completedItems = roadmapItems.filter(item => item.status === 'completed');
  const inProgressItems = roadmapItems.filter(item => item.status === 'in-progress');
  const plannedItems = roadmapItems.filter(item => item.status === 'planned');

  // Progress statistics
  const totalItems = roadmapItems.length;
  const completedPercentage = Math.round((completedItems.length / totalItems) * 100);
  const inProgressPercentage = Math.round((inProgressItems.length / totalItems) * 100);
  const plannedPercentage = Math.round((plannedItems.length / totalItems) * 100);

  return (
    <section className="roadmap-section">
      <div className="roadmap-header">
        <h2>Product Roadmap</h2>
        <p className="roadmap-intro">
          Tasklio is constantly evolving. Here's my development plan to make your task management experience even better.
        </p>

        <div className="roadmap-progress">
          <div className="progress-circle-container">
            <svg className="progress-circle" width="120" height="120" viewBox="0 0 120 120">
              <circle className="progress-bg" cx="60" cy="60" r="54" />
              <circle
                className="progress-fill completed"
                cx="60" cy="60" r="54"
                strokeDasharray="339.292"
                strokeDashoffset={339.292 * (1 - completedPercentage / 100)}
              />
              <circle
                className="progress-fill in-progress"
                cx="60" cy="60" r="54"
                strokeDasharray="339.292"
                strokeDashoffset={339.292 * (1 - (completedPercentage + inProgressPercentage) / 100)}
              />
            </svg>
            <div className="progress-text">
              <div className="progress-percentage">{completedPercentage}%</div>
              <div className="progress-label">Complete</div>
            </div>
          </div>

          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-indicator completed"></div>
              <div className="stat-info">
                <div className="stat-count">{completedItems.length}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-indicator in-progress"></div>
              <div className="stat-info">
                <div className="stat-count">{inProgressItems.length}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-indicator planned"></div>
              <div className="stat-info">
                <div className="stat-count">{plannedItems.length}</div>
                <div className="stat-label">Planned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="roadmap-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Features
          </button>
          <button
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${activeFilter === 'planned' ? 'active' : ''}`}
            onClick={() => setActiveFilter('planned')}
          >
            Planned
          </button>
        </div>
      </div>

      <div className="roadmap-timeline">
        <div className="timeline-track"></div>

        {filteredItems.map((item, index) => (
          <div
            className={`timeline-item ${item.status}`}
            key={index}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="item-meta">
                <span className="item-quarter">{item.quarter}</span>
                <span className="item-date">{item.date}</span>
                <span className={`item-status ${item.status}`}>
                  {item.status === 'completed' ? 'Completed' :
                   item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              <div className="item-icon">{item.icon}</div>
              <h4 className="item-title">{item.title}</h4>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="roadmap-upcoming">
        <h3>What's Coming Next</h3>
        <div className="upcoming-grid">
          {plannedItems.slice(0, 3).map((item, index) => (
            <div className="upcoming-card" key={index}>
              <div className="upcoming-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="upcoming-eta">ETA: {item.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="roadmap-community">
        <div className="community-content">
          <h3>Have a Feature Request?</h3>
          <p>
            Tasklio is built with users in mind. If there's a feature you'd like to see,
            feel free to open an issue on GitHub or send me an email with your thoughts.
          </p>
          <div className="community-actions">
            <a href="mailto:feedback@tasklio.app" className="feedback-button">
              <span className="feedback-icon">✉️</span>
              <span>Send Feedback</span>
            </a>
            <a href="https://github.com/melvinperalta/tasklio/issues/new" className="github-button">
              <span className="github-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              <span>Submit on GitHub</span>
            </a>
          </div>
        </div>

        <div className="community-illustration">
          <div className="feedback-illustration">
            <div className="feedback-bubble bubble-1">
              <span className="bubble-emoji">💡</span>
              <div className="bubble-line"></div>
              <div className="bubble-line"></div>
            </div>
            <div className="feedback-bubble bubble-2">
              <span className="bubble-emoji">🚀</span>
              <div className="bubble-line"></div>
              <div className="bubble-line"></div>
            </div>
            <div className="feedback-bubble bubble-3">
              <span className="bubble-emoji">✨</span>
              <div className="bubble-line"></div>
              <div className="bubble-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
