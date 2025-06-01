import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ProjectModal from '../../Projects/ProjectModal';

const ProjectsList = ({ collapsed }) => {
  const { state, dispatch, addProject } = useDashboard();
  const { projects, tasks, activeView } = state;
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuProject, setContextMenuProject] = useState(null);

  // Calculate project counts
  const projectsWithCounts = projects.map(project => ({
    ...project,
    count: tasks.filter(task => 
      !task.completed && 
      task.project === project.name
    ).length
  }));

  const handleProjectClick = (project, event) => {
    // If clicking on edit button, don't trigger project view
    if (event.target.closest('.project-edit-btn')) {
      return;
    }
    
    // Navigate into the project to view its tasks (don't open modal)
    handleViewProjectTasks(project);
    
    console.log(`Navigating to project: ${project.name}`);
  };

  const handleProjectEdit = (project, event) => {
    event.stopPropagation();
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleProjectRightClick = (project, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setContextMenuProject(project);
    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
    setShowContextMenu(true);
  };

  const handleContextMenuEdit = () => {
    if (contextMenuProject) {
      setEditingProject(contextMenuProject);
      setShowProjectModal(true);
    }
    setShowContextMenu(false);
    setContextMenuProject(null);
  };

  const handleContextMenuDelete = () => {
    if (contextMenuProject && window.confirm(`Are you sure you want to delete the project "${contextMenuProject.name}"?`)) {
      dispatch({
        type: 'DELETE_PROJECT',
        payload: contextMenuProject.id
      });
    }
    setShowContextMenu(false);
    setContextMenuProject(null);
  };

  const handleContextMenuViewTasks = () => {
    if (contextMenuProject) {
      handleViewProjectTasks(contextMenuProject);
    }
    setShowContextMenu(false);
    setContextMenuProject(null);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      // Update existing project
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: {
          ...editingProject,
          ...projectData
        }
      });
      console.log('Updated project:', projectData);
    } else {
      // Add new project
      const newProject = {
        id: `project-${Date.now()}`,
        ...projectData,
        createdAt: new Date().toISOString()
      };
      addProject(newProject);
    }
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleViewProjectTasks = (project) => {
    console.log('Viewing tasks for project:', project.name);
    
    // Set the active view to show this project's tasks
    dispatch({
      type: 'SET_ACTIVE_VIEW',
      payload: `project:${project.name}`
    });
    
    // Also update the filter to show project tasks
    dispatch({
      type: 'SET_FILTER',
      payload: { key: 'project', value: project.name }
    });
    
    // Close any open modals
    setShowProjectModal(false);
    setEditingProject(null);
    setShowContextMenu(false);
    setContextMenuProject(null);
  };

  // Close context menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showContextMenu) {
        setShowContextMenu(false);
        setContextMenuProject(null);
      }
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('contextmenu', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [showContextMenu]);

  return (
    <div className="projects-section">
      <div className="projects-list">
        {projectsWithCounts.map(project => (
          <div key={project.id} className="nav-item project-item">
            <button
              className={`nav-link project-link ${activeView === `project:${project.name}` ? 'active' : ''}`}
              onClick={(event) => handleProjectClick(project, event)}
              onContextMenu={(event) => handleProjectRightClick(project, event)}
              title={collapsed ? `${project.name} (${project.count} tasks)` : `Click to view ${project.name} tasks`}
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
                  <button 
                    className="project-edit-btn"
                    onClick={(event) => handleProjectEdit(project, event)}
                    title="Edit project"
                  >
                    ⚙️
                  </button>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {showProjectModal && (
        <ProjectModal
          isOpen={showProjectModal}
          onClose={handleCloseModal}
          onSave={handleSaveProject}
          onViewTasks={handleViewProjectTasks}
          project={editingProject}
        />
      )}

      {showContextMenu && (
        <>
          <div 
            className="context-menu-overlay"
            onClick={() => setShowContextMenu(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000
            }}
          />
          <div 
            className="context-menu"
            style={{
              position: 'fixed',
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
              zIndex: 1001,
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              minWidth: '160px',
              padding: '4px 0'
            }}
          >
            <button
              className="context-menu-item"
              onClick={handleContextMenuViewTasks}
              style={{
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              📋 View Tasks
            </button>
            <button
              className="context-menu-item"
              onClick={handleContextMenuEdit}
              style={{
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              ✏️ Edit Project
            </button>
            <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <button
              className="context-menu-item"
              onClick={handleContextMenuDelete}
              style={{
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              🗑️ Delete Project
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsList;
