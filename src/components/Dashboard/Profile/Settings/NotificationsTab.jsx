import React from 'react';
import { FaBell, FaEnvelope, FaMobile, FaCalendarAlt } from 'react-icons/fa';
import './NotificationsTab.css';

const NotificationsTab = () => {
  return (
    <div className="notifications-tab">
      <div className="notifications-section">
        <h5>Notification Channels</h5>
        <div className="notification-options">
          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaEnvelope className="option-icon" />
              <div className="option-details">
                <span className="option-title">Email Notifications</span>
                <span className="option-description">Receive updates via email</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaMobile className="option-icon" />
              <div className="option-details">
                <span className="option-title">Push Notifications</span>
                <span className="option-description">Get instant updates on your device</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaBell className="option-icon" />
              <div className="option-details">
                <span className="option-title">In-App Notifications</span>
                <span className="option-description">See notifications within the app</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="notifications-section">
        <h5>Notification Types</h5>
        <div className="notification-options">
          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaCalendarAlt className="option-icon" />
              <div className="option-details">
                <span className="option-title">Task Reminders</span>
                <span className="option-description">Get reminded about upcoming tasks</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaBell className="option-icon" />
              <div className="option-details">
                <span className="option-title">Due Date Alerts</span>
                <span className="option-description">Notifications for approaching deadlines</span>
              </div>
            </div>
          </label>

          <label className="toggle-option">
            <input type="checkbox" defaultChecked />
            <div className="option-content">
              <FaEnvelope className="option-icon" />
              <div className="option-details">
                <span className="option-title">Task Assignments</span>
                <span className="option-description">Get notified when tasks are assigned to you</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="notifications-section">
        <h5>Notification Schedule</h5>
        <div className="schedule-options">
          <div className="schedule-group">
            <label>Daily Digest</label>
            <select className="setting-select">
              <option value="morning">Morning (8:00 AM)</option>
              <option value="afternoon">Afternoon (2:00 PM)</option>
              <option value="evening">Evening (8:00 PM)</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className="schedule-group">
            <label>Reminder Time</label>
            <select className="setting-select">
              <option value="1">1 hour before</option>
              <option value="2">2 hours before</option>
              <option value="4">4 hours before</option>
              <option value="8">8 hours before</option>
              <option value="24">1 day before</option>
            </select>
          </div>
        </div>
      </div>

      <div className="notifications-actions">
        <button className="secondary-button">Reset to Default</button>
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default NotificationsTab; 