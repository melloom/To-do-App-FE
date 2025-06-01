import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskGroup = ({ title, tasks, selectedTask, setSelectedTask }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="task-group">
      <div className="group-header">
        <button 
          className="group-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className={`toggle-icon ${isCollapsed ? '' : 'expanded'}`}>▶</span>
          <h3 className="group-title">{title}</h3>
          <span className="group-count">({tasks.length})</span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="group-tasks">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
              onSelect={setSelectedTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskGroup;
