import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './QuickAdd.css';

const QuickAdd = ({ onClose }) => {
  const { addTask, state } = useDashboard();
  const { projects = [] } = state || {};
  const [currentTheme, setCurrentTheme] = useState('default');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    project: 'Inbox',
    dueDate: '',
    labels: []
  });

  // Detect current theme from body class
  useEffect(() => {
    const detectTheme = () => {
      const bodyClasses = document.body.classList;
      const themeClass = Array.from(bodyClasses).find(cls => cls.startsWith('theme-'));
      if (themeClass) {
        const theme = themeClass.replace('theme-', '');
        setCurrentTheme(theme);
      } else {
        setCurrentTheme('default');
      }
    };

    detectTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Get theme-specific data
  const getThemeData = (theme) => {
    const themeData = {
      spiderman: {
        title: '🕷️ Add New Mission',
        placeholder: 'What needs to be done, web-slinger?',
        submitText: 'Web it Up!',
        cancelText: 'Swing Away',
        icon: '🕷️',
        motivationalText: 'With great power comes great productivity!'
      },
      hulk: {
        title: '💪 HULK ADD TASK',
        placeholder: 'HULK SMASH WHAT TASK?',
        submitText: 'HULK SMASH!',
        cancelText: 'Hulk No Want',
        icon: '💪',
        motivationalText: 'HULK IS STRONGEST TASK MANAGER!'
      },
      ironman: {
        title: '⚡ Stark Industries Task',
        placeholder: 'J.A.R.V.I.S., what do I need to accomplish?',
        submitText: 'Suit Up!',
        cancelText: 'Power Down',
        icon: '⚡',
        motivationalText: 'Genius, billionaire, task manager!'
      },
      thor: {
        title: '⚡ Asgardian Quest',
        placeholder: 'By the power of Asgard, what shall be done?',
        submitText: 'For Asgard!',
        cancelText: 'Return to Asgard',
        icon: '⚡',
        motivationalText: 'Worthy tasks for a worthy hero!'
      },
      captain: {
        title: '🛡️ Captain\'s Orders',
        placeholder: 'What\'s the mission, soldier?',
        submitText: 'I Can Do This All Day!',
        cancelText: 'Stand Down',
        icon: '🛡️',
        motivationalText: 'Avengers... assemble your tasks!'
      },
      panther: {
        title: '🐾 Wakandan Agenda',
        placeholder: 'What shall the Black Panther accomplish?',
        submitText: 'Wakanda Forever!',
        cancelText: 'Return to Wakanda',
        icon: '🐾',
        motivationalText: 'The Black Panther protects productivity!'
      },
      spongebob: {
        title: '🧽 I\'m Ready! Task Time',
        placeholder: 'What jellyfishing adventure awaits?',
        submitText: 'I\'m Ready!',
        cancelText: 'Maybe Tomorrow',
        icon: '🧽',
        motivationalText: 'I\'m ready to work!'
      },
      mickey: {
        title: '🐭 Ha-ha! New Task',
        placeholder: 'Oh boy! What magical task today?',
        submitText: 'Hot Dog!',
        cancelText: 'See Ya Real Soon',
        icon: '🐭',
        motivationalText: 'It all started with a task!'
      },
      pikachu: {
        title: '⚡ Pika Pika! Task',
        placeholder: 'Pika pika! What task to thunderbolt?',
        submitText: 'Pika Pika!',
        cancelText: 'Return to Pokéball',
        icon: '⚡',
        motivationalText: 'Thunderbolt productivity!'
      },
      turtles: {
        title: '🐢 Cowabunga! New Task',
        placeholder: 'Dude, what radical task needs doing?',
        submitText: 'Turtle Power!',
        cancelText: 'Pizza Time',
        icon: '🐢',
        motivationalText: 'Heroes in a half shell!'
      },
      default: {
        title: 'Quick Add Task',
        placeholder: 'Task title...',
        submitText: 'Add Task',
        cancelText: 'Cancel',
        icon: '📝',
        motivationalText: 'Stay organized, stay productive!'
      }
    };
    
    return themeData[theme] || themeData.default;
  };

  const themeData = getThemeData(currentTheme);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      project: formData.project,
      dueDate: formData.dueDate || null,
      labels: formData.labels,
      completed: false,
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="quick-add-overlay" onClick={onClose}>
      <div className={`quick-add-modal theme-${currentTheme}`} onClick={(e) => e.stopPropagation()}>
        <div className="quick-add-header">
          <h3>
            <span className="theme-icon">{themeData.icon}</span>
            {themeData.title}
          </h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="theme-motivational">
          {themeData.motivationalText}
        </div>

        <form onSubmit={handleSubmit} className="quick-add-form">
          <input
            type="text"
            name="title"
            placeholder={themeData.placeholder}
            value={formData.title}
            onChange={handleChange}
            autoFocus
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />

          <div className="form-row">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
            >
              <option value="Inbox">Inbox</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>{themeData.cancelText}</button>
            <button type="submit">{themeData.submitText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAdd;
