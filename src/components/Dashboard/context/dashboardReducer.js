export const initialState = {
  tasks: [
    {
      id: 'demo-1',
      title: 'Welcome to Tasklio!',
      description: 'This is a demo task to show you how Tasklio works',
      completed: false,
      priority: 'high',
      project: 'Demo Project',
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-2',
      title: 'Try creating a new task',
      description: 'Click the "Add Task" button to create your own task',
      completed: false,
      priority: 'medium',
      project: 'Getting Started',
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-3',
      title: 'Mark tasks as complete',
      description: 'Click the checkbox to mark this task as done',
      completed: true,
      priority: 'low',
      project: 'Tutorial',
      dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      createdAt: new Date().toISOString()
    }
  ],
  projects: [],
  labels: [
    { id: 'demo', name: 'Demo', color: '#ec4899' },
    { id: 'tutorial', name: 'Tutorial', color: '#8b5cf6' },
    { id: 'urgent', name: 'Urgent', color: '#ef4444' },
    { id: 'work', name: 'Work', color: '#3b82f6' },
    { id: 'personal', name: 'Personal', color: '#10b981' },
    { id: 'health', name: 'Health', color: '#f59e0b' },
    { id: 'shopping', name: 'Shopping', color: '#8b5cf6' },
    { id: 'family', name: 'Family', color: '#ec4899' }
  ],
  filters: {
    view: 'today',
    search: '',
    priority: 'all',
    project: 'all',
    label: 'all',
    dateRange: 'all',
    completed: 'all'
  },
  ui: {
    sidebarCollapsed: false,
    selectedTask: null,
    taskDetailsOpen: false,
    quickAddOpen: false
  },
  user: {
    name: 'Demo User',
    email: 'demo@tasklio.com',
    avatar: {
      type: 'initials',
      value: 'DU',
      color: '#5b5ef4'
    },
    preferences: {
      theme: 'light',
      startOfWeek: 'monday',
      timeFormat: '24h'
    }
  }
};

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value
        }
      };

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarCollapsed: !state.ui.sidebarCollapsed
        }
      };

    case 'SELECT_TASK':
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedTask: action.payload,
          taskDetailsOpen: true
        }
      };

    case 'CLOSE_TASK_DETAILS':
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedTask: null,
          taskDetailsOpen: false
        }
      };

    case 'SET_SEARCH':
      return {
        ...state,
        filters: { ...state.filters, search: action.payload }
      };

    case 'SET_VIEW_FILTER':
      return {
        ...state,
        filters: { ...state.filters, view: action.payload }
      };

    case 'SET_LABEL_FILTER':
      return {
        ...state,
        filters: { ...state.filters, label: action.payload }
      };

    case 'SET_DATE_RANGE_FILTER':
      return {
        ...state,
        filters: { ...state.filters, dateRange: action.payload }
      };

    case 'SET_COMPLETED_FILTER':
      return {
        ...state,
        filters: { ...state.filters, completed: action.payload }
      };

    case 'ADD_LABEL':
      return {
        ...state,
        labels: [...state.labels, action.payload]
      };

    case 'REMOVE_LABEL':
      return {
        ...state,
        labels: state.labels.filter(label => label.id !== action.payload)
      };

    case 'CLEAR_SEARCH':
      return {
        ...state,
        filters: { ...state.filters, search: '' }
      };

    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.payload,
        filters: {
          ...state.filters,
          view: action.payload
        }
      };

    case 'SET_PROJECT_FILTER':
      return {
        ...state,
        filters: { 
          ...state.filters, 
          project: action.payload 
        }
      };

    default:
      return state;
  }
};
