import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink, Eye, Code2, Database } from 'lucide-react';

const Projects = ({ portfolioData }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Full-Stack', 'Computer Vision'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Full-Stack':
        return <Code2 size={20} />;
      case 'Computer Vision':
        return <Eye size={20} />;
      case 'Game Development':
        return <Database size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my technical projects demonstrating full-stack development,
            computer vision, and problem-solving capabilities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-200 ${
                selectedCategory === category 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <Button 
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-gray-900 text-white hover:bg-gray-800"
                        onClick={() => window.open(project.liveDemo, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-1" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-600">
                      {getCategoryIcon(project.category)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-gray-800 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="secondary" 
                          className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          +{project.techStack.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 text-gray-600 hover:text-gray-900"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => window.open(project.liveDemo, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            onClick={() => window.open(portfolioData.personal.github, '_blank')}
            className="px-8 py-3 text-lg border-gray-300 text-gray-900 hover:bg-gray-50 transition-all hover:scale-105"
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;