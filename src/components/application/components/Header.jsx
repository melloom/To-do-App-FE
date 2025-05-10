import React, { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './styles/Header.css';

const Header = ({ onAddTaskClick }) => {
  const { user, logout } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <header className="app-header">
      <div className="logo-container">
        <div className="logo-bubble">T</div>
        <h1>Tasklio</h1>
      </div>

      <div className="header-actions">
        <button className="add-task-header-btn" onClick={onAddTaskClick}>
          <span>+</span> New Task
        </button>

        <div className="user-profile-container">
          <button className="user-profile-button" onClick={toggleUserMenu}>
            <div className="user-avatar">{userInitial}</div>
            <span className="user-name">{user?.name || 'User'}</span>
          </button>

          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-header">
                <div className="user-menu-avatar">{userInitial}</div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{user?.name || 'User'}</div>
                  <div className="user-menu-email">{user?.email || 'user@example.com'}</div>
                </div>
              </div>

              <div className="user-menu-divider"></div>

              <button className="user-menu-button" onClick={logout}>
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

        <button className="theme-toggle">
          <span>☀️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;