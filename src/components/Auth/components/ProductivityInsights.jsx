import React, { useEffect, useRef } from 'react';
import './ProductivityInsights.css';

const ProductivityInsights = () => {
  const goalFillRef = useRef(null);
  const dayBarsRef = useRef([]);

  // Set up day bars references
  dayBarsRef.current = Array(7).fill().map((_, i) => dayBarsRef.current[i] || React.createRef());

  useEffect(() => {
    // Animate the goal progress bar
    if (goalFillRef.current) {
      setTimeout(() => {
        goalFillRef.current.style.width = '78%';
      }, 500);
    }

    // Animate the day bars with staggered timing
    const heights = [60, 40, 90, 70, 50, 30, 20]; // Height percentages
    dayBarsRef.current.forEach((ref, index) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.style.height = `${heights[index]}%`;
        }, 300 + (index * 100));
      }
    });
  }, []);

  return (
    <div className="productivity-insight-card">
      <div className="insight-card-header">
        <div className="insight-icon">📊</div>
        <h3 className="insight-title">Your Productivity Insights</h3>
      </div>

      <div className="insight-content">
        <div className="weekly-chart">
          <div className="chart-title">
            <span className="chart-label">Weekly Progress</span>
            <span className="chart-value">78% Complete</span>
          </div>

          <div className="day-columns">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div className="day-column" key={index}>
                <div className="bar-container">
                  <div
                    ref={dayBarsRef.current[index]}
                    className={`day-bar ${index === 2 ? 'highlight' : ''}`}
                  ></div>
                </div>
                <div className="day-label">{day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="insight-metrics">
          <div className="metric-item">
            <div className="metric-icon peak">⚡</div>
            <div className="metric-details">
              <div className="metric-label">Peak Productivity</div>
              <div className="metric-value">10am - 12pm</div>
            </div>
          </div>

          <div className="metric-item">
            <div className="metric-icon star">🏆</div>
            <div className="metric-details">
              <div className="metric-label">Most Productive Day</div>
              <div className="metric-value">Wednesday</div>
            </div>
          </div>
        </div>

        <div className="goal-progress">
          <div className="goal-text">
            <span className="goal-icon">🎯</span>
            <span className="goal-label">Weekly Goal</span>
          </div>
          <div className="progress-bar">
            <div ref={goalFillRef} className="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityInsights;
