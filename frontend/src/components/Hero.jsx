import React from 'react';
import { Button } from './ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero = ({ portfolioData }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-light text-gray-900 tracking-tight">
                {portfolioData.personal.name}
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 font-light">
                {portfolioData.personal.subtitle}
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Final year Computer Science student passionate about building innovative solutions
                through full-stack development and cybersecurity. Ready to contribute to impactful projects
                and grow in the tech industry.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg transition-all hover:scale-105"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(portfolioData.personal.resumeUrl, '_blank')}
              className="border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-3 text-lg transition-all hover:scale-105"
            >
              <Download size={20} className="mr-2" />
              Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6">
            <a 
              href={portfolioData.personal.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a 
              href={portfolioData.personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={`mailto:${portfolioData.personal.email}`}
              className="text-gray-600 hover:text-gray-900 transition-all hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;