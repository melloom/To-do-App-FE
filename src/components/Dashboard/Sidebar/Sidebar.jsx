import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const sidebarItems = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: '📥',
      count: 12
    },
    {
      id: 'today',
      label: 'Today',
      icon: '📅',
      count: 5
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: '🔮',
      count: 8
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: '🚨',
      count: 3
    }
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <div className="sidebar-item-content">
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </div>
            <span className="sidebar-count">{item.count}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-item">
          <div className="sidebar-item-content">
            <span className="sidebar-icon">⚙️</span>
            <span className="sidebar-label">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;