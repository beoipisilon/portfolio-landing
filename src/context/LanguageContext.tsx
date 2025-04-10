import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt-br';

type PortfolioTranslations = {
  title: string;
  allProjects: string;
  web: string;
  mobile: string;
  bot: string;
  viewMore: string;
};

type ServicesTranslations = {
  title: string;
  websiteDev: string;
  mobileDev: string;
  parsers: string;
  browserExtensions: string;
  webApp: string;
  backendDev: string;
};

type NavbarTranslations = {
  about: string;
  portfolio: string;
  services: string;
  contacts: string;
};

type AboutTranslations = {
  title: string;
  description: string;
  skills: string;
  frontEnd: string;
  backEnd: string;
  tools: string;
  testing: string;
  company: string;
  viewPortfolio: string;
  position: string;
};

type ContactTranslations = {
  title: string;
  name: string;
  subtitle: string;
  main: string;
  about: string;
  portfolio: string;
  services: string;
  handcrafted: string;
  designed: string;
  powered: string;
  me: string;
};

type Translations = {
  [key in Language]: {
    portfolio: PortfolioTranslations;
    services: ServicesTranslations;
    navbar: NavbarTranslations;
    about: AboutTranslations;
    contact: ContactTranslations;
  };
};

const translations: Translations = {
  'en': {
    portfolio: {
      title: 'Portfolio',
      allProjects: 'ALL PROJECTS',
      web: 'WEB',
      mobile: 'MOBILE',
      bot: 'BOT',
      viewMore: 'View More'
    },
    services: {
      title: 'Services',
      websiteDev: 'Website development',
      mobileDev: 'Mobile development',
      parsers: 'Parsers',
      browserExtensions: 'Development of browser extensions',
      webApp: 'Web Application',
      backendDev: 'Back-end development and support'
    },
    navbar: {
      about: 'ABOUT',
      portfolio: 'PORTFOLIO',
      services: 'SERVICES',
      contacts: 'CONTACTS'
    },
    about: {
      title: "Hello! I'm Your name, I'm a Middle full-stack developer. More than 4 years experience.",
      description: "My goal is to write maintainable, clean and understandable code to process development was enjoyable.",
      skills: 'Skills',
      frontEnd: 'Front-End',
      backEnd: 'Back-End',
      position: 'Middle Developer',
      tools: 'Tools',
      testing: 'Testing',
      company: 'Company',
      viewPortfolio: 'View Portfolio'
    },
    contact: {
      title: 'Contacts',
      name: 'Your Name',
      subtitle: 'Middle Full Stack Developer',
      main: 'MAIN',
      about: 'ABOUT',
      portfolio: 'PORTFOLIO',
      services: 'SERVICES',
      handcrafted: 'Handcrafted by',
      designed: 'Designed by',
      powered: 'Powered by',
      me: 'Your Name'
    }
  },
  'pt-br': {
    portfolio: {
      title: 'Portfólio',
      allProjects: 'TODOS OS PROJETOS',
      web: 'WEB',
      mobile: 'MOBILE',
      bot: 'BOT',
      viewMore: 'Ver Mais'
    },
    services: {
      title: 'Serviços',
      websiteDev: 'Desenvolvimento de websites',
      mobileDev: 'Desenvolvimento mobile',
      parsers: 'Analisador',
      browserExtensions: 'Desenvolvimento de extensões para navegadores',
      webApp: 'Aplicação Web',
      backendDev: 'Desenvolvimento e suporte back-end'
    },
    navbar: {
      about: 'SOBRE',
      portfolio: 'PORTFÓLIO',
      services: 'SERVIÇOS',
      contacts: 'CONTATOS'
    },
    about: {
      title: "Olá! Eu sou o Seu nome, sou um desenvolvedor full-stack pleno. Mais de 4 anos de experiência.",
      description: "Meu objetivo é escrever código sustentável, limpo e compreensível para que o processo de desenvolvimento seja agradável.",
      skills: 'Habilidades',
      frontEnd: 'Front-End',
      backEnd: 'Back-End',
      position: 'Desenvolvedor Pleno',
      tools: 'Ferramentas',
      testing: 'Testes',
      company: 'Empresa',
      viewPortfolio: 'Ver Portfólio'
    },
    contact: {
      title: 'Contatos',
      name: 'Your Name',
      subtitle: 'Desenvolvedor Full Stack Pleno',
      main: 'INÍCIO',
      about: 'SOBRE',
      portfolio: 'PORTFÓLIO',
      services: 'SERVIÇOS',
      handcrafted: 'Criado por',
      designed: 'Desenhado por',
      powered: 'Desenvolvido por',
      me: 'Your Name'
    }
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
