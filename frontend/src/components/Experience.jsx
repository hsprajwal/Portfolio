import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Building, Calendar, MapPin } from 'lucide-react';

const Experience = ({ portfolioData }) => {
  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Virtual experiences and training programs that have shaped my cybersecurity
            and professional development journey.
          </p>
        </div>

        <div className="space-y-8">
          {portfolioData.experience.map((exp, index) => (
            <Card key={exp.id} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Company Icon */}
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <Building size={32} />
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {exp.role}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Building size={16} />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{exp.duration}</span>
                          </div>
                          <Badge variant="outline" className="w-fit">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-800 uppercase tracking-wide">
                          Key Skills Developed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary"
                              className="bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-light text-gray-900 text-center mb-12">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.achievements.map((achievement, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-600">
                      {achievement.description}
                    </p>
                    <div className="text-sm text-gray-500">
                      {achievement.year}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;