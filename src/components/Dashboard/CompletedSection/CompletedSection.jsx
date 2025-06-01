import React, { useState } from 'react';
import './CompletedSection.css';

const CompletedSection = () => {
  const [completedTasks] = useState([
    {
      id: 1,
      title: 'Complete project documentation',
      category: 'Work',
      completedDate: '2023-12-01',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review team code submissions',
      category: 'Work',
      completedDate: '2023-11-30',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Grocery shopping',
      category: 'Personal',
      completedDate: '2023-11-29',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Update portfolio website',
      category: 'Personal',
      completedDate: '2023-11-28',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Attend client meeting',
      category: 'Work',
      completedDate: '2023-11-27',
      priority: 'high'
    }
  ]);

  // Get current theme for theme-specific content
  const getCurrentTheme = () => {
    const bodyClasses = document.body.className;
    const themeMatch = bodyClasses.match(/theme-(\w+)/);
    return themeMatch ? themeMatch[1] : 'default';
  };

  const getThemeEmptyMessage = () => {
    const theme = getCurrentTheme();
    const messages = {
      spiderman: "🕷️ Great power comes with great responsibility! Start completing tasks to see your heroic achievements here!",
      hulk: "💚 HULK NO SMASH TASKS YET! Complete some tasks and Hulk will be proud!",
      ironman: "⚡ No completed missions detected! Time to start building your legacy of achievements!",
      thor: "⚡ The halls of Valhalla await your victories! Complete tasks to earn your place among the honored!",
      captain: "🛡️ Every hero starts somewhere, soldier! Complete your missions to build your service record!",
      panther: "🐾 The ancestors watch and wait! Complete tasks to honor the legacy of Wakanda!",
      spongebob: "🍍 I'm ready to work! But first, complete some tasks to fill up this happy place!",
      mickey: "🏰 Dreams come true when you complete them! Start finishing tasks to make the magic happen!",
      pikachu: "⚡ Gotta catch 'em all! But first, gotta complete 'em all! Start your journey here!",
      turtles: "🍕 Cowabunga! No completed missions yet! Time to show some turtle power!",
      default: "Completed tasks will appear here once you finish them."
    };
    return messages[theme] || messages.default;
  };

  const getThemeIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '✨',
      hulk: '💪',
      ironman: '⚡',
      thor: '🔨',
      captain: '🛡️',
      panther: '🐾',
      spongebob: '🎉',
      mickey: '🏰',
      pikachu: '⭐',
      turtles: '🍕',
      default: '✅'
    };
    return icons[theme] || icons.default;
  };

  const getThemeSuccessMessage = () => {
    const theme = getCurrentTheme();
    const count = completedTasks.length;
    const messages = {
      spiderman: `🕷️ ${count} missions accomplished! Your Spider-sense for productivity is amazing!`,
      hulk: `💚 HULK COMPLETED ${count} TASKS! Hulk getting stronger and smarter!`,
      ironman: `⚡ ${count} objectives achieved! Your efficiency rivals my best tech!`,
      thor: `⚡ ${count} worthy deeds completed! The gods of Asgard smile upon you!`,
      captain: `🛡️ ${count} missions accomplished, soldier! America is proud!`,
      panther: `🐾 ${count} tasks completed with Wakandan precision! The ancestors are pleased!`,
      spongebob: `🍍 ${count} tasks done with a smile! Gary would be so proud!`,
      mickey: `🏰 ${count} magical tasks completed! You're making dreams come true!`,
      pikachu: `⚡ ${count} tasks caught and completed! You're becoming a task master!`,
      turtles: `🍕 ${count} missions completed! Time to celebrate with pizza!`,
      default: `${count} tasks completed`
    };
    return messages[theme] || messages.default;
  };

  const getThemeCheckmark = () => {
    const theme = getCurrentTheme();
    const checkmarks = {
      spiderman: '🕷️',
      hulk: '💚',
      ironman: '⚡',
      thor: '⚡',
      captain: '🛡️',
      panther: '🐾',
      spongebob: '⭐',
      mickey: '✨',
      pikachu: '⚡',
      turtles: '🥷',
      default: '✓'
    };
    return checkmarks[theme] || checkmarks.default;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#6bcf7f';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="completed-section">
      <div className="section-header">
        <h2>
          <span className="section-icon">{getThemeIcon()}</span>
          Completed Tasks
        </h2>
        <span className="task-count">{getThemeSuccessMessage()}</span>
      </div>

      <div className="completed-tasks-list">
        {completedTasks.map(task => (
          <div key={task.id} className="completed-task-item">
            <div className="task-checkbox">
              <span className="checkmark">{getThemeCheckmark()}</span>
            </div>
            
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-details">
                <span className="task-category">{task.category}</span>
                <span 
                  className="task-priority"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className="completion-date">
                  Completed on {formatDate(task.completedDate)}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <button className="action-btn archive-btn" title="Archive task">
                📁
              </button>
              <button className="action-btn delete-btn" title="Delete task">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">{getThemeIcon()}</div>
          <h3>No completed tasks yet</h3>
          <p>{getThemeEmptyMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default CompletedSection;