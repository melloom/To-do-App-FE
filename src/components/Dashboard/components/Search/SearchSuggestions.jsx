import React from 'react';

const SearchSuggestions = ({ query, onSuggestionClick, tasks, projects, labels }) => {
  const generateSuggestions = () => {
    if (!query || query.length < 2) {
      return {
        smart: [
          { type: 'command', text: 'due:today', description: 'Tasks due today', icon: '📅' },
          { type: 'command', text: 'priority:high', description: 'High priority tasks', icon: '🔥' },
          { type: 'command', text: 'completed:false', description: 'Incomplete tasks', icon: '⏳' },
          { type: 'command', text: 'project:', description: 'Filter by project', icon: '📁' }
        ],
        recent: [
          { type: 'recent', text: 'meeting notes', description: 'Recent search', icon: '🔍' },
          { type: 'recent', text: 'urgent tasks', description: 'Recent search', icon: '🔍' }
        ]
      };
    }

    const suggestions = {
      smart: [],
      tasks: [],
      projects: [],
      labels: [],
      commands: []
    };

    const queryLower = query.toLowerCase();

    // Smart command suggestions
    if (queryLower.includes('due') || queryLower.includes('today')) {
      suggestions.commands.push(
        { type: 'command', text: 'due:today', description: 'Tasks due today', icon: '📅' },
        { type: 'command', text: 'due:tomorrow', description: 'Tasks due tomorrow', icon: '📅' },
        { type: 'command', text: 'due:overdue', description: 'Overdue tasks', icon: '⚠️' }
      );
    }

    if (queryLower.includes('priority') || queryLower.includes('high') || queryLower.includes('urgent')) {
      suggestions.commands.push(
        { type: 'command', text: 'priority:high', description: 'High priority tasks', icon: '🔥' },
        { type: 'command', text: 'priority:medium', description: 'Medium priority tasks', icon: '🟡' },
        { type: 'command', text: 'priority:low', description: 'Low priority tasks', icon: '🟢' }
      );
    }

    // Task suggestions
    const matchingTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(queryLower) ||
      task.description?.toLowerCase().includes(queryLower)
    ).slice(0, 3);

    suggestions.tasks = matchingTasks.map(task => ({
      type: 'task',
      text: task.title,
      description: task.description || 'No description',
      icon: task.completed ? '✅' : '📝',
      data: task
    }));

    // Project suggestions
    const matchingProjects = projects.filter(project =>
      project.name.toLowerCase().includes(queryLower)
    ).slice(0, 3);

    suggestions.projects = matchingProjects.map(project => ({
      type: 'project',
      text: project.name,
      description: `${tasks.filter(t => t.project === project.name).length} tasks`,
      icon: '📁',
      data: project
    }));

    // Label suggestions
    const matchingLabels = labels.filter(label =>
      label.name.toLowerCase().includes(queryLower)
    ).slice(0, 3);

    suggestions.labels = matchingLabels.map(label => ({
      type: 'label',
      text: label.name,
      description: `Filter by ${label.name}`,
      icon: '🏷️',
      data: label
    }));

    return suggestions;
  };

  const suggestions = generateSuggestions();

  const renderSuggestionGroup = (title, items, icon) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="suggestion-group">
        <div className="suggestion-group-header">
          <span className="suggestion-group-icon">{icon}</span>
          <span className="suggestion-group-title">{title}</span>
        </div>
        <div className="suggestion-items">
          {items.map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              className={`suggestion-item ${item.type}`}
              onClick={() => onSuggestionClick(item)}
            >
              <span className="suggestion-icon">{item.icon}</span>
              <div className="suggestion-content">
                <span className="suggestion-text">{item.text}</span>
                <span className="suggestion-description">{item.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="search-suggestions">
      {query && query.length >= 2 ? (
        <>
          {renderSuggestionGroup('Commands', suggestions.commands, '⚡')}
          {renderSuggestionGroup('Tasks', suggestions.tasks, '📝')}
          {renderSuggestionGroup('Projects', suggestions.projects, '📁')}
          {renderSuggestionGroup('Labels', suggestions.labels, '🏷️')}
        </>
      ) : (
        <>
          {renderSuggestionGroup('Smart Searches', suggestions.smart, '🧠')}
          {renderSuggestionGroup('Recent Searches', suggestions.recent, '🕒')}
        </>
      )}
    </div>
  );
};

export default SearchSuggestions;