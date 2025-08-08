import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const About = ({ portfolioData }) => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                About Me
              </h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
            
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>
                {portfolioData.personal.bio}
              </p>
              <p>
                Currently pursuing my final year in Computer Science Engineering, I'm passionate about 
                leveraging technology to solve real-world problems. My experience spans across web development, 
                cybersecurity, and computer vision, with a keen interest in building scalable and secure applications.
              </p>
              <p>
                I believe in continuous learning and staying updated with the latest technologies. 
                My goal is to contribute to innovative projects while growing as a well-rounded software engineer.
              </p>
            </div>

            {/* Education Card */}
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <GraduationCap className="text-gray-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {portfolioData.education.degree}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {portfolioData.education.university}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{portfolioData.education.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{portfolioData.education.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900">Technical Skills</h3>
              
              {/* Programming Languages */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-800">Programming Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.programming.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Web Technologies */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-800">Web Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.webTech.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Database & Cloud */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-800">Database & Cloud</h4>
                <div className="flex flex-wrap gap-2">
                  {[...portfolioData.skills.database, ...portfolioData.skills.cloud].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-green-50 text-green-800 hover:bg-green-100 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tools & Concepts */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-800">Tools & Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {[...portfolioData.skills.tools, ...portfolioData.skills.concepts].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-purple-50 text-purple-800 hover:bg-purple-100 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;