import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ProjectCard from './ProjectCard';
import AddProjectModal from './AddProjectModal';
import ProjectStatsOverview from './ProjectStatsOverview';
import './ProjectSection.css';

const ProjectSection = () => {
  const { state, dispatch, addProject, deleteProject, updateProject } = useDashboard();
  const { projects = [], tasks = [] } = state || {};
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'tasks', 'recent'

  // Calculate project statistics
  const getProjectStats = (project) => {
    const projectTasks = tasks.filter(task => task.project === project.name);
    const completedTasks = projectTasks.filter(task => task.completed);
    const overdueTasks = projectTasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      return new Date(task.dueDate) < new Date();
    });

    return {
      totalTasks: projectTasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length,
      progress: projectTasks.length > 0 ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0
    };
  };

  // Sort projects based on selected criteria
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'tasks':
        const aStats = getProjectStats(a);
        const bStats = getProjectStats(b);
        return bStats.totalTasks - aStats.totalTasks;
      case 'recent':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: `project-${Date.now()}`,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addProject(newProject);
    setShowAddModal(false);
  };

  const handleDeleteProject = (projectId) => {
    // TODO: Add confirmation modal
    deleteProject(projectId);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowAddModal(true);
  };

  const handleUpdateProject = (projectData) => {
    const updatedProject = {
      ...selectedProject,
      ...projectData,
      updatedAt: new Date().toISOString()
    };
    updateProject(updatedProject);
    setSelectedProject(null);
    setShowAddModal(false);
  };

  return (
    <div className="project-section">
      {/* Header */}
      <div className="project-header">
        <div className="header-main">
          <h2>Projects</h2>
          <p className="header-subtitle">
            Organize your tasks into meaningful projects
          </p>
        </div>
        
        <div className="header-actions">
          <div className="view-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="tasks">Sort by Tasks</option>
              <option value="recent">Sort by Recent</option>
            </select>
            
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <span className="icon">⊞</span>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <span className="icon">☰</span>
              </button>
            </div>
          </div>
          
          <button 
            className="add-project-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="btn-icon">+</span>
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <ProjectStatsOverview projects={projects} tasks={tasks} />

      {/* Projects Grid/List */}
      <div className={`projects-container ${viewMode}`}>
        {sortedProjects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No projects yet</h3>
            <p>Create your first project to start organizing your tasks</p>
            <button 
              className="create-first-btn"
              onClick={() => setShowAddModal(true)}
            >
              Create your first project
            </button>
          </div>
        ) : (
          sortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              stats={getProjectStats(project)}
              onEdit={() => handleEditProject(project)}
              onDelete={() => handleDeleteProject(project.id)}
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <AddProjectModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedProject(null);
          }}
          onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
          project={selectedProject}
          isEditing={!!selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectSection;