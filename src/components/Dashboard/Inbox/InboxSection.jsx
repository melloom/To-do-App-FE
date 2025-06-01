import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import './InboxSection.css';

const InboxSection = () => {
  const { state, addTask, toggleTask, deleteTask } = useDashboard();
  const { tasks = [] } = state || {};
  
  // Filter tasks for inbox (tasks without due dates or not scheduled)
  const inboxTasks = tasks.filter(task => !task.dueDate || task.project === 'Inbox');
  
  // Get current theme for theme-specific content
  const getCurrentTheme = () => {
    const bodyClasses = document.body.className;
    const themeMatch = bodyClasses.match(/theme-(\w+)/);
    return themeMatch ? themeMatch[1] : 'default';
  };

  const getThemeEmptyMessage = () => {
    const theme = getCurrentTheme();
    const messages = {
      spiderman: "🕷️ Your inbox is as empty as the streets of New York! Add some tasks to swing into action!",
      hulk: "💚 HULK HAPPY! No tasks make Hulk calm. But maybe add some tasks to SMASH?",
      ironman: "⚡ Impressive! Your inbox is cleaner than my arc reactor. Ready for the next mission?",
      thor: "⚡ By Odin's beard! Your inbox is as clear as Asgard's skies. Time for new adventures!",
      captain: "🛡️ Outstanding work, soldier! Your inbox is secure. Ready for the next assignment?",
      panther: "🐾 Wakanda-level efficiency! Your inbox is protected. What's your next move?",
      spongebob: "🍍 I'm ready! I'm ready! But there's nothing to be ready for. Add some fun tasks!",
      mickey: "🏰 Ha-ha! Your magical inbox is empty! Time to make some dreams come true!",
      pikachu: "⚡ Pika pika! Your inbox has no tasks to catch! Gotta add 'em all!",
      turtles: "🍕 Cowabunga! Your inbox is totally empty, dude! Time for some radical tasks!",
      default: "No tasks in your inbox. Add one above!"
    };
    return messages[theme] || messages.default;
  };

  const getThemeIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '🕷️',
      hulk: '💪',
      ironman: '🔧',
      thor: '🔨',
      captain: '⭐',
      panther: '🐾',
      spongebob: '🧽',
      mickey: '🍒',
      pikachu: '⚡',
      turtles: '🍕',
      default: '📥'
    };
    return icons[theme] || icons.default;
  };

  return (
    <div className="inbox-section">
      <div className="section-header">
        <h2>
          <span className="section-icon">{getThemeIcon()}</span>
          Inbox
        </h2>
        <span className="task-count">{inboxTasks.filter(t => !t.completed).length} tasks</span>
      </div>
      
      <AddTaskForm onAddTask={addTask} />
      
      <div className="tasks-list">
        {inboxTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
      
      {inboxTasks.length === 0 && (
        <div className="empty-state">
          <p>{getThemeEmptyMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default InboxSection;