import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useUser } from '../../../../contexts/UserContext';
import ProjectsList from './ProjectsList';
import QuickAdd from '../QuickAdd/QuickAdd';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle, onSearchClick, activeView, onViewChange }) => {
  const { state, dispatch } = useDashboard();
  const { user } = useUser();
  const { tasks = [], notifications = [] } = state || {};
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Calculate task counts for navigation
  const inboxCount = tasks.filter(task => !task.completed && !task.project).length;
  const todayCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date().toDateString();
    return task.dueDate && new Date(task.dueDate).toDateString() === today;
  }).length;
  const upcomingCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    return dueDate && dueDate > today;
  }).length;
  const overdueCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    return dueDate && dueDate < today;
  }).length;

  const handleViewClick = (view) => {
    if (onViewChange) {
      onViewChange(view);
    } else {
      dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    }
  };

  const handleUserMenuClick = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
  };

  const handleNotificationClick = () => {
    console.log('Show notifications');
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const renderUserAvatar = () => {
    if (!user) {
      return <div className="user-avatar-guest">👤</div>;
    }

    if (user.profilePicture?.customImage) {
      return (
        <img 
          src={user.profilePicture.customImage} 
          alt={user.name}
          className="user-avatar-img"
        />
      );
    }

    if (user.profilePicture?.type === 'icon') {
      return (
        <div 
          className="user-avatar-custom"
          style={{ 
            backgroundColor: user.profilePicture.color,
            color: user.profilePicture.textColor || 'white'
          }}
        >
          {user.profilePicture.icon}
        </div>
      );
    }

    // Default to initials
    return (
      <div 
        className="user-avatar-initials"
        style={{ 
          backgroundColor: user.profilePicture?.color || '#6366f1',
          color: user.profilePicture?.textColor || 'white'
        }}
      >
        {user.profilePicture?.initial || user.name?.charAt(0)?.toUpperCase() || 'U'}
      </div>
    );
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.header-profile')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="header-actions">
          <div className="header-profile" onClick={handleUserMenuClick}>
            <div className="user-avatar-header">
              {renderUserAvatar()}
            </div>
            
            {!collapsed && showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <div className="user-menu-name">
                    {user?.name || 'Guest User'}
                  </div>
                  <div className="user-menu-email">
                    {user?.email || 'guest@tasklio.app'}
                  </div>
                </div>
                <button className="user-menu-item">
                  <span className="user-menu-item-icon">👤</span>
                  Profile Settings
                </button>
                <button className="user-menu-item">
                  <span className="user-menu-item-icon">⚙️</span>
                  Preferences
                </button>
                <button className="user-menu-item">
                  <span className="user-menu-item-icon">🌙</span>
                  Dark Mode
                </button>
                <button className="user-menu-item">
                  <span className="user-menu-item-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <div className="header-notifications">
            <button className="notification-btn-header" onClick={handleNotificationClick}>
              <span className="notification-icon">🔔</span>
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length > 99 ? '99+' : notifications.length}
                </span>
              )}
            </button>
          </div>

          <button 
            className="sidebar-toggle-btn"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="toggle-icon">‹</span>
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="sidebar-search">
          <div className="search-container">
            <div 
              className="search-input-wrapper"
              onClick={handleSearchClick}
            >
              <span className="search-icon">🔍</span>
              <div className="search-input-placeholder">
                Search tasks...
              </div>
              <div className="search-shortcut">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-content">
        <button 
          className="quick-add-btn quick-add-top"
          onClick={() => setShowQuickAdd(true)}
        >
          <span>+</span>
          {!collapsed && <span className="quick-add-text">Add Task</span>}
        </button>

        <nav className="navigation-menu">
          <div className="nav-section">
            <ul className="nav-list">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'inbox' ? 'active' : ''}`}
                  onClick={() => handleViewClick('inbox')}
                  title={collapsed ? `Inbox (${inboxCount} tasks)` : undefined}
                >
                  <span className="nav-icon">📥</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Inbox</span>
                      {inboxCount > 0 && <span className="nav-count">{inboxCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'today' ? 'active' : ''}`}
                  onClick={() => handleViewClick('today')}
                  title={collapsed ? `Today (${todayCount} tasks)` : undefined}
                >
                  <span className="nav-icon">📅</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Today</span>
                      {todayCount > 0 && <span className="nav-count">{todayCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'upcoming' ? 'active' : ''}`}
                  onClick={() => handleViewClick('upcoming')}
                  title={collapsed ? `Upcoming (${upcomingCount} tasks)` : undefined}
                >
                  <span className="nav-icon">🗓️</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Upcoming</span>
                      {upcomingCount > 0 && <span className="nav-count">{upcomingCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'overdue' ? 'active' : ''}`}
                  onClick={() => handleViewClick('overdue')}
                  title={collapsed ? `Overdue (${overdueCount} tasks)` : undefined}
                >
                  <span className="nav-icon">⚠️</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Overdue</span>
                      {overdueCount > 0 && (
                        <span className="nav-count high-priority">{overdueCount}</span>
                      )}
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <ProjectsList collapsed={collapsed} />
      </div>

      {showQuickAdd && (
        <QuickAdd onClose={() => setShowQuickAdd(false)} />
      )}
    </aside>
  );
};

export default Sidebar;
