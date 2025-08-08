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
  Trophy,
  Star,
  Calendar,
  Building,
  Eye
} from 'lucide-react';

const PremiumPortfolio = ({ data }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message sent successfully!",
          description: result.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.detail || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {data.personal.name}
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Education', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  <span className="text-green-400 text-sm font-medium">Available for opportunities</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="block text-white">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {data.personal.name}
                  </span>
                </h1>
                
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
                    {data.personal.subtitle}
                  </h2>
                  <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                    {data.personal.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  View My Work
                  <ChevronRight size={20} className="ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open(data.personal.resumeUrl, '_blank')}
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Download size={20} className="mr-2" />
                  Resume
                </Button>
              </div>

              <div className="flex space-x-6">
                {[
                  { href: data.personal.github, icon: Github, label: "GitHub" },
                  { href: data.personal.linkedin, icon: Linkedin, label: "LinkedIn" },
                  { href: `mailto:${data.personal.email}`, icon: Mail, label: "Email" }
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group-hover:border-blue-400/50">
                      <Icon size={24} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:flex justify-center relative">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-lg animate-pulse animation-delay-1000"></div>
                <div className="absolute inset-16 bg-gradient-to-br from-blue-300/50 to-purple-300/50 rounded-full blur-md animate-pulse animation-delay-2000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 size={80} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <User className="text-white" size={24} />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    About Me
                  </h2>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {data.personal.bio}
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, text: data.personal.location },
                  { icon: Mail, text: data.personal.email },
                  { icon: Phone, text: data.personal.phone }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Programming Languages",
                    skills: data.skills.technical,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    title: "Frameworks & Tools",
                    skills: [...data.skills.frameworks, ...data.skills.tools],
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    title: "Cloud & Databases",
                    skills: [...data.skills.cloud, ...data.skills.databases],
                    color: "from-green-500 to-teal-500"
                  }
                ].map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-200">{category.title}</h4>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className={`bg-gradient-to-r ${category.color} text-white border-0 px-4 py-2 font-medium hover:scale-105 transition-transform`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Education
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8">
            {data.education.map((edu, index) => (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-blue-400 font-semibold text-lg">{edu.institution}</p>
                        <p className="text-gray-400">{edu.location}</p>
                      </div>
                      
                      {edu.coursework && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-gray-300">Relevant Coursework:</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course, courseIndex) => (
                              <Badge 
                                key={courseIndex}
                                variant="outline" 
                                className="border-white/20 text-gray-300 hover:border-blue-400/50 hover:text-blue-400 transition-colors"
                              >
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center justify-end space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <p className="text-gray-300 font-medium">{edu.duration}</p>
                      </div>
                      {edu.cgpa && (
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                          <Star size={16} className="text-green-400" />
                          <span className="text-green-400 font-bold">{edu.cgpa}</span>
                        </div>
                      )}
                      {edu.percentage && (
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                          <Star size={16} className="text-green-400" />
                          <span className="text-green-400 font-bold">{edu.percentage}</span>
                        </div>
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
      <section id="experience" className="py-24 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8">
            {data.experience.map((exp, index) => (
              <Card 
                key={exp.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <div className="flex items-center space-x-3">
                              <Building size={16} className="text-blue-400" />
                              <p className="text-blue-400 font-semibold">{exp.company}</p>
                            </div>
                            <Badge 
                              variant="outline"
                              className="border-purple-400/50 text-purple-400 bg-purple-500/10"
                            >
                              {exp.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                          Key Skills Developed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-400/30 hover:scale-105 transition-transform"
                            >
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
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          View Certificate 
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                    </div>

                    <div className="flex md:justify-end">
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-300 font-medium">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Code2 className="text-white" size={24} />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <Card 
                key={project.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02]"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                        <Eye size={16} className="text-blue-400" />
                      </div>
                      <Badge 
                        variant="outline"
                        className="border-blue-400/50 text-blue-400 bg-blue-500/10"
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <Badge 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-blue-400 font-medium">{project.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-200">Key Features:</h4>
                    <div className="space-y-2">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          className="bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-400/30 hover:border-blue-400/50 hover:text-blue-400 transition-all"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.github, '_blank')}
                      className="flex-1 border-white/20 text-gray-300 hover:border-blue-400/50 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => window.open(project.github, '_blank')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Mail className="text-white" size={24} />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Connect
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Ready to bring innovative ideas to life? Let's discuss how we can build something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Name</label>
                        <Input
                          name="name"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Subject</label>
                      <Input
                        name="subject"
                        placeholder="What's this about?"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Tell me about your project or opportunity..."
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400/50 focus:ring-blue-400/20 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <>
                          <Send size={20} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: data.personal.email, href: `mailto:${data.personal.email}` },
                      { icon: Phone, text: data.personal.phone, href: `tel:${data.personal.phone}` },
                      { icon: MapPin, text: data.personal.location, href: null }
                    ].map(({ icon: Icon, text, href }, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
                          <Icon size={18} className="text-blue-400" />
                        </div>
                        {href ? (
                          <a href={href} className="text-gray-300 hover:text-blue-400 transition-colors">
                            {text}
                          </a>
                        ) : (
                          <span className="text-gray-300">{text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Connect Online</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { href: data.personal.github, icon: Github, label: "GitHub" },
                      { href: data.personal.linkedin, icon: Linkedin, label: "LinkedIn" },
                      { href: data.personal.leetcode, label: "LC" },
                      { href: data.personal.geeksforgeeks, label: "GFG" }
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <div className="p-4 border border-white/20 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-400/50 transition-all duration-300 text-center">
                          {Icon ? (
                            <Icon size={24} className="text-gray-400 group-hover:text-blue-400 transition-colors mx-auto mb-2" />
                          ) : (
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded text-white text-xs flex items-center justify-center mx-auto mb-2 font-bold">
                              {label}
                            </div>
                          )}
                          <span className="text-sm text-gray-300 group-hover:text-blue-400 transition-colors">
                            {label}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2025 {data.personal.name}. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              {[
                { href: data.personal.github, icon: Github },
                { href: data.personal.linkedin, icon: Linkedin },
                { href: `mailto:${data.personal.email}`, icon: Mail }
              ].map(({ href, icon: Icon }, index) => (
                <a 
                  key={index}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPortfolio;