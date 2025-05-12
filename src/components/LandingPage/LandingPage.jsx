import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Workflow from './Workflow';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <Features />
      <Workflow />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;