import React, { useEffect } from 'react';
import './styles/index.css';
import Header from './Header';
import Hero from './Hero';
import BrandLogos from './BrandLogos';
import Features from './Features';
import Workflow from './Workflow';
import AppShowcase from './AppShowcase';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';

const LandingPage = () => {
  // Handle hash navigation when the page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Remove the # character
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure the page is fully loaded
    }
  }, []);

  return (
    <div className="landing-container">
      <Header />
      <main className="landing-main">
        <Hero />
        <BrandLogos />
        <Features />
        <Workflow />
        <AppShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
