import React, { useState } from 'react';
import ProfileTab from './Settings/ProfileTab';
import AppearanceTab from './Settings/AppearanceTab';
import NotificationsTab from './Settings/NotificationsTab';
import SecurityTab from './Settings/SecurityTab';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    photoURL: user?.photoURL || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: user?.displayName || '',
      email: user?.email || '',
      bio: user?.bio || '',
      photoURL: user?.photoURL || ''
    });
  };

  const handleSave = () => {
    // Save profile changes logic here
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab
            user={user}
            isEditing={isEditing}
            formData={formData}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleSave={handleSave}
            handleChange={handleChange}
          />
        );
      case 'appearance':
        return <AppearanceTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'security':
        return <SecurityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h3>Settings</h3>
          <button className="profile-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="profile-modal-tabs">
          <button 
            className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Info
          </button>
          <button 
            className={`profile-tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button 
            className={`profile-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`profile-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        <div className="profile-modal-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;