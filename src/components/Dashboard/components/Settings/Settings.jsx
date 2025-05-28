import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './Settings.css';

const Settings = ({ isOpen, onClose }) => {
  const { state, dispatch } = useDashboard();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
    defaultPriority: 'medium',
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'monday',
    language: 'en',
    taskLimit: 50
  });

  const handleSave = () => {
    // Save settings logic
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              Appearance
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shortcuts' ? 'active' : ''}`}
              onClick={() => setActiveTab('shortcuts')}
            >
              Shortcuts
            </button>
            <button 
              className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              Data
            </button>
          </div>

          <div className="settings-panel">
            {activeTab === 'general' && (
              <div className="settings-section">
                <h3>General Settings</h3>
                
                <div className="setting-item">
                  <label>Default Priority</label>
                  <select 
                    value={settings.defaultPriority}
                    onChange={(e) => setSettings({...settings, defaultPriority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Date Format</label>
                  <select 
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
                  >
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>First Day of Week</label>
                  <select 
                    value={settings.firstDayOfWeek}
                    onChange={(e) => setSettings({...settings, firstDayOfWeek: e.target.value})}
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                    />
                    <span>Enable notifications</span>
                  </label>
                </div>

                <div className="setting-item">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                    />
                    <span>Auto-save changes</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h3>Appearance</h3>
                
                <div className="setting-item">
                  <label>Theme</label>
                  <div className="theme-options">
                    <button 
                      className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'light'})}
                    >
                      ☀️ Light
                    </button>
                    <button 
                      className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'dark'})}
                    >
                      🌙 Dark
                    </button>
                    <button 
                      className={`theme-btn ${settings.theme === 'auto' ? 'active' : ''}`}
                      onClick={() => setSettings({...settings, theme: 'auto'})}
                    >
                      🔄 Auto
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shortcuts' && (
              <div className="settings-section">
                <h3>Keyboard Shortcuts</h3>
                <p>Customize your keyboard shortcuts for faster navigation.</p>
                <button className="btn-primary" onClick={() => dispatch({ type: 'SHOW_SHORTCUTS' })}>
                  Manage Shortcuts
                </button>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="settings-section">
                <h3>Data Management</h3>
                
                <div className="data-actions">
                  <div className="data-action-item">
                    <div className="action-info">
                      <h4>Export Data</h4>
                      <p>Download your tasks and projects</p>
                    </div>
                    <button 
                      className="btn-secondary"
                      onClick={() => dispatch({ type: 'EXPORT_DATA' })}
                    >
                      Export
                    </button>
                  </div>

                  <div className="data-action-item">
                    <div className="action-info">
                      <h4>Import Data</h4>
                      <p>Import tasks from a file</p>
                    </div>
                    <button 
                      className="btn-secondary"
                      onClick={() => dispatch({ type: 'IMPORT_DATA' })}
                    >
                      Import
                    </button>
                  </div>

                  <div className="data-action-item danger">
                    <div className="action-info">
                      <h4>Clear All Data</h4>
                      <p>Permanently delete all tasks and projects</p>
                    </div>
                    <button className="btn-danger">
                      Clear Data
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
