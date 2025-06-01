import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  tasks: [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Write and review the Q4 project proposal for the new client',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'high',
      project: 'Inbox',
      completed: false,
      createdAt: new Date().toISOString(),
      labels: ['urgent', 'client-work']
    },
    {
      id: 2,
      title: 'Schedule team meeting',
      description: 'Coordinate with team members for weekly sync',
      dueDate: null,
      priority: 'medium',
      project: 'Inbox',
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      labels: ['meeting']
    },
    {
      id: 3,
      title: 'Buy groceries',
      description: 'Weekly grocery shopping - check the list on the fridge',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      priority: 'low',
      project: 'Inbox',
      completed: false,
      createdAt: new Date().toISOString(),
      labels: ['personal', 'shopping']
    }
  ],
  projects: [],
  labels: [
    { id: 'urgent', name: 'Urgent', color: '#ef4444' },
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'health', name: 'Health', color: '#f59e0b' },
    { id: 'shopping', name: 'Shopping', color: '#8b5cf6' },
    { id: 'family', name: 'Family', color: '#ec4899' }
  ],
  filters: {
    search: '',
    priority: 'all',
    project: 'all',
    view: 'inbox',
    completed: false,
    label: 'all',
    dateRange: 'all'
  },
  activeView: 'inbox',
  selectedTask: null,
  loading: false,
  error: null
};

// Reducer
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_TASKS':
      return { ...state, tasks: action.payload || [], loading: false, error: null };

    case 'ADD_TASK':
      const newTask = {
        id: Date.now(),
        ...action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      };
      return { ...state, tasks: [...state.tasks, newTask], error: null };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
        error: null
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        selectedTask: state.selectedTask?.id === action.payload ? null : state.selectedTask,
        error: null
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        error: null
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
        error: null
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: { ...initialState.filters, view: state.filters.view },
        error: null
      };

    case 'SELECT_TASK':
      return { ...state, selectedTask: action.payload, error: null };

    case 'CLEAR_SELECTED_TASK':
      return { ...state, selectedTask: null, error: null };

    case 'SET_SEARCH':
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
        error: null
      };

    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.payload,
        filters: { ...state.filters, view: action.payload },
        error: null
      };

    case 'SET_VIEW_FILTER':
      return {
        ...state,
        filters: { ...state.filters, view: action.payload },
        error: null
      };

    case 'SET_LABEL_FILTER':
      return {
        ...state,
        filters: { ...state.filters, label: action.payload },
        error: null
      };

    case 'SET_DATE_RANGE_FILTER':
      return {
        ...state,
        filters: { ...state.filters, dateRange: action.payload },
        error: null
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        error: null
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id 
            ? { ...project, ...action.payload }
            : project
        ),
        error: null
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        // Move tasks from deleted project to inbox
        tasks: state.tasks.map(task =>
          task.project === state.projects.find(p => p.id === action.payload)?.name
            ? { ...task, project: 'Inbox' }
            : task
        ),
        error: null
      };

    case 'ADD_LABEL':
      return {
        ...state,
        labels: [...state.labels, action.payload],
        error: null
      };

    case 'REMOVE_LABEL':
      return {
        ...state,
        labels: state.labels.filter(label => label.id !== action.payload),
        error: null
      };

    case 'FORCE_UPDATE':
      // Force re-render by updating timestamp without changing any actual data
      return {
        ...state,
        lastUpdate: action.payload,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const DashboardContext = createContext(null);

// Provider component
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Enhanced dispatch with error handling
  const enhancedDispatch = (action) => {
    try {
      dispatch(action);
    } catch (error) {
      console.error('Dashboard dispatch error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const contextValue = {
    state,
    dispatch: enhancedDispatch,
    // Helper functions
    addTask: (taskData) => enhancedDispatch({ type: 'ADD_TASK', payload: taskData }),
    updateTask: (id, updates) => enhancedDispatch({ type: 'UPDATE_TASK', payload: { id, updates } }),
    deleteTask: (id) => enhancedDispatch({ type: 'DELETE_TASK', payload: id }),
    toggleTask: (id) => enhancedDispatch({ type: 'TOGGLE_TASK', payload: id }),
    setFilter: (key, value) => enhancedDispatch({ type: 'SET_FILTER', payload: { key, value } }),
    clearFilters: () => enhancedDispatch({ type: 'CLEAR_FILTERS' }),
    selectTask: (task) => enhancedDispatch({ type: 'SELECT_TASK', payload: task }),
    clearSelectedTask: () => enhancedDispatch({ type: 'CLEAR_SELECTED_TASK' }),
    setSearch: (query) => enhancedDispatch({ type: 'SET_SEARCH', payload: query }),
    setViewFilter: (view) => enhancedDispatch({ type: 'SET_VIEW_FILTER', payload: view }),
    setActiveView: (view) => enhancedDispatch({ type: 'SET_ACTIVE_VIEW', payload: view }),
    setLabelFilter: (label) => enhancedDispatch({ type: 'SET_LABEL_FILTER', payload: label }),
    setDateRangeFilter: (range) => enhancedDispatch({ type: 'SET_DATE_RANGE_FILTER', payload: range }),
    addProject: (projectData) => enhancedDispatch({ type: 'ADD_PROJECT', payload: projectData }),
    updateProject: (id, updates) => enhancedDispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } }),
    deleteProject: (id) => enhancedDispatch({ type: 'DELETE_PROJECT', payload: id }),
    addProject: (projectData) => enhancedDispatch({ type: 'ADD_PROJECT', payload: projectData }),
    updateProject: (id, updates) => enhancedDispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } }),
    deleteProject: (id) => enhancedDispatch({ type: 'DELETE_PROJECT', payload: id }),
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardProvider;
