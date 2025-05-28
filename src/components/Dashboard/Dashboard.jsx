import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar/Sidebar';
import TaskList from './components/TaskList/TaskList';
import SearchPopup from './components/Search/SearchPopup';
import InboxSection from './Inbox/InboxSection';
import TodaySection from './Today/TodaySection';
import UpcomingSection from './Upcoming/UpcomingSection';
import OverdueSection from './Overdue/OverdueSection';
import './styles/Dashboard.css';

const DashboardContent = () => {
  const { user, logout } = useUser();
  const { state, dispatch } = useDashboard();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inbox');

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSectionChange = (section) => {
    console.log('Changing section to:', section); // Debug log
    setActiveSection(section);
    dispatch({ type: 'SET_VIEW_FILTER', payload: section });
  };

  // Add keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'inbox':
        return <InboxSection />;
      case 'today':
        return <TodaySection />;
      case 'upcoming':
        return <UpcomingSection />;
      case 'overdue':
        return <OverdueSection />;
      default:
        return <InboxSection />;
    }
  };

  return (
    <div className={`dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        user={user}
        isGuestMode={!user}
        onSearchClick={handleOpenSearch}
        activeView={activeSection}
        onViewChange={handleSectionChange}
      />
      
      <div className="dashboard-main">
        <div className="dashboard-content">
          {renderActiveSection()}
        </div>
      </div>

      {/* Search Popup */}
      <SearchPopup 
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
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
