import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = ({ portfolioData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div 
            className="text-xl font-semibold text-gray-900 cursor-pointer transition-transform hover:scale-105"
            onClick={() => scrollToSection('hero')}
          >
            {portfolioData.personal.name}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={portfolioData.personal.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href={portfolioData.personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Contact
              </button>
              <div className="flex items-center space-x-4 px-4 pt-4 border-t">
                <a 
                  href={portfolioData.personal.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={portfolioData.personal.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600"
                >
                  <Linkedin size={20} />
                </a>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gray-900 text-white px-4 py-2"
                >
                  Let's Talk
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;