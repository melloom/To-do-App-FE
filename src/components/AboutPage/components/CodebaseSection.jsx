import React, { useState } from 'react';
import CodeMockup from './CodeMockup';
import '../styles/CodebaseSection.css';

const CodebaseSection = () => {
  const [activeCodeTab, setActiveCodeTab] = useState('component');

  // Code examples for the mockups
  const codeExamples = {
    component: {
      fileName: 'TaskItem.jsx',
      language: 'jsx',
      description: 'Core React component that renders task items with drag-and-drop functionality, animations, and real-time updates',
      code: `import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './TaskItem.css';

const ITEM_TYPE = 'TASK';

const TaskItem = ({
  task,
  index,
  moveTask,
  onToggleComplete,
  onEdit,
  onDelete,
  onAddSubtask
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // References for drag and drop
  const ref = useRef(null);

  // Setup drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  // Setup drop functionality
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Calculate position
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards, only move when cursor passes middle
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // Dragging upwards, only move when cursor passes middle
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  // Connect drag and drop refs
  drag(drop(ref));

  // Format relative time
  const formattedDueDate = task.dueDate
    ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })
    : null;

  // Animation variants
  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={\`task-item \${task.completed ? 'completed' : ''} \${isDragging ? 'dragging' : ''}\`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={taskVariants}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        data-testid={\`task-item-\${task.id}\`}
      >
        <div className="task-priority-indicator" data-priority={task.priority}></div>

        <div className="task-main-content">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              id={\`task-\${task.id}\`}
            />
            <label htmlFor={\`task-\${task.id}\`} className="checkmark"></label>
          </div>

          <div className="task-content">
            <h3 className="task-title" onClick={() => setIsExpanded(!isExpanded)}>
              {task.title}
            </h3>

            {task.description && isExpanded && (
              <motion.p
                className="task-description"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {task.description}
              </motion.p>
            )}

            <div className="task-meta">
              {task.dueDate && (
                <span className={\`task-due-date \${isOverdue(task.dueDate) ? 'overdue' : ''}\`}>
                  {formattedDueDate}
                </span>
              )}

              {task.category && (
                <span className={\`task-category \${task.category}\`}>
                  {task.category}
                </span>
              )}

              {task.subtasks && task.subtasks.length > 0 && (
                <span className="subtask-count">
                  {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {showOptions && (
          <motion.div
            className="task-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              className="task-action edit-btn"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              <EditIcon />
            </button>
            <button
              className="task-action subtask-btn"
              onClick={() => onAddSubtask(task.id)}
              aria-label="Add subtask"
            >
              <SubtaskIcon />
            </button>
            <button
              className="task-action delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <DeleteIcon />
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Helpers
const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
};

// Icons components
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SubtaskIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    category: PropTypes.string,
    subtasks: PropTypes.array
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddSubtask: PropTypes.func.isRequired
};

export default TaskItem;`
    },
    styling: {
      fileName: 'TaskItem.css',
      language: 'css',
      description: 'Advanced CSS with custom animations, responsive design, and detailed styling for all task states',
      code: `.task-item {
  --task-padding: 16px;
  --task-border-radius: 12px;
  --transition-speed: 0.25s;

  background-color: var(--task-bg, white);
  border-radius: var(--task-border-radius);
  padding: var(--task-padding);
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color, #edf2f7);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-speed) ease-in-out,
              transform 0.15s ease-in-out,
              box-shadow 0.2s ease-in-out;
}

/* Left-side priority indicator */
.task-priority-indicator {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #a0aec0; /* Default color */
}

.task-priority-indicator[data-priority="high"] {
  background-color: var(--priority-high-color, #e53e3e);
}

.task-priority-indicator[data-priority="medium"] {
  background-color: var(--priority-medium-color, #dd6b20);
}

.task-priority-indicator[data-priority="low"] {
  background-color: var(--priority-low-color, #38a169);
}

/* Main content layout */
.task-main-content {
  flex: 1;
  display: flex;
  gap: 12px;
}

/* Hover and focus states */
.task-item:hover,
.task-item:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Dragging state */
.task-item.dragging {
  opacity: 0.6;
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Completed task styles */
.task-item.completed {
  background-color: var(--completed-bg, #f7fafc);
  border-color: var(--completed-border, #edf2f7);
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: var(--completed-text, #a0aec0);
}

/* Custom checkbox styling */
.task-checkbox {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 3px;
}

.task-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  border: 2px solid var(--checkbox-border, #a0aec0);
  border-radius: 6px;
  background-color: transparent;
  transition: all 0.2s ease;
}

.task-checkbox:hover .checkmark {
  border-color: var(--checkbox-hover, #6366f1);
}

.task-checkbox input:checked ~ .checkmark {
  background-color: var(--checkbox-checked-bg, #6366f1);
  border-color: var(--checkbox-checked-border, #6366f1);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.task-checkbox input:checked ~ .checkmark:after {
  display: block;
  animation: checkmark 0.2s ease-in-out forwards;
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }
  100% {
    height: 11px;
    width: 6px;
    opacity: 1;
  }
}

/* Task content styles */
.task-content {
  flex: 1;
}

.task-title {
  font-weight: 600;
  color: var(--title-color, #1a202c);
  margin-bottom: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.task-title:hover {
  color: var(--title-hover, #6366f1);
}

.task-description {
  color: var(--description-color, #718096);
  font-size: 0.9rem;
  margin-bottom: 8px;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.85rem;
}

.task-due-date {
  color: var(--due-date-color, #718096);
  display: flex;
  align-items: center;
}

.task-due-date.overdue {
  color: var(--overdue-color, #e53e3e);
  font-weight: 600;
}

.task-category {
  padding: 2px 8px;
  border-radius: 20px;
  background-color: var(--category-bg, #f7fafc);
  color: var(--category-color, #718096);
  font-weight: 500;
}

.task-category.work {
  background-color: var(--work-category-bg, rgba(66, 153, 225, 0.1));
  color: var(--work-category-color, #3182ce);
}

.task-category.personal {
  background-color: var(--personal-category-bg, rgba(154, 230, 180, 0.1));
  color: var(--personal-category-color, #38a169);
}

.task-category.health {
  background-color: var(--health-category-bg, rgba(252, 129, 129, 0.1));
  color: var(--health-category-color, #e53e3e);
}

.subtask-count {
  color: var(--subtask-count-color, #718096);
  display: flex;
  align-items: center;
  gap: 4px;
}

.subtask-count::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='8' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='8' y1='18' x2='21' y2='18'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='3.01' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='12' x2='3.01' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='3.01' y2='18'%3E%3C/line%3E%3C/svg%3E");
  background-size: contain;
}

/* Task action buttons */
.task-actions {
  display: flex;
  gap: 8px;
  margin-left: 16px;
}

.task-action {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--action-color, #a0aec0);
  transition: all 0.2s ease;
}

.task-action svg {
  width: 16px;
  height: 16px;
}

.task-action:hover {
  background-color: var(--action-hover-bg, #f7fafc);
  color: var(--action-hover-color, #4a5568);
}

.edit-btn:hover {
  color: var(--edit-hover-color, #6366f1);
}

.delete-btn:hover {
  color: var(--delete-hover-color, #e53e3e);
}

.subtask-btn:hover {
  color: var(--subtask-hover-color, #38a169);
}

/* Mobile Styles */
@media (max-width: 640px) {
  .task-item {
    padding: 12px;
  }

  .task-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    margin-left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2px;
    border-radius: 16px;
  }

  .task-action {
    width: 28px;
    height: 28px;
  }
}`
    },
    hooks: {
      fileName: 'useTasks.js',
      language: 'js',
      description: 'Custom React Hook that encapsulates task management logic with state, local storage persistence, and sorting functionality',
      code: `import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for task management with local storage persistence
 */
export const useTasks = () => {
  // Initialize state from localStorage or with empty array
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem('tasklio-tasks');
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sort, setSort] = useState({ by: 'dueDate', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(() => {
    try {
      const storedCategories = localStorage.getItem('tasklio-categories');
      return storedCategories ? JSON.parse(storedCategories) : [
        { id: 'work', name: 'Work', color: '#3182ce' },
        { id: 'personal', name: 'Personal', color: '#38a169' },
        { id: 'health', name: 'Health', color: '#e53e3e' }
      ];
    } catch (error) {
      console.error('Error loading categories from localStorage:', error);
      return [];
    }
  });

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasklio-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Persist categories to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasklio-categories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
    }
  }, [categories]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(term);
      const matchesDescription = task.description?.toLowerCase().includes(term);
      return matchesTitle || matchesDescription;
    }

    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let valueA, valueB;

    // Extract values based on sort.by
    switch(sort.by) {
      case 'dueDate':
        valueA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
        valueB = b.dueDate ? new Date(8640000000000000);
        break;
      case 'priority':
        const priorityValues = { high: 3, medium: 2, low: 1 };
        valueA = priorityValues[a.priority] || 0;
        valueB = priorityValues[b.priority] || 0;
        break;
      case 'alphabetical':
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt);
        valueB = new Date(b.createdAt);
        break;
      default:
        valueA = a[sort.by];
        valueB = b[sort.by];
    }

    // Compare values
    if (valueA < valueB) return sort.order === 'asc' ? -1 : 1;
    if (valueA > valueB) return sort.order === 'asc' ? 1 : -1;
    return 0;
  });

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate || null,
      priority: taskData.priority || 'medium',
      category: taskData.category || null,
      subtasks: taskData.subtasks || []
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  // Update an existing task
  const updateTask = (taskId, updatedFields) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updatedFields }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Toggle completion status of a task
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Add a subtask to a task
  const addSubtask = (taskId, subtaskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newSubtask = {
            id: uuidv4(),
            title: subtaskData.title,
            completed: false,
            createdAt: new Date().toISOString()
          };

          return {
            ...task,
            subtasks: [...(task.subtasks || []), newSubtask]
          };
        }
        return task;
      })
    );
  };

  // Toggle completion status of a subtask
  const toggleSubtaskCompletion = (taskId, subtaskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          };
        }
        return task;
      })
    );
  };

  // Add a new category
  const addCategory = (categoryData) => {
    const newCategory = {
      id: categoryData.id || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      name: categoryData.name,
      color: categoryData.color || '#6366f1'
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
    return newCategory;
  };

  // Delete a category
  const deleteCategory = (categoryId) => {
    setCategories(prevCategories =>
      prevCategories.filter(category => category.id !== categoryId)
    );

    // Also update any tasks using this category
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.category === categoryId
          ? { ...task, category: null }
          : task
      )
    );
  };

  // Update task order (for drag and drop)
  const moveTask = (fromIndex, toIndex) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  return {
    tasks: sortedTasks,
    filter,
    sort,
    searchTerm,
    categories,
    stats: {
      total: tasks.length,
      active: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
      overdue: tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length
    },
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addSubtask,
    toggleSubtaskCompletion,
    setFilter,
    setSort,
    setSearchTerm,
    addCategory,
    deleteCategory,
    moveTask
  };
};

export default useTasks;`
    },
    architecture: {
      fileName: 'architecture.md',
      language: 'markdown',
      description: "Documentation on the app's architecture and design principles",
      code: `# Tasklio Architecture Documentation

## 1. Overview

Tasklio is a privacy-focused, client-side task management application built with React. It focuses on simplicity, performance, and user privacy by storing all data locally in the browser.

## 2. Core Principles

- **Privacy First**: No data ever leaves the user's device
- **Performance**: Minimizes re-renders and optimizes for speed
- **Accessibility**: Follows WCAG 2.1 AA standards
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Responsive Design**: Optimized for all screen sizes
- **Offline Capability**: Works without an internet connection

## 3. Technical Stack

- **Frontend Framework**: React 18
- **State Management**: React Context + Hooks
- **UI Components**: Custom components (no UI library)
- **Storage**: localStorage (indexed DB for attachments)
- **Styling**: CSS Modules + CSS Variables
- **Build Tool**: Vite
- **Testing**: Jest + React Testing Library
- **Deployment**: Netlify (static site)

## 4. Architecture Overview

### Component Structure

Tasklio follows an atomic design pattern with the following hierarchy:

\`\`\`
src/
├── components/          # Shared components
│   ├── atoms/           # Basic UI elements (buttons, inputs)
│   ├── molecules/       # Composite components (task items, forms)
│   ├── organisms/       # Complex components (task lists, sidebar)
│   ├── templates/       # Page layouts
│   └── pages/           # Full page components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts for state management
├── utils/               # Utility functions
├── styles/              # Global styles and variables
└── App.jsx              # Main application component
\`\`\`

### Data Flow

1. **State Management**:
   - App-wide state is managed using React Context
   - Component-specific state uses useState or useReducer
   - Custom hooks encapsulate related state logic

2. **Data Persistence**:
   - Task data is saved to localStorage on each change
   - Throttled saves prevent excessive writes
   - Data migration logic handles schema changes between versions

3. **Component Communication**:
   - Parent-to-child: Props
   - Child-to-parent: Callback functions
   - Siblings/distant: Context API

## 5. Key Components

### Task Management

- **TaskProvider**: Context provider that exposes task CRUD operations
- **TaskList**: Renders task items with virtualization for performance
- **TaskItem**: Individual task component with edit/delete capabilities
- **TaskForm**: Form for creating and editing tasks

### UI Components

- **ThemeProvider**: Manages light/dark mode and custom themes
- **Modal**: Reusable modal component for forms and dialogs
- **Dropdown**: Custom dropdown menu component
- **Toast**: Notification system for user feedback

## 6. Performance Optimizations

- **Component Memoization**: React.memo for expensive components
- **Virtualized Lists**: Only render visible tasks
- **Throttled & Debounced Events**: Prevent excessive function calls
- **Code Splitting**: Lazy load components not needed on initial render
- **Optimistic UI Updates**: Update UI before completing async operations

## 7. Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: ARIA attributes and semantic HTML
- **Focus Management**: Proper focus trapping in modals
- **Color Contrast**: Compliant with WCAG AA standards
- **Reduced Motion**: Respects user preferences for animations

## 8. Future Improvements

- **PWA Support**: Service worker for offline functionality
- **Cloud Sync Option**: Optional sync with user's cloud storage
- **Data Export/Import**: Allow users to backup and restore data
- **Collaborative Features**: Share tasks via one-time links
- **Advanced Analytics**: Insights into productivity patterns`
    }
  };

  return (
    <section className="codebase-section">
      <div className="codebase-header">
        <h2>Inside the Codebase</h2>
        <p className="codebase-intro">
          Explore how Tasklio is built with clean, maintainable code following modern React best practices.
          Below are actual examples from the codebase.
        </p>
      </div>

      <div className="code-showcase">
        <div className="code-tabs">
          <button
            className={`code-tab ${activeCodeTab === 'component' ? 'active' : ''}`}
            onClick={() => setActiveCodeTab('component')}
          >
            React Component
          </button>
          <button
            className={`code-tab ${activeCodeTab === 'styling' ? 'active' : ''}`}
            onClick={() => setActiveCodeTab('styling')}
          >
            CSS Styling
          </button>
          <button
            className={`code-tab ${activeCodeTab === 'hooks' ? 'active' : ''}`}
            onClick={() => setActiveCodeTab('hooks')}
          >
            Custom Hooks
          </button>
          <button
            className={`code-tab ${activeCodeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveCodeTab('architecture')}
          >
            Architecture
          </button>
        </div>

        <div className="code-panel">
          <div className="code-file-header">
            <span className="code-file-name">{codeExamples[activeCodeTab].fileName}</span>
            <span className="code-file-badge">{activeCodeTab === 'architecture' ? 'Documentation' : 'Source Code'}</span>
          </div>
          <p className="code-file-description">
            {codeExamples[activeCodeTab].description}
          </p>
          <CodeMockup
            language={codeExamples[activeCodeTab].language}
            fileName={codeExamples[activeCodeTab].fileName}
            code={codeExamples[activeCodeTab].code}
          />
        </div>
      </div>

      <div className="codebase-features">
        <div className="codebase-feature">
          <div className="feature-icon">🔍</div>
          <h3>Clean Architecture</h3>
          <p>Well-organized code with clear separation of concerns</p>
        </div>
        <div className="codebase-feature">
          <div className="feature-icon">🧩</div>
          <h3>Reusable Components</h3>
          <p>Modular design with composable and maintainable components</p>
        </div>
        <div className="codebase-feature">
          <div className="feature-icon">⚡</div>
          <h3>Performance Optimized</h3>
          <p>Efficient rendering with React hooks and memoization</p>
        </div>
        <div className="codebase-feature">
          <div className="feature-icon">📱</div>
          <h3>Responsive Design</h3>
          <p>Adaptive layouts that work on all devices and screen sizes</p>
        </div>
      </div>
    </section>
  );
};

export default CodebaseSection;
