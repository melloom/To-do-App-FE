import React, { useState } from 'react';
import './styles/TodoList.css';

const TodoList = ({
  todos,
  activeTab,
  setActiveTab,
  onToggleComplete,
  onEdit,
  onDelete,
  onClearCompleted,
  onAddNewTask
}) => {
  const [expandedTodoId, setExpandedTodoId] = useState(null);

  const toggleDetails = (id) => {
    if (expandedTodoId === id) {
      setExpandedTodoId(null);
    } else {
      setExpandedTodoId(id);
    }
  };

  // Filter todos based on active tab
  const filteredTodos = todos.filter(todo => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !todo.completed;
    if (activeTab === 'completed') return todo.completed;
    return true;
  });

  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today && !dueDate.completed;
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-tabs">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-list">
          {activeTab === 'all' ? (
            <div className="empty-todo-list">
              <div className="empty-state-container">
                <div className="empty-state-icon">📋</div>
                <h2>No tasks yet</h2>
                <p>Get started by adding your first task!</p>
                <button className="empty-state-button" onClick={onAddNewTask}>
                  Add Your First Task
                </button>
              </div>
            </div>
          ) : activeTab === 'active' ? (
            <div className="empty-filtered-list">
              No active tasks. Good job! 👏
            </div>
          ) : (
            <div className="empty-filtered-list">
              No completed tasks yet. Complete some tasks to see them here!
            </div>
          )}
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}
            >
              <div className="todo-item-main" onClick={() => toggleDetails(todo.id)}>
                <div
                  className={`todo-checkbox ${todo.completed ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(todo.id);
                  }}
                ></div>

                <div className="todo-content">
                  <span className="todo-text">{todo.title}</span>
                  <div className="todo-meta">
                    {todo.dueDate && (
                      <span className="todo-due-date">
                        {getFormattedDate(todo.dueDate)}
                      </span>
                    )}
                    {todo.category && (
                      <span className="category-tag" style={{ backgroundColor: getCategoryColor(todo.category) }}>
                        {todo.category}
                      </span>
                    )}
                    {todo.priority && (
                      <span className="priority-indicator" data-priority={todo.priority}>
                        {todo.priority}
                      </span>
                    )}
                  </div>
                </div>

                <div className="todo-actions">
                  <button
                    className="todo-action-btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(todo.id);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="todo-action-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(todo.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {expandedTodoId === todo.id && todo.notes && (
                <div className="todo-details">
                  <div className="todo-notes">
                    <h4>Notes</h4>
                    <p>{todo.notes}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'completed' && filteredTodos.length > 0 && (
        <div className="clear-completed-container">
          <button
            className="clear-completed-button"
            onClick={onClearCompleted}
          >
            Clear All Completed
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to get category color
const getCategoryColor = (category) => {
  const colors = {
    'Work': '#5b5ef4',
    'Personal': '#38bdf8',
    'Shopping': '#f59e0b',
    'Health': '#10b981',
    'Finance': '#ef4444',
    'Education': '#8b5cf6',
    'Family': '#ec4899'
  };

  return colors[category] || '#6b7280';
};

export default TodoList;