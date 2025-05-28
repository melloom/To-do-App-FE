import React from 'react';

const EmptyState = ({ currentView, searchQuery, hasFilters, onAddTask }) => {
  const getEmptyStateContent = () => {
    if (searchQuery) {
      return {
        icon: '🔍',
        title: 'No tasks found',
        description: `No tasks match "${searchQuery}". Try different keywords or check your filters.`,
        actionText: 'Clear search',
        actionIcon: '✕',
        showSuggestions: true
      };
    }

    if (hasFilters) {
      return {
        icon: '🔽',
        title: 'No tasks match your filters',
        description: 'Try adjusting your filters to see more tasks.',
        actionText: 'Clear filters',
        actionIcon: '🔄'
      };
    }

    switch (currentView) {
      case 'today':
        return {
          icon: '🎉',
          title: 'All done for today!',
          description: 'Great job! You\'ve completed all your tasks for today.',
          actionText: 'Plan tomorrow',
          actionIcon: '📅'
        };
      
      case 'completed':
        return {
          icon: '✅',
          title: 'No completed tasks yet',
          description: 'Start checking off some tasks to see them here.',
          actionText: 'View all tasks',
          actionIcon: '📋'
        };

      case 'overdue':
        return {
          icon: '🎊',
          title: 'Great! No overdue tasks',
          description: 'You\'re staying on top of your schedule.',
          actionText: 'Add new task',
          actionIcon: '➕'
        };

      default:
        return {
          icon: '📝',
          title: 'No tasks yet',
          description: 'Create your first task to get started with Tasklio.',
          actionText: 'Add your first task',
          actionIcon: '➕'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">{content.icon}</div>
      <h3 className="empty-state-title">{content.title}</h3>
      <p className="empty-state-description">{content.description}</p>
      
      {onAddTask && (
        <button 
          className="empty-state-action"
          onClick={onAddTask}
        >
          <span className="action-icon">{content.actionIcon}</span>
          {content.actionText}
        </button>
      )}

      {content.showSuggestions && (
        <div className="search-suggestions">
          <div className="search-suggestions-title">Try searching for:</div>
          <ul className="search-suggestions-list">
            <li>Task titles or descriptions</li>
            <li>Project names</li>
            <li>Priority levels (high, medium, low)</li>
            <li>Categories or labels</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
