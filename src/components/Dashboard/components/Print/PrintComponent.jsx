import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './PrintComponent.css';

const PrintComponent = ({ isOpen, onClose }) => {
  const { state } = useDashboard();
  const { tasks, projects, labels, filters } = state;
  const [printOptions, setPrintOptions] = useState({
    content: 'current-view',
    includeCompleted: false,
    includeDescription: true,
    includeMeta: true,
    groupBy: 'none',
    sortBy: 'dueDate',
    layout: 'list',
    pageSize: 'a4',
    orientation: 'portrait'
  });

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = generatePrintContent();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tasklio - ${getPrintTitle()}</title>
          <style>${getPrintStyles()}</style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const getPrintTitle = () => {
    switch (printOptions.content) {
      case 'all-tasks':
        return 'All Tasks';
      case 'current-view':
        return `${filters.view} Tasks`;
      case 'selected-project':
        return 'Project Tasks';
      case 'priority-high':
        return 'High Priority Tasks';
      default:
        return 'Tasks';
    }
  };

  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Apply content filter
    switch (printOptions.content) {
      case 'current-view':
        // Apply current view filters
        switch (filters.view) {
          case 'today':
            const today = new Date().toISOString().split('T')[0];
            filteredTasks = filteredTasks.filter(task => task.dueDate === today);
            break;
          case 'upcoming':
            filteredTasks = filteredTasks.filter(task => 
              task.dueDate && task.dueDate > new Date().toISOString().split('T')[0]
            );
            break;
          case 'completed':
            filteredTasks = filteredTasks.filter(task => task.completed);
            break;
          default:
            break;
        }
        break;
      case 'priority-high':
        filteredTasks = filteredTasks.filter(task => task.priority === 'high');
        break;
      case 'all-tasks':
      default:
        break;
    }

    // Include/exclude completed tasks
    if (!printOptions.includeCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    // Sort tasks
    filteredTasks.sort((a, b) => {
      switch (printOptions.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'project':
          return (a.project || '').localeCompare(b.project || '');
        case 'dueDate':
        default:
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

    return filteredTasks;
  };

  const groupTasks = (tasks) => {
    if (printOptions.groupBy === 'none') {
      return { 'All Tasks': tasks };
    }

    const groups = {};
    
    tasks.forEach(task => {
      let groupKey;
      
      switch (printOptions.groupBy) {
        case 'project':
          groupKey = task.project || 'No Project';
          break;
        case 'priority':
          groupKey = task.priority || 'No Priority';
          break;
        case 'status':
          groupKey = task.completed ? 'Completed' : 'Active';
          break;
        case 'dueDate':
          if (!task.dueDate) {
            groupKey = 'No Due Date';
          } else {
            const today = new Date().toISOString().split('T')[0];
            const dueDate = task.dueDate;
            if (dueDate < today) {
              groupKey = 'Overdue';
            } else if (dueDate === today) {
              groupKey = 'Due Today';
            } else {
              groupKey = 'Upcoming';
            }
          }
          break;
        default:
          groupKey = 'All Tasks';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(task);
    });

    return groups;
  };

  const generatePrintContent = () => {
    const filteredTasks = getFilteredTasks();
    const groupedTasks = groupTasks(filteredTasks);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    let content = `
      <div class="print-header">
        <div class="print-title">
          <h1>📋 ${getPrintTitle()}</h1>
          <div class="print-subtitle">Generated on ${currentDate} at ${currentTime}</div>
        </div>
        <div class="print-stats">
          <div class="stat-item">Total: ${filteredTasks.length}</div>
          <div class="stat-item">Completed: ${filteredTasks.filter(t => t.completed).length}</div>
          <div class="stat-item">Pending: ${filteredTasks.filter(t => !t.completed).length}</div>
        </div>
      </div>
    `;

    if (printOptions.layout === 'checklist') {
      content += '<div class="checklist-layout">';
    } else {
      content += '<div class="list-layout">';
    }

    Object.entries(groupedTasks).forEach(([groupName, groupTasks]) => {
      if (printOptions.groupBy !== 'none') {
        content += `<div class="group-header">${groupName} (${groupTasks.length})</div>`;
      }

      groupTasks.forEach((task, index) => {
        content += generateTaskHTML(task, index);
      });
    });

    content += '</div>';
    
    content += `
      <div class="print-footer">
        <div>Generated by Tasklio</div>
        <div>Page 1 of 1</div>
      </div>
    `;

    return content;
  };

  const generateTaskHTML = (task, index) => {
    const priorityColors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };

    let taskHTML = '<div class="task-item">';
    
    if (printOptions.layout === 'checklist') {
      taskHTML += `
        <div class="task-checkbox">
          <input type="checkbox" ${task.completed ? 'checked' : ''} />
        </div>
      `;
    }

    taskHTML += '<div class="task-content">';
    taskHTML += `<div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>`;

    if (printOptions.includeDescription && task.description) {
      taskHTML += `<div class="task-description">${task.description}</div>`;
    }

    if (printOptions.includeMeta) {
      taskHTML += '<div class="task-meta">';
      
      if (task.dueDate) {
        taskHTML += `<span class="task-due">📅 ${new Date(task.dueDate).toLocaleDateString()}</span>`;
      }
      
      if (task.priority) {
        taskHTML += `<span class="task-priority" style="color: ${priorityColors[task.priority]}">${task.priority}</span>`;
      }
      
      if (task.project) {
        taskHTML += `<span class="task-project">📁 ${task.project}</span>`;
      }
      
      taskHTML += '</div>';
    }

    taskHTML += '</div></div>';
    
    return taskHTML;
  };

  const getPrintStyles = () => {
    return `
      @page {
        size: ${printOptions.pageSize} ${printOptions.orientation};
        margin: 1in;
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #000;
        margin: 0;
        padding: 0;
      }
      
      .print-header {
        border-bottom: 2px solid #000;
        padding-bottom: 16px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .print-title h1 {
        margin: 0 0 4px 0;
        font-size: 24px;
        font-weight: bold;
      }
      
      .print-subtitle {
        font-size: 12px;
        color: #666;
      }
      
      .print-stats {
        text-align: right;
        font-size: 11px;
      }
      
      .stat-item {
        margin-bottom: 2px;
      }
      
      .group-header {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0 12px 0;
        padding: 8px 0;
        border-bottom: 1px solid #ccc;
      }
      
      .task-item {
        display: flex;
        margin-bottom: 12px;
        break-inside: avoid;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
      }
      
      .task-checkbox {
        margin-right: 8px;
        padding-top: 2px;
      }
      
      .task-checkbox input {
        width: 14px;
        height: 14px;
      }
      
      .task-content {
        flex: 1;
      }
      
      .task-title {
        font-weight: 600;
        margin-bottom: 4px;
        font-size: 14px;
      }
      
      .task-title.completed {
        text-decoration: line-through;
        color: #666;
      }
      
      .task-description {
        color: #666;
        font-size: 11px;
        margin-bottom: 6px;
        line-height: 1.3;
      }
      
      .task-meta {
        display: flex;
        gap: 12px;
        font-size: 10px;
        color: #888;
      }
      
      .task-meta span {
        white-space: nowrap;
      }
      
      .task-priority {
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .print-footer {
        position: fixed;
        bottom: 0.5in;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #666;
        border-top: 1px solid #ccc;
        padding-top: 8px;
      }
      
      .list-layout .task-item {
        display: block;
      }
      
      .checklist-layout .task-item {
        display: flex;
        align-items: flex-start;
      }
    `;
  };

  if (!isOpen) return null;

  return (
    <div className="print-overlay" onClick={onClose}>
      <div className="print-modal" onClick={e => e.stopPropagation()}>
        <div className="print-header">
          <h2>🖨️ Print Tasks</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="print-content">
          <div className="print-options-grid">
            <div className="option-group">
              <h3>📄 Content</h3>
              <div className="option-buttons">
                <button 
                  className={`option-btn ${printOptions.content === 'current-view' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, content: 'current-view'})}
                ></button>
                  Current View
                </button>
                <button 
                  className={`option-btn ${printOptions.content === 'all-tasks' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, content: 'all-tasks'})}
                >
                  All Tasks ({tasks.length})
                </button>
                <button 
                  className={`option-btn ${printOptions.content === 'priority-high' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, content: 'priority-high'})}
                >
                  High Priority ({tasks.filter(t => t.priority === 'high').length})
                </button>
              </div>
            </div>

            <div className="option-group">
              <h3>📋 Layout</h3>
              <div className="option-buttons">
                <button 
                  className={`option-btn ${printOptions.layout === 'list' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, layout: 'list'})}
                >
                  📝 List
                </button>
                <button 
                  className={`option-btn ${printOptions.layout === 'checklist' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, layout: 'checklist'})}
                >
                  ☑️ Checklist
                </button>
              </div>
            </div>

            <div className="option-group">
              <h3>🗂️ Group By</h3>
              <div className="option-buttons">
                <button 
                  className={`option-btn ${printOptions.groupBy === 'none' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, groupBy: 'none'})}
                >
                  None
                </button>
                <button 
                  className={`option-btn ${printOptions.groupBy === 'project' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, groupBy: 'project'})}
                >
                  Project
                </button>
                <button 
                  className={`option-btn ${printOptions.groupBy === 'priority' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, groupBy: 'priority'})}
                >
                  Priority
                </button>
                <button 
                  className={`option-btn ${printOptions.groupBy === 'dueDate' ? 'active' : ''}`}
                  onClick={() => setPrintOptions({...printOptions, groupBy: 'dueDate'})}
                >
                  Due Date
                </button>
              </div>
            </div>

            <div className="option-group">
              <h3>📑 Include</h3>
              <div className="checkbox-options">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={printOptions.includeCompleted}
                    onChange={(e) => setPrintOptions({...printOptions, includeCompleted: e.target.checked})}
                  />
                  <span>Completed tasks</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={printOptions.includeDescription}
                    onChange={(e) => setPrintOptions({...printOptions, includeDescription: e.target.checked})}
                  />
                  <span>Task descriptions</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={printOptions.includeMeta}
                    onChange={(e) => setPrintOptions({...printOptions, includeMeta: e.target.checked})}
                  />
                  <span>Metadata (dates, priorities)</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <h3>📏 Page Setup</h3>
              <div className="option-row">
                <div className="option-half">
                  <label>Page Size:</label>
                  <select 
                    value={printOptions.pageSize}
                    onChange={(e) => setPrintOptions({...printOptions, pageSize: e.target.value})}
                    className="option-select"
                  >
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div className="option-half">
                  <label>Orientation:</label>
                  <select 
                    value={printOptions.orientation}
                    onChange={(e) => setPrintOptions({...printOptions, orientation: e.target.value})}
                    className="option-select"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="print-preview-section">
            <h3>📖 Preview</h3>
            <div className="preview-info">
              <div className="preview-stats">
                <span>Tasks: {getFilteredTasks().length}</span>
                <span>Format: {printOptions.layout}</span>
                <span>Groups: {printOptions.groupBy !== 'none' ? printOptions.groupBy : 'None'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="print-footer"></div>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handlePrint}>
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
