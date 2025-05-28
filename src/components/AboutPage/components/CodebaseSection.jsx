import React, { useState } from 'react';
import CodeMockup from './CodeMockup';
import '../styles/CodebaseSection.css';

const CodebaseSection = () => {
  const [activeCodeTab, setActiveCodeTab] = useState('component');
  const [isExpanded, setIsExpanded] = useState(true); // Add overall expansion state

  // Code examples for the mockups
  const codeExamples = {
    component: {
      fileName: 'AddTaskForm.jsx',
      language: 'jsx',
      description: 'Clean React component for adding new tasks with form validation and smooth user experience',
      code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AddTaskForm.css';

const AddTaskForm = ({ onAddTask, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddTask({
        ...formData,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: ''
      });
    }
  };

  return (
    <motion.div
      className="add-task-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        className="add-task-form"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        <h2>Add New Task</h2>
        
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="What needs to be done?"
            autoFocus
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details about this task..."
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category...</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Task
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddTaskForm;`
    },
    styling: {
      fileName: 'Dashboard.css',
      language: 'css',
      description: 'Modern CSS with custom properties, grid layouts, and responsive design for the main dashboard',
      code: `:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --transition: all 0.2s ease-in-out;
}

.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
  background-color: var(--gray-50);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.dashboard-sidebar {
  background: white;
  border-right: 1px solid var(--gray-200);
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: var(--shadow-sm);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  color: var(--gray-700);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
}

.nav-link:hover {
  background-color: var(--gray-50);
  color: var(--primary-color);
}

.nav-link.active {
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-md);
}

.nav-icon {
  font-size: 1.125rem;
  width: 20px;
  text-align: center;
}

.dashboard-main {
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .dashboard-sidebar {
    display: none;
  }
  
  .dashboard-main {
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}`
    },
    hooks: {
      fileName: 'useLocalStorage.js',
      language: 'js',
      description: 'Custom React hook for persistent local storage with automatic serialization and error handling',
      code: `import { useState, useEffect } from 'react';

/**
 * Custom hook for persistent state management using localStorage
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if no stored value exists
 * @returns {[value, setValue]} - State value and setter function
 */
export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function for functional updates
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(\`Error parsing localStorage value for key "\${key}":\`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};

/**
 * Hook for managing task data persistence
 */
export const useTaskStorage = () => {
  const [tasks, setTasks] = useLocalStorage('tasklio_tasks', []);
  const [categories, setCategories] = useLocalStorage('tasklio_categories', [
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'health', name: 'Health', color: '#f59e0b' }
  ]);
  const [settings, setSettings] = useLocalStorage('tasklio_settings', {
    theme: 'light',
    notifications: true,
    soundEnabled: false,
    defaultPriority: 'medium'
  });

  // Helper functions for task management
  const addTask = (taskData) => {
    const newTask = {
      id: \`task_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    updateTask(taskId, { 
      completed: !tasks.find(t => t.id === taskId)?.completed 
    });
  };

  // Data export functionality
  const exportData = () => {
    const data = {
      tasks,
      categories,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(data, null, 2);
  };

  // Data import functionality
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.tasks) setTasks(data.tasks);
      if (data.categories) setCategories(data.categories);
      if (data.settings) setSettings(data.settings);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    tasks,
    categories,
    settings,
    setTasks,
    setCategories,
    setSettings,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    exportData,
    importData
  };
};`
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
- **Deployment**: Cloud infrastructure (scalable hosting)

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
        <div className="codebase-title-row">
          <h2>Inside the Codebase</h2>
          <button 
            className="codebase-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse codebase section' : 'Expand codebase section'}
          >
            <span className={`toggle-icon ${isExpanded ? 'expanded' : 'collapsed'}`}>
              {isExpanded ? '▼' : '▶'}
            </span>
          </button>
        </div>
        <p className="codebase-intro">
          Explore how Tasklio is built with clean, maintainable code following modern React best practices.
          Below are actual examples from the codebase.
        </p>
      </div>

      {isExpanded && (
        <div className="codebase-content">
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
        </div>
      )}
    </section>
  );
};

export default CodebaseSection;
