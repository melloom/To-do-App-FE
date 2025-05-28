import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const ProjectsList = ({ collapsed }) => {
  const { state, dispatch } = useDashboard();
  const { projects, tasks, activeView } = state;

  // Calculate project counts
  const projectsWithCounts = projects.map(project => ({
    ...project,
    count: tasks.filter(task => 
      !task.completed && 
      task.project === project.name
    ).length
  }));

  const handleProjectClick = (projectId) => {
    dispatch({
      type: 'SET_ACTIVE_VIEW',
      payload: `project:${projectId}`
    });
  };

  const handleAddProject = () => {
    // TODO: Implement add project functionality
    console.log('Add new project');
  };

  return (
    <div className="projects-section">
      {!collapsed && (
        <div className="section-header">
          <h3 className="section-title">Projects</h3>
          <button 
            className="section-add-btn"
            onClick={handleAddProject}
            title="Add new project"
          >
            +
          </button>
        </div>
      )}
      
      <div className="projects-list">
        {projectsWithCounts.map(project => (
          <div key={project.id} className="nav-item project-item">
            <button
              className={`nav-link project-link ${activeView === `project:${project.id}` ? 'active' : ''}`}
              onClick={() => handleProjectClick(project.id)}
              title={collapsed ? `${project.name} (${project.count} tasks)` : undefined}
            >
              <div className="nav-icon">
                <div 
                  className="project-color"
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '3px',
                    backgroundColor: project.color 
                  }}
                />
              </div>
              {!collapsed && (
                <>
                  <span className="project-name">{project.name}</span>
                  {project.count > 0 && (
                    <span className="project-count">{project.count}</span>
                  )}
                </>
              )}
            </button>
          </div>
        ))}
        
        {!collapsed && projectsWithCounts.length === 0 && (
          <div className="empty-projects">
            <p>No projects yet</p>
            <button className="create-project-btn" onClick={handleAddProject}>
              Create your first project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
