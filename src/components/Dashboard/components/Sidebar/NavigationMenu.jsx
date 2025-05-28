import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

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
      filters: 0 // Filters don't have a count
    };
  };

  const counts = getCounts();

  const menuItems = [
    { 
      id: 'inbox', 
      label: 'Inbox', 
      icon: '📥', 
      count: counts.inbox 
    },
    { 
      id: 'today', 
      label: 'Today', 
      icon: '📅', 
      count: counts.today 
    },
    { 
      id: 'upcoming', 
      label: 'Upcoming', 
      icon: '📆', 
      count: counts.upcoming 
    },
    { 
      id: 'filters', 
      label: 'Filters & Labels', 
      icon: '🏷️', 
      count: counts.filters 
    }
  ];

  const handleMenuClick = (itemId) => {
    setCurrentView(itemId);
    // You can add additional logic here for view changes
  };

  return (
    <nav className="navigation-menu">
      <ul className="nav-list">
        {menuItems.map(item => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  {item.count > 0 && (
                    <span className="nav-count">{item.count}</span>
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
