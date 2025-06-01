import React, { useState } from 'react';
import { 
  FaPalette, 
  FaMoon, 
  FaSun,
  FaAdjust,
  FaDesktop,
  FaMobile,
  FaTabletAlt,
  FaUndo,
  FaSave
} from 'react-icons/fa';
import './ThemeTab.css';

const ThemeTab = () => {
  const [themeSettings, setThemeSettings] = useState({
    mode: 'light',
    primaryColor: '#1DB954',
    accentColor: '#1ED760',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    sidebarColor: '#F8F9FA',
    cardColor: '#FFFFFF',
    borderColor: '#E9ECEF',
    devicePreview: 'desktop'
  });

  const handleThemeChange = (field, value) => {
    setThemeSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setThemeSettings({
      mode: 'light',
      primaryColor: '#1DB954',
      accentColor: '#1ED760',
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
      sidebarColor: '#F8F9FA',
      cardColor: '#FFFFFF',
      borderColor: '#E9ECEF',
      devicePreview: 'desktop'
    });
  };

  const handleSave = () => {
    // Save theme settings logic here
    console.log('Saving theme settings:', themeSettings);
  };

  return (
    <div className="theme-tab">
      <div className="theme-header">
        <h3>Theme Settings</h3>
        <div className="device-preview">
          <button 
            className={`preview-btn ${themeSettings.devicePreview === 'desktop' ? 'active' : ''}`}
            onClick={() => handleThemeChange('devicePreview', 'desktop')}
          >
            <FaDesktop />
          </button>
          <button 
            className={`preview-btn ${themeSettings.devicePreview === 'tablet' ? 'active' : ''}`}
            onClick={() => handleThemeChange('devicePreview', 'tablet')}
          >
            <FaTabletAlt />
          </button>
          <button 
            className={`preview-btn ${themeSettings.devicePreview === 'mobile' ? 'active' : ''}`}
            onClick={() => handleThemeChange('devicePreview', 'mobile')}
          >
            <FaMobile />
          </button>
        </div>
      </div>

      <div className="theme-content">
        <div className="theme-section">
          <h3><FaPalette /> Theme Mode</h3>
          <div className="theme-mode-options">
            <button 
              className={`mode-btn ${themeSettings.mode === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('mode', 'light')}
            >
              <FaSun /> Light
            </button>
            <button 
              className={`mode-btn ${themeSettings.mode === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('mode', 'dark')}
            >
              <FaMoon /> Dark
            </button>
            <button 
              className={`mode-btn ${themeSettings.mode === 'system' ? 'active' : ''}`}
              onClick={() => handleThemeChange('mode', 'system')}
            >
              <FaAdjust /> System
            </button>
          </div>
        </div>

        <div className="theme-section">
          <h3>Color Scheme</h3>
          <div className="color-picker-group">
            <div className="color-picker">
              <label>Primary Color</label>
              <input 
                type="color" 
                value={themeSettings.primaryColor}
                onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.primaryColor }}></span>
                <p>{themeSettings.primaryColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Accent Color</label>
              <input 
                type="color" 
                value={themeSettings.accentColor}
                onChange={(e) => handleThemeChange('accentColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.accentColor }}></span>
                <p>{themeSettings.accentColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Background Color</label>
              <input 
                type="color" 
                value={themeSettings.backgroundColor}
                onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.backgroundColor }}></span>
                <p>{themeSettings.backgroundColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Text Color</label>
              <input 
                type="color" 
                value={themeSettings.textColor}
                onChange={(e) => handleThemeChange('textColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.textColor }}></span>
                <p>{themeSettings.textColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Sidebar Color</label>
              <input 
                type="color" 
                value={themeSettings.sidebarColor}
                onChange={(e) => handleThemeChange('sidebarColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.sidebarColor }}></span>
                <p>{themeSettings.sidebarColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Card Color</label>
              <input 
                type="color" 
                value={themeSettings.cardColor}
                onChange={(e) => handleThemeChange('cardColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.cardColor }}></span>
                <p>{themeSettings.cardColor}</p>
              </div>
            </div>
            <div className="color-picker">
              <label>Border Color</label>
              <input 
                type="color" 
                value={themeSettings.borderColor}
                onChange={(e) => handleThemeChange('borderColor', e.target.value)}
              />
              <div className="color-preview">
                <span style={{ backgroundColor: themeSettings.borderColor }}></span>
                <p>{themeSettings.borderColor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theme-actions">
        <button className="reset-btn" onClick={handleReset}>
          <FaUndo /> Reset to Default
        </button>
        <button className="save-btn" onClick={handleSave}>
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default ThemeTab; 