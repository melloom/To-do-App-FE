import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Workflow from './Workflow';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
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