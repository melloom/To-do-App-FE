import React from 'react';
import './styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Tasklio has completely transformed how I manage my daily workload. The intuitive interface makes it so easy to prioritize tasks and stay focused throughout the day.",
      name: "Michael Chen",
      title: "Software Developer at TechCorp",
      avatar: "MC"
    },
    {
      id: 2,
      text: "As a freelance designer juggling multiple clients, I needed something flexible yet powerful. Tasklio strikes that perfect balance and has become an essential part of my workflow.",
      name: "Olivia Rodriguez",
      title: "Freelance UX Designer",
      avatar: "OR"
    },
    {
      id: 3,
      text: "The ability to organize tasks by priority and category has been a game-changer for our small team. We've seen a 30% boost in productivity since switching to Tasklio.",
      name: "David Patel",
      title: "Project Manager, Innovate Solutions",
      avatar: "DP"
    }
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container section-spacing">
        <div className="section-header">
          <div className="section-badge">User Stories</div>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Join thousands of satisfied users who have improved their productivity with Tasklio.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-title">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;