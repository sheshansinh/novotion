'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Recruitment Process Outsourcing",
      description: "Novotion provides a wide range of services to aid organizations with Recruitment Process Outsourcing.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Career Consultation",
      description: "Expert guidance on career choices, job search, and skill development to help individuals achieve professional success.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Resume Crafting",
      description: "Creating a polished, tailored resume that highlights skills, experience, and achievements to improve job prospects.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Resume Understanding",
      description: "Analyzing a resume to interpret its strengths, weaknesses, and alignment with job requirements.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Marketing of Profile",
      description: "Strategically presenting skills and experience to enhance visibility and attract job opportunities.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      title: "On Job Support",
      description: "Guidance and assistance to employees in handling workplace challenges and improving performance.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 7,
      title: "Interview Support & Preparations",
      description: "We help candidates build confidence, refine answers, and develop strategies to succeed in job interviews.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 8,
      title: "Interview Consultation",
      description: "We offer expert advice and strategies to improve interview performance and increase job success chances.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-teal-500 to-green-500"
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isDragging, services.length]);

  // Touch and drag handlers
  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setTouchStartTime(Date.now());
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  }, [isDragging, startX]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    
    const touchDuration = Date.now() - touchStartTime;
    const isTap = touchDuration < 200 && Math.abs(dragOffset) < 10;
    
    if (isTap && carouselRef.current) {
      return setIsDragging(false);
    }

    const threshold = window.innerWidth < 768 ? 30 : 50;
    const velocity = Math.abs(dragOffset) / touchDuration;
    const dynamicThreshold = threshold + (velocity * 100);

    if (dragOffset > dynamicThreshold) {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (dragOffset < -dynamicThreshold) {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
    
    setDragOffset(0);
    setIsDragging(false);
  }, [isDragging, dragOffset, touchStartTime, services.length]);

  // Improved card positioning with better spacing
  const getCardPosition = useCallback((index) => {
    const diff = index - currentIndex;
    const totalCards = services.length;
    let normalizedDiff = diff;

    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    // Better spacing for different screen sizes
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    const radius = isMobile ? 220 : isTablet ? 320 : 380;
    const maxScale = isMobile ? 0.85 : 0.8;
    
    const angle = (normalizedDiff * 360) / totalCards;
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    
    const scale = normalizedDiff === 0 ? 1 : maxScale - Math.abs(normalizedDiff) * 0.12;
    const opacity = normalizedDiff === 0 ? 1 : 0.7 - Math.abs(normalizedDiff) * 0.18;
    const zIndex = Math.round(100 - Math.abs(z));

    return { x, z, scale, opacity, zIndex };
  }, [currentIndex, services.length]);

  const currentService = services[currentIndex];

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 py-12 md:py-20 lg:py-28 px-4 overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-56 h-56 bg-cyan-500 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header Section with Better Spacing */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Our Services</p>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-4 leading-tight">
            Targeted Placements,{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Exceptional Results
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
            Our team is our greatest asset. Comprising seasoned recruiters, industry experts, and dedicated professionals, 
            we bring a wealth of experience and expertise to every client engagement.
          </p>
          
          {/* Current Service Indicator */}
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl mb-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${currentService.color}`}></div>
              <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                {currentService.title}
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-400 text-center leading-relaxed">
              {currentService.description}
            </p>
          </div>
        </div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Previous service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Next service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 3D Carousel with Better Height */}
          <div 
            ref={carouselRef}
            className="relative h-[320px] md:h-[420px] lg:h-[500px] cursor-grab active:cursor-grabbing select-none touch-pan-x"
            style={{ perspective: '1400px' }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
              e.preventDefault();
              handleStart(e.touches[0].clientX);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              handleMove(e.touches[0].clientX);
            }}
            onTouchEnd={handleEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {services.map((service, index) => {
                const { x, z, scale, opacity, zIndex } = getCardPosition(index);
                const isActive = index === currentIndex;

                return (
                  <div
                    key={service.id}
                    className="absolute transition-all duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translate3d(${x + dragOffset * 0.5}px, 0, ${z}px) scale(${scale}) rotateY(${x * 0.05}deg)`,
                      opacity: opacity,
                      zIndex: zIndex,
                      transformStyle: 'preserve-3d'
                    }}
                    onClick={() => !isDragging && setCurrentIndex(index)}
                  >
                    <div 
                      className={`relative w-[200px] md:w-[280px] lg:w-[320px] h-[250px] md:h-[320px] lg:h-[380px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 overflow-hidden ${
                        isActive 
                          ? 'ring-3 ring-white/40 shadow-2xl shadow-blue-500/30 scale-105' 
                          : 'hover:ring-2 hover:ring-white/25 hover:scale-102'
                      } ${isDragging ? 'transition-none' : ''}`}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-15 transition-opacity duration-300 ${
                        isActive ? 'opacity-25' : ''
                      }`}></div>
                      
                      {/* Content Container */}
                      <div className="relative h-full flex flex-col justify-between">
                        {/* Top Section */}
                        <div>
                          {/* Icon and Number */}
                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-xl transform transition-transform duration-300 ${
                              isActive ? 'scale-110 rotate-3' : 'scale-100'
                            }`}>
                              {service.icon}
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold border border-white/20">
                              {service.id}
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4 line-clamp-2 leading-tight">
                            {service.title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed line-clamp-4 md:line-clamp-5 flex-grow">
                          {service.description}
                        </p>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="flex justify-center gap-2 mt-4">
                            {[0, 0.2, 0.4].map((delay) => (
                              <div
                                key={delay}
                                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                                style={{ animationDelay: `${delay}s` }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex lg:hidden justify-center gap-6 mt-8 md:mt-12">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
              aria-label="Previous service"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
              aria-label="Next service"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-8 md:mt-12 lg:mt-16">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                index === currentIndex
                  ? 'w-8 md:w-10 h-2 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                  : 'w-2 h-2 bg-gray-600 hover:bg-gray-500 hover:scale-110'
              }`}
              aria-label={`Go to service ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="text-xs text-white opacity-0">●</span>
              )}
            </button>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mt-4 mb-2">
          <div className="text-sm text-gray-400 font-medium">
            {currentIndex + 1} of {services.length} Services
          </div>
        </div>

        {/* Bottom CTA with Better Spacing */}
        <div className={`text-center mt-12 md:mt-16 lg:mt-20 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <button className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 text-base md:text-lg mb-6">
            <span className="flex items-center gap-3">
              Explore All Services
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-gray-400 text-sm md:text-base">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Available 24/7 for your hiring needs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;