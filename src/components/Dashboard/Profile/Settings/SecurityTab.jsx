import React from 'react';
import { FaLock, FaShieldAlt, FaKey, FaHistory } from 'react-icons/fa';
import './SecurityTab.css';

const SecurityTab = () => {
  return (
    <div className="security-tab">
      <div className="security-section">
        <h5>Password & Authentication</h5>
        <div className="security-options">
          <div className="security-option">
            <div className="option-header">
              <div className="option-icon">
                <FaLock />
              </div>
              <div className="option-info">
                <h6>Password</h6>
                <p>Last changed 30 days ago</p>
              </div>
            </div>
            <button className="secondary-button">Change Password</button>
          </div>

          <div className="security-option">
            <div className="option-header">
              <div className="option-icon">
                <FaShieldAlt />
              </div>
              <div className="option-info">
                <h6>Two-Factor Authentication</h6>
                <p>Add an extra layer of security</p>
              </div>
            </div>
            <button className="secondary-button">Enable 2FA</button>
          </div>
        </div>
      </div>

      <div className="security-section">
        <h5>Session Management</h5>
        <div className="security-options">
          <div className="security-option">
            <div className="option-header">
              <div className="option-icon">
                <FaKey />
              </div>
              <div className="option-info">
                <h6>Active Sessions</h6>
                <p>Manage your active sessions</p>
              </div>
            </div>
            <button className="secondary-button">View Sessions</button>
          </div>

          <div className="security-option">
            <div className="option-header">
              <div className="option-icon">
                <FaHistory />
              </div>
              <div className="option-info">
                <h6>Login History</h6>
                <p>View your recent login activity</p>
              </div>
            </div>
            <button className="secondary-button">View History</button>
          </div>
        </div>
      </div>

      <div className="security-section">
        <h5>Security Preferences</h5>
        <div className="security-preferences">
          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <div className="option-details">
                <span className="option-title">Remember Device</span>
                <span className="option-description">Skip 2FA on trusted devices</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <div className="option-details">
                <span className="option-title">Login Notifications</span>
                <span className="option-description">Get notified of new logins</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <div className="option-details">
                <span className="option-title">Auto-Lock</span>
                <span className="option-description">Lock after 30 minutes of inactivity</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="security-actions">
        <button className="danger-button">Delete Account</button>
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default SecurityTab; 