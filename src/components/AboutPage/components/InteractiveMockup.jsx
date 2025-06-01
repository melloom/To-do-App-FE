import React, { useState } from 'react';
import '../styles/InteractiveMockup.css';

const InteractiveMockup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project proposal',
      due: 'Today',
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Schedule team meeting',
      due: 'Completed',
      completed: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Pick up groceries',
      due: 'Tomorrow',
      completed: false,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Plan weekend activities',
      due: 'Friday',
      completed: false,
      priority: 'medium'
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleOpenMockup = () => {
    setIsOpen(true);
  };

  const handleCloseMockup = () => {
    setIsOpen(false);
    setShowForm(false);
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        title: newTask,
        due: 'Tomorrow',
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setShowForm(false);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <section className="interactive-mockup-section">
      <div className="mockup-intro">
        <button className="try-it-button" onClick={handleOpenMockup}>
          Try Tasklio Demo
        </button>
      </div>

      {isOpen && (
        <div className="mockup-overlay">
          <div className="mockup-popup">
            <button className="mockup-close-btn" onClick={handleCloseMockup}>×</button>

            <div className="interactive-app-mockup">
              <div className="mockup-header">
                <div className="mockup-title">My Tasks</div>
                <div className="mockup-actions">
                  <div className="mockup-action"></div>
                  <div className="mockup-action"></div>
                </div>
              </div>

              <div className="mockup-body">
                {tasks.map((task) => (
                  <div
                    className={`task-item ${task.id === 1 ? 'highlighted' : ''}`}
                    key={task.id}
                  >
                    <div
                      className={`task-checkbox ${task.completed ? 'completed' : ''}`}
                      onClick={() => toggleTaskComplete(task.id)}
                    ></div>
                    <div className="task-content">
                      <div className="task-title">{task.title}</div>
                      <div className="task-due">
                        {task.completed ? 'Completed' : `Due: ${task.due}`}
                      </div>
                    </div>
                    <div className={`task-priority ${task.priority}`}></div>
                  </div>
                ))}

                {showForm && (
                  <div className="new-task-form">
                    <input
                      type="text"
                      placeholder="What needs to be done?"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      autoFocus
                    />
                    <div className="form-actions">
                      <button onClick={handleAddTask} className="add-task-btn">Add</button>
                      <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mockup-footer">
                <div className="mockup-add-button" onClick={handleShowForm}>
                  <span className="add-icon">+</span>
                  <span className="add-text">New Task</span>
                </div>
              </div>
            </div>

            <div className="mockup-instructions">
              <p>Click on the checkboxes to mark tasks as completed</p>
              <p>Click the "+" button to add a new task</p>
              <p><strong>Note:</strong> This is a demo with limited functionality</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveMockup;
