import React, { useState } from 'react';
import './ProfileSettings.css';

const ProfileSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      bio: user?.bio || '',
      phone: user?.phone || '',
      location: user?.location || '',
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-settings">
      <div className="profile-header-section">
        <div className="profile-avatar-section">
          <div className="profile-avatar-large">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <button className="change-avatar-btn">Change Photo</button>
        </div>
      </div>

      <div className="profile-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
              placeholder="Tell us a bit about yourself..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={!isEditing ? 'disabled' : ''}
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="form-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <span className="btn-icon">✏️</span>
              Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                <span className="btn-icon">💾</span>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;