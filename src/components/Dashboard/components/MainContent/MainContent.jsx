import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import TaskList from '../TaskList/TaskList';
import EmptyState from '../TaskList/EmptyState';
import './MainContent.css';

const MainContent = ({ onTaskSelect, selectedTask, setSelectedTask }) => {
  const { state, dispatch, addTask } = useDashboard();
  const { tasks = [], activeView, filters = {} } = state || {};
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Filter tasks based on active view and filters
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Handle project views (project:ProjectName format)
    if (activeView && activeView.startsWith('project:')) {
      const projectName = activeView.substring(8); // Remove 'project:' prefix
      filteredTasks = filteredTasks.filter(task => task.project === projectName);
    } else {
      // Handle standard views
      switch (activeView) {
        case 'inbox':
          filteredTasks = filteredTasks.filter(task => !task.completed && !task.project);
          break;
        case 'today':
          const today = new Date().toISOString().split('T')[0];
          filteredTasks = filteredTasks.filter(task => 
            !task.completed && task.dueDate === today
          );
          break;
        case 'upcoming':
          const todayDate = new Date().toISOString().split('T')[0];
          filteredTasks = filteredTasks.filter(task => 
            !task.completed && task.dueDate && task.dueDate > todayDate
          );
          break;
        case 'overdue':
          const currentDate = new Date().toISOString().split('T')[0];
          filteredTasks = filteredTasks.filter(task => 
            !task.completed && task.dueDate && task.dueDate < currentDate
          );
          break;
        case 'completed':
          filteredTasks = filteredTasks.filter(task => task.completed);
          break;
        case 'high':
          filteredTasks = filteredTasks.filter(task => !task.completed && task.priority === 'high');
          break;
        case 'medium':
          filteredTasks = filteredTasks.filter(task => !task.completed && task.priority === 'medium');
          break;
        case 'low':
          filteredTasks = filteredTasks.filter(task => !task.completed && task.priority === 'low');
          break;
        default:
          filteredTasks = filteredTasks.filter(task => !task.completed);
      }
    }

    // Apply additional filters
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    if (filters.priority && filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    if (filters.project && filters.project !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.project === filters.project);
    }

    return filteredTasks;
  };

  const getViewTitle = () => {
    if (activeView && activeView.startsWith('project:')) {
      const projectName = activeView.substring(8);
      return `${projectName} Tasks`;
    }

    const viewTitles = {
      inbox: 'Inbox',
      today: 'Today',
      upcoming: 'Upcoming',
      overdue: 'Overdue',
      completed: 'Completed',
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority'
    };

    return viewTitles[activeView] || 'All Tasks';
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        title: newTaskTitle,
        description: '',
        priority: 'medium',
        completed: false,
        createdAt: new Date().toISOString()
      };

      // Set project based on current view
      if (activeView && activeView.startsWith('project:')) {
        newTask.project = activeView.substring(8);
      } else if (activeView === 'today') {
        newTask.dueDate = new Date().toISOString().split('T')[0];
      }

      addTask(newTask);
      setNewTaskTitle('');
      setShowAddForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setShowAddForm(false);
      setNewTaskTitle('');
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="main-content">
      <div className="main-content-header">
        <div className="header-info">
          <h1>{getViewTitle()}</h1>
          <p className="task-count">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button 
          className="add-task-btn"
          onClick={() => setShowAddForm(true)}
        >
          <span className="btn-icon">+</span>
          Add Task
        </button>
      </div>

      <div className="main-content-body">
        {filteredTasks.length === 0 ? (
          <EmptyState 
            currentView={activeView}
            onAddTask={() => setShowAddForm(true)}
          />
        ) : (
          <div className="tasks-container">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}
                onClick={() => onTaskSelect && onTaskSelect(task)}
              >
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  
                  <div className="task-meta">
                    {task.dueDate && (
                      <span className="task-due">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    
                    <span className={`task-priority ${task.priority}`}>
                      {task.priority}
                    </span>
                    
                    {task.project && (
                      <span className="task-project">{task.project}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <div className="add-task-form">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              autoFocus
              className="task-input"
            />
            <div className="form-actions">
              <button onClick={handleAddTask} className="save-btn">
                Add Task
              </button>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setNewTaskTitle('');
                }} 
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;