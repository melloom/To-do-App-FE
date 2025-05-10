import React from 'react';
import './styles/Workflow.css';

const Workflow = () => {
  return (
    <section className="workflow-section" id="how-it-works">
      <div className="workflow-container section-container">
        <div className="workflow-header">
          <div className="workflow-badge">How It Works</div>
          <h2>Simple workflow. Maximum productivity.</h2>
          <p>Get started in minutes with a simple three-step process.</p>
        </div>
        
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Create Tasks</h3>
              <p>Add tasks with titles, descriptions, due dates, and priorities. Organize them by categories to stay structured.</p>
            </div>
            <div className="step-image">
              <img src="/images/create-task.svg" alt="Create Task" />
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Organize & Prioritize</h3>
              <p>Drag and drop tasks to arrange them by importance. Set priorities and deadlines to focus on what matters most.</p>
            </div>
            <div className="step-image">
              <img src="/images/organize-tasks.svg" alt="Organize Tasks" />
            </div>
          </div>
          
          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Track & Complete</h3>
              <p>Monitor your progress, check off completed tasks, and enjoy the satisfaction of getting things done!</p>
            </div>
            <div className="step-image">
              <img src="/images/complete-tasks.svg" alt="Complete Tasks" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;