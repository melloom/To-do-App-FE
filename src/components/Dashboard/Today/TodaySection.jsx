import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './TodaySection.css';

const TodaySection = () => {
  const { state, toggleTask } = useDashboard();
  const { tasks = [] } = state || {};
  
  // Filter tasks for today
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const completedCount = todayTasks.filter(task => task.completed).length;
  const totalCount = todayTasks.length;

  // Get current theme for theme-specific content
  const getCurrentTheme = () => {
    const bodyClasses = document.body.className;
    const themeMatch = bodyClasses.match(/theme-(\w+)/);
    return themeMatch ? themeMatch[1] : 'default';
  };

  const getThemeEmptyMessage = () => {
    const theme = getCurrentTheme();
    const messages = {
      spiderman: "🕷️ No webs to spin today! Your schedule is clear - time to relax or add some heroic tasks!",
      hulk: "💚 Hulk has peaceful day! No tasks to smash today. Hulk can rest... or find new things to do!",
      ironman: "⚡ All systems operational, no tasks detected! Perfect time to upgrade your productivity!",
      thor: "⚡ The day is yours, mortal! No tasks await - a perfect time for new adventures!",
      captain: "🛡️ Mission accomplished! No tasks scheduled for today. Time to plan your next victory!",
      panther: "🐾 The Black Panther watches over a peaceful day. No tasks to complete - Wakanda approves!",
      spongebob: "🍍 What a beautiful day in Bikini Bottom! No tasks to do - time for jellyfishing!",
      mickey: "🏰 It's a magical day with no tasks! Time to spread some Disney magic or just enjoy the moment!",
      pikachu: "⚡ Pika pika! No battles today! Perfect time to rest or explore new adventures!",
      turtles: "🍕 Totally radical! No tasks today means more time for pizza and hanging out. Cowabunga!",
      default: "No tasks scheduled for today. Enjoy your free time!"
    };
    return messages[theme] || messages.default;
  };

  const getThemeIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '🕸️',
      hulk: '💪',
      ironman: '🔧',
      thor: '🔨',
      captain: '⭐',
      panther: '⚫',
      spongebob: '🧽',
      mickey: '🏰',
      pikachu: '🌟',
      turtles: '🍕',
      default: '📅'
    };
    return icons[theme] || icons.default;
  };

  const getThemeCompletionMessage = () => {
    const theme = getCurrentTheme();
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    if (percentage === 100) {
      const messages = {
        spiderman: "🕷️ Amazing! All tasks completed! Even Spider-Man would be proud!",
        hulk: "💚 HULK SMASH ALL TASKS! Perfect completion makes Hulk happy!",
        ironman: "⚡ Outstanding! 100% efficiency achieved. Friday would be impressed!",
        thor: "⚡ By the hammer of Thor! All tasks conquered like a true Asgardian warrior!",
        captain: "🛡️ Mission accomplished, soldier! You've earned your stripes today!",
        panther: "🐾 Wakanda Forever! Your dedication honors the Black Panther legacy!",
        spongebob: "🍍 I'm ready! And you were ready too! All tasks done with SpongeBob spirit!",
        mickey: "🏰 Hot dog! You've made all your dreams come true today! Pure Disney magic!",
        pikachu: "⚡ Pika-perfect! You caught 'em all! Every task completed with electric energy!",
        turtles: "🍕 Cowabunga! Totally tubular completion rate! Time to celebrate with pizza!",
        default: "Perfect! All tasks completed!"
      };
      return messages[theme] || messages.default;
    }
    
    return `${completedCount}/${totalCount} completed`;
  };

  return (
    <div className="today-section">
      <div className="section-header">
        <h2>
          <span className="section-icon">{getThemeIcon()}</span>
          Today
        </h2>
        <div className="progress-info">
          <span className="progress-text">{getThemeCompletionMessage()}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="today-tasks">
        {todayTasks.map(task => (
          <div key={task.id} className={`today-task ${task.completed ? 'completed' : ''}`}>
            <div className="task-time">{task.time || 'All day'}</div>
            <div className="task-content">
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-title">{task.title}</span>
              </div>
              <span 
                className={`task-priority priority-${task.priority}`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {todayTasks.length === 0 && (
        <div className="empty-state">
          <p>{getThemeEmptyMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default TodaySection;