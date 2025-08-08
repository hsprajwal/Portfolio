import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

const Contact = ({ portfolioData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: portfolioData.personal.location,
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      label: "GitHub",
      href: portfolioData.personal.github
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      href: portfolioData.personal.linkedin
    },
    {
      icon: <Mail size={24} />,
      label: "Email",
      href: `mailto:${portfolioData.personal.email}`
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborating on interesting projects,
            or simply having a conversation about technology and innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 resize-none"
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
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

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in touch
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you're a recruiter looking for talent, a fellow developer interested in collaboration,
                or someone with an exciting project idea, I'd love to hear from you. Let's build something amazing together!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="border border-gray-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900">Available for opportunities</p>
                    <p className="text-sm text-gray-600">
                      Open to full-time positions, internships, and freelance projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;