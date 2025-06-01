import React, { useState } from 'react';
import './UserMenu.css';

const UserMenu = ({ isOpen, onClose }) => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    plan: 'Free'
  });

  if (!isOpen) return null;

  return (
    <div className="user-menu-overlay" onClick={onClose}>
      <div className="user-menu" onClick={e => e.stopPropagation()}>
        <div className="user-profile">
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
            <div className="user-plan">{user.plan} Plan</div>
          </div>
        </div>

        <div className="menu-items">
          <button className="menu-item">
            <span className="menu-icon">👤</span>
            <span>Profile Settings</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">⚙️</span>
            <span>Preferences</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">📊</span>
            <span>Usage Stats</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">❓</span>
            <span>Help & Support</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🔔</span>
            <span>Notifications</span>
          </button>
          <hr className="menu-divider" />
          <button className="menu-item danger">
            <span className="menu-icon">🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
