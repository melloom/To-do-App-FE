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
  return (
    <div className="inbox-section">
      <div className="section-header">
        <h2>Inbox</h2>
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
          <p>No tasks in your inbox. Add one above!</p>
        </div>
      )}
    </div>
  );
};

export default InboxSection;