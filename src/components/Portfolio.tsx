import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Github } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '../context/LanguageContext';

type ProjectDescription = {
  en: string;
  'pt-br': string;
};

type Project = {
  id: number;
  title: {
    en: string;
    'pt-br': string;
  };
  description: ProjectDescription;
  image: string;
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
};

const Portfolio = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].portfolio;
  
  const categories = [t.allProjects, t.web, t.mobile, t.bot];
  const [activeCategory, setActiveCategory] = useState(t.allProjects);
  const [visibleProjects, setVisibleProjects] = useState(4);

  useEffect(() => {
    setActiveCategory(t.allProjects);
  }, [language, t.allProjects]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleProjects(4);
  };

  const handleViewMore = () => {
    setVisibleProjects(prev => prev + 4);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: {
        en: "EWYS",
        'pt-br': "EWYS"
      },
      description: {
        en: "On-screen menu with augmented reality for a restaurant",
        'pt-br': "Cardápio digital com realidade aumentada para restaurante"
      },
      image: "https://files.catbox.moe/d45yul.png",
      category: t.mobile,
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["Vue", "Tailwind", "Node"]
    },
    {
      id: 2,
      title: {
        en: "EMAS",
        'pt-br': "EMAS"
      },
      description: {
        en: "Web platform for EMAS employees",
        'pt-br': "Plataforma web para funcionários da EMAS"
      },
      image: "https://files.catbox.moe/d45yul.png",
      category: t.web,
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["React", "TypeScript", "Firebase"]
    },
    {
      id: 3,
      title: {
        en: "Internal Banking Portal",
        'pt-br': "Portal Bancário Interno"
      },
      description: {
        en: "Dashboard for tracking transactions and user accounts",
        'pt-br': "Painel para acompanhamento de transações e contas de usuários"
      },
      image: "https://files.catbox.moe/d45yul.png",
      category: t.web,
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["Vue", "Node", "MongoDB"]
    },
    {
      id: 4,
      title: {
        en: "Customer Service Bot",
        'pt-br': "Bot de Atendimento ao Cliente"
      },
      description: {
        en: "Automated assistance for customer inquiries",
        'pt-br': "Assistência automatizada para consultas de clientes"
      },
      image: "https://files.catbox.moe/d45yul.png",
      category: t.bot,
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["Python", "TensorFlow", "NLP"]
    },
    {
      id: 5,
      title: {
        en: "E-commerce Platform",
        'pt-br': "Plataforma E-commerce"
      },
      description: {
        en: "Full-featured e-commerce solution",
        'pt-br': "Solução completa de e-commerce"
      },
      image: "https://files.catbox.moe/d45yul.png",
      category: t.web,
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      tags: ["React", "Node", "MongoDB"]
    }
  ];

  const filteredProjects = activeCategory === t.allProjects 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const displayProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = filteredProjects.length > visibleProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-light text-6xl font-mono mb-12"
        >
          {t.title}
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`${
                activeCategory === category 
                  ? "border border-light text-light" 
                  : "text-gray hover:text-light"
              } px-4 py-2 transition-colors hover-scale`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="group overflow-hidden hover-scale"
              variants={itemVariants}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title[language]} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-dark/80 p-2 rounded-full text-light hover:bg-light hover:text-dark transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-dark/80 p-2 rounded-full text-light hover:bg-light hover:text-dark transition-colors"
                    >
                      <LinkIcon size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 bg-dark border border-gray/30">
                <h3 className="text-light text-xl font-mono mb-2">{project.title[language]}</h3>
                <p className="text-gray mb-4">{project.description[language]}</p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-gray border-gray/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {hasMoreProjects && (
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handleViewMore}
              className="border border-light text-light px-6 py-2 hover:bg-light hover:text-dark transition-colors font-mono hover-scale"
            >
              {t.viewMore}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
