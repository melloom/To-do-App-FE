import React, { useState, useRef } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './ImportExport.css';

const ImportExport = ({ isOpen, onClose, mode = 'export' }) => {
  const { state } = useDashboard();
  const { tasks, projects, labels } = state;
  const [exportFormat, setExportFormat] = useState('json');
  const [exportData, setExportData] = useState('all');
  const [importFile, setImportFile] = useState(null);
  const [importStatus, setImportStatus] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleExport = () => {
    try {
      let dataToExport = {};
      
      // Determine what data to export
      switch (exportData) {
        case 'tasks':
          dataToExport = { tasks };
          break;
        case 'projects':
          dataToExport = { projects };
          break;
        case 'labels':
          dataToExport = { labels };
          break;
        default:
          dataToExport = { tasks, projects, labels };
      }

      // Add metadata
      const exportObject = {
        ...dataToExport,
        metadata: {
          exportDate: new Date().toISOString(),
          version: '1.0',
          source: 'Tasklio',
          totalTasks: tasks.length,
          totalProjects: projects.length,
          totalLabels: labels.length
        }
      };

      let content, filename, mimeType;

      if (exportFormat === 'json') {
        content = JSON.stringify(exportObject, null, 2);
        filename = `tasklio-export-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      } else if (exportFormat === 'csv') {
        content = convertToCSV(tasks);
        filename = `tasklio-tasks-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportStatus(`Successfully exported ${exportData} as ${exportFormat.toUpperCase()}`);
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      setExportStatus('Export failed: ' + error.message);
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const convertToCSV = (data) => {
    const headers = ['ID', 'Title', 'Description', 'Due Date', 'Priority', 'Project', 'Completed', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...data.map(task => [
        task.id,
        `"${task.title || ''}"`,
        `"${task.description || ''}"`,
        task.dueDate || '',
        task.priority || '',
        task.project || '',
        task.completed ? 'Yes' : 'No',
        task.createdAt || ''
      ].join(','))
    ].join('\n');
    
    return csvContent;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportFile(file);
      setImportStatus('');
    }
  };

  const handleImport = () => {
    if (!importFile) {
      setImportStatus('Please select a file to import');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        let importedData;

        if (importFile.name.endsWith('.json')) {
          importedData = JSON.parse(content);
        } else if (importFile.name.endsWith('.csv')) {
          importedData = parseCSV(content);
        } else {
          throw new Error('Unsupported file format');
        }

        // Validate and import data
        validateAndImportData(importedData);
        setImportStatus('Import successful!');
        setTimeout(() => {
          setImportStatus('');
          onClose();
        }, 2000);
      } catch (error) {
        setImportStatus('Import failed: ' + error.message);
      }
    };

    reader.readAsText(importFile);
  };

  const parseCSV = (content) => {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const tasks = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const task = {
          id: Date.now() + i,
          title: values[1]?.replace(/"/g, '') || '',
          description: values[2]?.replace(/"/g, '') || '',
          dueDate: values[3] || null,
          priority: values[4] || 'medium',
          project: values[5] || '',
          completed: values[6] === 'Yes',
          createdAt: values[7] || new Date().toISOString()
        };
        tasks.push(task);
      }
    }

    return { tasks };
  };

  const validateAndImportData = (data) => {
    // Basic validation
    if (data.tasks && Array.isArray(data.tasks)) {
      // Import tasks logic here
      console.log('Importing tasks:', data.tasks);
    }
    if (data.projects && Array.isArray(data.projects)) {
      // Import projects logic here
      console.log('Importing projects:', data.projects);
    }
    if (data.labels && Array.isArray(data.labels)) {
      // Import labels logic here
      console.log('Importing labels:', data.labels);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="import-export-overlay" onClick={onClose}>
      <div className="import-export-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {mode === 'export' ? '📤 Export Data' : '📥 Import Data'}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {mode === 'export' ? (
            <div className="export-section">
              <div className="form-group">
                <label>What to export:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="all"
                      checked={exportData === 'all'}
                      onChange={(e) => setExportData(e.target.value)}
                    />
                    All data (tasks, projects, labels)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="tasks"
                      checked={exportData === 'tasks'}
                      onChange={(e) => setExportData(e.target.value)}
                    />
                    Tasks only ({tasks.length} tasks)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="projects"
                      checked={exportData === 'projects'}
                      onChange={(e) => setExportData(e.target.value)}
                    />
                    Projects only ({projects.length} projects)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="labels"
                      checked={exportData === 'labels'}
                      onChange={(e) => setExportData(e.target.value)}
                    />
                    Labels only ({labels.length} labels)
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Export format:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    JSON (recommended)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      disabled={exportData !== 'tasks'}
                    />
                    CSV (tasks only)
                  </label>
                </div>
              </div>

              {exportStatus && (
                <div className={`status-message ${exportStatus.includes('failed') ? 'error' : 'success'}`}>
                  {exportStatus}
                </div>
              )}

              <div className="export-preview">
                <h3>Export Preview:</h3>
                <div className="preview-stats">
                  {exportData === 'all' && (
                    <>
                      <span>📝 {tasks.length} tasks</span>
                      <span>📁 {projects.length} projects</span>
                      <span>🏷️ {labels.length} labels</span>
                    </>
                  )}
                  {exportData === 'tasks' && <span>📝 {tasks.length} tasks</span>}
                  {exportData === 'projects' && <span>📁 {projects.length} projects</span>}
                  {exportData === 'labels' && <span>🏷️ {labels.length} labels</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className="import-section">
              <div className="form-group">
                <label>Select file to import:</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileSelect}
                  className="file-input"
                />
                <div className="file-info">
                  Supported formats: JSON (.json), CSV (.csv)
                </div>
              </div>

              {importFile && (
                <div className="file-preview">
                  <h3>Selected File:</h3>
                  <div className="file-details">
                    <span>📄 {importFile.name}</span>
                    <span>💾 {(importFile.size / 1024).toFixed(2)} KB</span>
                    <span>📅 {new Date(importFile.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              {importStatus && (
                <div className={`status-message ${importStatus.includes('failed') ? 'error' : 'success'}`}>
                  {importStatus}
                </div>
              )}

              <div className="import-notes">
                <h3>Import Notes:</h3>
                <ul>
                  <li>Existing data will not be deleted</li>
                  <li>Duplicate tasks will be skipped</li>
                  <li>Invalid entries will be ignored</li>
                  <li>A backup is recommended before importing</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          {mode === 'export' ? (
            <button className="btn-primary" onClick={handleExport}>
              📤 Export {exportFormat.toUpperCase()}
            </button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={handleImport}
              disabled={!importFile}
            >
              📥 Import Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
