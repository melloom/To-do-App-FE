import React from 'react';
import './styles/Workflow.css';

const Workflow = () => {
  return (
    <section className="workflow-section" id="workflow">
      <div className="workflow-container">
        <div className="workflow-header">
          <span className="workflow-badge">How It Works</span>
          <h2>Simple Steps to Better Productivity</h2>
          <p>Get started with Tasklio in minutes. No complex setup, no learning curve - just pure productivity.</p>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-icon">📝</div>
            <h3>Capture Everything</h3>
            <p>Quickly create detailed tasks with all the information you need. Set deadlines, priorities, and categories in seconds.</p>
            <ul className="step-features">
              <li>Create tasks with rich details</li>
              <li>Set precise deadlines & reminders</li>
              <li>Assign priority levels</li>
              <li>Organize with custom categories</li>
            </ul>
          </div>

          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-icon">🗂️</div>
            <h3>Organize Your Way</h3>
            <p>Take control of your task list with powerful organization tools. Drag and drop to reorder, filter by priority, and customize your view.</p>
            <ul className="step-features">
              <li>Intuitive drag-and-drop interface</li>
              <li>Smart filters and sorting options</li>
              <li>Customizable views and layouts</li>
              <li>Group related tasks together</li>
            </ul>
          </div>

          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-icon">🏆</div>
            <h3>Achieve More</h3>
            <p>Track your progress and celebrate your achievements. Visualize productivity trends and watch your completion rate soar.</p>
            <ul className="step-features">
              <li>Visual productivity analytics</li>
              <li>Achievement celebrations</li>
              <li>Performance trends over time</li>
              <li>Goal tracking and streaks</li>
            </ul>
          </div>

          <div className="workflow-step">
            <div className="step-number">4</div>
            <div className="step-icon">💻</div>
            <h3>Built with Excellence</h3>
            <p>Experience the difference of quality craftsmanship. Built with modern technologies and best practices for performance and reliability.</p>
            <ul className="step-features">
              <li>Open-source codebase available</li>
              <li>Modern React architecture</li>
              <li>Lightning-fast performance</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;