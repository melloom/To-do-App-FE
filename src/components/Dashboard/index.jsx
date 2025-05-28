import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import TaskDetails from './components/TaskDetails/TaskDetails';
import { DashboardProvider } from './context/DashboardContext';
import './styles/Dashboard.css';

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('today');

  return (
    <DashboardProvider>
      <div className="dashboard">
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        
        <div className="dashboard-body">
          <Sidebar 
            collapsed={sidebarCollapsed}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          
          <MainContent 
            currentView={currentView}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
          
          {selectedTask && (
            <TaskDetails 
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
