import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Workflow from './Workflow';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './styles/index.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      
      {/* Quick Dashboard Access for Testing */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        background: '#6366f1',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        transition: 'all 0.2s ease'
      }}>
        <a 
          href="/dashboard" 
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🚀 Test Dashboard
        </a>
      </div>

      <Hero />
      <Features />
      <Workflow />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;