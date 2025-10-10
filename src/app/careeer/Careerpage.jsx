'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, TrendingUp, Heart, DollarSign, BookOpen, Coffee, Globe, ChevronRight, Upload, Send, MapPin, Clock, ChevronLeft, ChevronRight as ChevronRightIcon, X } from 'lucide-react';
import EmployeeTestimonials from './EmployeeTestimonials';

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

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const NovotionCareers = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    position: ''
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const sectionRefs = useRef({});
  const autoSlideTimerRef = useRef(null);
  const galleryTimerRef = useRef(null);
  const valuesTimerRef = useRef(null);

  const coreValues = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborative Culture',
      description: 'Work with talented people who value teamwork',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Mindset',
      description: 'Continuous learning and career advancement',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Work-Life Balance',
      description: 'Flexible schedules that respect your time',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Impact',
      description: 'Make a difference across three continents',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Innovation',
      description: 'Push boundaries and embrace new ideas',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Inclusive Environment',
      description: 'Diversity and inclusion at our core',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const benefits = [
    { icon: <DollarSign className="w-5 h-5" />, title: 'Competitive Salary', desc: 'Industry-leading compensation' },
    { icon: <Heart className="w-5 h-5" />, title: 'Health Coverage', desc: 'Comprehensive medical insurance' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'Learning Budget', desc: 'Annual budget for growth' },
    { icon: <Coffee className="w-5 h-5" />, title: 'Flexible Hours', desc: 'Work when productive' },
    { icon: <Globe className="w-5 h-5" />, title: 'Remote Options', desc: 'Work from anywhere' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Performance Bonus', desc: 'Quarterly incentives' },
    { icon: <Users className="w-5 h-5" />, title: 'Team Events', desc: 'Regular celebrations' },
    { icon: <Briefcase className="w-5 h-5" />, title: 'Career Growth', desc: 'Clear advancement paths' }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Senior BPO Operations Manager',
      category: 'Operations',
      location: 'India / Remote',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      experience: '5+ years',
      description: 'Lead our operations team and drive excellence in client service delivery across global markets.'
    },
    {
      id: 2,
      title: 'Customer Success Specialist',
      category: 'Customer Service',
      location: 'USA / UK',
      type: 'Full-time',
      salary: '$45,000 - $65,000',
      experience: '2+ years',
      description: 'Be the voice of our clients and ensure exceptional customer experiences through dedicated support.'
    },
    {
      id: 3,
      title: 'Sales Development Representative',
      category: 'Sales',
      location: 'Remote',
      type: 'Full-time',
      salary: '$50,000 - $75,000',
      experience: '1+ years',
      description: 'Generate leads and build relationships with potential clients globally through strategic outreach.'
    },
    {
      id: 4,
      title: 'Quality Assurance Analyst',
      category: 'Quality',
      location: 'India',
      type: 'Full-time',
      salary: '$35,000 - $55,000',
      experience: '3+ years',
      description: 'Maintain our high standards and ensure service quality excellence through rigorous monitoring.'
    },
    {
      id: 5,
      title: 'HR & Talent Acquisition Manager',
      category: 'HR',
      location: 'Remote',
      type: 'Full-time',
      salary: '$60,000 - $90,000',
      experience: '4+ years',
      description: 'Build our team by attracting top talent and creating exceptional employee experiences.'
    },
    {
      id: 6,
      title: 'Digital Marketing Specialist',
      category: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$45,000 - $70,000',
      experience: '2+ years',
      description: 'Drive our brand presence across digital channels and generate qualified leads through campaigns.'
    },
    {
      id: 7,
      title: 'Technical Support Engineer',
      category: 'Technical',
      location: 'Remote',
      type: 'Full-time',
      salary: '$55,000 - $85,000',
      experience: '3+ years',
      description: 'Provide technical expertise and support to ensure smooth operations and client satisfaction.'
    },
    {
      id: 8,
      title: 'Data Analytics Specialist',
      category: 'Analytics',
      location: 'India / Remote',
      type: 'Full-time',
      salary: '$65,000 - $95,000',
      experience: '4+ years',
      description: 'Transform data into actionable insights to drive business decisions and optimize performance.'
    }
  ];

  const hiringSteps = [
    {
      step: 1,
      title: 'Apply',
      description: 'Submit your application through our career portal',
      icon: '📝'
    },
    {
      step: 2,
      title: 'Review',
      description: 'Our team reviews your profile and experience',
      icon: '👀'
    },
    {
      step: 3,
      title: 'Interview',
      description: 'Meet our team through video or in-person interviews',
      icon: '💬'
    },
    {
      step: 4,
      title: 'Offer',
      description: 'Welcome to the Novotion family!',
      icon: '🎉'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940', caption: 'Team Collaboration' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940', caption: 'Innovation Workshops' },
    { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2940', caption: 'Celebrating Success' },
    { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2940', caption: 'Modern Workspace' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940', caption: 'Team Building' },
    { url: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=2940', caption: 'Creative Sessions' },
    { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2940', caption: 'Professional Growth' },
    { url: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=2940', caption: 'Global Team' }
  ];

  const categories = ['All', 'Operations', 'Customer Service', 'Sales', 'Quality', 'HR', 'Marketing', 'Technical', 'Analytics'];

  const filteredJobs = selectedCategory === 'All' 
    ? jobListings 
    : jobListings.filter(job => job.category === selectedCategory);

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

  // Auto slide effect for benefits
  useEffect(() => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }

    autoSlideTimerRef.current = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
    }, 3000);

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [benefits.length]);

  // Auto slide effect for gallery
  useEffect(() => {
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
    }

    galleryTimerRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => {
      if (galleryTimerRef.current) {
        clearInterval(galleryTimerRef.current);
      }
    };
  }, [galleryImages.length]);

  // Auto slide effect for values (mobile only)
  useEffect(() => {
    if (valuesTimerRef.current) {
      clearInterval(valuesTimerRef.current);
    }

    valuesTimerRef.current = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3000);

    return () => {
      if (valuesTimerRef.current) {
        clearInterval(valuesTimerRef.current);
      }
    };
  }, [coreValues.length]);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  const scrollToPositions = () => {
    sectionRefs.current.positions?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData(prev => ({ ...prev, position: job.title }));
    setShowApplicationModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', { ...formData, job: selectedJob });
    alert(`Thank you for applying to ${formData.position}! We will review your application and get back to you soon.`);
    setFormData({ name: '', email: '', phone: '', message: '', position: '' });
    setSelectedJob(null);
    setShowApplicationModal(false);
    setShowApplicationForm(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Resume uploaded:', file.name);
    }
  };

  // Slider functions
  const nextValue = () => {
    if (valuesTimerRef.current) {
      clearInterval(valuesTimerRef.current);
    }
    setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
    valuesTimerRef.current = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3000);
  };

  const prevValue = () => {
    if (valuesTimerRef.current) {
      clearInterval(valuesTimerRef.current);
    }
    setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
    valuesTimerRef.current = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3000);
  };

  const goToValueSlide = (slideIndex) => {
    if (valuesTimerRef.current) {
      clearInterval(valuesTimerRef.current);
    }
    setCurrentValueIndex(slideIndex);
    valuesTimerRef.current = setInterval(() => {
      setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3000);
  };

  const nextBenefit = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
    }, 3000);
  };

  const prevBenefit = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    setCurrentBenefitIndex((prev) => (prev - 4 + benefits.length) % benefits.length);
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
    }, 3000);
  };

  const goToBenefitSlide = (slideIndex) => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    setCurrentBenefitIndex(slideIndex * 4);
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
    }, 3000);
  };

  const nextGallery = () => {
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
    }
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    galleryTimerRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
  };

  const prevGallery = () => {
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
    }
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    galleryTimerRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
  };

  const goToGallerySlide = (slideIndex) => {
    if (galleryTimerRef.current) {
      clearInterval(galleryTimerRef.current);
    }
    setCurrentGalleryIndex(slideIndex);
    galleryTimerRef.current = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000); 
  };

  const visibleBenefits = benefits.slice(currentBenefitIndex, currentBenefitIndex + 4);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
    <section 
        ref={setRef('hero')}
        className={`relative flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg}`}
    >
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
            <div className={`text-center transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold tracking-wider uppercase animate-pulse">
                        Join Our Team
                    </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    Build Your Career <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                        With Novotion
                    </span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                    Where innovation meets opportunity. Join 500+ global clients' trusted BPO partner and shape the future of customer excellence.
                </p>
                <button 
                    onClick={scrollToPositions}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                >
                    View Open Positions
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    </section>

      {/* About Working Section with Animated Numbers */}
      <section ref={setRef('about')} className="py-12 bg-slate-50 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-800">Novotion?</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At Novotion, we don't just offer jobs—we build careers. Since 2021, we've been creating an environment where talent thrives, innovation flourishes, and every team member contributes to our global success story.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-4 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="text-2xl font-bold text-blue-800 mb-1">
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="text-xs text-gray-600">Global Clients</div>
              </div>
              <div className="bg-white rounded-xl p-4 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="text-2xl font-bold text-blue-800 mb-1">
                  <AnimatedCounter target={3} />
                </div>
                <div className="text-xs text-gray-600">Countries</div>
              </div>
              <div className="bg-white rounded-xl p-4 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="text-2xl font-bold text-blue-800 mb-1">
                  24/7
                </div>
                <div className="text-xs text-gray-600">Operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Values Section with Auto-Sliding */}
      <section ref={setRef('values')} className={`py-12 ${BRAND_COLORS.dark.bg} min-h-[60vh] flex items-center`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Our Culture & Values
            </h2>
            <p className="text-blue-100 text-sm max-w-2xl mx-auto">
              The principles that make Novotion a great place to work
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className={`group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 ${
                  isVisible.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="text-white mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-blue-100 text-xs leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Mobile Slider with Auto-Slide */}
          <div className="lg:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentValueIndex * 100}%)` }}
              >
                {coreValues.map((value, index) => (
                  <div key={value.title} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center transform transition-all duration-300 hover:scale-105">
                      <div className="text-white mb-4 mx-auto w-12 h-12 flex items-center justify-center">
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Slider Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={prevValue} 
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {coreValues.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToValueSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentValueIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextValue} 
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-slide indicator */}
      
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section with Auto-Sliding Carousel */}
      <section ref={setRef('benefits')} className="py-12 bg-slate-50 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Perks & <span className="text-blue-800">Benefits</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              We invest in your success and well-being
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 ${
                  isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center mb-3 text-white transform group-hover:scale-110 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-gray-600 text-xs">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Mobile Carousel with Auto-Slide */}
          <div className="lg:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${(currentBenefitIndex / 4) * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(benefits.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-3 px-2">
                    {benefits.slice(slideIndex * 4, slideIndex * 4 + 4).map((benefit, index) => (
                      <div 
                        key={`${slideIndex}-${index}`} 
                        className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center h-full transform transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center mb-2 text-white mx-auto">
                          {benefit.icon}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-xs">{benefit.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Slider Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={prevBenefit} 
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(benefits.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToBenefitSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === Math.floor(currentBenefitIndex / 4) 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextBenefit} 
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-slide indicator */}
           
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section ref={setRef('positions')} className="py-12 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible.positions ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Open <span className="text-blue-800">Positions</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
              Find your perfect role and start your journey with us
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs ${
                    selectedCategory === category
                      ? 'bg-blue-800 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className={`group bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 ${
                  isVisible.positions ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                    {job.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <span>💰 {job.salary}</span>
                    <span>📊 {job.experience}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                </div>
                <button 
                  onClick={() => handleApplyClick(job)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Life at Novotion Gallery with Auto-Sliding */}
      <section ref={setRef('gallery')} className={`py-12 ${BRAND_COLORS.dark.bg} min-h-[50vh] flex items-center`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible.gallery ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Life at Novotion
            </h2>
            <p className="text-blue-100 text-sm max-w-2xl mx-auto">
              Experience our vibrant culture and collaborative environment
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group relative rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500 ${
                  isVisible.gallery ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-xs">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Mobile Gallery with Auto-Slide */}
          <div className="lg:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
                      <img 
                        src={image.url} 
                        alt={image.caption}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Slider Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={prevGallery} 
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToGallerySlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentGalleryIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextGallery} 
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg hover:shadow-xl"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-slide indicator */}
        
          </div>
        </div>
      </section>

      <EmployeeTestimonials/>

      {/* Hiring Process Section */}
      <section ref={setRef('process')} className="py-12 bg-slate-50 min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Our Hiring <span className="text-blue-800">Process</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              A transparent journey to joining our team
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {hiringSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative transform transition-all duration-1000 ${
                  isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-center">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.position ? `Apply for ${formData.position}` : 'Apply for Position'}
              </h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Position *</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                  >
                    <option value="">Select a position</option>
                    {jobListings.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title} - {job.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Cover Letter</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none text-sm"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Resume / CV *</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-all text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload your resume (PDF, DOC, DOCX)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section ref={setRef('cta')} className={`py-12 ${BRAND_COLORS.dark.bg} min-h-[50vh] flex items-center`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-2xl mx-auto transform transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Don't see the perfect role? We're always looking for talented individuals who share our passion for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={scrollToPositions}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm"
              >
                Browse All Positions
              </button>
              <a
                href="mailto:careers@novotion.com"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm inline-flex items-center justify-center"
              >
                Contact HR Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovotionCareers;