import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import ConfirmationModal from './common/ConfirmationModal';
import TodoModal from './TodoModal';
import './TaskApp.css'; // Make sure to create this CSS file

const TaskApp = () => {
  const { user, loginWithGoogle, loginWithGithub, logout } = useUser();
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [socialAuthInProgress, setSocialAuthInProgress] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [stepByStepMode, setStepByStepMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [activePage, setActivePage] = useState('home');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const totalSteps = 5;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Reset steps when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setCurrentStep(1);
    }
  }, [isModalOpen]);

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    // Instead of deleting directly, open confirmation dialog
    setPendingAction(() => () => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
    setShowConfirmation(true);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditingTodo(todoToEdit);
    setIsModalOpen(true);

    // Add consent parameter for OAuth flows
    if (todoToEdit?.authMethod === 'google') {
      // Force consent screen for better user experience
      const oauthConfig = {
        prompt: 'consent',
        access_type: 'offline'
      };
      // Apply OAuth configuration
    }
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  const toggleTodoComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompletedTodos = () => {
    // Show confirmation before clearing completed tasks
    setPendingAction(() => () => {
      setTodos(todos.filter(todo => !todo.completed));
    });
    setShowConfirmation(true);
  };

  // Enhanced filtering with search integration
  const getFilteredTodos = () => {
    let filtered = todos; // Initialize filtered variable

    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'category':
          filtered = filtered.filter(todo => todo.category === selectedCategory);
          break;
        case 'priority':
          filtered = filtered.filter(todo => todo.priority === selectedPriority);
          break;
        case 'project':
          filtered = filtered.filter(todo => todo.project === selectedProject);
          break;
        default:
          break;
      }
    }

    // Apply tab filter
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    // Enhanced search filter with multiple fields
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(query) || 
        (todo.description && todo.description.toLowerCase().includes(query)) ||
        (todo.category && todo.category.toLowerCase().includes(query)) ||
        (todo.project && todo.project.toLowerCase().includes(query)) ||
        (todo.priority && todo.priority.toLowerCase().includes(query)) ||
        (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return filtered;
  };

  // Enhanced search handler with debouncing
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const openNewTaskModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const closeModalWithConfirmation = () => {
    // If we're in the middle of filling out a form, show confirmation first
    if (currentStep > 1) {
      setPendingAction(() => () => {
        setIsModalOpen(false);
      });
      setShowConfirmation(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const nextStep = () => {
    // You could add validation here if needed
    const isValid = true; // Replace with actual validation if needed

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmAction = () => {
    // Execute the pending action if it exists
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setShowConfirmation(false);
  };

  const handleSocialLogin = async (provider) => {
    try {
      setSocialAuthInProgress(true);
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'github') {
        await loginWithGithub();
      }
      
      // After successful social login, set the currentStep to 2 
      // to ensure users still go through the required steps
      setCurrentStep(2);
      
    } catch (error) {
      console.error(`Error during ${provider} authentication:`, error);
    } finally {
      setSocialAuthInProgress(false);
    }
  };

  // If user is not logged in, redirect to landing page or show login
  if (!user) {
    // Instead of blocking access, redirect to login/register
    return (
      <div className="auth-redirect">
        <h2>Please log in to continue</h2>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button">Register</Link>
          <button 
            className="social-auth-button google-button"
            onClick={() => handleSocialLogin('google')}
          >
            <span className="social-icon">G</span>
            Continue with Google
          </button>
          <button 
            className="social-auth-button github-button"
            onClick={() => handleSocialLogin('github')}
          >
            <span className="social-icon">GH</span>
            Continue with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-app">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Tasklio</h1>
            <div className="user-info">
              <span>Welcome, {user?.displayName || user?.email || 'User'}</span>
              <button className="logout-button" onClick={logout}>Logout</button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="task-management">
            <div className="controls-section">
              <div className="stats-bubbles">
                <div className="stat-bubble primary">
                  <div className="stat-bubble-value">{todos.length}</div>
                  <div className="stat-bubble-label">Total Tasks</div>
                </div>
                <div className="stat-bubble success">
                  <div className="stat-bubble-value">{todos.filter(t => t.completed).length}</div>
                  <div className="stat-bubble-label">Completed</div>
                </div>
                <div className="stat-bubble warning">
                  <div className="stat-bubble-value">{todos.filter(t => !t.completed).length}</div>
                  <div className="stat-bubble-label">Pending</div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="quick-action-buttons">
                  <button className="quick-action-btn work" onClick={openNewTaskModal}>
                    <div className="action-icon">💼</div>
                    <span>Add Work Task</span>
                  </button>
                  <button className="quick-action-btn personal" onClick={openNewTaskModal}>
                    <div className="action-icon">🏠</div>
                    <span>Add Personal Task</span>
                  </button>
                  <button className="quick-action-btn today" onClick={openNewTaskModal}>
                    <div className="action-icon">⭐</div>
                    <span>Priority Task</span>
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-task-btn" onClick={openNewTaskModal}>
                  + Add New Task
                </button>
                {todos.filter(t => t.completed).length > 0 && (
                  <button className="clear-completed-btn" onClick={clearCompletedTodos}>
                    Clear Completed
                  </button>
                )}
              </div>
            </div>

            <div className="tasks-section">
              <div className="filter-controls">
                <div className="filter-section">
                  <h3 className="filter-heading">Filter by Status</h3>
                  <div className="filter-chips">
                    <button 
                      className={`filter-chip ${activeTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      <span className="filter-chip-icon">📋</span>
                      All Tasks
                    </button>
                    <button 
                      className={`filter-chip ${activeTab === 'active' ? 'active' : ''}`}
                      onClick={() => setActiveTab('active')}
                    >
                      <span className="filter-chip-icon">⏳</span>
                      Active
                    </button>
                    <button 
                      className={`filter-chip ${activeTab === 'completed' ? 'active' : ''}`}
                      onClick={() => setActiveTab('completed')}
                    >
                      <span className="filter-chip-icon">✅</span>
                      Completed
                    </button>
                  </div>
                </div>
              </div>

              <div className="todo-list">
                {getFilteredTodos().length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No tasks yet</h3>
                    <p>Create your first task to get started with organizing your day!</p>
                    <button className="add-task-btn" onClick={openNewTaskModal}>
                      + Create Your First Task
                    </button>
                  </div>
                ) : (
                  getFilteredTodos().map(todo => (
                    <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                      <div className="todo-checkbox-container">
                        <input
                          type="checkbox"
                          className="todo-checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodoComplete(todo.id)}
                        />
                      </div>
                      <div className="todo-content">
                        <h4 className="todo-title">{todo.title}</h4>
                        {todo.description && <p className="todo-description">{todo.description}</p>}
                        <div className="todo-meta">
                          {todo.dueDate && <span className="todo-due">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>}
                          {todo.priority && <span className={`todo-priority ${todo.priority}`}>{todo.priority}</span>}
                          {todo.category && <span className={`todo-category ${todo.category}`}>{todo.category}</span>}
                        </div>
                      </div>
                      <div className="todo-actions">
                        <button className="todo-action edit" onClick={() => editTodo(todo.id)}>
                          ✏️
                        </button>
                        <button className="todo-action delete" onClick={() => deleteTodo(todo.id)}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <TodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={editingTodo ? updateTodo : addTodo}
            todo={editingTodo}
            stepByStepMode={stepByStepMode}
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            totalSteps={totalSteps}
          />
        )}

        {showConfirmation && (
          <ConfirmationModal
            message="Are you sure you want to proceed with this action?"
            onConfirm={handleConfirmAction}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskApp;