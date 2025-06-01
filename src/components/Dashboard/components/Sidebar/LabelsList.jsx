import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const LabelsList = ({ collapsed }) => {
  const { state, dispatch } = useDashboard();
  const { labels, tasks } = state;

  // Calculate label counts
  const labelsWithCounts = labels.map(label => ({
    ...label,
    count: tasks.filter(task => 
      !task.completed && 
      task.labels && 
      task.labels.includes(label.id)
    ).length
  }));

  const handleLabelClick = (labelId) => {
    dispatch({
      type: 'SET_ACTIVE_VIEW',
      payload: `label:${labelId}`
    });
  };

  return (
    <div className="labels-list">
      {!collapsed && (
        <div className="section-title">Labels</div>
      )}
      
      {labelsWithCounts.map(label => (
        <div key={label.id} className="nav-item label-item">
          <button
            className={`nav-link label-link ${state.activeView === `label:${label.id}` ? 'active' : ''}`}
            onClick={() => handleLabelClick(label.id)}
          >
            <div className="nav-icon">
              <div 
                className="label-color"
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%',
                  backgroundColor: label.color 
                }}
              />
            </div>
            {!collapsed && (
              <>
                <span className="label-name">{label.name}</span>
                <span className="label-count">{label.count}</span>
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LabelsList;
