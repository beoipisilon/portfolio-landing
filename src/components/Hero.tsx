import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const isMobile = useIsMobile();
  const scrollElements = useRef<NodeListOf<Element> | null>(null);
  const { language, translations } = useLanguage();
  const t = translations[language].about;
  
  useEffect(() => {
    scrollElements.current = document.querySelectorAll('[data-animate-on-scroll]');
    
    const handleScroll = () => {
      if (!scrollElements.current) return;
      
      scrollElements.current.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;
        
        if (elementPosition < screenPosition) {
          element.classList.add('is-visible');
        }
      });
    };
    
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const TypingText = ({ text, className = '', delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [i, setI] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
  
    useEffect(() => {
      const startTyping = setTimeout(() => {
        setIsStarted(true);
      }, delay);

      return () => clearTimeout(startTyping);
    }, [delay]);

    useEffect(() => {
      if (!isStarted) return;

      const typingEffect = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          setI(prev => prev + 1);
        } else {
          clearInterval(typingEffect);
        }
      }, 100);
  
      return () => {
        clearInterval(typingEffect);
      };
    }, [i, text, isStarted]);
  
    return (
      <span className={`inline-block border-r-2 border-white ${className}`}>
        {displayedText}
      </span>
    );
  };

  
  return (
    <section className="relative h-[60vh]" id="main">
      
      <div className="container mx-auto h-full relative overflow-hidden px-4 md:px-12 lg:px-16">
        <div className={`absolute left-0 top-0 h-full ${isMobile ? 'w-full opacity-30' : 'w-1/3'} z-0 animate-slide-up`} style={{ animationDelay: "0.3s" }}>
          <img 
            src="https://files.catbox.moe/7jffk0.jpg" 
            alt="Developer workspace" 
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        
        <div className="absolute top-[30%] left-[30vw] md:left-[30%] lg:left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <p className="text-[rgb(126,126,126)] font-bold text-left font-mono text-2xl md:text-4xl mb-2 opacity-90">
            <TypingText text="Full-stack" className="no-cursor" />
          </p>
          <h1 className="text-light font-mono text-4xl sm:text-6xl md:text-8xl font-bold typing-container">
            <TypingText text="Developer" delay={1000} />
          </h1>
        </div>
        
          <div 
            className={`absolute ${isMobile ? 'bottom-12 right-4 left-4 text-center' : 'max-w-sm bottom-8 right-[33.333%] mr-8'} z-10 animate-slide-right`} 
            style={{ animationDelay: "0.5s" }}
          >
          <p className="text-light text-sm md:text-base mb-6">
            {t.description}
          </p>
          
          <a 
            href="#portfolio" 
            className="inline-block border border-light text-light px-5 py-2 md:px-6 md:py-2.5 hover:bg-light hover:text-dark transition-colors font-mono text-sm md:text-base story-link"
          >
            {t.viewPortfolio}
          </a>
        </div>
        
        <div className={`absolute ${isMobile ? 'right-4 top-1/3' : 'right-8 top-1/2 transform -translate-y-1/2'} flex flex-col space-y-5 z-10 animate-slide-left`} style={{ animationDelay: "0.6s" }}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-dark font-semibold hover:bg-transparent hover:text-light transition-colors hover-scale bg-white p-2 rounded-full"
          >
            <Github size={isMobile ? 18 : 20} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-dark font-semibold hover:bg-transparent hover:text-light transition-colors hover-scale bg-white p-2 rounded-full"
          >
            <Linkedin size={isMobile ? 18 : 20} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-dark font-semibold hover:bg-transparent hover:text-light transition-colors hover-scale bg-white p-2 rounded-full"
          >
            <Twitter size={isMobile ? 18 : 20} />
          </a>
          <a 
            href="mailto:contact@example.com" 
            className="text-dark font-semibold hover:bg-transparent hover:text-light transition-colors hover-scale bg-white p-2 rounded-full"
          >
            <Mail size={isMobile ? 18 : 20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
