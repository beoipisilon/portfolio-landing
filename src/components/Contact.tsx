
import React, { useEffect, useRef } from 'react';
import { Github, Twitter, Linkedin, Mail, Globe, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
type SocialLink = {
  platform: string;
  url: string;
  icon: React.ReactNode;
};

const Contact = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].contact;
  const socialLinks: SocialLink[] = [
    {
      platform: "github.com/nik19a",
      url: "https://github.com/nik19a",
      icon: <Github className="text-dark w-5 h-5 font-bold" />
    },
    {
      platform: "@nik19a",
      url: "https://twitter.com/nik19a",
      icon: <Twitter className="text-dark w-5 h-5 font-bold" />
    },
    {
      platform: "linkedin.com/in/nik19a",
      url: "https://linkedin.com/in/nik19a",
      icon: <Linkedin className="text-dark w-5 h-5 font-bold" />
    },
    {
      platform: "khvatov@nik19a.me",
      url: "mailto:khvatov@nik19a.me",
      icon: <Mail className="text-dark w-5 h-5 font-bold" />
    },
    {
      platform: "@nik19a.me",
      url: "https://nik19a.me",
      icon: <Globe className="text-dark w-5 h-5 font-bold" />
    },
    {
      platform: "@nik19a",
      url: "https://facebook.com/nik19a",
      icon: <Facebook className="text-dark w-5 h-5 font-bold" />
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
    <section id="contact" className="py-20 bg-dark relative">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row relative w-full">
          {/* Main content */}
          <div className="flex-1">
            {/* Title */}
            <h2 className="text-light text-4xl md:text-6xl font-mono mb-12" data-animate-on-scroll>{t.title}</h2>

            <div className="absolute left-0 top-[4.5rem] w-[90%] h-[1px] bg-gray/20" data-animate-on-scroll>
              <div className="absolute right-0 top-0 h-[180px] w-[1px] bg-gray/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="mb-8 md:mb-0" data-animate-on-scroll>
                <h3 className="text-light text-2xl md:text-3xl font-mono">{t.name}</h3>
                <p className="text-gray mb-6">{t.subtitle}</p>

                <div className="flex flex-col space-y-1">
                  <p className="text-gray text-sm">{t.handcrafted} <a href="#" className="text-gray hover:text-light transition-colors">{t.me}</a></p>
                  <p className="text-gray text-sm">{t.designed} <a href="https://www.behance.net/taisia_pro" className="text-gray hover:text-light transition-colors">Tatiia Topilskaia</a></p>
                  <p className="text-gray text-sm">{t.powered} <a href="https://t.me/tatiia_topilskaia" className="text-gray hover:text-light transition-colors">{t.me}</a></p>
                </div>
              </div>

              {/* Column 2: Social Links - Responsive version */}
              <div className="grid grid-cols-2 gap-3 md:gap-4" data-animate-on-scroll>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-light transition-colors group hover-scale"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex-shrink-0 bg-white rounded-full p-1 w-7 h-7 mr-2 group-hover:bg-light transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-xs sm:text-sm truncate">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Side menu - Adjusted for mobile */}
          <div className="flex flex-row lg:flex-col justify-start lg:justify-end items-start space-x-4 lg:space-x-0 lg:space-y-4 mt-8 lg:mt-0 lg:pl-4 lg:mb-4" data-animate-on-scroll>
            <a href="#main" className="text-gray hover:text-light transition-colors text-sm lg:text-base story-link">{t.main}</a>
            <a href="#about" className="text-gray hover:text-light transition-colors text-sm lg:text-base story-link">{t.about}</a>
            <a href="#portfolio" className="text-gray hover:text-light transition-colors text-sm lg:text-base story-link">{t.portfolio}</a>
            <a href="#services" className="text-gray hover:text-light transition-colors text-sm lg:text-base story-link">{t.services}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
