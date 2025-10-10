'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code, Users, TrendingUp, Clock, DollarSign, Shield, CheckCircle, ArrowRight, Send, Phone, Mail, Calendar, Zap, Globe, Award, Target, Briefcase, ChevronRight, Star } from 'lucide-react';

const BRAND_COLORS = {
  dark: {
    bg: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    text: {
      primary: 'text-white',
      secondary: 'text-blue-100'
    },
    accent: 'bg-blue-400'
  },
  light: {
    bg: 'bg-white',
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600'
    },
    accent: 'bg-blue-800'
  }
};

const NovotionHireUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const sectionRefs = useRef({});

  // Check URL params for pre-filled service
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    if (service) {
      setFormData(prev => ({
        ...prev,
        projectType: service,
        message: `I'm interested in ${service} services. Please contact me with more details.`
      }));
      // Scroll to contact form
      setTimeout(() => {
        const contactSection = document.getElementById('contact-form');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  const whyHireUs = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Delivery',
      description: 'Seamless operations across USA, UK, and India with 24/7 support',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Skilled Professionals',
      description: 'Top 5% talent with proven expertise in modern technologies',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Cost Efficiency',
      description: 'Save up to 60% on operational costs without compromising quality',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Onboarding',
      description: 'Get your dedicated team up and running within 48 hours',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const services = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks and best practices',
      tech: ['React', 'Node.js', 'PHP', 'WordPress'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔗',
      title: 'CRM Solutions',
      description: 'Tailored customer relationship management systems to streamline your sales process',
      tech: ['Salesforce', 'HubSpot', 'Custom CRM'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '👥',
      title: 'HRMS Development',
      description: 'Complete HR management systems for employee lifecycle management',
      tech: ['React', 'Python', 'AWS'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💳',
      title: 'POS Systems',
      description: 'Point of sale solutions with inventory management and analytics',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🛒',
      title: 'E-commerce Development',
      description: 'Full-featured online stores with payment gateway integration',
      tech: ['Shopify', 'WooCommerce', 'Magento'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: '📞',
      title: 'BPO Operations',
      description: 'Complete business process outsourcing including customer support and back office',
      tech: ['Multi-channel', 'CRM Integration'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      tech: ['React Native', 'Flutter', 'Swift'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Cloud infrastructure setup, migration, and management services',
      tech: ['AWS', 'Azure', 'Google Cloud'],
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'PHP', icon: '🐘', category: 'Backend' },
    { name: 'Python', icon: '🐍', category: 'Backend' },
    { name: 'WordPress', icon: '📝', category: 'CMS' },
    { name: 'Laravel', icon: '🔺', category: 'Framework' },
    { name: 'Vue.js', icon: '💚', category: 'Frontend' },
    { name: 'Angular', icon: '🅰️', category: 'Frontend' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'MySQL', icon: '🐬', category: 'Database' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' }
  ];

  const engagementModels = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Dedicated Team',
      description: 'Get a full-time dedicated team working exclusively on your projects',
      features: ['Full-time commitment', 'Direct communication', 'Flexible team size', 'Long-term collaboration'],
      color: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Project-Based',
      description: 'Fixed scope projects with defined timelines and deliverables',
      features: ['Fixed budget', 'Clear milestones', 'Defined scope', 'Quality guaranteed'],
      color: 'from-purple-500 to-pink-500',
      popular: false
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Hourly Hiring',
      description: 'Pay only for the hours worked with complete flexibility',
      features: ['Flexible hours', 'No minimum commitment', 'Scale as needed', 'Transparent billing'],
      color: 'from-green-500 to-emerald-500',
      popular: false
    }
  ];

  const hiringSteps = [
    {
      step: 1,
      title: 'Share Requirements',
      description: 'Tell us about your project needs, tech stack, and timeline',
      icon: '📋'
    },
    {
      step: 2,
      title: 'Shortlist Candidates',
      description: 'We present pre-vetted professionals matching your criteria',
      icon: '🎯'
    },
    {
      step: 3,
      title: 'Interview & Select',
      description: 'Interview candidates and choose the perfect fit for your team',
      icon: '💬'
    },
    {
      step: 4,
      title: 'Onboard & Start',
      description: 'Quick onboarding and your team starts delivering in 48 hours',
      icon: '🚀'
    }
  ];

  const caseStudies = [
    {
      client: 'E-commerce Giant',
      industry: 'Retail',
      challenge: 'Needed to scale customer support during peak season',
      solution: 'Deployed 50-member BPO team with multi-channel support',
      results: ['40% increase in customer satisfaction', '60% reduction in response time', '500K+ tickets handled'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      client: 'FinTech Startup',
      industry: 'Finance',
      challenge: 'Required custom CRM for complex sales pipeline',
      solution: 'Built tailored CRM with automation and analytics',
      results: ['200% increase in sales efficiency', '50% faster lead conversion', '$2M+ revenue growth'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      client: 'Healthcare Provider',
      industry: 'Healthcare',
      challenge: 'Manual HR processes causing inefficiencies',
      solution: 'Implemented comprehensive HRMS solution',
      results: ['80% reduction in admin time', '100% paperless processes', '95% employee satisfaction'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      role: 'CTO',
      content: 'Novotion delivered exceptional developers who seamlessly integrated with our team. The quality of work exceeded our expectations.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
    },
    {
      name: 'Michael Chen',
      company: 'Global Retail Co.',
      role: 'Operations Director',
      content: 'Their BPO services helped us scale during our busiest season. Professional, efficient, and cost-effective.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150'
    },
    {
      name: 'Emily Rodriguez',
      company: 'StartupHub',
      role: 'CEO',
      content: 'From day one, the dedicated team from Novotion became an integral part of our company. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150'
    }
  ];

  useEffect(() => {
    const observers = {};

    Object.keys(sectionRefs.current).forEach(key => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you within 24 hours.');
    setFormData({ name: '', company: '', email: '', phone: '', projectType: '', message: '' });
  };

  const handleServiceClick = (serviceName) => {
    setFormData({
      ...formData,
      projectType: serviceName,
      message: `I'm interested in ${serviceName} services. Please contact me with more details.`
    });

    setTimeout(() => {
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={setRef('hero')}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold tracking-wider uppercase animate-pulse">
                Trusted by 500+ Global Clients
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hire Expert Developers &<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                BPO Teams from Novotion
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12">
              Scale your business seamlessly with our skilled professionals. Global delivery, cost efficiency, and unmatched quality guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire from Novotion */}
      <section ref={setRef('why')} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.why ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Hire from <span className="text-blue-800">Novotion?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Partner with a trusted BPO and development company serving clients worldwide since 2021
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyHireUs.map((item, index) => (
              <div
                key={item.title}
                className={`group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-gray-100 ${
                  isVisible.why ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={setRef('services')} className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Expertise & <span className="text-blue-800">Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions across development and business process outsourcing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                onClick={() => handleServiceClick(service.title)}
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-gray-100 cursor-pointer ${
                  isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-blue-800 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={setRef('tech')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.tech ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Technologies & Tools
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              We work with cutting-edge technologies to deliver world-class solutions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-110 hover:bg-white/20 transition-all duration-300 text-center ${
                  isVisible.tech ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{tech.name}</div>
                <div className="text-blue-200 text-xs">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section ref={setRef('models')} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.models ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Flexible <span className="text-blue-800">Engagement Models</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the hiring model that best fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {engagementModels.map((model, index) => (
              <div
                key={model.title}
                className={`relative group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border-2 ${
                  model.popular ? 'border-blue-500' : 'border-gray-100'
                } ${isVisible.models ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {model.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`w-16 h-16 bg-gradient-to-br ${model.color} rounded-2xl flex items-center justify-center mb-6 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {model.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{model.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{model.description}</p>
                <ul className="space-y-3 mb-6">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleServiceClick(model.title)}
                  className={`w-full bg-gradient-to-r ${model.color} text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  Choose This Model
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section ref={setRef('process')} className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-blue-800">Works</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent process to get your team up and running
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-800 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {hiringSteps.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative transform transition-all duration-1000 ${
                    isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative z-10">
                    <div className="text-5xl mb-4 text-center">{step.icon}</div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-sm text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={setRef('cases')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.cases ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Real-world examples of how we've helped businesses achieve their goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  isVisible.cases ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${study.color} rounded-lg flex items-center justify-center text-white text-xl font-bold`}>
                    <Briefcase />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{study.client}</h3>
                    <p className="text-sm text-gray-500">{study.industry}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">The Challenge</h4>
                  <p className="text-sm text-gray-600 italic">"{study.challenge}"</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Our Solution</h4>
                  <p className="text-sm text-gray-600">"{study.solution}"</p>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Results</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                        <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleServiceClick('Case Study: ' + study.client)}
                  className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={setRef('testimonials')} className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from our satisfied partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-4 border-blue-500" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" ref={setRef('contact')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Fill out the form below to get a free quote and discover how we can help your business.
            </p>
          </div>
          <div className={`max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">Interested in</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="">Select a service or model</option>
                  <optgroup label="Services">
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </optgroup>
                  <optgroup label="Hiring Models">
                    {engagementModels.map(m => <option key={m.title} value={m.title}>{m.title}</option>)}
                  </optgroup>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Submit Request
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovotionHireUs;