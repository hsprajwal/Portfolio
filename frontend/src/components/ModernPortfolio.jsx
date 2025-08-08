import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Download,
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Send,
  ChevronRight,
  User,
  Trophy
} from 'lucide-react';

const ModernPortfolio = ({ data }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'experience', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900">{data.personal.name}</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Education', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Available for opportunities</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm <span className="text-blue-600">{data.personal.name}</span>
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 font-light">
                  {data.personal.subtitle}
                </h2>
                <p className="text-lg text-gray-600 max-w-lg">
                  {data.personal.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  View My Work
                  <ChevronRight size={20} className="ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(data.personal.resumeUrl, '_blank')}
                  className="border-gray-300 px-8 py-3"
                >
                  <Download size={20} className="mr-2" />
                  Resume
                </Button>
              </div>

              <div className="flex space-x-4">
                <a href={data.personal.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="p-2">
                    <Github size={20} />
                  </Button>
                </a>
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="p-2">
                    <Linkedin size={20} />
                  </Button>
                </a>
                <a href={`mailto:${data.personal.email}`}>
                  <Button variant="outline" size="sm" className="p-2">
                    <Mail size={20} />
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-30 animate-pulse animation-delay-200"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-40 animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <User className="text-blue-600" size={24} />
                <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {data.personal.bio}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-gray-400" />
                  <span className="text-gray-600">{data.personal.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-gray-600">{data.personal.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-gray-400" />
                  <span className="text-gray-600">{data.personal.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Technical Skills</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {[...data.skills.frameworks, ...data.skills.tools].map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cloud & Databases</h4>
                  <div className="flex flex-wrap gap-2">
                    {[...data.skills.cloud, ...data.skills.databases].map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700">
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

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <GraduationCap className="text-blue-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      <p className="text-gray-500">{edu.location}</p>
                      {edu.coursework && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-700 font-medium mb-2">Relevant Coursework:</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course, courseIndex) => (
                              <Badge key={courseIndex} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-gray-500 font-medium">{edu.duration}</p>
                      {edu.cgpa && (
                        <p className="text-green-600 font-semibold">{edu.cgpa}</p>
                      )}
                      {edu.percentage && (
                        <p className="text-green-600 font-semibold">{edu.percentage}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <Briefcase className="text-blue-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <Card key={exp.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <Badge variant="outline" className="w-fit">{exp.type}</Badge>
                    </div>
                    <p className="text-gray-500 font-medium mt-2 md:mt-0">{exp.duration}</p>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Key Skills Developed:</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-indigo-50 text-indigo-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {exp.link && (
                    <a 
                      href={exp.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-3"
                    >
                      View Certificate <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-12">
            <Code2 className="text-blue-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((project) => (
              <Card key={project.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      <Badge className="bg-green-100 text-green-800 text-xs">{project.status}</Badge>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-blue-600 font-medium mb-3">{project.subtitle}</p>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight size={16} className="text-blue-600 mt-0.5 mr-1 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-3xl font-bold text-gray-900">Let's Connect</h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. 
              Let's build something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-blue-600" />
                      <a href={`mailto:${data.personal.email}`} className="text-gray-600 hover:text-blue-600">
                        {data.personal.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-blue-600" />
                      <span className="text-gray-600">{data.personal.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-blue-600" />
                      <span className="text-gray-600">{data.personal.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Me Online</h3>
                  <div className="flex space-x-4">
                    <a href={data.personal.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github size={20} />
                      </Button>
                    </a>
                    <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Linkedin size={20} />
                      </Button>
                    </a>
                    <a href={data.personal.leetcode} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="text-xs px-2">
                        LC
                      </Button>
                    </a>
                    <a href={data.personal.geeksforgeeks} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="text-xs px-2">
                        GFG
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2025 {data.personal.name}. Built with React & Tailwind CSS.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${data.personal.email}`} className="text-gray-400 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernPortfolio;