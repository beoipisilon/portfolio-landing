import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useActiveSection } from '../hooks/use-active-section';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations[language].navbar;
  const activeSection = useActiveSection();

  const navItems = [
    { name: t.about, path: "#about", id: "about" },
    { name: t.portfolio, path: "#portfolio", id: "portfolio" },
    { name: t.services, path: "#services", id: "services" },
    { name: t.contacts, path: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = (newLanguage: 'en' | 'pt-br') => {
    setLanguage(newLanguage);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-sm py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="font-mono text-xl font-bold hover-scale">
          Your Name
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`text-sm font-medium transition-colors story-link ${
                activeSection === item.id ? "text-light" : "text-gray hover:text-light"
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center space-x-2 pl-4 border-l border-gray/30">
            <Globe size={16} className="text-gray" />
            <button 
              className={`text-sm font-medium ${language === 'pt-br' ? 'text-light' : 'text-gray hover:text-light'} transition-colors hover-scale`}
              onClick={() => toggleLanguage('pt-br')}
            >
              PT-BR
            </button>
            <button 
              className={`text-sm font-medium ${language === 'en' ? 'text-light' : 'text-gray hover:text-light'} transition-colors hover-scale`}
              onClick={() => toggleLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-light hover-scale focus:outline-none"
          aria-label="Open menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.path}
                className={`text-lg font-medium hover:text-light transition-colors story-link ${
                  activeSection === item.id ? "text-light" : "text-gray"
                }`}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray/30">
              <Globe size={18} className="text-gray" />
              <button 
                className={`text-lg font-medium ${language === 'pt-br' ? 'text-light' : 'text-gray hover:text-light'} transition-colors hover-scale`}
                onClick={() => toggleLanguage('pt-br')}
              >
                PT-BR
              </button>
              <button 
                className={`text-lg font-medium ${language === 'en' ? 'text-light' : 'text-gray hover:text-light'} transition-colors hover-scale`}
                onClick={() => toggleLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
