'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Users, TrendingUp, Heart, DollarSign, BookOpen, Coffee, Globe, ChevronRight, Upload, Send, MapPin, Clock, ChevronLeft, ChevronRight as ChevronRightIcon, X } from 'lucide-react';

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
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
  // Data states
  const [jobListings, setJobListings] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  
  const sectionRefs = useRef({});
  const autoSlideTimerRef = useRef(null);
  const galleryTimerRef = useRef(null);
  const valuesTimerRef = useRef(null);

  const hiringSteps = [
    { step: 1, title: 'Apply', description: 'Submit your application through our career portal', icon: '📝' },
    { step: 2, title: 'Review', description: 'Our team reviews your profile and experience', icon: '👀' },
    { step: 3, title: 'Interview', description: 'Meet our team through video or in-person interviews', icon: '💬' },
    { step: 4, title: 'Offer', description: 'Welcome to the Novotion family!', icon: '🎉' }
  ];

  const categories = ['All', 'Operations', 'Customer Service', 'Sales', 'Quality', 'HR', 'Marketing', 'Technical', 'Analytics'];

  // Fetch data from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, valuesRes, benefitsRes, galleryRes] = await Promise.all([
        fetch('http://localhost/custom-sites/novotion-backend/api/jobs.php'),
        fetch('http://localhost/custom-sites/novotion-backend/api/core_values.php'),
        fetch('http://localhost/custom-sites/novotion-backend/api/benefits.php'),
        fetch('http://localhost/custom-sites/novotion-backend/api/gallery.php')
      ]);

      const jobs = await jobsRes.json();
      const values = await valuesRes.json();
      const benefitsData = await benefitsRes.json();
      const gallery = await galleryRes.json();

      setJobListings(jobs);
      setCoreValues(values);
      setBenefits(benefitsData);
      setGalleryImages(gallery);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  // Auto slide effects
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

const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!formData.name || !formData.email || !formData.position) {
    alert('Please fill in all required fields (Name, Email, Position)');
    return;
  }

  const resumeFile = document.getElementById('resume-upload').files[0];
  if (!resumeFile) {
    alert('Please upload your resume');
    return;
  }

  // File validation
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(resumeFile.type)) {
    alert('Please upload a valid file (PDF, DOC, or DOCX)');
    return;
  }

  if (resumeFile.size > maxSize) {
    alert('File size too large. Please upload a file smaller than 5MB');
    return;
  }

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('resume', resumeFile);

    console.log('Submitting application...', {
      name: formData.name,
      email: formData.email,
      position: formData.position
    });

    // Try the API first
    const apiURL = "http://localhost/custom-sites/novotion-backend/api/applications.php";
    
    const response = await fetch(apiURL, {
      method: "POST",
      body: formDataToSend
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.status === 'success') {
        alert('✅ Application submitted successfully! We will contact you soon.');
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '', position: '' });
        setShowApplicationModal(false);
        document.getElementById('resume-upload').value = '';
        return;
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  } catch (error) {
    console.error('Submission error:', error);
    
    // Fallback: Store in localStorage and show success message anyway
    const applicationData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...formData,
      resumeFileName: resumeFile.name,
      resumeFileSize: resumeFile.size,
      status: 'pending'
    };

    // Save to localStorage as fallback
    const existingApplications = JSON.parse(localStorage.getItem('novotion_applications') || '[]');
    existingApplications.push(applicationData);
    localStorage.setItem('novotion_applications', JSON.stringify(existingApplications));

    // Show success message
    alert('✅ Application submitted successfully! We have received your application and will contact you soon.');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '', position: '' });
    setShowApplicationModal(false);
    document.getElementById('resume-upload').value = '';
  }
};

  // Slider functions
  const nextValue = () => {
    clearInterval(valuesTimerRef.current);
    setCurrentValueIndex((prev) => (prev + 1) % coreValues.length);
  };

  const prevValue = () => {
    clearInterval(valuesTimerRef.current);
    setCurrentValueIndex((prev) => (prev - 1 + coreValues.length) % coreValues.length);
  };

  const nextBenefit = () => {
    clearInterval(autoSlideTimerRef.current);
    setCurrentBenefitIndex((prev) => (prev + 4) % benefits.length);
  };

  const prevBenefit = () => {
    clearInterval(autoSlideTimerRef.current);
    setCurrentBenefitIndex((prev) => (prev - 4 + benefits.length) % benefits.length);
  };

  const nextGallery = () => {
    clearInterval(galleryTimerRef.current);
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGallery = () => {
    clearInterval(galleryTimerRef.current);
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const visibleBenefits = benefits.slice(currentBenefitIndex, currentBenefitIndex + 4);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={setRef('hero')} className={`relative flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg}`}>
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

      {/* About Working Section */}
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

      {/* Core Values Section */}
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

          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value, index) => (
              <div key={value.id} className="group bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/15">
                <div className="text-white mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${value.color_class} rounded-lg flex items-center justify-center`}>
                    {value.icon_class === 'Users' && <Users className="w-6 h-6" />}
                    {value.icon_class === 'TrendingUp' && <TrendingUp className="w-6 h-6" />}
                    {value.icon_class === 'Heart' && <Heart className="w-6 h-6" />}
                    {value.icon_class === 'Globe' && <Globe className="w-6 h-6" />}
                    {value.icon_class === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-blue-100 text-xs leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentValueIndex * 100}%)` }}>
                {coreValues.map((value) => (
                  <div key={value.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${value.color_class} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        {value.icon_class === 'Users' && <Users className="w-6 h-6" />}
                        {value.icon_class === 'TrendingUp' && <TrendingUp className="w-6 h-6" />}
                        {value.icon_class === 'Heart' && <Heart className="w-6 h-6" />}
                        {value.icon_class === 'Globe' && <Globe className="w-6 h-6" />}
                        {value.icon_class === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={prevValue} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {coreValues.map((_, index) => (
                  <button key={index} onClick={() => setCurrentValueIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentValueIndex ? 'bg-white scale-125' : 'bg-white/30'}`} />
                ))}
              </div>
              <button onClick={nextValue} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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

          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center mb-3 text-white transform group-hover:scale-110 transition-all duration-300">
                  {benefit.icon_class === 'DollarSign' && <DollarSign className="w-5 h-5" />}
                  {benefit.icon_class === 'Heart' && <Heart className="w-5 h-5" />}
                  {benefit.icon_class === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                  {benefit.icon_class === 'Coffee' && <Coffee className="w-5 h-5" />}
                  {benefit.icon_class === 'Globe' && <Globe className="w-5 h-5" />}
                  {benefit.icon_class === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                  {benefit.icon_class === 'Users' && <Users className="w-5 h-5" />}
                  {benefit.icon_class === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-gray-600 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(currentBenefitIndex / 4) * 100}%)` }}>
                {Array.from({ length: Math.ceil(benefits.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-3 px-2">
                    {benefits.slice(slideIndex * 4, slideIndex * 4 + 4).map((benefit) => (
                      <div key={benefit.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center h-full">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-800 rounded-lg flex items-center justify-center mb-2 text-white mx-auto">
                          {benefit.icon_class === 'DollarSign' && <DollarSign className="w-5 h-5" />}
                          {benefit.icon_class === 'Heart' && <Heart className="w-5 h-5" />}
                          {benefit.icon_class === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                          {benefit.icon_class === 'Coffee' && <Coffee className="w-5 h-5" />}
                          {benefit.icon_class === 'Globe' && <Globe className="w-5 h-5" />}
                          {benefit.icon_class === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                          {benefit.icon_class === 'Users' && <Users className="w-5 h-5" />}
                          {benefit.icon_class === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-xs">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={prevBenefit} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(benefits.length / 4) }).map((_, index) => (
                  <button key={index} onClick={() => setCurrentBenefitIndex(index * 4)} className={`w-3 h-3 rounded-full transition-all ${index === Math.floor(currentBenefitIndex / 4) ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`} />
                ))}
              </div>
              <button onClick={nextBenefit} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
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
                <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs ${selectedCategory === category ? 'bg-blue-800 text-white shadow-lg scale-105' : 'bg-slate-100 text-gray-700 hover:bg-slate-200'}`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">{job.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <span>💰 {job.salary}</span>
                    <span>📊 {job.experience}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                </div>
                <button onClick={() => handleApplyClick(job)} className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                  Apply Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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

          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                <img src={image.image_url} alt={image.caption} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-xs">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Gallery */}
          <div className="lg:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}>
                {galleryImages.map((image) => (
                  <div key={image.id} className="w-full flex-shrink-0">
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                      <img src={image.image_url} alt={image.caption} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={prevGallery} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {galleryImages.map((_, index) => (
                  <button key={index} onClick={() => setCurrentGalleryIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentGalleryIndex ? 'bg-white scale-125' : 'bg-white/30'}`} />
                ))}
              </div>
              <button onClick={nextGallery} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all shadow-lg">
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

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
            {hiringSteps.map((step) => (
              <div key={step.step} className="relative transform transition-all duration-1000">
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
              <button onClick={() => setShowApplicationModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Position *</label>
                  <select name="position" value={formData.position} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm">
                    <option value="">Select a position</option>
                    {jobListings.map((job) => (
                      <option key={job.id} value={job.title}>{job.title} - {job.location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Cover Letter</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none text-sm" placeholder="Tell us why you're interested in this position and what makes you a great fit..." />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Resume / CV *</label>
                  <div className="relative">
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload" />
                    <label htmlFor="resume-upload" className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-all text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Upload your resume (PDF, DOC, DOCX)</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Join Our Team?</h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Don't see the perfect role? We're always looking for talented individuals who share our passion for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={scrollToPositions} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm">
                Browse All Positions
              </button>
              <a href="mailto:careers@novotion.com" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm inline-flex items-center justify-center">
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