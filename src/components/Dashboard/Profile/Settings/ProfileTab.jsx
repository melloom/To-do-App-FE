import React, { useState, useRef } from 'react';
import { FaCamera, FaUser, FaTasks, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import './ProfileTab.css';

const ProfileTab = ({ user, isEditing, formData, handleEdit, handleCancel, handleSave, handleChange }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-tab">
      <div className="profile-header">
        <h3>Profile Information</h3>
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            <FaCamera /> Edit Profile
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <div 
              className={`profile-avatar ${isEditing ? 'editable' : ''}`}
              onClick={handleImageClick}
            >
              {previewImage ? (
                <img src={previewImage} alt="Profile preview" />
              ) : user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" />
              ) : (
                <div className="avatar-initials">
                  {getInitials(user?.displayName)}
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
            <h4>{user?.displayName || 'User'}</h4>
            <p className="user-role">{user?.role || 'Task Manager'}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <FaTasks />
              <div className="stat-info">
                <span className="stat-value">24</span>
                <span className="stat-label">Active Tasks</span>
              </div>
            </div>
            <div className="stat-item">
              <FaCalendarAlt />
              <div className="stat-info">
                <span className="stat-value">12</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            <div className="stat-item">
              <FaChartLine />
              <div className="stat-info">
                <span className="stat-value">85%</span>
                <span className="stat-label">Efficiency</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="action-btn">
              <FaUser /> View Activity
            </button>
            <button className="action-btn">
              <FaTasks /> Task History
            </button>
          </div>
        </div>

        <div className="profile-details">
          <form className="profile-form">
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

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role || 'Task Manager'}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your role"
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department || 'Product Development'}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your department"
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 