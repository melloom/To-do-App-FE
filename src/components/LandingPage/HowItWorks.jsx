import React from 'react';
import './styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your First Task",
      description: "Simply click the 'Add Task' button and enter your task details. Set priorities, due dates, and categories to stay organized.",
      icon: "➕"
    },
    {
      number: 2,
      title: "Organize & Prioritize",
      description: "Use categories, priority levels, and due dates to structure your workflow. Drag and drop to reorder tasks as priorities change.",
      icon: "📋"
    },
    {
      number: 3,
      title: "Track Progress",
      description: "Check off completed tasks and watch your progress. Use filters to focus on what matters most at any given moment.",
      icon: "✅"
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started with Tasklio in three simple steps</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
