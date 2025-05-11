import React from 'react';
import '../styles/RoadmapSection.css';

const RoadmapSection = () => {
  const roadmapItems = [
    {
      quarter: 'Q3 2023',
      title: 'Dark Mode & Themes',
      description: 'Introducing dark mode and customizable color themes',
      status: 'completed',
      icon: '🌙'
    },
    {
      quarter: 'Q4 2023',
      title: 'Mobile Responsive Design',
      description: 'Optimizing Tasklio for all screen sizes and mobile devices',
      status: 'in-progress',
      icon: '📱'
    },
    {
      quarter: 'Q1 2024',
      title: 'Keyboard Shortcuts',
      description: 'Add keyboard shortcuts for power users to boost productivity',
      status: 'planned',
      icon: '⌨️'
    },
    {
      quarter: 'Q2 2024',
      title: 'Offline PWA',
      description: 'Install Tasklio as a Progressive Web App for offline use',
      status: 'planned',
      icon: '🔌'
    },
    {
      quarter: 'Q3 2024',
      title: 'Recurring Tasks',
      description: 'Set up tasks that repeat on a schedule automatically',
      status: 'planned',
      icon: '🔄'
    },
    {
      quarter: 'Q4 2024',
      title: 'Optional Data Export',
      description: 'Export your tasks to CSV or JSON for backup or analysis',
      status: 'planned',
      icon: '📤'
    }
  ];

  // Group roadmap items by status
  const completedItems = roadmapItems.filter(item => item.status === 'completed');
  const inProgressItems = roadmapItems.filter(item => item.status === 'in-progress');
  const plannedItems = roadmapItems.filter(item => item.status === 'planned');

  const RoadmapIllustration = () => (
    <div className="roadmap-illustration">
      <svg width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30,75 C100,10 200,140 300,75 C400,10 500,140 600,75"
          stroke="#6366f1"
          strokeWidth="4"
          fill="none"
          strokeDasharray="8,8"
        />
        <circle cx="30" cy="75" r="10" fill="#6366f1" />
        <circle cx="300" cy="75" r="10" fill="#8b5cf6" />
        <circle cx="600" cy="75" r="10" fill="#d946ef" />
        <text x="30" y="50" fontFamily="Arial" fontSize="14" fill="#6366f1" textAnchor="middle">Now</text>
        <text x="300" y="50" fontFamily="Arial" fontSize="14" fill="#8b5cf6" textAnchor="middle">2024</text>
        <text x="600" y="50" fontFamily="Arial" fontSize="14" fill="#d946ef" textAnchor="middle">Future</text>
      </svg>
    </div>
  );

  return (
    <section className="roadmap-section">
      <div className="roadmap-header">
        <h2>Product Roadmap</h2>
        <p className="roadmap-intro">
          Tasklio is constantly evolving. Here's what I'm working on next to make your experience even better.
        </p>
        <RoadmapIllustration />
      </div>

      <div className="roadmap-columns">
        <div className="roadmap-column completed">
          <div className="column-header">
            <span className="status-indicator"></span>
            <h3>Recently Completed</h3>
          </div>
          {completedItems.map((item, index) => (
            <div className="roadmap-item completed" key={`completed-${index}`}>
              <div className="item-quarter">{item.quarter}</div>
              <div className="item-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="roadmap-column in-progress">
          <div className="column-header">
            <span className="status-indicator"></span>
            <h3>In Progress</h3>
          </div>
          {inProgressItems.map((item, index) => (
            <div className="roadmap-item in-progress" key={`in-progress-${index}`}>
              <div className="item-quarter">{item.quarter}</div>
              <div className="item-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="roadmap-column planned">
          <div className="column-header">
            <span className="status-indicator"></span>
            <h3>Coming Soon</h3>
          </div>
          {plannedItems.map((item, index) => (
            <div className="roadmap-item planned" key={`planned-${index}`}>
              <div className="item-quarter">{item.quarter}</div>
              <div className="item-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="roadmap-community">
        <h3>Have a Feature Request?</h3>
        <p>
          Tasklio is built with users in mind. If there's a feature you'd like to see,
          feel free to open an issue on GitHub or send me an email.
        </p>
        <a href="mailto:feedback@tasklio.app" className="feedback-button">
          <span>Send Feedback</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.5.5 0 0 0-.042.028.147.147 0 0 0 0 .252.5.5 0 0 0 .042.028l.853.853L7.5 11 11 7.5l-5.015-5.015.853-.853a.5.5 0 0 0 .028-.042zM1 10.6V14h3.4l7.85-7.85-3.4-3.4L1 10.6z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default RoadmapSection;
