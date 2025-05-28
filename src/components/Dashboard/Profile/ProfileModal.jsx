import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import Preferences from './Preferences';
import DarkModeToggle from './DarkModeToggle';
import SignOut from './SignOut';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('settings');

  if (!isOpen) return null;

  const tabs = [
    { id: 'settings', label: 'Profile Settings', icon: '👤' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'account', label: 'Account', icon: '🔐' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return <ProfileSettings user={user} />;
      case 'preferences':
        return <Preferences />;
      case 'appearance':
        return <DarkModeToggle />;
      case 'account':
        return <SignOut onClose={onClose} />;
      default:
        return <ProfileSettings user={user} />;
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Profile & Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="profile-modal-content">
          <div className="profile-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="profile-tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;