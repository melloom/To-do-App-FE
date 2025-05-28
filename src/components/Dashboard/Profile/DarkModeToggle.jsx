import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#007bff');

  useEffect(() => {
    // Check for saved theme preference or default to 'light' mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedAccentColor = localStorage.getItem('accentColor') || '#007bff';
    
    setTheme(savedTheme);
    setIsDarkMode(savedTheme === 'dark');
    setAccentColor(savedAccentColor);
    
    // Apply theme to document
    applyTheme(savedTheme, savedAccentColor);
  }, []);

  const applyTheme = (selectedTheme, color) => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
    document.documentElement.style.setProperty('--accent-color', color);
    
    // Apply to body class for additional styling
    if (selectedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme, accentColor);
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    localStorage.setItem('accentColor', color);
    applyTheme(theme, color);
  };

  const predefinedColors = [
    { name: 'Blue', value: '#007bff' },
    { name: 'Green', value: '#28a745' },
    { name: 'Purple', value: '#6f42c1' },
    { name: 'Orange', value: '#fd7e14' },
    { name: 'Red', value: '#dc3545' },
    { name: 'Teal', value: '#20c997' },
    { name: 'Pink', value: '#e83e8c' },
    { name: 'Indigo', value: '#6610f2' }
  ];

  return (
    <div className="dark-mode-toggle">
      <div className="appearance-section">
        <h3>🎨 Theme</h3>
        <div className="theme-options">
          <div className="theme-option">
            <input
              type="radio"
              id="light-theme"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => handleThemeChange('light')}
            />
            <label htmlFor="light-theme" className="theme-card light-theme-card">
              <div className="theme-preview">
                <div className="theme-header light"></div>
                <div className="theme-content light">
                  <div className="theme-text light"></div>
                  <div className="theme-text light"></div>
                </div>
              </div>
              <span className="theme-name">Light</span>
            </label>
          </div>

          <div className="theme-option">
            <input
              type="radio"
              id="dark-theme"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => handleThemeChange('dark')}
            />
            <label htmlFor="dark-theme" className="theme-card dark-theme-card">
              <div className="theme-preview">
                <div className="theme-header dark"></div>
                <div className="theme-content dark">
                  <div className="theme-text dark"></div>
                  <div className="theme-text dark"></div>
                </div>
              </div>
              <span className="theme-name">Dark</span>
            </label>
          </div>

          <div className="theme-option">
            <input
              type="radio"
              id="auto-theme"
              name="theme"
              value="auto"
              checked={theme === 'auto'}
              onChange={() => handleThemeChange('auto')}
            />
            <label htmlFor="auto-theme" className="theme-card auto-theme-card">
              <div className="theme-preview">
                <div className="theme-header auto"></div>
                <div className="theme-content auto">
                  <div className="theme-text auto"></div>
                  <div className="theme-text auto"></div>
                </div>
              </div>
              <span className="theme-name">Auto</span>
            </label>
          </div>
        </div>
      </div>

      <div className="appearance-section">
        <h3>🎯 Accent Color</h3>
        <div className="color-options">
          {predefinedColors.map((color) => (
            <button
              key={color.value}
              className={`color-option ${accentColor === color.value ? 'selected' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleAccentColorChange(color.value)}
              title={color.name}
            >
              {accentColor === color.value && <span className="check-icon">✓</span>}
            </button>
          ))}
        </div>
        
        <div className="custom-color">
          <label htmlFor="custom-color-picker">Custom Color:</label>
          <input
            type="color"
            id="custom-color-picker"
            value={accentColor}
            onChange={(e) => handleAccentColorChange(e.target.value)}
            className="color-picker"
          />
        </div>
      </div>

      <div className="appearance-section">
        <h3>⚡ Quick Toggle</h3>
        <div className="quick-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => handleThemeChange(isDarkMode ? 'light' : 'dark')}
            />
            <span className="toggle-slider">
              <span className="toggle-icon">
                {isDarkMode ? '🌙' : '☀️'}
              </span>
            </span>
          </label>
          <span className="toggle-label">
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </div>

      <div className="appearance-preview">
        <h3>👀 Preview</h3>
        <div className="preview-card" data-theme={theme} style={{ '--accent-color': accentColor }}>
          <div className="preview-header">
            <h4>Sample Card</h4>
            <button className="preview-btn">Action</button>
          </div>
          <div className="preview-content">
            <p>This is how your interface will look with the selected theme and accent color.</p>
            <div className="preview-progress">
              <div className="progress-bar" style={{ backgroundColor: accentColor, width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;