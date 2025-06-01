import React from 'react';
import './styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Tasklio has completely transformed how I manage my daily workload. The intuitive interface makes it so easy to prioritize tasks and stay focused throughout the day.",
      name: "Michael Chen",
      title: "Software Developer at TechCorp",
      avatar: "MC",
      color: "#4F46E5" // Indigo
    },
    {
      id: 2,
      text: "As a freelance designer juggling multiple clients, I needed something flexible yet powerful. Tasklio strikes that perfect balance and has become an essential part of my workflow.",
      name: "Olivia Rodriguez",
      title: "Freelance UX Designer",
      avatar: "OR",
      color: "#0EA5E9" // Sky blue
    },
    {
      id: 3,
      text: "The ability to organize tasks by priority and category has been a game-changer for our small team. We've seen a 30% boost in productivity since switching to Tasklio.",
      name: "David Patel",
      title: "Project Manager, Innovate Solutions",
      avatar: "DP",
      color: "#10B981" // Emerald
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-background">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-badge">User Stories</div>
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied users who have improved their productivity with Tasklio.</p>
        </div>

        <div className="testimonials-showcase">
          <div className="testimonials-cards">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id} style={{"--accent-color": testimonial.color}}>
                <div className="testimonial-quote-mark">"</div>
                <div className="testimonial-content">
                  <p>{testimonial.text}</p>
                </div>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{backgroundColor: testimonial.color}}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;