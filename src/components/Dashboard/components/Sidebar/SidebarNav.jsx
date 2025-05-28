import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    {
      id: 'inbox',
      icon: '📥',
      label: 'Inbox',
      count: 5
    },
    {
      id: 'today',
      icon: '📅',
      label: 'Today',
      count: 3
    },
    {
      id: 'upcoming',
      icon: '📋',
      label: 'Upcoming',
      count: 8
    },
    {
      id: 'overdue',
      icon: '⚠️',
      label: 'Overdue',
      count: 2
    }
  ];

  const projects = [
    {
      id: 'work',
      name: 'Work',
      color: '#3b82f6',
      count: 12
    },
    {
      id: 'personal',
      name: 'Personal',
      color: '#10b981',
      count: 6
    },
    {
      id: 'learning',
      name: 'Learning',
      color: '#f59e0b',
      count: 4
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>Views</h3>
          <ul className="nav-list">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.count > 0 && (
                    <span className="nav-count">{item.count}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3>Projects</h3>
          <ul className="nav-list">
            {projects.map(project => (
              <li key={project.id}>
                <button
                  className={`nav-item ${activeSection === project.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(project.id)}
                >
                  <span 
                    className="nav-icon project-color"
                    style={{ backgroundColor: project.color }}
                  ></span>
                  <span className="nav-label">{project.name}</span>
                  {project.count > 0 && (
                    <span className="nav-count">{project.count}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="add-project-btn">
          <span className="nav-icon">➕</span>
          <span className="nav-label">Add Project</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;