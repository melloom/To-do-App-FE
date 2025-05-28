import React from 'react';
import './styles/Features.css';

const Features = () => {
  const features = [
    {
      icon: "🚀",
      title: "Supercharge Your Productivity",
      description: "Effortlessly organize tasks with our intuitive drag-and-drop interface. Focus on what matters most and watch your productivity soar."
    },
    {
      icon: "🔄",
      title: "Seamless Task Workflows",
      description: "Create custom workflows that adapt to your unique process. Move tasks through stages from 'To Do' to 'Done' with visual satisfaction."
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Never miss a deadline with intelligent reminders that know exactly when to alert you. Stay on track without the constant interruptions."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Share projects, assign tasks, and track progress together in real-time. Perfect for teams of any size who need to stay coordinated."
    },
    {
      icon: "📊",
      title: "Insightful Analytics",
      description: "Visualize your productivity patterns with beautiful charts and reports. Identify bottlenecks and celebrate your accomplishments."
    },
    {
      icon: "🔒",
      title: "Privacy-First Design",
      description: "Your data belongs to you alone. We don't track usage or sell information—total privacy with secure cloud storage and encryption."
    }
  ];

  return (
    <section className="landing-features-section" id="features">
      <div className="features-container section-container">
        <div className="features-header">
          <div className="features-badge">Powerful Features</div>
          <h2>Your Command Center for Getting Things Done</h2>
          <p>Tasklio combines powerful functionality with elegant simplicity. Experience task management that works the way your brain does.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
              }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon"><span>{feature.icon}</span></div>
                <div className="feature-icon-bg"></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">
                {feature.description}
              </p>
              <div className="feature-hover-effect"></div>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <p className="features-cta-text">From quick personal to-dos to complex team projects—we've built the task management solution you've been dreaming about.</p>
          <a href="#signup" className="features-cta-button">
            Start Organizing Today
            <span className="button-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;