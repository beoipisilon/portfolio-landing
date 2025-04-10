
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
type SkillCategory = {
  category: string;
  skills: string[];
};

const About = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].about;
  const skillCategories: SkillCategory[] = [
    {
      category: t.frontEnd,
      skills: ["TypeScript", "React", "Redux/Toolkit", "ReactNative", "Vue/Vuex"]
    },
    {
      category: t.backEnd,
      skills: ["PostgreSQL/MySql", "Go/Gin/Gorm", "Node/Express/Koa", "Python/Flask"]
    },
    {
      category: t.tools,
      skills: ["GitHub CI/CD", "Git", "Bash", "Swagger"]
    },
    {
      category: t.testing,
      skills: ["Selenium", "Mocha", "Jest"]
    }
  ];

  const companies = ["Sber Service", "Croc", "Qiwi", "ItHub", "VkDevLab"];

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
    
    setTimeout(handleScroll, 100);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-dark py-24 mt-16" id="about">
      <div className="container w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div data-animate-on-scroll>
            <h2 className="text-light text-3xl font-mono mb-6 border-b border-white/20">
              {t.title}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="mb-6 hover-scale" data-animate-on-scroll style={{ transitionDelay: `${index * 0.1}s` }}>
                  <h3 className="text-light text-lg font-mono mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray text-sm">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="w-full border-b border-white/20 mt-6" data-animate-on-scroll>
              <h3 className="text-gray text-right text-5xl font-semibold font-mono opacity-30">{t.skills}</h3>
            </div>
          </div>
          
          <div className="flex justify-end w-full">
            <div className="relative flex items-center" data-animate-on-scroll>
              <img 
                src="https://files.catbox.moe/gr8f9j.png" 
                alt="Your Name" 
                className="max-w-[15rem] md:max-w-sm lg:max-w-sm hover-scale"
              />
            </div>
          </div>

        </div>

        {/* Company section with full width */}
        <div className="flex flex-wrap items-center justify-between mt-8" data-animate-on-scroll>
          {companies.map((company, index) => (
            <span key={index} className="text-light text-lg hover-scale my-2">{company}</span>
          ))}
          <h3 className="text-gray text-2xl font-mono opacity-30">{t.company}</h3>
        </div>
      </div>
    </section>
  );
};

export default About;
