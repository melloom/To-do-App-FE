import React, { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './styles/Header.css';

const Header = ({ onAddTaskClick }) => {
  const { user, logoutUser } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      // After successful logout, you might want to redirect
      // This would typically happen in a router component
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';
  const userColor = user?.color || '#5b5ef4';

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
          <button
            className="user-profile-button"
            onClick={toggleUserMenu}
            style={{
              "--user-color": userColor
            }}
          >
            <div className="user-avatar" style={{ backgroundColor: userColor }}>{userInitial}</div>
            <span className="user-name">{user?.name || 'User'}</span>
          </button>

          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-header">
                <div className="user-menu-avatar" style={{ backgroundColor: userColor }}>{userInitial}</div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{user?.name || 'User'}</div>
                  <div className="user-menu-email">{user?.email || 'user@example.com'}</div>
                </div>
              </div>

              <div className="user-menu-divider"></div>

              <button className="user-menu-button" onClick={handleLogout}>
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