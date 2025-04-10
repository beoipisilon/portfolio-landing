
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
