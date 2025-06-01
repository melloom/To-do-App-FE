import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar/Sidebar';
import TaskList from './components/TaskList/TaskList';
import SearchPopup from './components/Search/SearchPopup';
import ProfileModal from './Profile/ProfileModal';
import InboxSection from './Inbox/InboxSection';
import TodaySection from './Today/TodaySection';
import UpcomingSection from './Upcoming/UpcomingSection';
import OverdueSection from './Overdue/OverdueSection';
import CompletedSection from './CompletedSection/CompletedSection';
import ProjectsSection from './Projects/ProjectsSection';
import ProjectTasksSection from './Projects/ProjectTasksSection';
import './styles/Dashboard.css';
import './styles/ThemeExtensions.css';

const DashboardContent = () => {
  const { user, logout } = useUser();
  const { state, dispatch } = useDashboard();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inbox');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isThemeUpdating, setIsThemeUpdating] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleSectionChange = (section) => {
    console.log('Changing section to:', section); // Debug log
    setActiveSection(section);
    dispatch({ type: 'SET_VIEW_FILTER', payload: section });
  };

  // Theme change listener for immediate updates
  useEffect(() => {
    const handleThemeChange = (event) => {
      const { theme } = event.detail;
      setCurrentTheme(theme);
      setIsThemeUpdating(true);
      
      // Remove updating class after animation
      setTimeout(() => {
        setIsThemeUpdating(false);
      }, 500);
      
      // Force re-render of all child components
      dispatch({ type: 'FORCE_UPDATE', payload: Date.now() });
    };

    window.addEventListener('themeChanged', handleThemeChange);
    
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('premiumTheme') || localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, [dispatch]);

  // Add keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Add keyboard shortcut for profile (Cmd+P or Ctrl+P)
      if ((e.metaKey || e.ctrlKey) && e.key === 'p' && !e.shiftKey) {
        e.preventDefault();
        setIsProfileModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveSection = () => {
    // Handle project-specific views
    if (activeSection.startsWith('project:')) {
      const projectName = activeSection.substring(8); // Remove 'project:' prefix
      return <ProjectTasksSection projectId={projectName} />;
    }
    
    switch (activeSection) {
      case 'inbox':
        return <InboxSection />;
      case 'today':
        return <TodaySection />;
      case 'upcoming':
        return <UpcomingSection />;
      case 'overdue':
        return <OverdueSection />;
      case 'completed':
        return <CompletedSection />;
      case 'projects':
        return <ProjectsSection onViewTasks={handleViewProjectTasks} />;
      default:
        return <InboxSection />;
    }
  };

  const handleViewProjectTasks = (project) => {
    const projectView = `project:${project.name}`;
    console.log('Viewing tasks for project:', project.name);
    setActiveSection(projectView);
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: projectView });
  };

  return (
    <div 
      className={`dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${isThemeUpdating ? 'theme-updating' : ''}`}
      data-theme-component="dashboard"
      data-current-theme={currentTheme}
    >
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        user={user}
        isGuestMode={!user}
        onSearchClick={handleOpenSearch}
        onProfileClick={handleOpenProfileModal}
        activeView={activeSection}
        onViewChange={handleSectionChange}
      />
      
      <div 
        className="dashboard-main"
        data-theme-component="dashboard-main"
      >
        <div 
          className="dashboard-content"
          data-theme-component="dashboard-content"
        >
          {renderActiveSection()}
        </div>
      </div>

      {/* Search Popup */}
      <SearchPopup 
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        user={user}
      />
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;
