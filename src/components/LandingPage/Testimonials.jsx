import React from 'react';
import './styles/Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container section-container">
        <div className="testimonials-header">
          <div className="testimonials-badge">Testimonials</div>
          <h2>What our users are saying</h2>
          <p>Thousands of individuals and teams love using Tasklio for their task management needs.</p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Tasklio has completely transformed how I manage my daily tasks. The interface is clean and it's so easy to use!"</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JD</div>
              <div className="testimonial-info">
                <h4>Jane Doe</h4>
                <p>Freelance Designer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card featured">
            <div className="testimonial-content">
              <p>"I've tried many task management apps, but Tasklio is by far the best. It has the perfect balance of features without being overwhelming."</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JS</div>
              <div className="testimonial-info">
                <h4>John Smith</h4>
                <p>Project Manager</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Our team productivity increased by 35% after we started using Tasklio. The collaborative features are excellent!"</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">AR</div>
              <div className="testimonial-info">
                <h4>Alice Rodriguez</h4>
                <p>Team Lead</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Tasks Completed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;