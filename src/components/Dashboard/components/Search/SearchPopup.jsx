import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import FilterPanel from '../Filters/FilterPanel';
import QuickAdd from '../QuickAdd/QuickAdd';
import Settings from '../Settings/Settings';
import './SearchPopup.css';

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [commands, setCommands] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // all, tasks, projects, commands
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActions, setRecentActions] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentLabels, setRecentLabels] = useState([]);
  const [recentViews, setRecentViews] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [keyboardSequence, setKeyboardSequence] = useState([]);
  const [lastKeyPress, setLastKeyPress] = useState(null);
  const inputRef = useRef(null);
  const { state, dispatch, addTask } = useDashboard();
  const { tasks = [], projects = [], labels = [], viewMode = 'list' } = state || {};

  // Load all recent data from localStorage
  useEffect(() => {
    const savedRecentSearches = localStorage.getItem('tasklio_recent_searches');
    const savedRecentTasks = localStorage.getItem('tasklio_recent_tasks');
    const savedRecentProjects = localStorage.getItem('tasklio_recent_projects');
    const savedRecentActions = localStorage.getItem('tasklio_recent_actions');
    const savedRecentlyViewed = localStorage.getItem('tasklio_recently_viewed');
    const savedRecentLabels = localStorage.getItem('tasklio_recent_labels');
    const savedRecentViews = localStorage.getItem('tasklio_recent_views');
    
    if (savedRecentSearches) {
      setRecentSearches(JSON.parse(savedRecentSearches));
    }
    if (savedRecentTasks) {
      setRecentTasks(JSON.parse(savedRecentTasks));
    }
    if (savedRecentProjects) {
      setRecentProjects(JSON.parse(savedRecentProjects));
    }
    if (savedRecentActions) {
      setRecentActions(JSON.parse(savedRecentActions));
    }
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
    if (savedRecentLabels) {
      setRecentLabels(JSON.parse(savedRecentLabels));
    }
    if (savedRecentViews) {
      setRecentViews(JSON.parse(savedRecentViews));
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
      setActiveTab('all');
    }
  }, [isOpen]);

  // Enhanced search commands with ALL missing functionality
  const searchCommands = [
    // CREATE COMMANDS
    {
      id: 'add-task',
      title: 'Add new task',
      description: 'Create a new task quickly',
      icon: '➕',
      shortcut: 'Ctrl+N',
      category: 'create',
      action: () => {
        setShowQuickAdd(true);
        addToRecentActions('Add Task', 'add-task');
      }
    },
    {
      id: 'quick-capture',
      title: 'Quick capture task',
      description: 'Quickly add a task to inbox',
      icon: '⚡',
      shortcut: 'Ctrl+Shift+A',
      category: 'create',
      action: () => {
        const taskTitle = prompt('Enter task title:');
        if (taskTitle?.trim()) {
          addTask({
            title: taskTitle.trim(),
            description: '',
            priority: 'medium',
            project: 'Inbox',
            dueDate: null
          });
          addToRecentActions('Quick Capture', 'quick-capture');
          onClose();
        }
      }
    },
    {
      id: 'add-project',
      title: 'Add new project',
      description: 'Create a new project',
      icon: '📁',
      shortcut: 'Ctrl+Shift+P',
      category: 'create',
      action: () => {
        setShowQuickAdd(false);
        // Trigger project modal from DashboardContext
        dispatch({ type: 'SHOW_PROJECT_MODAL' });
        addToRecentActions('Add Project', 'add-project');
        onClose();
      }
    },
    {
      id: 'add-label',
      title: 'Add new label',
      description: 'Create a new label/tag',
      icon: '🏷️',
      category: 'create',
      action: () => {
        dispatch({ type: 'OPEN_ADD_LABEL_MODAL' });
        addToRecentActions('Add Label', 'add-label');
        onClose();
      }
    },

    // VIEW MODE COMMANDS
    {
      id: 'view-list',
      title: 'List view',
      description: 'Switch to list layout',
      icon: '📋',
      shortcut: 'Ctrl+1',
      category: 'view',
      action: () => {
        dispatch({ type: 'SET_VIEW_MODE', payload: 'list' });
        addToRecentViews('List View', 'list');
        addToRecentActions('View List', 'view-list');
        onClose();
      }
    },
    {
      id: 'view-dashboard',
      title: 'Dashboard view',
      description: 'Switch to dashboard layout',
      icon: '📊',
      shortcut: 'Ctrl+2',
      category: 'view',
      action: () => {
        dispatch({ type: 'SET_VIEW_MODE', payload: 'dashboard' });
        addToRecentViews('Dashboard', 'dashboard');
        addToRecentActions('View Dashboard', 'view-dashboard');
        onClose();
      }
    },
    {
      id: 'view-calendar',
      title: 'Calendar view',
      description: 'Switch to calendar layout',
      icon: '📅',
      shortcut: 'Ctrl+3',
      category: 'view',
      action: () => {
        dispatch({ type: 'SET_VIEW_MODE', payload: 'calendar' });
        addToRecentViews('Calendar View', 'calendar');
        addToRecentActions('View Calendar', 'view-calendar');
        onClose();
      }
    },
    {
      id: 'view-kanban',
      title: 'Kanban board',
      description: 'Switch to kanban board view',
      icon: '📌',
      shortcut: 'Ctrl+4',
      category: 'view',
      action: () => {
        dispatch({ type: 'SET_VIEW_MODE', payload: 'kanban' });
        addToRecentViews('Kanban Board', 'kanban');
        addToRecentActions('View Kanban', 'view-kanban');
        onClose();
      }
    },

    // NAVIGATION COMMANDS
    {
      id: 'nav-inbox',
      title: 'Go to Inbox',
      description: 'Navigate to inbox section',
      icon: '📥',
      shortcut: 'G then I',
      category: 'navigation',
      action: () => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'inbox' });
        addToRecentViews('Inbox', 'inbox');
        addToRecentActions('Navigate Inbox', 'nav-inbox');
        onClose();
      }
    },
    {
      id: 'nav-today',
      title: 'Go to Today',
      description: 'Navigate to today\'s tasks',
      icon: '📅',
      shortcut: 'G then T',
      category: 'navigation',
      action: () => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'today' });
        addToRecentViews('Today', 'today');
        addToRecentActions('Navigate Today', 'nav-today');
        onClose();
      }
    },
    {
      id: 'nav-upcoming',
      title: 'Go to Upcoming',
      description: 'Navigate to upcoming tasks',
      icon: '🗓️',
      shortcut: 'G then U',
      category: 'navigation',
      action: () => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'upcoming' });
        addToRecentViews('Upcoming', 'upcoming');
        addToRecentActions('Navigate Upcoming', 'nav-upcoming');
        onClose();
      }
    },
    {
      id: 'nav-completed',
      title: 'Go to Completed',
      description: 'Navigate to completed tasks',
      icon: '✅',
      shortcut: 'G then C',
      category: 'navigation',
      action: () => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'completed' });
        addToRecentViews('Completed', 'completed');
        addToRecentActions('Navigate Completed', 'nav-completed');
        onClose();
      }
    },

    // FILTER COMMANDS
    {
      id: 'filter-high-priority',
      title: 'Filter: High Priority',
      description: 'Show only high priority tasks',
      icon: '🔴',
      shortcut: 'F then H',
      category: 'filter',
      action: () => {
        dispatch({ type: 'SET_FILTER', payload: { key: 'priority', value: 'high' } });
        addToRecentActions('Filter High Priority', 'filter-high-priority');
        onClose();
      }
    },
    {
      id: 'filter-due-today',
      title: 'Filter: Due Today',
      description: 'Show tasks due today',
      icon: '📅',
      shortcut: 'F then T',
      category: 'filter',
      action: () => {
        dispatch({ type: 'SET_FILTER', payload: { key: 'dateRange', value: 'today' } });
        addToRecentActions('Filter Due Today', 'filter-due-today');
        onClose();
      }
    },
    {
      id: 'filter-overdue',
      title: 'Filter: Overdue',
      description: 'Show overdue tasks',
      icon: '⚠️',
      shortcut: 'F then O',
      category: 'filter',
      action: () => {
        dispatch({ type: 'SET_FILTER', payload: { key: 'dateRange', value: 'overdue' } });
        addToRecentActions('Filter Overdue', 'filter-overdue');
        onClose();
      }
    },
    {
      id: 'clear-filters',
      title: 'Clear all filters',
      description: 'Reset all active filters',
      icon: '🧹',
      shortcut: 'Ctrl+Shift+C',
      category: 'filter',
      action: () => {
        dispatch({ type: 'CLEAR_FILTERS' });
        addToRecentActions('Clear Filters', 'clear-filters');
        onClose();
      }
    },
    {
      id: 'advanced-filters',
      title: 'Advanced filters',
      description: 'Open advanced filter panel',
      icon: '🔍',
      shortcut: 'Ctrl+Shift+F',
      category: 'filter',
      action: () => {
        setShowAdvancedFilters(true);
        addToRecentActions('Advanced Filters', 'advanced-filters');
      }
    },

    // IMPORT/EXPORT COMMANDS
    {
      id: 'export-json',
      title: 'Export as JSON',
      description: 'Download tasks as JSON file',
      icon: '📤',
      category: 'tools',
      action: () => {
        const dataStr = JSON.stringify({ tasks, projects, labels }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasklio-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        addToRecentActions('Export JSON', 'export-json');
        onClose();
      }
    },
    {
      id: 'export-csv',
      title: 'Export as CSV',
      description: 'Download tasks as CSV file',
      icon: '📊',
      category: 'tools',
      action: () => {
        const csvHeaders = 'Title,Description,Priority,Project,Due Date,Completed,Created Date\n';
        const csvData = tasks.map(task => 
          `"${task.title}","${task.description || ''}","${task.priority}","${task.project || ''}","${task.dueDate || ''}","${task.completed}","${task.createdAt}"`
        ).join('\n');
        const csvContent = csvHeaders + csvData;
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(csvBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasklio-tasks-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        addToRecentActions('Export CSV', 'export-csv');
        onClose();
      }
    },
    {
      id: 'import-data',
      title: 'Import data',
      description: 'Import tasks from JSON file',
      icon: '📥',
      category: 'tools',
      action: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const importedData = JSON.parse(event.target.result);
                if (importedData.tasks) {
                  importedData.tasks.forEach(task => {
                    addTask({
                      ...task,
                      id: Date.now() + Math.random() // Generate new ID
                    });
                  });
                  alert(`Successfully imported ${importedData.tasks.length} tasks!`);
                  addToRecentActions('Import Data', 'import-data');
                  onClose();
                }
              } catch (error) {
                alert('Error importing file. Please check the format.');
                console.error('Import error:', error);
              }
            };
            reader.readAsText(file);
          }
        };
        input.click();
      }
    },
    {
      id: 'print-tasks',
      title: 'Print tasks',
      description: 'Print current task list',
      icon: '🖨️',
      category: 'tools',
      action: () => {
        const printWindow = window.open('', '_blank');
        const taskList = tasks.map(task => 
          `• ${task.title} ${task.completed ? '✅' : '⏳'} (${task.priority}) ${task.dueDate ? `- Due: ${task.dueDate}` : ''}`
        ).join('\n');
        
        printWindow.document.write(`
          <html>
            <head><title>Tasklio - Task List</title></head>
            <body>
              <h1>My Tasks - ${new Date().toLocaleDateString()}</h1>
              <pre style="font-family: Arial, sans-serif; line-height: 1.6;">${taskList}</pre>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        addToRecentActions('Print Tasks', 'print-tasks');
        onClose();
      }
    },

    // SETTINGS AND HELP COMMANDS
    {
      id: 'settings',
      title: 'Open settings',
      description: 'Manage your preferences',
      icon: '⚙️',
      shortcut: 'Ctrl+,',
      category: 'settings',
      action: () => {
        setShowSettings(true);
        addToRecentActions('Open Settings', 'settings');
      }
    },
    {
      id: 'keyboard-shortcuts',
      title: 'Keyboard shortcuts',
      description: 'View all keyboard shortcuts',
      icon: '⌨️',
      shortcut: 'Ctrl+/',
      category: 'help',
      action: () => {
        setShowKeyboardShortcuts(true);
        addToRecentActions('View Shortcuts', 'keyboard-shortcuts');
      }
    },
    {
      id: 'switch-theme',
      title: 'Switch theme',
      description: 'Toggle between light and dark mode',
      icon: '🌙',
      shortcut: 'Ctrl+Shift+L',
      category: 'settings',
      action: () => {
        dispatch({ type: 'TOGGLE_THEME' });
        addToRecentActions('Switch Theme', 'switch-theme');
        onClose();
      }
    },

    // BULK OPERATIONS
    {
      id: 'bulk-edit',
      title: 'Bulk edit tasks',
      description: 'Edit multiple tasks at once',
      icon: '📝',
      category: 'tools',
      action: () => {
        dispatch({ type: 'OPEN_BULK_EDIT' });
        addToRecentActions('Bulk Edit', 'bulk-edit');
        onClose();
      }
    },
    {
      id: 'mark-all-complete',
      title: 'Mark all as complete',
      description: 'Complete all visible tasks',
      icon: '✅',
      category: 'tools',
      action: () => {
        if (confirm('Mark all visible tasks as complete?')) {
          tasks.forEach(task => {
            if (!task.completed) {
              dispatch({ type: 'TOGGLE_TASK', payload: task.id });
            }
          });
          addToRecentActions('Mark All Complete', 'mark-all-complete');
          onClose();
        }
      }
    },
    {
      id: 'delete-completed',
      title: 'Delete completed tasks',
      description: 'Remove all completed tasks',
      icon: '🗑️',
      category: 'tools',
      action: () => {
        const completedTasks = tasks.filter(task => task.completed);
        if (completedTasks.length > 0 && confirm(`Delete ${completedTasks.length} completed tasks permanently?`)) {
          completedTasks.forEach(task => {
            dispatch({ type: 'DELETE_TASK', payload: task.id });
          });
          addToRecentActions('Delete Completed', 'delete-completed');
          onClose();
        }
      }
    }
  ];

  useEffect(() => {
    if (query.trim()) {
      // Search tasks
      const taskResults = tasks.filter(task =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(query.toLowerCase())) ||
        (task.project && task.project.toLowerCase().includes(query.toLowerCase())) ||
        (task.tags && task.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      ).map(task => ({ ...task, type: 'task' }));

      // Search projects
      const projectResults = projects.filter(project =>
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(query.toLowerCase()))
      ).map(project => ({ ...project, type: 'project' }));

      // Search commands
      const commandResults = searchCommands.filter(command =>
        command.title.toLowerCase().includes(query.toLowerCase()) ||
        command.description.toLowerCase().includes(query.toLowerCase())
      ).map(command => ({ ...command, type: 'command' }));

      // Combine and sort results
      const allResults = [...taskResults, ...projectResults, ...commandResults];
      
      setResults(allResults);
      setSelectedIndex(0);

      // Save to search history
      if (query.length > 2) {
        const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
        setSearchHistory(newHistory);
      }
    } else {
      setResults([]);
      setCommands(searchCommands.slice(0, 5)); // Show top 5 commands when no query
    }
  }, [query, tasks, projects]);

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const modifiers = [];
    
    if (e.ctrlKey) modifiers.push('ctrl');
    if (e.shiftKey) modifiers.push('shift');
    if (e.altKey) modifiers.push('alt');
    if (e.metaKey) modifiers.push('meta');

    const keyCombo = modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
    
    // Handle immediate shortcuts (with modifiers)
    const allShortcuts = {
      ...keyboardShortcuts.actions,
      ...keyboardShortcuts.views,
      ...keyboardShortcuts.filters,
      ...keyboardShortcuts.tools,
      ...keyboardShortcuts.search
    };

    // Check for immediate shortcuts
    if (allShortcuts[keyCombo]) {
      e.preventDefault();
      allShortcuts[keyCombo].action();
      return;
    }

    // Handle sequence shortcuts (like 'g i' for go to inbox)
    if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      // Update sequence
      const newSequence = [...keyboardSequence, key].slice(-3); // Keep last 3 keys
      setKeyboardSequence(newSequence);
      setLastKeyPress(Date.now());

      // Check for sequence matches
      const sequenceStr = newSequence.join(' ');
      const navShortcut = keyboardShortcuts.navigation[sequenceStr];
      const filterShortcut = keyboardShortcuts.filters[sequenceStr];

      if (navShortcut) {
        e.preventDefault();
        navShortcut.action();
        setKeyboardSequence([]);
        return;
      }

      if (filterShortcut) {
        e.preventDefault();
        filterShortcut.action();
        setKeyboardSequence([]);
        return;
      }

      // Clear sequence after timeout
      setTimeout(() => {
        if (Date.now() - lastKeyPress > 1000) {
          setKeyboardSequence([]);
        }
      }, 1000);
    }

    // Default navigation keys
    if (e.key === 'Escape') {
      if (showKeyboardShortcuts) {
        setShowKeyboardShortcuts(false);
      } else {
        onClose();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const maxIndex = query.trim() ? filteredResults.length - 1 : commands.length - 1;
      setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelection();
    } else if (e.key === 'Tab' && !e.ctrlKey) {
      e.preventDefault();
      cycleTabs();
    }
  };

  const handleSelection = () => {
    if (query.trim()) {
      const selectedItem = results[selectedIndex];
      if (selectedItem) {
        if (selectedItem.type === 'task') {
          dispatch({ type: 'SELECT_TASK', payload: selectedItem });
          addToRecentSearches(selectedItem.title);
          addToRecentTasks(selectedItem);
          addToRecentlyViewed(selectedItem, 'task');
        } else if (selectedItem.type === 'project') {
          dispatch({ type: 'SET_ACTIVE_PROJECT', payload: selectedItem.id });
          addToRecentSearches(selectedItem.name);
          addToRecentProjects(selectedItem);
          addToRecentlyViewed(selectedItem, 'project');
        } else if (selectedItem.type === 'label') {
          dispatch({ type: 'SET_ACTIVE_LABEL', payload: selectedItem.id });
          addToRecentSearches(selectedItem.name);
          addToRecentLabels(selectedItem);
          addToRecentlyViewed(selectedItem, 'label');
        } else if (selectedItem.type === 'command') {
          selectedItem.action();
          addToRecentSearches(selectedItem.title);
        }
        onClose();
      }
    } else {
      const selectedCommand = commands[selectedIndex];
      if (selectedCommand) {
        selectedCommand.action();
      }
    }
  };

  const addToRecentActions = (actionName, actionId) => {
    const newAction = {
      id: actionId,
      name: actionName,
      timestamp: Date.now(),
      icon: searchCommands.find(cmd => cmd.id === actionId)?.icon || '⚡'
    };
    
    const newRecentActions = [newAction, ...recentActions.filter(a => a.id !== actionId)].slice(0, 10);
    setRecentActions(newRecentActions);
    localStorage.setItem('tasklio_recent_actions', JSON.stringify(newRecentActions));
  };

  const addToRecentTasks = (task) => {
    const taskItem = {
      id: task.id,
      title: task.title,
      completed: task.completed,
      priority: task.priority,
      project: task.project,
      timestamp: Date.now()
    };
    
    const newRecentTasks = [taskItem, ...recentTasks.filter(t => t.id !== task.id)].slice(0, 8);
    setRecentTasks(newRecentTasks);
    localStorage.setItem('tasklio_recent_tasks', JSON.stringify(newRecentTasks));
  };

  const addToRecentProjects = (project) => {
    const projectItem = {
      id: project.id,
      name: project.name,
      color: project.color,
      taskCount: tasks.filter(t => t.project === project.name).length,
      timestamp: Date.now()
    };
    
    const newRecentProjects = [projectItem, ...recentProjects.filter(p => p.id !== project.id)].slice(0, 5);
    setRecentProjects(newRecentProjects);
    localStorage.setItem('tasklio_recent_projects', JSON.stringify(newRecentProjects));
  };

  const addToRecentSearches = (searchTerm) => {
    const newRecent = [searchTerm, ...recentSearches.filter(r => r !== searchTerm)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('tasklio_recent_searches', JSON.stringify(newRecent));
  };

  const addToRecentlyViewed = (item, type) => {
    const viewedItem = {
      id: item.id,
      title: item.title || item.name,
      type: type,
      icon: type === 'task' ? (item.completed ? '✅' : '📝') : 
            type === 'project' ? '📁' : 
            type === 'label' ? '🏷️' : '📄',
      timestamp: Date.now(),
      metadata: {
        completed: item.completed,
        priority: item.priority,
        color: item.color,
        project: item.project
      }
    };
    
    const newRecentlyViewed = [viewedItem, ...recentlyViewed.filter(v => !(v.id === item.id && v.type === type))].slice(0, 10);
    setRecentlyViewed(newRecentlyViewed);
    localStorage.setItem('tasklio_recently_viewed', JSON.stringify(newRecentlyViewed));
  };

  const addToRecentLabels = (label) => {
    const labelItem = {
      id: label.id,
      name: label.name,
      color: label.color,
      taskCount: tasks.filter(t => t.labels && t.labels.includes(label.id)).length,
      timestamp: Date.now()
    };
    
    const newRecentLabels = [labelItem, ...recentLabels.filter(l => l.id !== label.id)].slice(0, 5);
    setRecentLabels(newRecentLabels);
    localStorage.setItem('tasklio_recent_labels', JSON.stringify(newRecentLabels));
  };

  const addToRecentViews = (viewName, viewId) => {
    const viewItem = {
      id: viewId,
      name: viewName,
      icon: getViewIcon(viewId),
      timestamp: Date.now()
    };
    
    const newRecentViews = [viewItem, ...recentViews.filter(v => v.id !== viewId)].slice(0, 5);
    setRecentViews(newRecentViews);
    localStorage.setItem('tasklio_recent_views', JSON.stringify(newRecentViews));
  };

  const getViewIcon = (viewId) => {
    const iconMap = {
      dashboard: '📊',
      list: '📋',
      calendar: '📅',
      kanban: '📌',
      inbox: '📥',
      today: '📅',
      upcoming: '🗓️',
      completed: '✅',
      projects: '📂',
      labels: '🏷️'
    };
    return iconMap[viewId] || '📄';
  };

  const getFilteredResults = () => {
    if (!query.trim()) return [];
    
    switch (activeTab) {
      case 'tasks':
        return results.filter(r => r.type === 'task');
      case 'projects':
        return results.filter(r => r.type === 'project');
      case 'commands':
        return results.filter(r => r.type === 'command');
      default:
        return results;
    }
  };

  const getSmartQuickActions = () => {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();
    const actions = [];

    // Morning suggestions
    if (hour >= 6 && hour < 12) {
      actions.push({
        id: 'plan-day',
        title: 'Plan your day',
        description: 'Review and organize today\'s tasks',
        icon: '🌅',
        category: 'morning'
      });
    }

    // Afternoon suggestions
    if (hour >= 12 && hour < 17) {
      actions.push({
        id: 'check-progress',
        title: 'Check progress',
        description: 'Review completed tasks',
        icon: '📊',
        category: 'afternoon'
      });
    }

    // Evening suggestions
    if (hour >= 17 || hour < 6) {
      actions.push({
        id: 'plan-tomorrow',
        title: 'Plan tomorrow',
        description: 'Set up tasks for tomorrow',
        icon: '🌙',
        category: 'evening'
      });
    }

    // Monday suggestions
    if (dayOfWeek === 1) {
      actions.push({
        id: 'weekly-review',
        title: 'Weekly review',
        description: 'Plan your week ahead',
        icon: '📋',
        category: 'weekly'
      });
    }

    // Friday suggestions
    if (dayOfWeek === 5) {
      actions.push({
        id: 'weekly-cleanup',
        title: 'Weekly cleanup',
        description: 'Archive completed tasks',
        icon: '🧹',
        category: 'weekly'
      });
    }

    return actions.slice(0, 3); // Return top 3 contextual actions
  };

  const filteredResults = getFilteredResults();
  const displayItems = query.trim() ? filteredResults : commands;

  if (!isOpen) return null;

  // Enhanced keyboard shortcuts configuration
  const keyboardShortcuts = {
    // Navigation shortcuts
    navigation: {
      'g i': { action: () => navigateToView('inbox'), description: 'Go to Inbox' },
      'g t': { action: () => navigateToView('today'), description: 'Go to Today' },
      'g u': { action: () => navigateToView('upcoming'), description: 'Go to Upcoming' },
      'g c': { action: () => navigateToView('completed'), description: 'Go to Completed' },
      'g p': { action: () => navigateToView('projects'), description: 'Browse Projects' },
      'g l': { action: () => navigateToView('labels'), description: 'Browse Labels' },
    },
    // Quick actions
    actions: {
      'n': { action: () => executeCommand('add-task'), description: 'New task' },
      'shift+n': { action: () => executeCommand('add-project'), description: 'New project' },
      'ctrl+n': { action: () => executeCommand('quick-capture'), description: 'Quick capture' },
      'ctrl+shift+n': { action: () => executeCommand('add-label'), description: 'New label' },
    },
    // View modes
    views: {
      '1': { action: () => setViewMode('list'), description: 'List view' },
      '2': { action: () => setViewMode('dashboard'), description: 'Dashboard view' },
      '3': { action: () => setViewMode('calendar'), description: 'Calendar view' },
      '4': { action: () => setViewMode('kanban'), description: 'Kanban view' },
    },
    // Filters
    filters: {
      'f p h': { action: () => setQuickFilter('priority', 'high'), description: 'Filter: High priority' },
      'f p m': { action: () => setQuickFilter('priority', 'medium'), description: 'Filter: Medium priority' },
      'f p l': { action: () => setQuickFilter('priority', 'low'), description: 'Filter: Low priority' },
      'f t': { action: () => setQuickFilter('dateRange', 'today'), description: 'Filter: Due today' },
      'f w': { action: () => setQuickFilter('dateRange', 'this-week'), description: 'Filter: This week' },
      'f o': { action: () => setQuickFilter('dateRange', 'overdue'), description: 'Filter: Overdue' },
      'f a': { action: () => setQuickFilter('completed', false), description: 'Filter: Active tasks' },
      'f c': { action: () => setQuickFilter('completed', true), description: 'Filter: Completed tasks' },
      'ctrl+shift+f': { action: () => setShowAdvancedFilters(true), description: 'Advanced filters' },
      'ctrl+shift+c': { action: () => clearAllFilters(), description: 'Clear all filters' },
    },
    // Search and tools
    tools: {
      'ctrl+f': { action: () => focusSearch(), description: 'Focus search' },
      'ctrl+shift+e': { action: () => executeCommand('export-data'), description: 'Export data' },
      'ctrl+shift+i': { action: () => executeCommand('import-data'), description: 'Import data' },
      'ctrl+shift+b': { action: () => executeCommand('bulk-edit'), description: 'Bulk edit' },
      'ctrl+shift+l': { action: () => executeCommand('switch-theme'), description: 'Toggle theme' },
      'ctrl+,': { action: () => executeCommand('settings'), description: 'Open settings' },
      'ctrl+/': { action: () => setShowKeyboardShortcuts(true), description: 'Show shortcuts' },
    },
    // Search navigation
    search: {
      'tab': { action: () => cycleTabs(), description: 'Cycle tabs' },
      'ctrl+1': { action: () => setActiveTab('all'), description: 'All results' },
      'ctrl+2': { action: () => setActiveTab('tasks'), description: 'Tasks only' },
      'ctrl+3': { action: () => setActiveTab('projects'), description: 'Projects only' },
      'ctrl+4': { action: () => setActiveTab('commands'), description: 'Commands only' },
    }
  };

  // Utility functions for keyboard handling
  const navigateToView = (view) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    addToRecentViews(view.charAt(0).toUpperCase() + view.slice(1), view);
    addToRecentActions(`Navigate ${view}`, `nav-${view}`);
    onClose();
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
    addToRecentViews(`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`, mode);
    addToRecentActions(`View ${mode}`, `view-${mode}`);
    onClose();
  };

  const setQuickFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
    addToRecentActions(`Filter ${key}: ${value}`, `filter-${key}-${value}`);
    onClose();
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
    addToRecentActions('Clear Filters', 'clear-filters');
    onClose();
  };

  const executeCommand = (commandId) => {
    const command = searchCommands.find(cmd => cmd.id === commandId);
    if (command) {
      command.action();
      addToRecentActions(command.title, commandId);
    }
  };

  const focusSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  const cycleTabs = () => {
    const tabs = ['all', 'tasks', 'projects', 'commands'];
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  // Keyboard shortcuts display component
  const KeyboardShortcutsModal = () => {
    if (!showKeyboardShortcuts) return null;

    return (
      <div className="keyboard-shortcuts-overlay" onClick={() => setShowKeyboardShortcuts(false)}>
        <div className="keyboard-shortcuts-modal" onClick={e => e.stopPropagation()}>
          <div className="shortcuts-header">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <button className="close-btn" onClick={() => setShowKeyboardShortcuts(false)}>×</button>
          </div>

          <div className="shortcuts-content">
            <div className="shortcuts-section">
              <h4>🧭 Navigation</h4>
              <div className="shortcuts-list">
                {Object.entries(keyboardShortcuts.navigation).map(([key, { description }]) => (
                  <div key={key} className="shortcut-item">
                    <div className="shortcut-keys">
                      {key.split(' ').map((k, i) => (
                        <kbd key={i}>{k.toUpperCase()}</kbd>
                      ))}
                    </div>
                    <span className="shortcut-description">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shortcuts-section">
              <h4>⚡ Quick Actions</h4>
              <div className="shortcuts-list">
                {Object.entries(keyboardShortcuts.actions).map(([key, { description }]) => (
                  <div key={key} className="shortcut-item">
                    <div className="shortcut-keys">
                      {key.includes('+') ? 
                        key.split('+').map((k, i) => <kbd key={i}>{k.charAt(0).toUpperCase() + k.slice(1)}</kbd>) :
                        <kbd>{key.toUpperCase()}</kbd>
                      }
                    </div>
                    <span className="shortcut-description">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shortcuts-section">
              <h4>👁️ View Modes</h4>
              <div className="shortcuts-list">
                {Object.entries(keyboardShortcuts.views).map(([key, { description }]) => (
                  <div key={key} className="shortcut-item">
                    <div className="shortcut-keys">
                      <kbd>{key}</kbd>
                    </div>
                    <span className="shortcut-description">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shortcuts-section">
              <h4>🔍 Filters & Search</h4>
              <div className="shortcuts-list">
                {Object.entries(keyboardShortcuts.filters).slice(0, 8).map(([key, { description }]) => (
                  <div key={key} className="shortcut-item">
                    <div className="shortcut-keys">
                      {key.includes('+') ? 
                        key.split('+').map((k, i) => <kbd key={i}>{k.charAt(0).toUpperCase() + k.slice(1)}</kbd>) :
                        key.split(' ').map((k, i) => <kbd key={i}>{k.toUpperCase()}</kbd>)
                      }
                    </div>
                    <span className="shortcut-description">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shortcuts-section">
              <h4>🛠️ Tools & Settings</h4>
              <div className="shortcuts-list">
                {Object.entries(keyboardShortcuts.tools).map(([key, { description }]) => (
                  <div key={key} className="shortcut-item">
                    <div className="shortcut-keys">
                      {key.split('+').map((k, i) => (
                        <kbd key={i}>{k.charAt(0).toUpperCase() + k.slice(1)}</kbd>
                      ))}
                    </div>
                    <span className="shortcut-description">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shortcuts-section">
              <h4>📋 Search Navigation</h4>
              <div className="shortcuts-list">
                <div className="shortcut-item">
                  <div className="shortcut-keys"><kbd>↑</kbd><kbd>↓</kbd></div>
                  <span className="shortcut-description">Navigate results</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys"><kbd>Enter</kbd></div>
                  <span className="shortcut-description">Select item</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys"><kbd>Tab</kbd></div>
                  <span className="shortcut-description">Switch tabs</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys"><kbd>Esc</kbd></div>
                  <span className="shortcut-description">Close search</span>
                </div>
              </div>
            </div>
          </div>

          <div className="shortcuts-footer">
            <div className="shortcuts-tips">
              <div className="tip-item">
                <span className="tip-icon">💡</span>
                <span>Sequence shortcuts like <kbd>G</kbd> then <kbd>I</kbd> work within 1 second</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">⚡</span>
                <span>Use <kbd>Ctrl</kbd>+<kbd>/</kbd> anytime to see this help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="search-popup-overlay" onClick={onClose}>
      <div className="search-popup" onClick={e => e.stopPropagation()}>
        <div className="search-popup-header">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search tasks, projects, or commands..."
              className="search-popup-input"
            />
            {query && (
              <button 
                className="search-clear-input" 
                onClick={() => setQuery('')}
                title="Clear search (Ctrl+L)"
              >
                ⊗
              </button>
            )}
            
            {/* Keyboard sequence indicator */}
            {keyboardSequence.length > 0 && (
              <div className="keyboard-sequence-indicator">
                {keyboardSequence.map((key, i) => (
                  <kbd key={i}>{key.toUpperCase()}</kbd>
                ))}
                <span className="sequence-timer"></span>
              </div>
            )}
            
            <button className="search-close" onClick={onClose} title="Close (Esc)">
              ×
            </button>
          </div>
          
          {/* Search Tabs */}
          {query.trim() && (
            <div className="search-tabs">
              <button 
                className={`search-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({results.length})
              </button>
              <button 
                className={`search-tab ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks ({results.filter(r => r.type === 'task').length})
              </button>
              <button 
                className={`search-tab ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects ({results.filter(r => r.type === 'project').length})
              </button>
              <button 
                className={`search-tab ${activeTab === 'commands' ? 'active' : ''}`}
                onClick={() => setActiveTab('commands')}
              >
                Commands ({results.filter(r => r.type === 'command').length})
              </button>
            </div>
          )}
        </div>

        <div className="search-popup-content">
          {!query.trim() ? (
            <div className="search-empty-state">
              {/* Enhanced Quick Actions with all missing buttons */}
              <div className="quick-actions-enhanced">
                <h3>⚡ Quick Actions</h3>
                <div className="quick-actions-grid">
                  <button 
                    className="quick-action-card"
                    onClick={() => setShowQuickAdd(true)}
                  >
                    <span className="action-icon">➕</span>
                    <div className="action-content">
                      <div className="action-title">Add Task</div>
                      <div className="action-shortcut"><kbd>Ctrl</kbd>+<kbd>N</kbd></div>
                    </div>
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => setShowSettings(true)}
                  >
                    <span className="action-icon">⚙️</span>
                    <div className="action-content">
                      <div className="action-title">Settings</div>
                      <div className="action-shortcut"><kbd>Ctrl</kbd>+<kbd>,</kbd></div>
                    </div>
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => setShowKeyboardShortcuts(true)}
                  >
                    <span className="action-icon">⌨️</span>
                    <div className="action-content">
                      <div className="action-title">Shortcuts</div>
                      <div className="action-shortcut"><kbd>Ctrl</kbd>+<kbd>/</kbd></div>
                    </div>
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => searchCommands.find(cmd => cmd.id === 'import-data').action()}
                  >
                    <span className="action-icon">📥</span>
                    <div className="action-content">
                      <div className="action-title">Import</div>
                      <div className="action-description">Import tasks</div>
                    </div>
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => searchCommands.find(cmd => cmd.id === 'export-json').action()}
                  >
                    <span className="action-icon">📤</span>
                    <div className="action-content">
                      <div className="action-title">Export</div>
                      <div className="action-description">Export tasks</div>
                    </div>
                  </button>

                  <button 
                    className="quick-action-card"
                    onClick={() => searchCommands.find(cmd => cmd.id === 'print-tasks').action()}
                  >
                    <span className="action-icon">🖨️</span>
                    <div className="action-content">
                      <div className="action-title">Print</div>
                      <div className="action-description">Print tasks</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* View Mode Toggles */}
              <div className="view-mode-toggles">
                <h3>👁️ View Modes</h3>
                <div className="view-modes-grid">
                  {[
                    { id: 'list', icon: '📋', title: 'List View', shortcut: 'Ctrl+1' },
                    { id: 'dashboard', icon: '📊', title: 'Dashboard', shortcut: 'Ctrl+2' },
                    { id: 'calendar', icon: '📅', title: 'Calendar', shortcut: 'Ctrl+3' },
                    { id: 'kanban', icon: '📌', title: 'Kanban', shortcut: 'Ctrl+4' }
                  ].map(view => (
                    <button 
                      key={view.id}
                      className={`view-mode-card ${viewMode === view.id ? 'active' : ''}`}
                      onClick={() => {
                        dispatch({ type: 'SET_VIEW_MODE', payload: view.id });
                        addToRecentActions(`View ${view.title}`, `view-${view.id}`);
                        addToRecentViews(view.title, view.id);
                        onClose();
                      }}
                    >
                      <span className="view-icon">{view.icon}</span>
                      <div className="view-content">
                        <div className="view-title">{view.title}</div>
                        <div className="view-shortcut">{view.shortcut}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters with Calendar/List specific filters */}
              <div className="quick-filters-enhanced">
                <h3>🔍 Quick Filters</h3>
                <div className="filters-grid">
                  <button 
                    className="filter-card"
                    onClick={() => setShowAdvancedFilters(true)}
                  >
                    <span className="filter-icon">🎯</span>
                    <div className="filter-content">
                      <div className="filter-title">Advanced Filters</div>
                      <div className="filter-description">All filter options</div>
                    </div>
                  </button>

                  {[
                    { key: 'priority', value: 'high', icon: '🔴', title: 'High Priority', description: 'Urgent tasks' },
                    { key: 'dateRange', value: 'today', icon: '📅', title: 'Due Today', description: 'Today\'s tasks' },
                    { key: 'dateRange', value: 'overdue', icon: '⚠️', title: 'Overdue', description: 'Past due tasks' },
                    { key: 'completed', value: false, icon: '📝', title: 'Active', description: 'Incomplete tasks' },
                    { key: 'dateRange', value: 'this-week', icon: '🗓️', title: 'This Week', description: 'Week view' },
                    { key: 'dateRange', value: 'this-month', icon: '📆', title: 'This Month', description: 'Month view' }
                  ].map((filter, index) => (
                    <button 
                      key={index}
                      className="filter-card"
                      onClick={() => {
                        dispatch({ type: 'SET_FILTER', payload: { key: filter.key, value: filter.value } });
                        addToRecentActions(`Filter ${filter.title}`, `filter-${filter.key}-${filter.value}`);
                        onClose();
                      }}
                    >
                      <span className="filter-icon">{filter.icon}</span>
                      <div className="filter-content">
                        <div className="filter-title">{filter.title}</div>
                        <div className="filter-description">{filter.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ...existing code for recent items... */}
            </div>
          ) : displayItems.length === 0 ? (
            <div className="search-no-results">
              <div className="search-empty-icon">📭</div>
              <p>No results found for "{query}"</p>
              <div className="search-suggestions">
                <p>Try:</p>
                <ul>
                  <li>Different keywords</li>
                  <li>Checking for typos</li>
                  <li>Using broader terms</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="search-results">
              <div className="search-results-header">
                Found {displayItems.length} result{displayItems.length !== 1 ? 's' : ''} 
                {activeTab !== 'all' && ` in ${activeTab}`}
              </div>
              <div className="search-results-list">
                {displayItems.map((item, index) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className={`search-result-item ${item.type} ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={handleSelection}
                  >
                    <div className="result-icon">
                      {item.type === 'task' ? (item.completed ? '✅' : '⏳') :
                       item.type === 'project' ? '📁' :
                       item.icon}
                    </div>
                    <div className="search-result-content">
                      <h3 className="search-result-title">
                        {item.title || item.name}
                      </h3>
                      {item.description && (
                        <p className="search-result-description">{item.description}</p>
                      )}
                      <div className="search-result-meta">
                        <span className={`result-type ${item.type}`}>
                          {item.type}
                        </span>
                        {item.project && item.type === 'task' && (
                          <span className="search-result-project">{item.project}</span>
                        )}
                        {item.priority && (
                          <span className={`search-result-priority ${item.priority}`}>
                            {item.priority}
                          </span>
                        )}
                        {item.dueDate && (
                          <span className="search-result-due">
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="result-action">
                      <kbd>Enter</kbd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with shortcuts */}
        <div className="search-popup-footer">
          <div className="search-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>Tab</kbd> Switch tabs</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>Ctrl</kbd><kbd>/</kbd> Shortcuts</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>

      {/* All Modal Components */}
      <KeyboardShortcutsModal />
      
      <FilterPanel 
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
      />

      {showQuickAdd && (
        <QuickAdd onClose={() => setShowQuickAdd(false)} />
      )}

      {showSettings && (
        <Settings 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default SearchPopup;
