import React, { useState, useEffect } from 'react';
import './KeyboardShortcuts.css';

const KeyboardShortcuts = ({ isOpen, onClose, mode = 'help' }) => {
  const [shortcuts, setShortcuts] = useState({});
  const [editingShortcut, setEditingShortcut] = useState(null);
  const [customShortcuts, setCustomShortcuts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const defaultShortcuts = {
    // Navigation
    'search': { key: 'Ctrl+K', description: 'Open search', category: 'Navigation', customizable: true },
    'quick-add': { key: 'Ctrl+N', description: 'Quick add task', category: 'Navigation', customizable: true },
    'dashboard': { key: 'Ctrl+1', description: 'Go to dashboard', category: 'Navigation', customizable: true },
    'today': { key: 'Ctrl+2', description: 'View today\'s tasks', category: 'Navigation', customizable: true },
    'upcoming': { key: 'Ctrl+3', description: 'View upcoming tasks', category: 'Navigation', customizable: true },
    'projects': { key: 'Ctrl+4', description: 'View projects', category: 'Navigation', customizable: true },
    
    // Actions
    'save': { key: 'Ctrl+S', description: 'Save current item', category: 'Actions', customizable: true },
    'delete': { key: 'Delete', description: 'Delete selected item', category: 'Actions', customizable: true },
    'edit': { key: 'Enter', description: 'Edit selected item', category: 'Actions', customizable: true },
    'complete': { key: 'Space', description: 'Toggle task completion', category: 'Actions', customizable: true },
    'archive': { key: 'A', description: 'Archive completed tasks', category: 'Actions', customizable: true },
    
    // Views
    'list-view': { key: 'V+L', description: 'Switch to list view', category: 'Views', customizable: true },
    'board-view': { key: 'V+B', description: 'Switch to board view', category: 'Views', customizable: true },
    'calendar-view': { key: 'V+C', description: 'Switch to calendar view', category: 'Views', customizable: true },
    
    // Filters
    'filter-priority': { key: 'F+P', description: 'Filter by priority', category: 'Filters', customizable: true },
    'filter-date': { key: 'F+D', description: 'Filter by date', category: 'Filters', customizable: true },
    'filter-project': { key: 'F+R', description: 'Filter by project', category: 'Filters', customizable: true },
    'clear-filters': { key: 'F+X', description: 'Clear all filters', category: 'Filters', customizable: true },
    
    // System
    'settings': { key: 'Ctrl+,', description: 'Open settings', category: 'System', customizable: true },
    'help': { key: 'Ctrl+/', description: 'Show keyboard shortcuts', category: 'System', customizable: false },
    'print': { key: 'Ctrl+P', description: 'Print current view', category: 'System', customizable: true },
    'theme-toggle': { key: 'Ctrl+Shift+L', description: 'Toggle dark/light theme', category: 'System', customizable: true },
    
    // Import/Export
    'export': { key: 'Ctrl+E', description: 'Export data', category: 'Import/Export', customizable: true },
    'import': { key: 'Ctrl+I', description: 'Import data', category: 'Import/Export', customizable: true },
    
    // Selection
    'select-all': { key: 'Ctrl+A', description: 'Select all items', category: 'Selection', customizable: true },
    'select-none': { key: 'Ctrl+D', description: 'Deselect all', category: 'Selection', customizable: true },
    'move-up': { key: '↑', description: 'Move selection up', category: 'Selection', customizable: false },
    'move-down': { key: '↓', description: 'Move selection down', category: 'Selection', customizable: false },
    
    // Quick Actions
    'quick-capture': { key: 'Ctrl+Shift+A', description: 'Quick capture', category: 'Quick Actions', customizable: true },
    'add-project': { key: 'Ctrl+Shift+P', description: 'Add new project', category: 'Quick Actions', customizable: true },
    'add-label': { key: 'Ctrl+Shift+L', description: 'Add new label', category: 'Quick Actions', customizable: true }
  };

  useEffect(() => {
    // Load custom shortcuts from localStorage
    const saved = localStorage.getItem('tasklio_custom_shortcuts');
    if (saved) {
      setCustomShortcuts(JSON.parse(saved));
    }
    
    // Merge default and custom shortcuts
    setShortcuts({ ...defaultShortcuts, ...customShortcuts });
  }, [customShortcuts]);

  const categories = [...new Set(Object.values(shortcuts).map(s => s.category))];

  const filteredShortcuts = Object.entries(shortcuts).filter(([id, shortcut]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      id.toLowerCase().includes(query) ||
      shortcut.description.toLowerCase().includes(query) ||
      shortcut.key.toLowerCase().includes(query) ||
      shortcut.category.toLowerCase().includes(query)
    );
  });

  const handleEditShortcut = (shortcutId) => {
    setEditingShortcut(shortcutId);
  };

  const handleSaveShortcut = (shortcutId, newKey) => {
    const updatedCustom = {
      ...customShortcuts,
      [shortcutId]: {
        ...shortcuts[shortcutId],
        key: newKey
      }
    };
    
    setCustomShortcuts(updatedCustom);
    localStorage.setItem('tasklio_custom_shortcuts', JSON.stringify(updatedCustom));
    setEditingShortcut(null);
  };

  const handleResetShortcut = (shortcutId) => {
    const updatedCustom = { ...customShortcuts };
    delete updatedCustom[shortcutId];
    
    setCustomShortcuts(updatedCustom);
    localStorage.setItem('tasklio_custom_shortcuts', JSON.stringify(updatedCustom));
  };

  const handleResetAll = () => {
    setCustomShortcuts({});
    localStorage.removeItem('tasklio_custom_shortcuts');
  };

  const exportShortcuts = () => {
    const exportData = {
      shortcuts: customShortcuts,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasklio-shortcuts.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <div className="header-content">
            <h2>
              {mode === 'help' ? '⌨️ Keyboard Shortcuts' : '🛠️ Edit Shortcuts'}
            </h2>
            {mode === 'edit' && (
              <div className="header-actions">
                <button className="action-btn" onClick={exportShortcuts} title="Export shortcuts">
                  📤
                </button>
                <button className="action-btn" onClick={handleResetAll} title="Reset all to defaults">
                  🔄
                </button>
              </div>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="shortcuts-content">
          {mode === 'edit' && (
            <div className="search-section">
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search shortcuts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          )}

          <div className="shortcuts-list">
            {categories.map(category => {
              const categoryShortcuts = filteredShortcuts.filter(([, shortcut]) => shortcut.category === category);
              if (categoryShortcuts.length === 0) return null;

              return (
                <div key={category} className="shortcut-category">
                  <h3 className="category-title">{category}</h3>
                  <div className="shortcuts-grid">
                    {categoryShortcuts.map(([id, shortcut]) => (
                      <ShortcutItem
                        key={id}
                        id={id}
                        shortcut={shortcut}
                        isEditing={editingShortcut === id}
                        mode={mode}
                        onEdit={() => handleEditShortcut(id)}
                        onSave={(newKey) => handleSaveShortcut(id, newKey)}
                        onReset={() => handleResetShortcut(id)}
                        onCancel={() => setEditingShortcut(null)}
                        isCustomized={!!customShortcuts[id]}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShortcutItem = ({ 
  id, 
  shortcut, 
  isEditing, 
  mode, 
  onEdit, 
  onSave, 
  onReset, 
  onCancel, 
  isCustomized 
}) => {
  const [newKey, setNewKey] = useState(shortcut.key);
  const [recordingKey, setRecordingKey] = useState(false);

  const handleKeyRecord = (e) => {
    if (!recordingKey) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const keys = [];
    if (e.ctrlKey) keys.push('Ctrl');
    if (e.shiftKey) keys.push('Shift');
    if (e.altKey) keys.push('Alt');
    if (e.metaKey) keys.push('Cmd');
    
    if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Meta') {
      keys.push(e.key);
    }
    
    setNewKey(keys.join('+'));
    setRecordingKey(false);
  };

  useEffect(() => {
    if (recordingKey) {
      document.addEventListener('keydown', handleKeyRecord);
      return () => document.removeEventListener('keydown', handleKeyRecord);
    }
  }, [recordingKey]);

  return (
    <div className={`shortcut-item ${isCustomized ? 'customized' : ''}`}>
      <div className="shortcut-info">
        <div className="shortcut-description">{shortcut.description}</div>
        <div className="shortcut-id">{id}</div>
      </div>
      
      <div className="shortcut-key-section">
        {isEditing ? (
          <div className="shortcut-editor">
            <div className="key-input-section">
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="key-input"
                placeholder="Enter shortcut..."
                readOnly={recordingKey}
              />
              <button
                className={`record-btn ${recordingKey ? 'recording' : ''}`}
                onClick={() => setRecordingKey(!recordingKey)}
                title="Record key combination"
              >
                {recordingKey ? '🔴' : '⌨️'}
              </button>
            </div>
            <div className="editor-actions">
              <button className="save-btn" onClick={() => onSave(newKey)}>
                ✅
              </button>
              <button className="cancel-btn" onClick={onCancel}>
                ❌
              </button>
            </div>
          </div>
        ) : (
          <div className="shortcut-display">
            <kbd className="shortcut-key">{shortcut.key}</kbd>
            {mode === 'edit' && shortcut.customizable && (
              <div className="shortcut-actions">
                <button className="edit-btn" onClick={onEdit} title="Edit shortcut">
                  ✏️
                </button>
                {isCustomized && (
                  <button className="reset-btn" onClick={onReset} title="Reset to default">
                    🔄
                  </button>
                )}
              </div>
            )}
            {!shortcut.customizable && (
              <span className="non-customizable">🔒</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
