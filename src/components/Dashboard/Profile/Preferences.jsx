import React, { useState } from 'react';
import './Preferences.css';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: false,
      taskReminders: true,
      projectUpdates: true,
      weeklyDigest: false
    },
    tasks: {
      defaultView: 'list',
      autoSave: true,
      showCompleted: false,
      sortBy: 'dueDate',
      timeFormat: '12h'
    },
    dashboard: {
      showStats: true,
      showRecentTasks: true,
      showUpcoming: true,
      defaultTab: 'overview'
    },
    privacy: {
      profileVisible: false,
      shareProgress: false,
      analyticsEnabled: true
    }
  });

  const handleNotificationChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleTasksChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [key]: value
      }
    }));
  };

  const handleDashboardChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        [key]: typeof value === 'boolean' ? value : value
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const savePreferences = () => {
    // TODO: Implement save to backend
    console.log('Saving preferences:', preferences);
    alert('Preferences saved successfully!');
  };

  return (
    <div className="preferences">
      <div className="preferences-section">
        <h3>🔔 Notifications</h3>
        <div className="preference-group">
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <span className="checkmark"></span>
              Email notifications
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <span className="checkmark"></span>
              Push notifications
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications.taskReminders}
                onChange={() => handleNotificationChange('taskReminders')}
              />
              <span className="checkmark"></span>
              Task reminders
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications.projectUpdates}
                onChange={() => handleNotificationChange('projectUpdates')}
              />
              <span className="checkmark"></span>
              Project updates
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications.weeklyDigest}
                onChange={() => handleNotificationChange('weeklyDigest')}
              />
              <span className="checkmark"></span>
              Weekly digest
            </label>
          </div>
        </div>
      </div>

      <div className="preferences-section">
        <h3>📋 Tasks</h3>
        <div className="preference-group">
          <div className="preference-item">
            <label htmlFor="defaultView">Default view</label>
            <select
              id="defaultView"
              value={preferences.tasks.defaultView}
              onChange={(e) => handleTasksChange('defaultView', e.target.value)}
            >
              <option value="list">List</option>
              <option value="grid">Grid</option>
              <option value="kanban">Kanban</option>
            </select>
          </div>
          <div className="preference-item">
            <label htmlFor="sortBy">Default sort</label>
            <select
              id="sortBy"
              value={preferences.tasks.sortBy}
              onChange={(e) => handleTasksChange('sortBy', e.target.value)}
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="name">Name</option>
              <option value="created">Created</option>
            </select>
          </div>
          <div className="preference-item">
            <label htmlFor="timeFormat">Time format</label>
            <select
              id="timeFormat"
              value={preferences.tasks.timeFormat}
              onChange={(e) => handleTasksChange('timeFormat', e.target.value)}
            >
              <option value="12h">12 Hour</option>
              <option value="24h">24 Hour</option>
            </select>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.tasks.autoSave}
                onChange={() => handleTasksChange('autoSave', !preferences.tasks.autoSave)}
              />
              <span className="checkmark"></span>
              Auto-save changes
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.tasks.showCompleted}
                onChange={() => handleTasksChange('showCompleted', !preferences.tasks.showCompleted)}
              />
              <span className="checkmark"></span>
              Show completed tasks by default
            </label>
          </div>
        </div>
      </div>

      <div className="preferences-section">
        <h3>📊 Dashboard</h3>
        <div className="preference-group">
          <div className="preference-item">
            <label htmlFor="defaultTab">Default tab</label>
            <select
              id="defaultTab"
              value={preferences.dashboard.defaultTab}
              onChange={(e) => handleDashboardChange('defaultTab', e.target.value)}
            >
              <option value="overview">Overview</option>
              <option value="tasks">Tasks</option>
              <option value="projects">Projects</option>
              <option value="calendar">Calendar</option>
            </select>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.dashboard.showStats}
                onChange={() => handleDashboardChange('showStats', !preferences.dashboard.showStats)}
              />
              <span className="checkmark"></span>
              Show statistics overview
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.dashboard.showRecentTasks}
                onChange={() => handleDashboardChange('showRecentTasks', !preferences.dashboard.showRecentTasks)}
              />
              <span className="checkmark"></span>
              Show recent tasks
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.dashboard.showUpcoming}
                onChange={() => handleDashboardChange('showUpcoming', !preferences.dashboard.showUpcoming)}
              />
              <span className="checkmark"></span>
              Show upcoming deadlines
            </label>
          </div>
        </div>
      </div>

      <div className="preferences-section">
        <h3>🔒 Privacy</h3>
        <div className="preference-group">
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.privacy.profileVisible}
                onChange={() => handlePrivacyChange('profileVisible')}
              />
              <span className="checkmark"></span>
              Make profile visible to others
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.privacy.shareProgress}
                onChange={() => handlePrivacyChange('shareProgress')}
              />
              <span className="checkmark"></span>
              Share progress with team
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.privacy.analyticsEnabled}
                onChange={() => handlePrivacyChange('analyticsEnabled')}
              />
              <span className="checkmark"></span>
              Enable analytics
            </label>
          </div>
        </div>
      </div>

      <div className="preferences-actions">
        <button className="save-preferences-btn" onClick={savePreferences}>
          <span className="btn-icon">💾</span>
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences;