import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['about', 'portfolio', 'services', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      let currentSection = '';
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionCenter = offsetTop + (offsetHeight / 2);
          const distance = Math.abs(scrollPosition - sectionCenter);

          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
}; 