import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './TaskList.css';

const TaskList = ({ user, isGuestMode, onTaskSelect }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const dashboardContext = useDashboard();
  
  if (!dashboardContext) {
    console.error('TaskList must be used within DashboardProvider');
    return <div>Loading tasks...</div>;
  }

  const { state, addTask, toggleTask } = dashboardContext;
  const { tasks = [], filters = {} } = state || {};

  // Filter tasks based on current view
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    switch (filters.view) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        filteredTasks = filteredTasks.filter(task => 
          task.dueDate === today && !task.completed
        );
        break;
      case 'upcoming':
        filteredTasks = filteredTasks.filter(task => 
          task.dueDate && task.dueDate > new Date().toISOString().split('T')[0] && !task.completed
        );
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      default:
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    return filteredTasks;
  };

  const filteredTasks = getFilteredTasks();
  const currentView = filters.view || 'inbox';
  const viewTitles = {
    inbox: 'Inbox',
    today: 'Today',
    upcoming: 'Upcoming',
    completed: 'Completed'
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: '',
        dueDate: currentView === 'today' ? new Date().toISOString().split('T')[0] : null,
        priority: 'medium',
        project: 'Inbox'
      });
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

  return (
    <div className="task-list-container">
      {/* Header */}
      <header className="task-list-header">
        <h2>{viewTitles[currentView]}</h2>
        <div className="task-count">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </div>
      </header>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks yet</h3>
            <p>Add a task to get started with your productivity journey</p>
            <button 
              className="add-task-btn"
              onClick={() => setShowAddForm(true)}
            >
              Add your first task
            </button>
          </div>
        ) : (
          <>
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}
                onClick={() => onTaskSelect && onTaskSelect(task)}
              >
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
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

                <div className="task-actions">
                  <button 
                    className="task-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                  <button 
                    className="task-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle delete
                    }}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </>
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

        {/* Quick Add Button */}
        {!showAddForm && filteredTasks.length > 0 && (
          <button 
            className="quick-add-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;
