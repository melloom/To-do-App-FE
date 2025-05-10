// filepath: /workspaces/To-do-App-FE/src/components/LandingPage/BrandLogos.jsx
import React from 'react';
import './styles/BrandLogos.css';

const BrandLogos = () => {
  return (
    <section className="brand-logos-section">
      <div className="brand-logos-container">
        <p className="trusted-by">Trusted by professionals from</p>
        <div className="logo-grid">
          <div className="logo-item">
            <span className="company-logo">Google</span>
          </div>
          <div className="logo-item">
            <span className="company-logo">Microsoft</span>
          </div>
          <div className="logo-item">
            <span className="company-logo">Amazon</span>
          </div>
          <div className="logo-item">
            <span className="company-logo">Apple</span>
          </div>
          <div className="logo-item">
            <span className="company-logo">Meta</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;