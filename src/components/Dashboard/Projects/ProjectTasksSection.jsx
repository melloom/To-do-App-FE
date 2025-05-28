import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';
import TaskItem from '../components/TaskList/TaskItem';

const ProjectTasksSection = ({ projectId }) => {
    const { state } = useDashboard();
    const { tasks = [] } = state || {};
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('created');

    // Filter tasks by project and other criteria
    const filteredTasks = tasks.filter(task => {
        // Filter by project if projectId is provided
        if (projectId && task.project !== projectId) return false;
        
        // Filter by search term
        if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        
        // Filter by status/priority
        if (filter === 'completed' && !task.completed) return false;
        if (filter === 'pending' && task.completed) return false;
        if (filter === 'high' && task.priority !== 'high') return false;
        if (filter === 'medium' && task.priority !== 'medium') return false;
        if (filter === 'low' && task.priority !== 'low') return false;
        
        return true;
    });

    // Sort tasks
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sort) {
            case 'dueDate':
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            case 'title':
                return a.title.localeCompare(b.title);
            case 'completed':
                return a.completed - b.completed;
            case 'created':
            default:
                return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
    });

    return (
        <div style={{ padding: '20px' }}>
            <TaskForm projectId={projectId} />
            <TaskSearch onSearch={setSearchTerm} searchTerm={searchTerm} />
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <TaskFilter onFilterChange={setFilter} currentFilter={filter} />
                <TaskSort onSort={setSort} currentSort={sort} />
            </div>
            <div>
                {sortedTasks.length === 0 ? (
                    <div style={{ 
                        textAlign: 'center', 
                        color: '#6b7280', 
                        padding: '40px 20px',
                        border: '2px dashed #e5e7eb',
                        borderRadius: '8px'
                    }}>
                        {searchTerm || filter !== 'all' ? 'No tasks match your criteria' : 'No tasks yet. Add your first task above!'}
                    </div>
                ) : (
                    sortedTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectTasksSection;