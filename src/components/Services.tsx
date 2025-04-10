import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Service = {
  title: string;
  description: string;
};

const Services = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].services;

  const servicesList: Service[] = [
    {
      title: t.websiteDev,
      description: ""
    },
    {
      title: t.mobileDev,
      description: "ReactNative",
    },
    {
      title: t.parsers,
      description: ""
    },
    {
      title: t.browserExtensions,
      description: "Chrome, Firefox"
    },
    {
      title: t.webApp,
      description: "Wpx, Spa, Ssr"
    },
    {
      title: t.backendDev,
      description: "GoLang, Nodejs, Python3"
    }
  ];

  // Scroll animation logic
  const scrollElements = useRef<NodeListOf<Element> | null>(null);

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
    
    // Initial check and add listener
    setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="py-20 bg-dark" id="services">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-animate-on-scroll>
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="group border border-gray/30 p-6 hover:border-light transition-all duration-300 hover:bg-dark/50 hover-scale" 
              data-animate-on-scroll 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-light text-xl font-mono mb-2 group-hover:text-light transition-colors duration-300">{service.title}</h3>
              {service.description && (
                <p className="text-gray group-hover:text-gray/80 transition-colors duration-300">{service.description}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-end justify-end mt-8" data-animate-on-scroll>
          <div className="flex-grow border-t border-gray-700 opacity-30 mr-4 mb-4" />
          <h2 className="text-gray text-4xl md:text-6xl lg:text-8xl font-mono opacity-20 whitespace-nowrap">{t.title}</h2>
        </div>
      </div>
    </section>
  );
};

export default Services;
