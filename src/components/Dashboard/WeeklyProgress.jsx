import React, { useState, useEffect } from 'react';
import './WeeklyProgress.css';

const WeeklyProgress = ({ tasks }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    if (!tasks) return;

    // Calculate tasks completed per day of current week
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Start from Monday

    const dailyCompletions = Array(7).fill(0);

    tasks.forEach(task => {
      if (task.completedAt) {
        const completedDate = new Date(task.completedAt);
        // Check if task was completed this week
        if (completedDate >= weekStart && completedDate <= today) {
          const dayIndex = (completedDate.getDay() + 6) % 7; // Convert to 0=Monday, 6=Sunday
          dailyCompletions[dayIndex]++;
        }
      }
    });

    setWeeklyData(dailyCompletions);
  }, [tasks]);

  // Calculate productivity metrics
  const totalCompleted = weeklyData.reduce((sum, count) => sum + count, 0);
  const bestDay = Math.max(...weeklyData);
  const bestDayIndex = weeklyData.indexOf(bestDay);
  const averagePerDay = totalCompleted / (weeklyData.length || 1);

  return (
    <div className="weekly-progress-container">
      <div className="weekly-progress-header">
        <h2>Weekly Progress</h2>
        <div className="weekly-stats">
          <div className="stat-item">
            <span className="stat-value">{totalCompleted}</span>
            <span className="stat-label">Tasks Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{bestDay > 0 ? days[bestDayIndex] : '—'}</span>
            <span className="stat-label">Most Productive Day</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{averagePerDay.toFixed(1)}</span>
            <span className="stat-label">Daily Average</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        {weeklyData.map((count, index) => (
          <div key={index} className="chart-column">
            <div className="chart-bar-container">
              <div
                className="chart-bar"
                style={{
                  height: `${count ? Math.max(count * 15, 20) : 0}px`,
                  backgroundColor: index === bestDayIndex && bestDay > 0 ? '#6366f1' : '#a5b4fc'
                }}
              >
                {count > 0 && <span className="bar-value">{count}</span>}
              </div>
            </div>
            <div className="chart-label">{days[index]}</div>
          </div>
        ))}
      </div>

      <div className="weekly-insights">
        {totalCompleted > 0 ? (
          <>
            <p>
              <strong>Week insights:</strong> You've completed {totalCompleted} tasks this week
              {bestDay > 0 && `, with the most ({bestDay}) on ${days[bestDayIndex]}`}.
            </p>
            {totalCompleted < 5 ? (
              <p className="insight-tip">Try completing at least 5 tasks per week to boost productivity.</p>
            ) : totalCompleted >= 15 ? (
              <p className="insight-tip">Great job! You're maintaining excellent productivity levels.</p>
            ) : (
              <p className="insight-tip">You're making good progress. Keep it up!</p>
            )}
          </>
        ) : (
          <p className="insight-tip">Complete tasks to see your weekly progress data.</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyProgress;
