import React from 'react';
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';

const Footer = ({ portfolioData }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand/Name Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              {portfolioData.personal.name}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Computer Science student passionate about creating innovative solutions
              through code and technology. Always eager to learn and take on new challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href="#about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a 
                href="#experience"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Experience
              </a>
              <a 
                href="#projects"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Projects
              </a>
              <a 
                href="#contact"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Let's Connect</h4>
            <div className="flex space-x-4">
              <a 
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={`mailto:${portfolioData.personal.email}`}
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-gray-300 text-sm">
                <span className="flex items-center space-x-1">
                  <Mail size={14} />
                  <span>{portfolioData.personal.email}</span>
                </span>
              </p>
              <p className="text-gray-300 text-sm mt-1">
                <span>{portfolioData.personal.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {currentYear} {portfolioData.personal.name}. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Built with</span>
              <Heart size={14} className="text-red-500" />
              <span>using React & Tailwind CSS</span>
              <Code size={14} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;