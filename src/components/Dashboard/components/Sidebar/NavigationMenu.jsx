import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { FaInbox, FaCalendarDay, FaCalendarAlt, FaExclamationTriangle, FaCheck, FaFolder } from 'react-icons/fa';
import './NavigationMenu.css';

const NavigationMenu = ({ currentView, setCurrentView, collapsed }) => {
  const { state } = useDashboard();
  const { tasks } = state;

  // Calculate counts for each view
  const getCounts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      inbox: tasks.filter(t => !t.completed && !t.dueDate).length,
      today: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      }).length,
      upcoming: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate > today;
      }).length,
      overdue: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < today;
      }).length,
      completed: tasks.filter(t => t.completed).length
    };
  };

  const counts = getCounts();

  const menuItems = [
    { 
      id: 'inbox', 
      label: 'Inbox', 
      icon: <FaInbox />, 
      count: counts.inbox 
    },
    { 
      id: 'today', 
      label: 'Today', 
      icon: <FaCalendarDay />, 
      count: counts.today 
    },
    { 
      id: 'upcoming', 
      label: 'Upcoming', 
      icon: <FaCalendarAlt />, 
      count: counts.upcoming 
    },
    { 
      id: 'overdue', 
      label: 'Overdue', 
      icon: <FaExclamationTriangle />, 
      count: counts.overdue,
      priority: true
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      icon: <FaCheck />, 
      count: counts.completed 
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <FaFolder />, 
      count: 0 
    }
  ];

  const handleMenuClick = (itemId) => {
    setCurrentView(itemId);
  };

  return (
    <nav className="navigation-menu">
      <ul className="nav-list">
        {menuItems.map(item => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
              title={collapsed ? `${item.label} (${item.count} tasks)` : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  {item.count > 0 && (
                    <span className={`nav-count ${item.priority ? 'high-priority' : ''}`}>
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
