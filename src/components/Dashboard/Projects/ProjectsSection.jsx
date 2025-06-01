import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ProjectModal from './ProjectModal';
import ConfirmationModal from '../../common/ConfirmationModal';
import './ProjectsSection.css';

const ProjectsSection = ({ onViewTasks }) => {
  const { state, addProject, updateProject, deleteProject } = useDashboard();
  const { projects = [], tasks = [] } = state || {};
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, tasks, created

  // Get current theme for theme-specific content
  const getCurrentTheme = () => {
    const bodyClasses = document.body.className;
    const themeMatch = bodyClasses.match(/theme-(\w+)/);
    return themeMatch ? themeMatch[1] : 'default';
  };

  const getThemeEmptyMessage = () => {
    const theme = getCurrentTheme();
    const messages = {
      spiderman: "🕷️ No projects in your web yet! Create your first project to organize your heroic missions!",
      hulk: "💚 HULK NEED PROJECTS TO ORGANIZE SMASHING! Create first project for Hulk!",
      ironman: "⚡ No projects detected! Time to start building your next groundbreaking innovation!",
      thor: "⚡ The halls of Asgard await your grand projects! Create your first epic undertaking!",
      captain: "🛡️ Every great mission needs planning, soldier! Create your first strategic project!",
      panther: "🐾 Wakanda's greatest achievements started with a plan! Create your first project!",
      spongebob: "🍍 I'm ready to work on projects! But first, we need to create one! Let's go!",
      mickey: "🏰 Every magical adventure starts with a dream! Create your first project to make magic happen!",
      pikachu: "⚡ Gotta organize 'em all! Create your first project to become the very best!",
      turtles: "🍕 Cowabunga! No projects yet! Time to organize some radical missions, dudes!",
      default: "Create your first project to organize your tasks"
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
      captain: '🛡️',
      panther: '🏰',
      spongebob: '🏝️',
      mickey: '🎢',
      pikachu: '🏔️',
      turtles: '🏢',
      default: '📁'
    };
    return icons[theme] || icons.default;
  };

  const getThemeSearchIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '🕸️',
      hulk: '👁️',
      ironman: '🔍',
      thor: '👁️',
      captain: '🔍',
      panther: '👁️',
      spongebob: '👀',
      mickey: '🔍',
      pikachu: '👁️',
      turtles: '👁️',
      default: '🔍'
    };
    return icons[theme] || icons.default;
  };

  const getThemeAddButton = () => {
    const theme = getCurrentTheme();
    const buttons = {
      spiderman: { icon: '🕷️', text: 'New Mission' },
      hulk: { icon: '💥', text: 'New Smash Project' },
      ironman: { icon: '⚡', text: 'New Innovation' },
      thor: { icon: '⚡', text: 'New Quest' },
      captain: { icon: '🛡️', text: 'New Mission' },
      panther: { icon: '🐾', text: 'New Initiative' },
      spongebob: { icon: '🍍', text: 'New Adventure' },
      mickey: { icon: '✨', text: 'New Dream' },
      pikachu: { icon: '⚡', text: 'New Journey' },
      turtles: { icon: '🍕', text: 'New Mission' },
      default: { icon: '+', text: 'New Project' }
    };
    return buttons[theme] || buttons.default;
  };

  // Calculate project statistics
  const projectsWithStats = projects.map(project => {
    const projectTasks = tasks.filter(task => task.project === project.name);
    const completedTasks = projectTasks.filter(task => task.completed);
    
    return {
      ...project,
      totalTasks: projectTasks.length,
      completedTasks: completedTasks.length,
      progress: projectTasks.length > 0 ? (completedTasks.length / projectTasks.length) * 100 : 0,
      lastActivity: projectTasks.length > 0 
        ? Math.max(...projectTasks.map(task => new Date(task.createdAt || task.updatedAt || 0).getTime()))
        : new Date(project.createdAt || 0).getTime()
    };
  });

  // Filter and sort projects
  const filteredProjects = projectsWithStats
    .filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'tasks':
          return b.totalTasks - a.totalTasks;
        case 'created':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'activity':
          return b.lastActivity - a.lastActivity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = (project) => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    }
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const getProjectStatusColor = (progress) => {
    if (progress === 100) return '#10b981'; // Green
    if (progress >= 75) return '#f59e0b'; // Amber
    if (progress >= 25) return '#3b82f6'; // Blue
    return '#6b7280'; // Gray
  };

  const themeAddButton = getThemeAddButton();

  return (
    <div className="projects-section">
      {/* Header */}
      <div className="projects-header">
        <div className="header-left">
          <h2>
            <span className="section-icon">{getThemeIcon()}</span>
            Projects
          </h2>
          <div className="projects-stats">
            <span className="stat-item">
              <span className="stat-value">{projects.length}</span>
              <span className="stat-label">Total</span>
            </span>
            <span className="stat-item">
              <span className="stat-value">
                {projectsWithStats.filter(p => p.progress === 100).length}
              </span>
              <span className="stat-label">Completed</span>
            </span>
            <span className="stat-item">
              <span className="stat-value">
                {projectsWithStats.filter(p => p.totalTasks > 0 && p.progress < 100).length}
              </span>
              <span className="stat-label">Active</span>
            </span>
          </div>
        </div>
        
        <button 
          className="add-project-btn"
          onClick={handleAddProject}
        >
          <span className="btn-icon">{themeAddButton.icon}</span>
          <span>{themeAddButton.text}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="projects-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">{getThemeSearchIcon()}</span>
        </div>
        
        <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="tasks">Task Count</option>
            <option value="activity">Last Activity</option>
            <option value="created">Date Created</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            {/* Project Header */}
            <div className="project-card-header">
              <div className="project-info">
                <div 
                  className="project-color-indicator"
                  style={{ backgroundColor: project.color }}
                />
                <div className="project-title-area">
                  <h3 className="project-name">{project.name}</h3>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                </div>
              </div>
              
              <div className="project-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEditProject(project)}
                  title="Edit project"
                >
                  ✏️
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteProject(project)}
                  title="Delete project"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Project Stats */}
            <div className="project-stats">
              <div className="stats-row">
                <div className="stat-group">
                  <span className="stat-number">{project.totalTasks}</span>
                  <span className="stat-text">Tasks</span>
                </div>
                <div className="stat-group">
                  <span className="stat-number">{project.completedTasks}</span>
                  <span className="stat-text">Done</span>
                </div>
                <div className="stat-group">
                  <span className="stat-number">{Math.round(project.progress)}%</span>
                  <span className="stat-text">Complete</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: getProjectStatusColor(project.progress)
                    }}
                  />
                </div>
                <span className="progress-text">{Math.round(project.progress)}%</span>
              </div>
            </div>

            {/* Project Footer */}
            <div className="project-footer">
              <span className="last-activity">
                Last activity: {new Date(project.lastActivity).toLocaleDateString()}
              </span>
              <span className={`project-status status-${project.progress === 100 ? 'completed' : project.totalTasks > 0 ? 'active' : 'empty'}`}>
                {project.progress === 100 ? 'Completed' : project.totalTasks > 0 ? 'Active' : 'Empty'}
              </span>
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="projects-empty-state">
            {searchQuery ? (
              <div className="empty-search">
                <div className="empty-icon">{getThemeSearchIcon()}</div>
                <h3>No projects found</h3>
                <p>No projects match your search criteria</p>
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="empty-projects">
                <div className="empty-icon">{getThemeIcon()}</div>
                <h3>No projects yet</h3>
                <p>{getThemeEmptyMessage()}</p>
                <button 
                  className="create-first-project-btn"
                  onClick={handleAddProject}
                >
                  {themeAddButton.text}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        onViewTasks={onViewTasks}
        project={editingProject}
      />
      
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message={
          <div>
            <p>Are you sure you want to delete <strong>"{projectToDelete?.name}"</strong>?</p>
            <p>This action cannot be undone. All tasks in this project will be moved to the Inbox.</p>
          </div>
        }
        confirmText="Delete Project"
        confirmButtonClass="confirm-danger"
        icon="🗑️"
      />
    </div>
  );
};

export default ProjectsSection;