import React from 'react';
import { useUser } from '../../../contexts/UserContext';
import './styles/Sidebar.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const { user } = useUser();
  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">T</div>
          <span className="sidebar-app-name">Tasklio</span>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="sidebar-section-header">Dashboard</div>
          <button
            className={`sidebar-nav-item ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => setActivePage('home')}
          >
            <span className="nav-item-icon">🏠</span>
            Home
          </button>
          <button
            className={`sidebar-nav-item ${activePage === 'calendar' ? 'active' : ''}`}
            onClick={() => setActivePage('calendar')}
          >
            <span className="nav-item-icon">📅</span>
            Calendar
          </button>
          <button
            className={`sidebar-nav-item ${activePage === 'stats' ? 'active' : ''}`}
            onClick={() => setActivePage('stats')}
          >
            <span className="nav-item-icon">📊</span>
            Statistics
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-header">Categories</div>
          <button className="sidebar-nav-item">
            <span className="nav-item-icon">💼</span>
            Work
          </button>
          <button className="sidebar-nav-item">
            <span className="nav-item-icon">🏠</span>
            Personal
          </button>
          <button className="sidebar-nav-item">
            <span className="nav-item-icon">🎓</span>
            Education
          </button>
          <button className="sidebar-nav-item">
            <span className="nav-item-icon">➕</span>
            Add Category
          </button>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile-pill">
          <div className="user-avatar">{userInitial}</div>
          <span className="user-name">{user?.name || 'User'}</span>
        </div>
        <button className="sidebar-settings-btn">
          <span className="nav-item-icon">⚙️</span>
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;