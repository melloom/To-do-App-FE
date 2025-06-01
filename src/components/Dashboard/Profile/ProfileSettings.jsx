import React, { useState, useRef } from 'react';
import { 
  FaCamera, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaUser, 
  FaBell, 
  FaLock, 
  FaShieldAlt,
  FaHistory,
  FaDownload,
  FaShareAlt,
  FaCog,
  FaCheck,
  FaClock,
  FaHourglassHalf,
  FaFont,
  FaPalette,
  FaColumns,
  FaList,
  FaThLarge,
  FaAdjust,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaIndent,
  FaOutdent
} from 'react-icons/fa';
import './ProfileSettings.css';

const ProfileSettings = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    photoURL: user?.photoURL || '',
    notifications: {
      email: true,
      push: true,
      taskReminders: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showActivity: true
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString()
    }
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: user?.displayName || '',
      email: user?.email || '',
      bio: user?.bio || '',
      photoURL: user?.photoURL || '',
      notifications: {
        email: true,
        push: true,
        taskReminders: true
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showActivity: true
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: new Date().toISOString()
      }
    });
    setPreviewImage(null);
  };

  const handleSave = async () => {
    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          photoURL: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleSecurityChange = (setting, value) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: value
      }
    }));
  };

  const handleExportData = () => {
    const data = {
      profile: {
        fullName: formData.fullName,
        email: formData.email,
        bio: formData.bio
      },
      settings: {
        notifications: formData.notifications,
        privacy: formData.privacy,
        security: formData.security
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-data-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${formData.fullName}'s Profile`,
        text: `Check out ${formData.fullName}'s profile on our Task Management App!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="settings-section">
            <h4>Notification Preferences</h4>
            <div className="settings-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span>Email Notifications</span>
              </label>
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span>Push Notifications</span>
              </label>
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.notifications.taskReminders}
                  onChange={() => handleNotificationChange('taskReminders')}
                />
                <span>Task Reminders</span>
              </label>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="settings-section">
            <h4>Privacy Settings</h4>
            <div className="settings-options">
              <div className="select-option">
                <label>Profile Visibility</label>
                <select
                  value={formData.privacy.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections Only</option>
                </select>
              </div>
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.privacy.showEmail}
                  onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                />
                <span>Show Email Address</span>
              </label>
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.privacy.showActivity}
                  onChange={(e) => handlePrivacyChange('showActivity', e.target.checked)}
                />
                <span>Show Activity Status</span>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <h4>Security Settings</h4>
            <div className="settings-options">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={formData.security.twoFactorEnabled}
                  onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                />
                <span>Two-Factor Authentication</span>
              </label>
              <div className="info-text">
                Last password change: {new Date(formData.security.lastPasswordChange).toLocaleDateString()}
              </div>
              <button className="secondary-button">Change Password</button>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="settings-section">
            <h4>Activity Log</h4>
            <div className="activity-list">
              <div className="activity-item">
                <FaCheck className="activity-icon completed" />
                <div className="activity-content">
                  <div className="activity-title">Completed Task</div>
                  <div className="activity-details">Finished "Update Profile Settings"</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <FaClock className="activity-icon in-progress" />
                <div className="activity-content">
                  <div className="activity-title">Started Task</div>
                  <div className="activity-details">Working on "Implement New Features"</div>
                  <div className="activity-time">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="settings-section">
            <h4>Appearance Settings</h4>
            
            <div className="appearance-section">
              <h5>Layout</h5>
              <div className="layout-options">
                <div className="layout-grid">
                  <button className="layout-option active">
                    <FaList />
                    <span>List View</span>
                  </button>
                  <button className="layout-option">
                    <FaThLarge />
                    <span>Grid View</span>
                  </button>
                  <button className="layout-option">
                    <FaColumns />
                    <span>Kanban</span>
                  </button>
                </div>
                
                <div className="layout-settings">
                  <div className="setting-group">
                    <label>Task Density</label>
                    <select className="setting-select">
                      <option value="comfortable">Comfortable</option>
                      <option value="compact">Compact</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                  
                  <div className="setting-group">
                    <label>Sidebar Position</label>
                    <select className="setting-select">
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-section">
              <h5>Typography</h5>
              <div className="typography-options">
                <div className="font-family-selector">
                  <label>Font Family</label>
                  <select className="setting-select">
                    <option value="inter">Inter</option>
                    <option value="roboto">Roboto</option>
                    <option value="open-sans">Open Sans</option>
                    <option value="montserrat">Montserrat</option>
                  </select>
                </div>

                <div className="font-size-controls">
                  <label>Base Font Size</label>
                  <div className="size-control">
                    <button className="size-btn">
                      <FaAdjust />
                    </button>
                    <input 
                      type="range" 
                      min="12" 
                      max="20" 
                      defaultValue="16"
                      className="size-slider"
                    />
                    <span className="size-value">16px</span>
                  </div>
                </div>

                <div className="text-style-controls">
                  <div className="style-group">
                    <label>Heading Style</label>
                    <div className="style-buttons">
                      <button className="style-btn">
                        <FaBold />
                      </button>
                      <button className="style-btn">
                        <FaItalic />
                      </button>
                      <button className="style-btn">
                        <FaUnderline />
                      </button>
                    </div>
                  </div>

                  <div className="style-group">
                    <label>Text Alignment</label>
                    <div className="style-buttons">
                      <button className="style-btn">
                        <FaAlignLeft />
                      </button>
                      <button className="style-btn">
                        <FaAlignCenter />
                      </button>
                      <button className="style-btn">
                        <FaAlignRight />
                      </button>
                    </div>
                  </div>

                  <div className="style-group">
                    <label>Line Height</label>
                    <div className="style-buttons">
                      <button className="style-btn">
                        <FaOutdent />
                      </button>
                      <button className="style-btn">
                        <FaIndent />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-section">
              <h5>Colors</h5>
              <div className="color-options">
                <div className="color-group">
                  <label>Primary Color</label>
                  <div className="color-picker">
                    <input type="color" defaultValue="#6366f1" />
                    <span>#6366f1</span>
                  </div>
                </div>
                
                <div className="color-group">
                  <label>Accent Color</label>
                  <div className="color-picker">
                    <input type="color" defaultValue="#8b5cf6" />
                    <span>#8b5cf6</span>
                  </div>
                </div>

                <div className="color-group">
                  <label>Background Color</label>
                  <div className="color-picker">
                    <input type="color" defaultValue="#ffffff" />
                    <span>#ffffff</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-section">
              <h5>Spacing</h5>
              <div className="spacing-options">
                <div className="spacing-group">
                  <label>Content Padding</label>
                  <div className="spacing-control">
                    <input 
                      type="range" 
                      min="8" 
                      max="32" 
                      defaultValue="16"
                      className="spacing-slider"
                    />
                    <span className="spacing-value">16px</span>
                  </div>
                </div>

                <div className="spacing-group">
                  <label>Element Gap</label>
                  <div className="spacing-control">
                    <input 
                      type="range" 
                      min="4" 
                      max="24" 
                      defaultValue="12"
                      className="spacing-slider"
                    />
                    <span className="spacing-value">12px</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="appearance-actions">
              <button className="secondary-button">Reset to Default</button>
              <button className="save-btn">Save Changes</button>
            </div>
          </div>
        );

      default:
        return (
          <div className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="profile-settings">
      <div className="profile-sidebar">
        <div className="profile-avatar-section">
          <div 
            className={`profile-avatar-large ${isEditing ? 'editable' : ''}`}
            onClick={handleImageClick}
          >
            {previewImage || formData.photoURL ? (
              <img src={previewImage || formData.photoURL} alt="Profile" />
            ) : (
              <div className="avatar-initials">
                {getInitials(formData.fullName)}
              </div>
            )}
            {isEditing && (
              <div className="avatar-overlay">
                <FaCamera />
                <span>Change Photo</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {isEditing && (
            <div className="avatar-actions">
              <button 
                className="remove-photo-btn"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData(prev => ({ ...prev, photoURL: '' }));
                }}
              >
                Remove Photo
              </button>
            </div>
          )}

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">24</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className={`profile-action-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser /> Profile
            </button>
            <button 
              className={`profile-action-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell /> Notifications
            </button>
            <button 
              className={`profile-action-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <FaLock /> Privacy Settings
            </button>
            <button 
              className={`profile-action-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FaShieldAlt /> Security
            </button>
            <button 
              className={`profile-action-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FaHistory /> Activity Log
            </button>
            <button 
              className="profile-action-btn"
              onClick={handleExportData}
            >
              <FaDownload /> Export Data
            </button>
            <button 
              className="profile-action-btn"
              onClick={handleShareProfile}
            >
              <FaShareAlt /> Share Profile
            </button>
            <button 
              className={`profile-action-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <FaCog /> Appearance
            </button>
          </div>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-header">
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
          {activeTab === 'profile' && (
            !isEditing ? (
              <button className="edit-btn" onClick={handleEdit}>
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="action-buttons">
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save Changes
                </button>
              </div>
            )
          )}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfileSettings;