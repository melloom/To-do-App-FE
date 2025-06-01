import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useUser } from '../../../../contexts/UserContext';
import ProjectsList from './ProjectsList';
import QuickAdd from '../QuickAdd/QuickAdd';
import Settings from '../Settings/Settings';
import './Sidebar.css';
import './PremiumThemes.css';

const Sidebar = ({ collapsed, onToggle, onSearchClick, onProfileClick, activeView, onViewChange }) => {
  const { state, dispatch } = useDashboard();
  const { user } = useUser();
  const { tasks = [], notifications = [] } = state || {};
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileSettingsModal, setShowProfileSettingsModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [accentColor, setAccentColor] = useState('#007bff');
  const [activeThemeTab, setActiveThemeTab] = useState('themes');
  const [animationSpeed, setAnimationSpeed] = useState('normal');
  const [borderRadius, setBorderRadius] = useState('medium');
  const [shadowIntensity, setShadowIntensity] = useState(50);
  const [contrast, setContrast] = useState(100);
  const [blurEffects, setBlurEffects] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showThemePreview, setShowThemePreview] = useState(false);
  const [previewTheme, setPreviewTheme] = useState(null);
  const [isThemeLoading, setIsThemeLoading] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [showThemeTransition, setShowThemeTransition] = useState(false);

  // Theme-specific icons
  const getThemeIcons = (theme) => {
    const themeIcons = {
      spiderman: {
        inbox: '🕷️',
        today: '🕸️',
        upcoming: '🦸',
        overdue: '⚡',
        completed: '✨',
        projects: '🏙️',
        add: '🕷️',
        notification: '🚨',
        search: '🔍',
        profile: '🎭',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Spider-Man'
      },
      hulk: {
        inbox: '💚',
        today: '💪',
        upcoming: '🦸',
        overdue: '😤',
        completed: '✅',
        projects: '🏗️',
        add: '💥',
        notification: '📢',
        search: '🔍',
        profile: '👤',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Hulk'
      },
      ironman: {
        inbox: '⚡',
        today: '🔧',
        upcoming: '🚀',
        overdue: '⚠️',
        completed: '✨',
        projects: '🏢',
        add: '⚡',
        notification: '🔔',
        search: '🔍',
        profile: '🤖',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Iron Man'
      },
      thor: {
        inbox: '⚡',
        today: '🔨',
        upcoming: '⛈️',
        overdue: '⚠️',
        completed: '✨',
        projects: '🏛️',
        add: '⚡',
        notification: '📯',
        search: '🔍',
        profile: '⚔️',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Thor'
      },
      captain: {
        inbox: '🛡️',
        today: '⭐',
        upcoming: '🦅',
        overdue: '⚠️',
        completed: '✅',
        projects: '🏛️',
        add: '🛡️',
        notification: '📢',
        search: '🔍',
        profile: '🎖️',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Captain America'
      },
      panther: {
        inbox: '🐾',
        today: '⚫',
        upcoming: '🌙',
        overdue: '⚠️',
        completed: '✨',
        projects: '🏰',
        add: '🐾',
        notification: '🔔',
        search: '🔍',
        profile: '👑',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Black Panther'
      },
      spongebob: {
        inbox: '🍍',
        today: '🧽',
        upcoming: '🌊',
        overdue: '😱',
        completed: '🎉',
        projects: '🏝️',
        add: '➕',
        notification: '📢',
        search: '🔍',
        profile: '😊',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'SpongeBob'
      },
      mickey: {
        inbox: '🍒',
        today: '🏰',
        upcoming: '✨',
        overdue: '⚠️',
        completed: '🎉',
        projects: '🎢',
        add: '✨',
        notification: '🔔',
        search: '🔍',
        profile: '🐭',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Mickey Mouse'
      },
      pikachu: {
        inbox: '⚡',
        today: '🌟',
        upcoming: '🌈',
        overdue: '⚠️',
        completed: '🎊',
        projects: '🏔️',
        add: '⚡',
        notification: '📢',
        search: '🔍',
        profile: '⚡',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Pikachu'
      },
      turtles: {
        inbox: '🍕',
        today: '🐢',
        upcoming: '🥷',
        overdue: '⚠️',
        completed: '🎯',
        projects: '🏢',
        add: '🍕',
        notification: '📢',
        search: '🔍',
        profile: '🐢',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Ninja Turtles'
      },
      default: {
        inbox: '📥',
        today: '📅',
        upcoming: '🗓️',
        overdue: '⚠️',
        completed: '✅',
        projects: '📁',
        add: '+',
        notification: '🔔',
        search: '🔍',
        profile: '👤',
        settings: '⚙️',
        theme: '🎨',
        signout: '🚪',
        name: 'Default'
      }
    };
    
    return themeIcons[theme] || themeIcons.default;
  };

  const currentIcons = getThemeIcons(selectedTheme);

  const predefinedColors = [
    { name: 'Vibrant Blue', value: '#3B82F6' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Royal Purple', value: '#8B5CF6' },
    { name: 'Coral', value: '#F97316' },
    { name: 'Rose', value: '#EC4899' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Pink', value: '#DB2777' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Lime', value: '#84CC16' },
    { name: 'Violet', value: '#7C3AED' }
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️', preview: { bg: '#ffffff', text: '#1f2937', accent: '#6366f1' } },
    { id: 'dark', name: 'Dark', icon: '🌙', preview: { bg: '#1f2937', text: '#f3f4f6', accent: '#818cf8' } },
    { id: 'ocean', name: 'Ocean', icon: '🌊', preview: { bg: '#0f172a', text: '#e2e8f0', accent: '#38bdf8' } },
    { id: 'forest', name: 'Forest', icon: '🌲', preview: { bg: '#064e3b', text: '#d1fae5', accent: '#34d399' } },
    { id: 'sunset', name: 'Sunset', icon: '🌅', preview: { bg: '#1e1b4b', text: '#e0e7ff', accent: '#f472b6' } },
    { id: 'midnight', name: 'Midnight', icon: '🌃', preview: { bg: '#0f172a', text: '#e2e8f0', accent: '#8b5cf6' } },
    { id: 'autumn', name: 'Autumn', icon: '🍂', preview: { bg: '#431407', text: '#fef3c7', accent: '#f97316' } },
    { id: 'spring', name: 'Spring', icon: '🌸', preview: { bg: '#fdf2f8', text: '#831843', accent: '#ec4899' } },
    { id: 'winter', name: 'Winter', icon: '❄️', preview: { bg: '#f8fafc', text: '#0f172a', accent: '#94a3b8' } },
    { id: 'summer', name: 'Summer', icon: '☀️', preview: { bg: '#fefce8', text: '#422006', accent: '#eab308' } },
    { id: 'lavender', name: 'Lavender', icon: '💜', preview: { bg: '#f5f3ff', text: '#4c1d95', accent: '#a855f7' } },
    { id: 'mint', name: 'Mint', icon: '🌿', preview: { bg: '#ecfdf5', text: '#064e3b', accent: '#10b981' } },
    { id: 'cherry', name: 'Cherry', icon: '🍒', preview: { bg: '#fdf2f8', text: '#831843', accent: '#db2777' } },
    { id: 'coffee', name: 'Coffee', icon: '☕', preview: { bg: '#292524', text: '#f5f5f4', accent: '#a16207' } },
    { id: 'nordic', name: 'Nordic', icon: '❄️', preview: { bg: '#2e3440', text: '#eceff4', accent: '#88c0d0' } },
    { id: 'dracula', name: 'Dracula', icon: '🧛', preview: { bg: '#282a36', text: '#f8f8f2', accent: '#bd93f9' } },
    { id: 'monokai', name: 'Monokai', icon: '🎨', preview: { bg: '#272822', text: '#f8f8f2', accent: '#a6e22e' } },
    { id: 'github', name: 'GitHub', icon: '💻', preview: { bg: '#ffffff', text: '#24292e', accent: '#0366d6' } },
    { id: 'twitter', name: 'Twitter', icon: '🐦', preview: { bg: '#ffffff', text: '#14171a', accent: '#1da1f2' } },
    { id: 'system', name: 'System', icon: '💻', preview: { bg: 'linear-gradient(90deg, #ffffff 50%, #1f2937 50%)', text: 'linear-gradient(90deg, #1f2937 50%, #f3f4f6 50%)', accent: '#6366f1' } }
  ];

  // Calculate task counts for navigation
  const inboxCount = tasks.filter(task => !task.completed && !task.project).length;
  const todayCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date().toDateString();
    return task.dueDate && new Date(task.dueDate).toDateString() === today;
  }).length;
  const upcomingCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    return dueDate && dueDate > today;
  }).length;
  const overdueCount = tasks.filter(task => {
    if (task.completed) return false;
    const today = new Date();
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    return dueDate && dueDate < today;
  }).length;
  const completedCount = tasks.filter(task => task.completed).length;

  const handleViewClick = (view) => {
    if (onViewChange) {
      onViewChange(view);
    } else {
      dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    }
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleNotificationClick = () => {
    console.log('Show notifications');
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleProfileSettings = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      setShowProfileModal(true);
    }
    setShowUserMenu(false);
  };

  const handlePreferences = () => {
    setShowSettings(true);
    setShowUserMenu(false);
  };

  const handleThemeChange = (theme) => {
    // Close theme modal immediately
    setShowThemeModal(false);
    
    // Regular themes apply immediately without animation
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply theme-specific styles
    const root = document.documentElement;
    const themeData = themes.find(t => t.id === theme);
    
    if (themeData) {
      // Set theme colors
      root.style.setProperty('--bg-primary', themeData.preview.bg);
      root.style.setProperty('--text-primary', themeData.preview.text);
      root.style.setProperty('--accent-color', themeData.preview.accent);
      
      // Set additional theme variables
      if (theme === 'dark') {
        root.style.setProperty('--bg-secondary', '#2d3748');
        root.style.setProperty('--text-secondary', '#9ca3af');
        root.style.setProperty('--border-color', '#4a5568');
        root.style.setProperty('--hover-bg', '#2d3748');
      } else if (theme === 'light') {
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--hover-bg', '#f9fafb');
      } else {
        // For custom themes, use the preview colors
        root.style.setProperty('--bg-secondary', themeData.preview.bg);
        root.style.setProperty('--text-secondary', themeData.preview.text);
        root.style.setProperty('--border-color', themeData.preview.accent);
        root.style.setProperty('--hover-bg', themeData.preview.bg);
      }
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Force immediate re-render of all components
    forceComponentUpdate();
  };

  const handleTextSettingsChange = (setting, value) => {
    const root = document.documentElement;
    
    switch (setting) {
      case 'fontSize':
        root.style.setProperty('--font-size-base', value);
        localStorage.setItem('fontSize', value);
        break;
      case 'fontFamily':
        root.style.setProperty('--font-family', value);
        localStorage.setItem('fontFamily', value);
        break;
      case 'lineHeight':
        root.style.setProperty('--line-height', value);
        localStorage.setItem('lineHeight', value);
        break;
      case 'letterSpacing':
        root.style.setProperty('--letter-spacing', value);
        localStorage.setItem('letterSpacing', value);
        break;
      case 'textTransform':
        root.style.setProperty('--text-transform', value);
        localStorage.setItem('textTransform', value);
        break;
      case 'textAlign':
        root.style.setProperty('--text-align', value);
        localStorage.setItem('textAlign', value);
        break;
      case 'fontWeight':
        root.style.setProperty('--font-weight', value);
        localStorage.setItem('fontWeight', value);
        break;
      case 'fontStyle':
        root.style.setProperty('--font-style', value);
        localStorage.setItem('fontStyle', value);
        break;
      case 'textDecoration':
        root.style.setProperty('--text-decoration', value);
        localStorage.setItem('textDecoration', value);
        break;
    }
  };

  const handleThemeClick = () => {
    setShowThemeModal(true);
    setShowUserMenu(false);
  };

  const handleSignOut = async () => {
    try {
      const { logoutUser } = useUser();
      await logoutUser();
      // Redirect to login page
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
    setShowUserMenu(false);
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--accent-color', color);
  };

  const handleAdvancedSettingChange = (setting, value) => {
    const root = document.documentElement;
    
    switch (setting) {
      case 'animationSpeed':
        setAnimationSpeed(value);
        root.style.setProperty('--animation-speed', value === 'fast' ? '0.2s' : value === 'slow' ? '0.5s' : '0.3s');
        localStorage.setItem('animationSpeed', value);
        break;
      case 'borderRadius':
        setBorderRadius(value);
        root.style.setProperty('--border-radius', value === 'small' ? '4px' : value === 'large' ? '12px' : '8px');
        localStorage.setItem('borderRadius', value);
        break;
      case 'shadowIntensity':
        setShadowIntensity(value);
        const intensity = value / 100;
        root.style.setProperty('--shadow-intensity', intensity);
        localStorage.setItem('shadowIntensity', value);
        break;
      case 'contrast':
        setContrast(value);
        root.style.setProperty('--contrast', `${value}%`);
        localStorage.setItem('contrast', value);
        break;
      case 'blurEffects':
        setBlurEffects(value);
        root.style.setProperty('--blur-effects', value ? 'blur(10px)' : 'none');
        localStorage.setItem('blurEffects', value);
        break;
      case 'reducedMotion':
        setReducedMotion(value);
        if (value) {
          root.style.setProperty('--animation-speed', '0s');
          root.style.setProperty('--transition-speed', '0s');
        } else {
          root.style.setProperty('--animation-speed', '0.3s');
          root.style.setProperty('--transition-speed', '0.3s');
        }
        localStorage.setItem('reducedMotion', value);
        break;
      case 'compactMode':
        setCompactMode(value);
        root.style.setProperty('--compact-mode', value ? '0.9' : '1');
        localStorage.setItem('compactMode', value);
        break;
    }
  };

  const renderUserAvatar = () => {
    if (!user) {
      return <div className="user-avatar-guest">👤</div>;
    }

    if (user.profilePicture?.customImage) {
      return (
        <img 
          src={user.profilePicture.customImage} 
          alt={user.name}
          className="user-avatar-img"
        />
      );
    }

    if (user.profilePicture?.type === 'icon') {
      return (
        <div 
          className="user-avatar-custom"
          style={{ 
            backgroundColor: user.profilePicture.color,
            color: user.profilePicture.textColor || 'white'
          }}
        >
          {user.profilePicture.icon}
        </div>
      );
    }

    // Default to initials
    return (
      <div 
        className="user-avatar-initials"
        style={{ 
          backgroundColor: user.profilePicture?.color || '#6366f1',
          color: user.profilePicture?.textColor || 'white'
        }}
      >
        {user.profilePicture?.initial || user.name?.charAt(0)?.toUpperCase() || 'U'}
      </div>
    );
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.header-profile')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  // Load saved theme and settings on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedFontFamily = localStorage.getItem('fontFamily') || 'System Default';
    const savedLineHeight = localStorage.getItem('lineHeight') || 'normal';
    const savedLetterSpacing = localStorage.getItem('letterSpacing') || 'normal';
    const savedTextTransform = localStorage.getItem('textTransform') || 'none';
    const savedTextAlign = localStorage.getItem('textAlign') || 'left';
    const savedFontWeight = localStorage.getItem('fontWeight') || 'normal';
    const savedFontStyle = localStorage.getItem('fontStyle') || 'normal';
    const savedTextDecoration = localStorage.getItem('textDecoration') || 'none';

    handleThemeChange(savedTheme);
    handleTextSettingsChange('fontSize', savedFontSize);
    handleTextSettingsChange('fontFamily', savedFontFamily);
    handleTextSettingsChange('lineHeight', savedLineHeight);
    handleTextSettingsChange('letterSpacing', savedLetterSpacing);
    handleTextSettingsChange('textTransform', savedTextTransform);
    handleTextSettingsChange('textAlign', savedTextAlign);
    handleTextSettingsChange('fontWeight', savedFontWeight);
    handleTextSettingsChange('fontStyle', savedFontStyle);
    handleTextSettingsChange('textDecoration', savedTextDecoration);
  }, []);

  // Load saved advanced settings on component mount
  React.useEffect(() => {
    const savedAnimationSpeed = localStorage.getItem('animationSpeed') || 'normal';
    const savedBorderRadius = localStorage.getItem('borderRadius') || 'medium';
    const savedShadowIntensity = localStorage.getItem('shadowIntensity') || '50';
    const savedContrast = localStorage.getItem('contrast') || '100';
    const savedBlurEffects = localStorage.getItem('blurEffects') !== 'false';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const savedCompactMode = localStorage.getItem('compactMode') === 'true';

    handleAdvancedSettingChange('animationSpeed', savedAnimationSpeed);
    handleAdvancedSettingChange('borderRadius', savedBorderRadius);
    handleAdvancedSettingChange('shadowIntensity', parseInt(savedShadowIntensity));
    handleAdvancedSettingChange('contrast', parseInt(savedContrast));
    handleAdvancedSettingChange('blurEffects', savedBlurEffects);
    handleAdvancedSettingChange('reducedMotion', savedReducedMotion);
    handleAdvancedSettingChange('compactMode', savedCompactMode);
  }, []);

  // Load saved premium theme on component mount
  React.useEffect(() => {
    const savedPremiumTheme = localStorage.getItem('premiumTheme');
    if (savedPremiumTheme) {
      handleThemeSelect(savedPremiumTheme);
    }
  }, []);

  const getThemeHeaderDecoration = () => {
    // If a premium theme is selected, show its decoration
    if (selectedTheme && selectedTheme !== 'default') {
      const themeData = getThemeIcons(selectedTheme);
      return { 
        emoji: currentIcons.theme, 
        pattern: `linear-gradient(45deg, var(--bg-primary) 25%, var(--bg-secondary) 25%, var(--bg-secondary) 50%, var(--bg-primary) 50%, var(--bg-primary) 75%, var(--bg-secondary) 75%, var(--bg-secondary) 100%)`,
        name: themeData.name
      };
    }
    
    // Default theme decorations
    switch (currentTheme) {
      case 'dark':
        return { emoji: '🌙', pattern: 'linear-gradient(45deg, #1a202c 25%, #2d3748 25%, #2d3748 50%, #1a202c 50%, #1a202c 75%, #2d3748 75%, #2d3748 100%)' };
      case 'ocean':
        return { emoji: '🌊', pattern: 'linear-gradient(45deg, #0f172a 25%, #1e293b 25%, #1e293b 50%, #0f172a 50%, #0f172a 75%, #1e293b 75%, #1e293b 100%)' };
      case 'forest':
        return { emoji: '🌲', pattern: 'linear-gradient(45deg, #064e3b 25%, #065f46 25%, #065f46 50%, #064e3b 50%, #064e3b 75%, #065f46 75%, #065f46 100%)' };
      case 'sunset':
        return { emoji: '🌅', pattern: 'linear-gradient(45deg, #1e1b4b 25%, #312e81 25%, #312e81 50%, #1e1b4b 50%, #1e1b4b 75%, #312e81 75%, #312e81 100%)' };
      case 'autumn':
        return { emoji: '🍂', pattern: 'linear-gradient(45deg, #431407 25%, #7c2d12 25%, #7c2d12 50%, #431407 50%, #431407 75%, #7c2d12 75%, #7c2d12 100%)' };
      case 'spring':
        return { emoji: '🌸', pattern: 'linear-gradient(45deg, #fdf2f8 25%, #fbcfe8 25%, #fbcfe8 50%, #fdf2f8 50%, #fdf2f8 75%, #fbcfe8 75%, #fbcfe8 100%)' };
      case 'winter':
        return { emoji: '❄️', pattern: 'linear-gradient(45deg, #f8fafc 25%, #e2e8f0 25%, #e2e8f0 50%, #f8fafc 50%, #f8fafc 75%, #e2e8f0 75%, #e2e8f0 100%)' };
      case 'summer':
        return { emoji: '☀️', pattern: 'linear-gradient(45deg, #fefce8 25%, #fef9c3 25%, #fef9c3 50%, #fefce8 50%, #fefce8 75%, #fef9c3 75%, #fef9c3 100%)' };
      case 'lavender':
        return { emoji: '💜', pattern: 'linear-gradient(45deg, #f5f3ff 25%, #ede9fe 25%, #ede9fe 50%, #f5f3ff 50%, #f5f3ff 75%, #ede9fe 75%, #ede9fe 100%)' };
      case 'mint':
        return { emoji: '🌿', pattern: 'linear-gradient(45deg, #ecfdf5 25%, #d1fae5 25%, #d1fae5 50%, #ecfdf5 50%, #ecfdf5 75%, #d1fae5 75%, #d1fae5 100%)' };
      case 'cherry':
        return { emoji: '🍒', pattern: 'linear-gradient(45deg, #fdf2f8 25%, #fce7f3 25%, #fce7f3 50%, #fdf2f8 50%, #fdf2f8 75%, #fce7f3 75%, #fce7f3 100%)' };
      case 'coffee':
        return { emoji: '☕', pattern: 'linear-gradient(45deg, #292524 25%, #44403c 25%, #44403c 50%, #292524 50%, #292524 75%, #44403c 75%, #44403c 100%)' };
      case 'nordic':
        return { emoji: '❄️', pattern: 'linear-gradient(45deg, #2e3440 25%, #3b4252 25%, #3b4252 50%, #2e3440 50%, #2e3440 75%, #3b4252 75%, #3b4252 100%)' };
      case 'dracula':
        return { emoji: '🧛', pattern: 'linear-gradient(45deg, #282a36 25%, #44475a 25%, #44475a 50%, #282a36 50%, #282a36 75%, #44475a 75%, #44475a 100%)' };
      case 'monokai':
        return { emoji: '🎨', pattern: 'linear-gradient(45deg, #272822 25%, #3e3d32 25%, #3e3d32 50%, #272822 50%, #272822 75%, #3e3d32 75%, #3e3d32 100%)' };
      case 'github':
        return { emoji: '💻', pattern: 'linear-gradient(45deg, #ffffff 25%, #f6f8fa 25%, #f6f8fa 50%, #ffffff 50%, #ffffff 75%, #f6f8fa 75%, #f6f8fa 100%)' };
      case 'twitter':
        return { emoji: '🐦', pattern: 'linear-gradient(45deg, #ffffff 25%, #f5f8fa 25%, #f5f8fa 50%, #ffffff 50%, #ffffff 75%, #f5f8fa 75%, #f5f8fa 100%)' };
      default:
        return { emoji: '☀️', pattern: 'linear-gradient(45deg, #ffffff 25%, #f9fafb 25%, #f9fafb 50%, #ffffff 50%, #ffffff 75%, #f9fafb 75%, #f9fafb 100%)' };
    }
  };

  const themeDecoration = getThemeHeaderDecoration();

  const handleThemeSelect = async (theme) => {
    // Check if it's a premium theme
    const premiumThemes = ['spiderman', 'hulk', 'ironman', 'thor', 'captain', 'panther', 'spongebob', 'mickey', 'pikachu', 'turtles'];
    const isPremiumTheme = premiumThemes.includes(theme);
    
    // Close theme modal immediately
    setShowThemeModal(false);
    
    // Set the selected theme
    setSelectedTheme(theme);
    
    if (!isPremiumTheme) {
      // For regular themes, apply immediately
      handleThemeChange(theme);
      return;
    }
    
    // For premium themes, apply immediately too - NO ANIMATION
    await applyPremiumTheme(theme);
    
    // Show simple success notification
    const themeData = getEnhancedThemeData(theme);
    const randomQuote = themeData.quotes[Math.floor(Math.random() * themeData.quotes.length)];
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        type: 'success',
        title: `${themeData.name} Theme Activated!`,
        message: randomQuote,
        icon: getThemeIcons(theme).theme,
        duration: 3000
      }
    });
    
    // Force immediate re-render
    forceComponentUpdate();
  };

  const applyPremiumTheme = async (theme) => {
    const root = document.documentElement;
    
    // Remove any existing theme classes
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    
    // Add the new theme class
    document.body.classList.add(`theme-${theme}`);
    
    switch (theme) {
      case 'spiderman':
        root.style.setProperty('--bg-primary', '#1a1a2e');
        root.style.setProperty('--bg-secondary', '#16213e');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#f1faee');
        root.style.setProperty('--accent-color', '#e63946');
        root.style.setProperty('--accent-hover', '#d62828');
        root.style.setProperty('--border-color', 'rgba(230, 57, 70, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(230, 57, 70, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(26, 33, 62, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(230, 57, 70, 0.2)');
        break;
      case 'hulk':
        root.style.setProperty('--bg-primary', '#0d2818');
        root.style.setProperty('--bg-secondary', '#1a472a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#d1fae5');
        root.style.setProperty('--accent-color', '#2ecc71');
        root.style.setProperty('--accent-hover', '#27ae60');
        root.style.setProperty('--border-color', 'rgba(46, 204, 113, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(46, 204, 113, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(26, 71, 42, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(46, 204, 113, 0.2)');
        break;
      case 'ironman':
        root.style.setProperty('--bg-primary', '#2c0e0e');
        root.style.setProperty('--bg-secondary', '#5c1616');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#fadbd8');
        root.style.setProperty('--accent-color', '#e74c3c');
        root.style.setProperty('--accent-hover', '#c0392b');
        root.style.setProperty('--border-color', 'rgba(231, 76, 60, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(231, 76, 60, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(92, 22, 22, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(231, 76, 60, 0.2)');
        break;
      case 'thor':
        root.style.setProperty('--bg-primary', '#0c2461');
        root.style.setProperty('--bg-secondary', '#1e3799');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#d6eaf8');
        root.style.setProperty('--accent-color', '#3498db');
        root.style.setProperty('--accent-hover', '#2980b9');
        root.style.setProperty('--border-color', 'rgba(52, 152, 219, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(52, 152, 219, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(30, 55, 153, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(52, 152, 219, 0.2)');
        break;
      case 'captain':
        root.style.setProperty('--bg-primary', '#0e1e3d');
        root.style.setProperty('--bg-secondary', '#1e3a8a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#dbeafe');
        root.style.setProperty('--accent-color', '#ef4444');
        root.style.setProperty('--accent-hover', '#dc2626');
        root.style.setProperty('--border-color', 'rgba(59, 130, 246, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(239, 68, 68, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(30, 58, 138, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(239, 68, 68, 0.2)');
        break;
      case 'panther':
        root.style.setProperty('--bg-primary', '#0a0a0a');
        root.style.setProperty('--bg-secondary', '#1a1a1a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e2e8f0');
        root.style.setProperty('--accent-color', '#8b5cf6');
        root.style.setProperty('--accent-hover', '#7c3aed');
        root.style.setProperty('--border-color', 'rgba(139, 92, 246, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(139, 92, 246, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(26, 26, 26, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(139, 92, 246, 0.2)');
        break;
      case 'spongebob':
        root.style.setProperty('--bg-primary', '#fff9e6');
        root.style.setProperty('--bg-secondary', '#fff3cd');
        root.style.setProperty('--text-primary', '#2c3e50');
        root.style.setProperty('--text-secondary', '#34495e');
        root.style.setProperty('--accent-color', '#f1c40f');
        root.style.setProperty('--accent-hover', '#f39c12');
        root.style.setProperty('--border-color', 'rgba(241, 196, 15, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(241, 196, 15, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(255, 243, 205, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(241, 196, 15, 0.2)');
        break;
      case 'mickey':
        root.style.setProperty('--bg-primary', '#1a1a1a');
        root.style.setProperty('--bg-secondary', '#2d2d2d');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e2e8f0');
        root.style.setProperty('--accent-color', '#ef4444');
        root.style.setProperty('--accent-hover', '#dc2626');
        root.style.setProperty('--border-color', 'rgba(239, 68, 68, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(239, 68, 68, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(45, 45, 45, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(239, 68, 68, 0.2)');
        break;
      case 'pikachu':
        root.style.setProperty('--bg-primary', '#fffbeb');
        root.style.setProperty('--bg-secondary', '#fef3c7');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#374151');
        root.style.setProperty('--accent-color', '#fbbf24');
        root.style.setProperty('--accent-hover', '#f59e0b');
        root.style.setProperty('--border-color', 'rgba(251, 191, 36, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(251, 191, 36, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(254, 243, 199, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(251, 191, 36, 0.2)');
        break;
      case 'turtles':
        root.style.setProperty('--bg-primary', '#042f2e');
        root.style.setProperty('--bg-secondary', '#064e3b');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#d1fae5');
        root.style.setProperty('--accent-color', '#10b981');
        root.style.setProperty('--accent-hover', '#059669');
        root.style.setProperty('--border-color', 'rgba(16, 185, 129, 0.3)');
        root.style.setProperty('--hover-bg', 'rgba(16, 185, 129, 0.1)');
        root.style.setProperty('--task-bg', 'rgba(6, 78, 59, 0.8)');
        root.style.setProperty('--shadow-color', 'rgba(16, 185, 129, 0.2)');
        break;
      default:
        // Reset to default theme
        document.body.classList.remove(`theme-${theme}`);
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f3f4f6');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--accent-color', '#6366f1');
        root.style.setProperty('--accent-hover', '#4f46e5');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--hover-bg', '#f9fafb');
        root.style.setProperty('--task-bg', '#ffffff');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
    }
    
    // Apply theme-specific effects
    root.style.setProperty('--theme-transition', 'all 0.3s ease');
    
    // Save theme preference
    localStorage.setItem('premiumTheme', theme);
    
    // Update document theme attribute
    document.documentElement.setAttribute('data-theme', theme);
  };

  // Force update all components
  const forceComponentUpdate = () => {
    // Dispatch theme change event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { 
        theme: selectedTheme || currentTheme,
        timestamp: Date.now()
      } 
    }));
    
    // Force re-render by updating a state that triggers re-renders
    setSelectedTheme(prev => prev);
    
    // Update all components with theme-aware data attributes
    setTimeout(() => {
      const components = document.querySelectorAll('[data-theme-component]');
      components.forEach(component => {
        component.classList.add('theme-updated');
        setTimeout(() => component.classList.remove('theme-updated'), 500);
      });
    }, 100);
  };

  const handleThemePreview = (theme) => {
    setPreviewTheme(theme);
    setShowThemePreview(true);
    
    const root = document.documentElement;
    const originalTheme = selectedTheme;
    
    const originalStyles = {
      bgPrimary: root.style.getPropertyValue('--bg-primary'),
      bgSecondary: root.style.getPropertyValue('--bg-secondary'),
      textPrimary: root.style.getPropertyValue('--text-primary'),
      textSecondary: root.style.getPropertyValue('--text-secondary'),
      accentColor: root.style.getPropertyValue('--accent-color')
    };
    
    handleThemeSelect(theme);
    
    return () => {
      root.style.setProperty('--bg-primary', originalStyles.bgPrimary);
      root.style.setProperty('--bg-secondary', originalStyles.bgSecondary);
      root.style.setProperty('--text-primary', originalStyles.textPrimary);
      root.style.setProperty('--text-secondary', originalStyles.textSecondary);
      root.style.setProperty('--accent-color', originalStyles.accentColor);
      setSelectedTheme(originalTheme);
      setShowThemePreview(false);
      setPreviewTheme(null);
    };
  };

  const handlePreviewClose = () => {
    setShowThemePreview(false);
    setPreviewTheme(null);
    // Restore original theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    handleThemeChange(savedTheme);
  };

  const handlePreviewApply = () => {
    if (previewTheme) {
      handleThemeSelect(previewTheme);
    }
    handlePreviewClose();
  };

  // Custom SVG logos for each theme
  const getThemeLogo = (theme) => {
    const logos = {
      spiderman: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#e63946" stroke="#ffffff" stroke-width="2"/>
          <path d="M16 20 Q24 12 32 20 Q28 24 24 26 Q20 24 16 20" fill="#ffffff"/>
          <path d="M18 30 Q24 35 30 30" stroke="#ffffff" stroke-width="2" fill="none"/>
          <circle cx="20" cy="22" r="3" fill="#ffffff"/>
          <circle cx="28" cy="22" r="3" fill="#ffffff"/>
          <path d="M10 10 L38 38 M10 38 L38 10 M24 6 L24 42 M6 24 L42 24" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
        </svg>
      `,
      hulk: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#2ecc71" stroke="#ffffff" stroke-width="2"/>
          <path d="M15 18 Q24 8 33 18 L30 25 Q24 30 18 25 Z" fill="#ffffff"/>
          <path d="M12 32 Q24 38 36 32" stroke="#ffffff" stroke-width="3" fill="none"/>
          <rect x="19" y="19" width="4" height="6" fill="#2ecc71"/>
          <rect x="25" y="19" width="4" height="6" fill="#2ecc71"/>
          <path d="M20 35 Q24 40 28 35" stroke="#ffffff" stroke-width="2" fill="none"/>
        </svg>
      `,
      ironman: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#e74c3c" stroke="#ffd700" stroke-width="2"/>
          <path d="M18 16 Q24 10 30 16 L28 22 Q24 26 20 22 Z" fill="#ffd700"/>
          <circle cx="21" cy="20" r="2" fill="#ffffff"/>
          <circle cx="27" cy="20" r="2" fill="#ffffff"/>
          <rect x="22" y="25" width="4" height="8" rx="2" fill="#ffd700"/>
          <path d="M16 30 Q24 35 32 30" stroke="#ffd700" stroke-width="2" fill="none"/>
          <circle cx="24" cy="18" r="1" fill="#ffffff"/>
        </svg>
      `,
      thor: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#3498db" stroke="#ffffff" stroke-width="2"/>
          <path d="M18 12 L30 12 L28 20 L26 28 L22 28 L20 20 Z" fill="#ffffff"/>
          <rect x="20" y="28" width="8" height="12" rx="2" fill="#8b4513"/>
          <path d="M12 8 Q24 2 36 8" stroke="#ffd700" stroke-width="3" fill="none"/>
          <path d="M8 24 Q24 18 40 24" stroke="#ffd700" stroke-width="2" fill="none"/>
          <circle cx="24" cy="16" r="2" fill="#ffd700"/>
        </svg>
      `,
      captain: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#3498db" stroke="#ffffff" stroke-width="2"/>
          <circle cx="24" cy="24" r="16" fill="#ef4444"/>
          <circle cx="24" cy="24" r="10" fill="#ffffff"/>
          <circle cx="24" cy="24" r="6" fill="#ef4444"/>
          <path d="M24 18 L26 20 L24 22 L22 20 Z" fill="#3498db"/>
          <path d="M18 24 L20 26 L22 24 L20 22 Z" fill="#3498db"/>
          <path d="M26 24 L28 26 L30 24 L28 22 Z" fill="#3498db"/>
          <path d="M24 26 L26 28 L24 30 L22 28 Z" fill="#3498db"/>
        </svg>
      `,
      panther: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#2c3e50" stroke="#8b5cf6" stroke-width="2"/>
          <path d="M16 18 Q24 12 32 18 Q30 24 24 26 Q18 24 16 18" fill="#8b5cf6"/>
          <circle cx="20" cy="20" r="2" fill="#ffd700"/>
          <circle cx="28" cy="20" r="2" fill="#ffd700"/>
          <path d="M20 26 Q24 30 28 26" stroke="#8b5cf6" stroke-width="2" fill="none"/>
          <path d="M18 32 L24 34 L30 32" stroke="#8b5cf6" stroke-width="2" fill="none"/>
          <circle cx="24" cy="22" r="1" fill="#ffd700"/>
        </svg>
      `,
      spongebob: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="36" height="24" rx="4" fill="#f1c40f" stroke="#e67e22" stroke-width="2"/>
          <circle cx="18" cy="20" r="4" fill="#ffffff"/>
          <circle cx="30" cy="20" r="4" fill="#ffffff"/>
          <circle cx="18" cy="20" r="2" fill="#3498db"/>
          <circle cx="30" cy="20" r="2" fill="#3498db"/>
          <path d="M16 28 Q24 34 32 28" stroke="#e67e22" stroke-width="3" fill="none"/>
          <rect x="2" y="16" width="4" height="8" fill="#f1c40f"/>
          <rect x="42" y="16" width="4" height="8" fill="#f1c40f"/>
          <circle cx="12" cy="8" r="2" fill="#3498db" opacity="0.7"/>
          <circle cx="36" cy="8" r="2" fill="#3498db" opacity="0.7"/>
        </svg>
      `,
      mickey: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="12" fill="#000000"/>
          <circle cx="30" cy="18" r="12" fill="#000000"/>
          <circle cx="24" cy="24" r="16" fill="#000000"/>
          <circle cx="20" cy="22" r="2" fill="#ffffff"/>
          <circle cx="28" cy="22" r="2" fill="#ffffff"/>
          <path d="M20 28 Q24 32 28 28" stroke="#ffffff" stroke-width="2" fill="none"/>
          <circle cx="24" cy="26" r="1" fill="#ffffff"/>
          <path d="M24 8 L26 12 L24 14 L22 12 Z" fill="#ef4444"/>
        </svg>
      `,
      pikachu: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="26" r="18" fill="#f1c40f" stroke="#e67e22" stroke-width="2"/>
          <circle cx="19" cy="22" r="3" fill="#000000"/>
          <circle cx="29" cy="22" r="3" fill="#000000"/>
          <circle cx="17" cy="20" r="6" fill="#ef4444" opacity="0.7"/>
          <circle cx="31" cy="20" r="6" fill="#ef4444" opacity="0.7"/>
          <path d="M22 28 Q24 30 26 28" stroke="#000000" stroke-width="2" fill="none"/>
          <path d="M16 12 Q18 8 20 12" stroke="#f1c40f" stroke-width="4" fill="none"/>
          <path d="M28 12 Q30 8 32 12" stroke="#f1c40f" stroke-width="4" fill="none"/>
          <path d="M10 20 L16 18 M32 18 L38 20" stroke="#ffd700" stroke-width="3"/>
        </svg>
      `,
      turtles: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
          <circle cx="24" cy="24" r="14" fill="#8b4513"/>
          <path d="M16 20 Q24 14 32 20 Q30 26 24 28 Q18 26 16 20" fill="#2ecc71"/>
          <circle cx="20" cy="22" r="2" fill="#ffffff"/>
          <circle cx="28" cy="22" r="2" fill="#ffffff"/>
          <path d="M20 28 Q24 32 28 28" stroke="#ffffff" stroke-width="2" fill="none"/>
          <rect x="20" y="8" width="8" height="4" rx="2" fill="#ef4444"/>
          <circle cx="14" cy="14" r="2" fill="#2ecc71"/>
          <circle cx="34" cy="14" r="2" fill="#2ecc71"/>
        </svg>
      `,
      default: `
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#6366f1" stroke="#ffffff" stroke-width="2"/>
          <path d="M18 20 Q24 14 30 20 Q28 26 24 28 Q20 26 18 20" fill="#ffffff"/>
          <circle cx="21" cy="22" r="2" fill="#6366f1"/>
          <circle cx="27" cy="22" r="2" fill="#6366f1"/>
          <path d="M20 30 Q24 34 28 30" stroke="#ffffff" stroke-width="2" fill="none"/>
        </svg>
      `
    };

    return logos[theme] || logos.default;
  };

  // Enhanced theme data with more comic/movie references
  const getEnhancedThemeData = (theme) => {
    const themeData = {
      spiderman: {
        name: 'Spider-Man',
        description: 'With great power comes great responsibility! 🕷️',
        quotes: [
          '"Your friendly neighborhood task manager!"',
          '"Whatever life holds in store for me, I will never forget these words: With great power comes great responsibility."',
          '"Anyone can wear the mask. You could wear the mask!"'
        ],
        sounds: ['web-swing', 'thwip', 'spider-sense'],
        comicReferences: ['Amazing Spider-Man #15', 'Into the Spider-Verse', 'No Way Home'],
        powerLevel: '🕷️🕷️🕷️🕷️🕷️'
      },
      hulk: {
        name: 'Hulk',
        description: 'HULK SMASH PROCRASTINATION! 💪',
        quotes: [
          '"Hulk smash deadlines!"',
          '"That\'s my secret, Captain. I\'m always productive."',
          '"Puny tasks!"'
        ],
        sounds: ['smash', 'roar', 'gamma-blast'],
        comicReferences: ['Incredible Hulk #1', 'Planet Hulk', 'World War Hulk'],
        powerLevel: '💪💪💪💪💪'
      },
      ironman: {
        name: 'Iron Man',
        description: 'I am Iron Man. And I have a plan! ⚡',
        quotes: [
          '"Genius, billionaire, playboy, philanthropist... and task manager!"',
          '"Sometimes you gotta run before you can walk."',
          '"I love you 3000 tasks!"'
        ],
        sounds: ['repulsor', 'suit-up', 'jarvis'],
        comicReferences: ['Tales of Suspense #39', 'Iron Man (2008)', 'Endgame'],
        powerLevel: '⚡⚡⚡⚡⚡'
      },
      thor: {
        name: 'Thor',
        description: 'By the power of Asgard! ⚡',
        quotes: [
          '"I can do this all day... completing tasks!"',
          '"Bring me PRODUCTIVITY!"',
          '"Another! *smashes completed task*"'
        ],
        sounds: ['thunder', 'mjolnir', 'bifrost'],
        comicReferences: ['Journey into Mystery #83', 'Thor: Ragnarok', 'Love and Thunder'],
        powerLevel: '⚡⚡⚡⚡⚡'
      },
      captain: {
        name: 'Captain America',
        description: 'I can do this all day! 🛡️',
        quotes: [
          '"I can do this all day!"',
          '"Avengers... assemble your tasks!"',
          '"That shield doesn\'t belong to you. You don\'t deserve it!"'
        ],
        sounds: ['shield-throw', 'america', 'vibranium'],
        comicReferences: ['Captain America Comics #1', 'The First Avenger', 'Civil War'],
        powerLevel: '🛡️🛡️🛡️🛡️🛡️'
      },
      panther: {
        name: 'Black Panther',
        description: 'Wakanda Forever! 🐾',
        quotes: [
          '"In times of crisis, the wise build bridges while the foolish build barriers."',
          '"Wakanda will no longer watch from the shadows."',
          '"The Black Panther has been the protector of Wakanda for generations."'
        ],
        sounds: ['vibranium', 'panther-growl', 'kimoyo'],
        comicReferences: ['Fantastic Four #52', 'Black Panther (2018)', 'Wakanda Forever'],
        powerLevel: '🐾🐾🐾🐾🐾'
      },
      spongebob: {
        name: 'SpongeBob SquarePants',
        description: "I'm ready! I'm ready! 🧽",
        quotes: [
          '"I\'m ready to work!"',
          '"Is mayonnaise a productivity tool?"',
          '"The inner machinations of my mind are an enigma."'
        ],
        sounds: ['bubble-pop', 'clarinet', 'krusty-krab'],
        comicReferences: ['SpongeBob Comics', 'The SpongeBob Movie', 'Kamp Koral'],
        powerLevel: '🧽🧽🧽🧽🧽'
      },
      mickey: {
        name: 'Mickey Mouse',
        description: 'Ha-ha! Hot dog! 🐭',
        quotes: [
          '"Oh boy! Time to get organized!"',
          '"See ya real soon!"',
          '"Hot dog! That\'s a completed task!"'
        ],
        sounds: ['mickey-laugh', 'whistle', 'clubhouse'],
        comicReferences: ['Mickey Mouse Comics', 'Fantasia', 'Mickey Mouse Clubhouse'],
        powerLevel: '🐭🐭🐭🐭🐭'
      },
      pikachu: {
        name: 'Pikachu',
        description: 'Pika pika! ⚡',
        quotes: [
          '"Pika pika! (Task completed!)"',
          '"Pikachu! (Let\'s be productive!)"',
          '"Pika! (Thunderbolt productivity!)"'
        ],
        sounds: ['pika-pika', 'thunderbolt', 'pokeball'],
        comicReferences: ['Pokémon Adventures', 'Detective Pikachu', 'Pokémon: The Series'],
        powerLevel: '⚡⚡⚡⚡⚡'
      },
      turtles: {
        name: 'Teenage Mutant Ninja Turtles',
        description: 'Cowabunga, dude! 🐢',
        quotes: [
          '"Cowabunga! Task completed!"',
          '"Turtle Power!"',
          '"Heroes in a half shell - TURTLE POWER!"'
        ],
        sounds: ['cowabunga', 'pizza-time', 'turtle-power'],
        comicReferences: ['TMNT Comics', 'TMNT (1990)', 'Rise of the TMNT'],
        powerLevel: '🐢🐢🐢🐢🐢'
      }
    };

    return themeData[theme] || {
      name: 'Default',
      description: 'Clean and simple productivity',
      quotes: ['"Stay organized, stay productive!"'],
      sounds: ['click', 'notification'],
      comicReferences: ['Classic Comics'],
      powerLevel: '⭐⭐⭐⭐⭐'
    };
  };

  // Backend refresh function with loading animation
  const performThemeRefresh = async (theme) => {
    // Don't set loading states here since they're controlled by handleThemeSelect
    
    try {
      // Simulate backend API call (longer duration)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Refresh theme assets and configurations
      await loadThemeAssets(theme);
      
      // Update all components  
      await refreshComponentThemes(theme);
      
      // Clear caches
      localStorage.removeItem('themeCache');
      
      // Dispatch global theme update
      window.dispatchEvent(new CustomEvent('themeRefreshed', { 
        detail: { 
          theme, 
          timestamp: Date.now(),
          assets: await getThemeAssets(theme)
        } 
      }));

    } catch (error) {
      console.error('Theme refresh failed:', error);
      throw error; // Re-throw to be handled by handleThemeSelect
    }
    // Don't modify loading states here - let handleThemeSelect control them
  };

  // Load theme assets
  const loadThemeAssets = async (theme) => {
    const assets = {
      sounds: await loadThemeSounds(theme),
      animations: await loadThemeAnimations(theme),
      fonts: await loadThemeFonts(theme),
      icons: await loadThemeIcons(theme),
      textures: await loadThemeTextures(theme)
    };
    
    localStorage.setItem(`themeAssets_${theme}`, JSON.stringify(assets));
    return assets;
  };

  // Simulate loading theme sounds
  const loadThemeSounds = async (theme) => {
    const sounds = {
      spiderman: ['web-swing.mp3', 'thwip.mp3', 'spider-sense.mp3'],
      hulk: ['smash.mp3', 'roar.mp3', 'gamma-blast.mp3'],
      ironman: ['repulsor.mp3', 'suit-up.mp3', 'jarvis.mp3'],
      thor: ['thunder.mp3', 'mjolnir.mp3', 'bifrost.mp3'],
      captain: ['shield-throw.mp3', 'america.mp3', 'vibranium.mp3'],
      panther: ['vibranium.mp3', 'panther-growl.mp3', 'kimoyo.mp3'],
      spongebob: ['bubble-pop.mp3', 'clarinet.mp3', 'krusty-krab.mp3'],
      mickey: ['mickey-laugh.mp3', 'whistle.mp3', 'clubhouse.mp3'],
      pikachu: ['pika-pika.mp3', 'thunderbolt.mp3', 'pokeball.mp3'],
      turtles: ['cowabunga.mp3', 'pizza-time.mp3', 'turtle-power.mp3']
    };
    
    return sounds[theme] || ['click.mp3', 'notification.mp3'];
  };

  // Load theme animations
  const loadThemeAnimations = async (theme) => {
    return {
      entrance: `${theme}-entrance`,
      hover: `${theme}-hover`,
      complete: `${theme}-complete`,
      transition: `${theme}-transition`
    };
  };

  // Load theme fonts
  const loadThemeFonts = async (theme) => {
    const fonts = {
      spiderman: 'Comic Sans MS, cursive',
      hulk: 'Impact, Arial Black, sans-serif',
      ironman: 'Orbitron, monospace',
      thor: 'Cinzel, serif',
      captain: 'Oswald, sans-serif',
      panther: 'Futura, sans-serif',
      spongebob: 'Patrick Hand, cursive',
      mickey: 'Fredoka One, cursive',
      pikachu: 'Nunito, sans-serif',
      turtles: 'Creepster, cursive'
    };
    
    return fonts[theme] || 'Inter, sans-serif';
  };

  // Load theme icons
  const loadThemeIcons = async (theme) => {
    return getThemeIcons(theme);
  };

  // Load theme textures
  const loadThemeTextures = async (theme) => {
    const textures = {
      spiderman: 'web-pattern.svg',
      hulk: 'gamma-texture.svg',
      ironman: 'tech-pattern.svg',
      thor: 'asgard-runes.svg',
      captain: 'stars-stripes.svg',
      panther: 'wakanda-pattern.svg',
      spongebob: 'bubble-pattern.svg',
      mickey: 'polka-dots.svg',
      pikachu: 'lightning-pattern.svg',
      turtles: 'shell-pattern.svg'
    };
    
    return textures[theme] || 'default-pattern.svg';
  };

  // Refresh component themes
  const refreshComponentThemes = async (theme) => {
    // Update all dashboard components
    const components = document.querySelectorAll('[data-theme-component]');
    components.forEach(component => {
      component.classList.add('theme-refreshing');
      setTimeout(() => {
        component.classList.remove('theme-refreshing');
        component.classList.add('theme-refreshed');
        setTimeout(() => component.classList.remove('theme-refreshed'), 1000);
      }, 300);
    });
  };

  // Get theme assets
  const getThemeAssets = async (theme) => {
    const cached = localStorage.getItem(`themeAssets_${theme}`);
    if (cached) {
      return JSON.parse(cached);
    }
    return await loadThemeAssets(theme);
  };

  // Get hero display data for loading screen
  const getHeroDisplayData = (theme) => {
    const heroData = {
      spiderman: {
        name: 'Spider-Man',
        title: 'Your Friendly Neighborhood Task Manager!',
        heroAction: 'Web-slinging into action...',
        powerUp: 'Spider Powers Activating!',
        catchphrase: '"With great power comes great responsibility!"',
        backgroundPattern: 'web-pattern',
        heroColor: '#e63946',
        secondaryColor: '#1a1a2e'
      },
      hulk: {
        name: 'Hulk',
        title: 'HULK SMASH PROCRASTINATION!',
        heroAction: 'Hulking up for productivity...',
        powerUp: 'Gamma Powers Charging!',
        catchphrase: '"HULK IS THE STRONGEST TASK MANAGER!"',
        backgroundPattern: 'smash-pattern',
        heroColor: '#2ecc71',
        secondaryColor: '#0d2818'
      },
      ironman: {
        name: 'Iron Man',
        title: 'Genius, Billionaire, Task Manager!',
        heroAction: 'Suit systems online...',
        powerUp: 'Arc Reactor Charging!',
        catchphrase: '"I am Iron Man... and I have a plan!"',
        backgroundPattern: 'tech-pattern',
        heroColor: '#e74c3c',
        secondaryColor: '#2c0e0e'
      },
      thor: {
        name: 'Thor',
        title: 'God of Thunder & Productivity!',
        heroAction: 'Summoning lightning power...',
        powerUp: 'Mjolnir Power Rising!',
        catchphrase: '"By the power of Asgard!"',
        backgroundPattern: 'lightning-pattern',
        heroColor: '#3498db',
        secondaryColor: '#0c2461'
      },
      captain: {
        name: 'Captain America',
        title: 'First Avenger of Organization!',
        heroAction: 'Shield systems activated...',
        powerUp: 'Super Soldier Serum Active!',
        catchphrase: '"I can do this all day!"',
        backgroundPattern: 'shield-pattern',
        heroColor: '#ef4444',
        secondaryColor: '#0e1e3d'
      },
      panther: {
        name: 'Black Panther',
        title: 'King of Wakanda & Tasks!',
        heroAction: 'Vibranium tech initializing...',
        powerUp: 'Panther Powers Online!',
        catchphrase: '"Wakanda Forever!"',
        backgroundPattern: 'vibranium-pattern',
        heroColor: '#8b5cf6',
        secondaryColor: '#0a0a0a'
      },
      spongebob: {
        name: 'SpongeBob',
        title: "I'm Ready for Productivity!",
        heroAction: 'Jellyfishing for tasks...',
        powerUp: 'Krabby Patty Power!',
        catchphrase: '"I\'m ready! I\'m ready!"',
        backgroundPattern: 'bubble-pattern',
        heroColor: '#f1c40f',
        secondaryColor: '#fff9e6'
      },
      mickey: {
        name: 'Mickey Mouse',
        title: 'The Magic of Organization!',
        heroAction: 'Disney magic loading...',
        powerUp: 'Mouse Power Activated!',
        catchphrase: '"Ha-ha! Hot dog!"',
        backgroundPattern: 'magic-pattern',
        heroColor: '#ef4444',
        secondaryColor: '#1a1a1a'
      },
      pikachu: {
        name: 'Pikachu',
        title: 'Electric Task Trainer!',
        heroAction: 'Charging thunderbolt...',
        powerUp: 'Electric Powers Surging!',
        catchphrase: '"Pika Pika! ⚡"',
        backgroundPattern: 'electric-pattern',
        heroColor: '#fbbf24',
        secondaryColor: '#fffbeb'
      },
      turtles: {
        name: 'Ninja Turtles',
        title: 'Heroes in a Half Shell!',
        heroAction: 'Turtle power activating...',
        powerUp: 'Ninja Skills Online!',
        catchphrase: '"Cowabunga, dude!"',
        backgroundPattern: 'shell-pattern',
        heroColor: '#10b981',
        secondaryColor: '#042f2e'
      }
    };

    return heroData[theme] || {
      name: 'Hero',
      title: 'Powering Up!',
      heroAction: 'Loading...',
      powerUp: 'Systems Online!',
      catchphrase: '"Let\'s get organized!"',
      backgroundPattern: 'default-pattern',
      heroColor: '#6366f1',
      secondaryColor: '#ffffff'
    };
  };

  return (
    <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" style={{ backgroundImage: themeDecoration.pattern }}>
        <div className="header-actions">
          <div className="header-profile" onClick={handleUserMenuClick}>
            <div className="user-avatar-header">
              {renderUserAvatar()}
            </div>
            
            {!collapsed && showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <div className="user-menu-name">
                    {user?.name || 'Guest User'}
                  </div>
                  <div className="user-menu-email">
                    {user?.email || 'guest@tasklio.app'}
                  </div>
                </div>
                <button className="user-menu-item" onClick={handleProfileSettings}>
                  <span className="user-menu-item-icon">{currentIcons.profile}</span>
                  Profile Settings
                </button>
                <button className="user-menu-item" onClick={handlePreferences}>
                  <span className="user-menu-item-icon">{currentIcons.settings}</span>
                  Preferences
                </button>
                <button className="user-menu-item" onClick={handleThemeClick}>
                  <span className="user-menu-item-icon">{currentIcons.theme}</span>
                  Theme Settings
                </button>
                <button className="user-menu-item" onClick={handleSignOut}>
                  <span className="user-menu-item-icon">{currentIcons.signout}</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <div className="header-notifications">
            <button className="notification-btn-header" onClick={handleNotificationClick}>
              <span className="notification-icon">{currentIcons.notification}</span>
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length > 99 ? '99+' : notifications.length}
                </span>
              )}
            </button>
          </div>

          <button 
            className="sidebar-toggle-btn"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="toggle-icon">‹</span>
          </button>
        </div>
        {!collapsed && (
          <div className="theme-indicator">
            <span className="theme-emoji">{themeDecoration.emoji}</span>
            <span className="theme-name">{themeDecoration.name || themes.find(t => t.id === currentTheme)?.name || 'Light'}</span>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-search">
          <div className="search-container">
            <div 
              className="search-input-wrapper"
              onClick={handleSearchClick}
            >
              <span className="search-icon">{currentIcons.search}</span>
              <div className="search-input-placeholder">
                Search tasks...
              </div>
              <div className="search-shortcut">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-content">
        <button 
          className="quick-add-btn quick-add-top"
          onClick={() => setShowQuickAdd(true)}
        >
          <span>{currentIcons.add}</span>
          {!collapsed && <span className="quick-add-text">Add Task</span>}
        </button>

        <nav className="navigation-menu">
          <div className="nav-section">
            <ul className="nav-list">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'inbox' ? 'active' : ''}`}
                  onClick={() => handleViewClick('inbox')}
                  title={collapsed ? `Inbox (${inboxCount} tasks)` : undefined}
                >
                  <span className="nav-icon">{currentIcons.inbox}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Inbox</span>
                      {inboxCount > 0 && <span className="nav-count">{inboxCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'today' ? 'active' : ''}`}
                  onClick={() => handleViewClick('today')}
                  title={collapsed ? `Today (${todayCount} tasks)` : undefined}
                >
                  <span className="nav-icon">{currentIcons.today}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Today</span>
                      {todayCount > 0 && <span className="nav-count">{todayCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'upcoming' ? 'active' : ''}`}
                  onClick={() => handleViewClick('upcoming')}
                  title={collapsed ? `Upcoming (${upcomingCount} tasks)` : undefined}
                >
                  <span className="nav-icon">{currentIcons.upcoming}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Upcoming</span>
                      {upcomingCount > 0 && <span className="nav-count">{upcomingCount}</span>}
                    </>
                  )}
                </button>
              </li>
              
              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'overdue' ? 'active' : ''}`}
                  onClick={() => handleViewClick('overdue')}
                  title={collapsed ? `Overdue (${overdueCount} tasks)` : undefined}
                >
                  <span className="nav-icon">{currentIcons.overdue}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Overdue</span>
                      {overdueCount > 0 && (
                        <span className="nav-count high-priority">{overdueCount}</span>
                      )}
                    </>
                  )}
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'completed' ? 'active' : ''}`}
                  onClick={() => handleViewClick('completed')}
                  title={collapsed ? `Completed (${completedCount} tasks)` : undefined}
                >
                  <span className="nav-icon">{currentIcons.completed}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Completed</span>
                      {completedCount > 0 && <span className="nav-count">{completedCount}</span>}
                    </>
                  )}
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${activeView === 'projects' ? 'active' : ''}`}
                  onClick={() => handleViewClick('projects')}
                  title={collapsed ? 'Projects Overview' : undefined}
                >
                  <span className="nav-icon">{currentIcons.projects}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-text">Projects</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <ProjectsList collapsed={collapsed} />
      </div>

      {showQuickAdd && (
        <QuickAdd onClose={() => setShowQuickAdd(false)} />
      )}

      {showThemeModal && (
        <div className="theme-modal-overlay" onClick={() => setShowThemeModal(false)}>
          <div className="theme-modal" onClick={e => e.stopPropagation()}>
            <div className="theme-modal-header">
              <h3>Theme Settings</h3>
              <button className="theme-modal-close" onClick={() => setShowThemeModal(false)}>×</button>
            </div>
            
            <div className="theme-tabs">
              <button 
                className={`theme-tab ${activeThemeTab === 'themes' ? 'active' : ''}`}
                onClick={() => setActiveThemeTab('themes')}
              >
                <span className="tab-icon">🎨</span>
                Themes
              </button>
              <button 
                className={`theme-tab ${activeThemeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveThemeTab('text')}
              >
                <span className="tab-icon">📝</span>
                Text
              </button>
              <button 
                className={`theme-tab ${activeThemeTab === 'advanced' ? 'active' : ''}`}
                onClick={() => setActiveThemeTab('advanced')}
              >
                <span className="tab-icon">⚙️</span>
                Advanced
              </button>
              <button 
                className={`theme-tab ${activeThemeTab === 'premium' ? 'active' : ''}`}
                onClick={() => setActiveThemeTab('premium')}
              >
                <span className="tab-icon">✨</span>
                Premium
              </button>
            </div>

            <div className="theme-modal-content">
              <div className="theme-settings-container">
                <div className="theme-settings-panel">
                  {activeThemeTab === 'themes' && (
                    <>
                      <div className="theme-section">
                        <h4>Theme Mode</h4>
                        <div className="theme-options-grid">
                          {themes.map((theme) => (
                            <div key={theme.id} className="theme-option">
                              <input
                                type="radio"
                                id={`theme-${theme.id}`}
                                name="theme"
                                value={theme.id}
                                checked={currentTheme === theme.id}
                                onChange={() => handleThemeChange(theme.id)}
                              />
                              <label htmlFor={`theme-${theme.id}`} className="theme-card">
                                <div className="theme-preview" style={{ 
                                  background: theme.preview.bg,
                                  color: theme.preview.text
                                }}>
                                  <div className="theme-header" style={{ background: theme.preview.accent }}></div>
                                  <div className="theme-content">
                                    <div className="theme-text" style={{ background: theme.preview.accent }}></div>
                                    <div className="theme-text" style={{ background: theme.preview.accent }}></div>
                                  </div>
                                </div>
                                <span className="theme-name">{theme.name}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="theme-section">
                        <h4>Accent Color</h4>
                        <div className="color-options">
                          {predefinedColors.map((color) => (
                            <button
                              key={color.value}
                              className={`color-option ${accentColor === color.value ? 'selected' : ''}`}
                              style={{ backgroundColor: color.value }}
                              onClick={() => handleAccentColorChange(color.value)}
                              title={color.name}
                            >
                              {accentColor === color.value && <span className="check-icon">✓</span>}
                            </button>
                          ))}
                        </div>
                        
                        <div className="custom-color">
                          <label htmlFor="custom-color-picker">Custom Color:</label>
                          <input
                            type="color"
                            id="custom-color-picker"
                            value={accentColor}
                            onChange={(e) => handleAccentColorChange(e.target.value)}
                            className="color-picker"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeThemeTab === 'premium' && (
                    <div className="theme-section">
                      <h4>Premium Themes</h4>
                      <div className="premium-themes-grid">
                        {[
                          { id: 'spiderman', name: 'Spider-Man', description: 'Web-slinging theme with dynamic animations' },
                          { id: 'hulk', name: 'Hulk', description: 'Smash your way through tasks with this powerful theme' },
                          { id: 'ironman', name: 'Iron Man', description: 'High-tech theme with repulsor effects' },
                          { id: 'thor', name: 'Thor', description: 'Thunderous theme with lightning animations' },
                          { id: 'captain', name: 'Captain America', description: 'Patriotic theme with shield animations' },
                          { id: 'panther', name: 'Black Panther', description: 'Stealthy theme with vibranium effects' },
                          { id: 'spongebob', name: 'SpongeBob', description: 'Bikini Bottom theme with bubble animations' },
                          { id: 'mickey', name: 'Mickey Mouse', description: 'Classic Disney theme with magical effects' },
                          { id: 'pikachu', name: 'Pikachu', description: 'Electric theme with thunderbolt effects' },
                          { id: 'turtles', name: 'Ninja Turtles', description: 'Radical theme with pizza power effects' }
                        ].map((theme) => {
                          const themeData = getEnhancedThemeData(theme.id);
                          return (
                            <div 
                              key={theme.id}
                              className={`premium-theme-card ${theme.id}-theme ${selectedTheme === theme.id ? 'selected' : ''}`}
                              onClick={() => handleThemeSelect(theme.id)}
                            >
                              <div className="theme-decoration"></div>
                              <div className="premium-badge">Premium</div>
                              
                              {/* Custom SVG Logo */}
                              <div className="theme-logo" dangerouslySetInnerHTML={{ __html: getThemeLogo(theme.id) }} />
                              
                              <div className="theme-preview">
                                <div className="theme-preview-content">
                                  <div className="theme-preview-header"></div>
                                  <div className="theme-preview-item"></div>
                                  <div className="theme-preview-item"></div>
                                  <div className="theme-preview-item"></div>
                                </div>
                              </div>
                              
                              <div className="premium-theme-info">
                                <h5>{themeData.name}</h5>
                                <p>{themeData.description}</p>
                                
                                {/* Power Level */}
                                <div className="theme-power-level">
                                  <span className="power-label">Power Level:</span>
                                  <span className="power-display">{themeData.powerLevel}</span>
                                </div>
                                
                                {/* Comic References */}
                                <div className="theme-references">
                                  <span className="references-label">References:</span>
                                  <div className="references-list">
                                    {themeData.comicReferences.map((ref, index) => (
                                      <span key={index} className="reference-item">{ref}</span>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Random Quote */}
                                <div className="theme-quote">
                                  <span className="quote-icon">💬</span>
                                  <span className="quote-text">
                                    {themeData.quotes[Math.floor(Math.random() * themeData.quotes.length)]}
                                  </span>
                                </div>
                                
                                <div className="theme-preview-controls">
                                  <button 
                                    className="preview-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleThemePreview(theme.id);
                                    }}
                                    disabled={isThemeLoading}
                                  >
                                    {isThemeLoading && selectedTheme === theme.id ? 'Loading...' : 'Preview'}
                                  </button>
                                  <button 
                                    className="upgrade-btn"
                                    disabled={isThemeLoading}
                                  >
                                    {selectedTheme === theme.id ? 'Active' : 'Select Theme'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="premium-features">
                        <h4>🚀 Premium Features Unleashed!</h4>
                        <div className="features-grid">
                          <div className="feature-category">
                            <h5>🎨 Visual Enhancements</h5>
                            <ul>
                              <li>✨ Custom SVG logos for each theme</li>
                              <li>🎨 Advanced color customization</li>
                              <li>🌙 Dynamic dark mode transitions</li>
                              <li>💫 Smooth micro-animations</li>
                              <li>🎯 Theme-specific UI decorations</li>
                              <li>🎪 Character-inspired layouts</li>
                            </ul>
                          </div>
                          
                          <div className="feature-category">
                            <h5>🎵 Audio & Effects</h5>
                            <ul>
                              <li>🎵 Theme-specific sound effects</li>
                              <li>🔊 Character voice notifications</li>
                              <li>🎶 Background ambient sounds</li>
                              <li>📯 Custom completion sounds</li>
                              <li>🔔 Theme-matched alert tones</li>
                              <li>🎤 Voice command integration</li>
                            </ul>
                          </div>
                          
                          <div className="feature-category">
                            <h5>🎮 Interactive Elements</h5>
                            <ul>
                              <li>🎮 Interactive hover effects</li>
                              <li>⚡ Power-up animations</li>
                              <li>🎯 Focus mode enhancements</li>
                              <li>🎭 Character-specific reactions</li>
                              <li>🏆 Achievement celebrations</li>
                              <li>🎪 Mini-games & easter eggs</li>
                            </ul>
                          </div>
                          
                          <div className="feature-category">
                            <h5>📱 Advanced Customization</h5>
                            <ul>
                              <li>🛠️ Custom theme creation</li>
                              <li>📊 Productivity analytics</li>
                              <li>🔄 Auto theme switching</li>
                              <li>📅 Time-based themes</li>
                              <li>🎨 Mood-based color schemes</li>
                              <li>⌨️ Keyboard shortcuts</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="premium-stats">
                          <div className="stat-item">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Premium Themes</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Sound Effects</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">100+</span>
                            <span className="stat-label">Animations</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Possibilities</span>
                          </div>
                        </div>
                        
                        <button className="premium-cta-btn">
                          🚀 Upgrade to Premium Now - $9.99/month
                        </button>
                        
                        <div className="premium-testimonials">
                          <h5>What our users say:</h5>
                          <div className="testimonial">
                            <span className="testimonial-text">"The Spider-Man theme makes me feel like a superhero while organizing my tasks!"</span>
                            <span className="testimonial-author">- Peter P., New York</span>
                          </div>
                          <div className="testimonial">
                            <span className="testimonial-text">"HULK SMASH... my productivity goals! 💪"</span>
                            <span className="testimonial-author">- Bruce B., Science Lab</span>
                          </div>
                          <div className="testimonial">
                            <span className="testimonial-text">"Cowabunga! This is the most radical task manager ever!"</span>
                            <span className="testimonial-author">- Michelangelo, Sewers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;