import React, { useState } from 'react';
import { 
  FaFont, 
  FaLayerGroup, 
  FaDesktop,
  FaMobile,
  FaTabletAlt,
  FaEye,
  FaUndo,
  FaSave,
  FaPalette,
  FaPaintBrush
} from 'react-icons/fa';
import './AppearanceTab.css';

const AppearanceTab = () => {
  const [settings, setSettings] = useState({
    layout: 'list',
    density: 'comfortable',
    sidebar: 'left',
    fontFamily: 'Inter',
    fontSize: '16',
    textStyle: {
      bold: false,
      italic: false,
      underline: false
    },
    textAlign: 'left',
    visibility: {
      showCompleted: true,
      showPriority: true,
      showDueDate: true,
      showLabels: true
    },
    devicePreview: 'desktop',
    customTheme: {
      sidebarColor: '#1a1a1a',
      textColor: '#ffffff',
      pageColor: '#ffffff',
      accentColor: '#1DB954',
      buttonColor: '#2d2d2d',
      hoverColor: '#3d3d3d'
    }
  });

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleReset = () => {
    setSettings({
      layout: 'list',
      density: 'comfortable',
      sidebar: 'left',
      fontFamily: 'Inter',
      fontSize: '16',
      textStyle: {
        bold: false,
        italic: false,
        underline: false
      },
      textAlign: 'left',
      visibility: {
        showCompleted: true,
        showPriority: true,
        showDueDate: true,
        showLabels: true
      },
      devicePreview: 'desktop',
      customTheme: {
        sidebarColor: '#1a1a1a',
        textColor: '#ffffff',
        pageColor: '#ffffff',
        accentColor: '#1DB954',
        buttonColor: '#2d2d2d',
        hoverColor: '#3d3d3d'
      }
    });
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const renderContent = () => {
    switch (settings.devicePreview) {
      case 'desktop':
        return (
          <div className="preview-container desktop">
            <div className="preview-sidebar" style={{ backgroundColor: settings.customTheme.sidebarColor }}>
              <div className="preview-sidebar-item" style={{ color: settings.customTheme.textColor }}>Inbox</div>
              <div className="preview-sidebar-item" style={{ color: settings.customTheme.textColor }}>Today</div>
              <div className="preview-sidebar-item" style={{ color: settings.customTheme.textColor }}>Upcoming</div>
            </div>
            <div className="preview-content" style={{ backgroundColor: settings.customTheme.pageColor }}>
              <div className="preview-task" style={{ backgroundColor: settings.customTheme.buttonColor }}>
                <span style={{ color: settings.customTheme.textColor }}>Sample Task</span>
              </div>
            </div>
          </div>
        );
      case 'tablet':
        return (
          <div className="preview-container tablet">
            <div className="preview-sidebar" style={{ backgroundColor: settings.customTheme.sidebarColor }}>
              <div className="preview-sidebar-item" style={{ color: settings.customTheme.textColor }}>Inbox</div>
              <div className="preview-sidebar-item" style={{ color: settings.customTheme.textColor }}>Today</div>
            </div>
            <div className="preview-content" style={{ backgroundColor: settings.customTheme.pageColor }}>
              <div className="preview-task" style={{ backgroundColor: settings.customTheme.buttonColor }}>
                <span style={{ color: settings.customTheme.textColor }}>Sample Task</span>
              </div>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="preview-container mobile">
            <div className="preview-content" style={{ backgroundColor: settings.customTheme.pageColor }}>
              <div className="preview-task" style={{ backgroundColor: settings.customTheme.buttonColor }}>
                <span style={{ color: settings.customTheme.textColor }}>Sample Task</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="appearance-tab">
      <div className="appearance-header">
        <h3>Appearance Settings</h3>
        <div className="device-preview">
          <button 
            className={`preview-btn ${settings.devicePreview === 'desktop' ? 'active' : ''}`}
            onClick={() => handleChange('devicePreview', null, 'desktop')}
            title="Desktop View"
          >
            <FaDesktop />
          </button>
          <button 
            className={`preview-btn ${settings.devicePreview === 'tablet' ? 'active' : ''}`}
            onClick={() => handleChange('devicePreview', null, 'tablet')}
            title="Tablet View"
          >
            <FaTabletAlt />
          </button>
          <button 
            className={`preview-btn ${settings.devicePreview === 'mobile' ? 'active' : ''}`}
            onClick={() => handleChange('devicePreview', null, 'mobile')}
            title="Mobile View"
          >
            <FaMobile />
          </button>
        </div>
      </div>

      <div className="appearance-content">
        <div className="appearance-grid">
          {/* Layout Section */}
          <div className="appearance-section">
            <div className="section-header">
              <FaLayerGroup />
              <h4>Layout</h4>
            </div>
            <div className="section-content">
              <div className="layout-options">
                <button 
                  className={`layout-btn ${settings.layout === 'list' ? 'active' : ''}`}
                  onClick={() => handleChange('layout', null, 'list')}
                >
                  List View
                </button>
                <button 
                  className={`layout-btn ${settings.layout === 'grid' ? 'active' : ''}`}
                  onClick={() => handleChange('layout', null, 'grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`layout-btn ${settings.layout === 'kanban' ? 'active' : ''}`}
                  onClick={() => handleChange('layout', null, 'kanban')}
                >
                  Kanban
                </button>
              </div>
              <div className="option-group">
                <label>Task Density</label>
                <select 
                  value={settings.density}
                  onChange={(e) => handleChange('density', null, e.target.value)}
                >
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
              <div className="option-group">
                <label>Sidebar Position</label>
                <select 
                  value={settings.sidebar}
                  onChange={(e) => handleChange('sidebar', null, e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customize Section */}
          <div className="appearance-section">
            <div className="section-header">
              <FaPaintBrush />
              <h4>Customize</h4>
            </div>
            <div className="section-content">
              <div className="color-picker-group">
                <div className="color-picker">
                  <label>Sidebar Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.sidebarColor}
                    onChange={(e) => handleChange('customTheme', 'sidebarColor', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Text Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.textColor}
                    onChange={(e) => handleChange('customTheme', 'textColor', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Page Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.pageColor}
                    onChange={(e) => handleChange('customTheme', 'pageColor', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Accent Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.accentColor}
                    onChange={(e) => handleChange('customTheme', 'accentColor', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Button Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.buttonColor}
                    onChange={(e) => handleChange('customTheme', 'buttonColor', e.target.value)}
                  />
                </div>
                <div className="color-picker">
                  <label>Hover Color</label>
                  <input 
                    type="color" 
                    value={settings.customTheme.hoverColor}
                    onChange={(e) => handleChange('customTheme', 'hoverColor', e.target.value)}
                  />
                </div>
              </div>
              <div className="preview-section">
                <h5>Preview</h5>
                {renderContent()}
              </div>
            </div>
          </div>

          {/* Typography Section */}
          <div className="appearance-section">
            <div className="section-header">
              <FaFont />
              <h4>Typography</h4>
            </div>
            <div className="section-content">
              <div className="option-group">
                <label>Font Family</label>
                <select 
                  value={settings.fontFamily}
                  onChange={(e) => handleChange('fontFamily', null, e.target.value)}
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
              <div className="option-group">
                <label>Base Font Size</label>
                <div className="range-input-group">
                  <input 
                    type="range" 
                    min="12" 
                    max="24" 
                    value={settings.fontSize}
                    onChange={(e) => handleChange('fontSize', null, e.target.value)}
                  />
                  <span className="range-value">{settings.fontSize}px</span>
                </div>
              </div>
              <div className="text-style-options">
                <button 
                  className={`style-btn ${settings.textStyle.bold ? 'active' : ''}`}
                  onClick={() => handleChange('textStyle', 'bold', !settings.textStyle.bold)}
                >
                  Bold
                </button>
                <button 
                  className={`style-btn ${settings.textStyle.italic ? 'active' : ''}`}
                  onClick={() => handleChange('textStyle', 'italic', !settings.textStyle.italic)}
                >
                  Italic
                </button>
                <button 
                  className={`style-btn ${settings.textStyle.underline ? 'active' : ''}`}
                  onClick={() => handleChange('textStyle', 'underline', !settings.textStyle.underline)}
                >
                  Underline
                </button>
              </div>
              <div className="option-group">
                <label>Text Alignment</label>
                <div className="alignment-options">
                  <button 
                    className={`align-btn ${settings.textAlign === 'left' ? 'active' : ''}`}
                    onClick={() => handleChange('textAlign', null, 'left')}
                  >
                    Left
                  </button>
                  <button 
                    className={`align-btn ${settings.textAlign === 'center' ? 'active' : ''}`}
                    onClick={() => handleChange('textAlign', null, 'center')}
                  >
                    Center
                  </button>
                  <button 
                    className={`align-btn ${settings.textAlign === 'right' ? 'active' : ''}`}
                    onClick={() => handleChange('textAlign', null, 'right')}
                  >
                    Right
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visibility Section */}
          <div className="appearance-section">
            <div className="section-header">
              <FaEye />
              <h4>Visibility</h4>
            </div>
            <div className="section-content">
              <div className="visibility-options">
                <div className="option-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.visibility.showCompleted}
                      onChange={(e) => handleChange('visibility', 'showCompleted', e.target.checked)}
                    />
                    <span>Show Completed Tasks</span>
                  </label>
                </div>
                <div className="option-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.visibility.showPriority}
                      onChange={(e) => handleChange('visibility', 'showPriority', e.target.checked)}
                    />
                    <span>Show Priority Indicators</span>
                  </label>
                </div>
                <div className="option-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.visibility.showDueDate}
                      onChange={(e) => handleChange('visibility', 'showDueDate', e.target.checked)}
                    />
                    <span>Show Due Dates</span>
                  </label>
                </div>
                <div className="option-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={settings.visibility.showLabels}
                      onChange={(e) => handleChange('visibility', 'showLabels', e.target.checked)}
                    />
                    <span>Show Labels</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="appearance-footer">
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

export default AppearanceTab; 