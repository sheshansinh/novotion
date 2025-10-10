'use client';

import React, { useState, useEffect, useRef } from 'react';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isDragging, services.length]);

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (dragOffset > threshold) {
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (dragOffset < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
    setDragOffset(0);
  };

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    const totalCards = services.length;
    let normalizedDiff = diff;

    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    const angle = (normalizedDiff * 360) / totalCards;
    const radius = 300;
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    
    const scale = normalizedDiff === 0 ? 1 : 0.7 - Math.abs(normalizedDiff) * 0.1;
    const opacity = normalizedDiff === 0 ? 1 : 0.5 - Math.abs(normalizedDiff) * 0.1;
    const zIndex = Math.round(100 - Math.abs(z));

    return { x, z, scale, opacity, zIndex };
  };

  const currentService = services[currentIndex];

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 py-12 md:py-16 px-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with Current Service Info */}
        <div className={`text-center mb-8 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-blue-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Our Services</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Targeted Placements, <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Exceptional Results</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 mb-4">
            Our team is our greatest asset. Comprising seasoned recruiters, industry experts, and dedicated professionals, we bring a wealth of experience and expertise to every client engagement.
          </p>
          
          {/* Current Service Title */}
          <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-2">
            <h3 className={`text-lg md:text-xl font-bold bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`}>
              {currentService.title}
            </h3>
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto px-4">
            {currentService.description}
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          className="relative h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: '1200px' }}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {services.map((service, index) => {
              const { x, z, scale, opacity, zIndex } = getCardPosition(index);
              const isActive = index === currentIndex;

              return (
                <div
                  key={service.id}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: `translate3d(${x + dragOffset * 0.3}px, 0, ${z}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => !isDragging && setCurrentIndex(index)}
                >
                  <div className={`relative w-[200px] h-[250px] md:w-[240px] md:h-[300px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-500 overflow-hidden ${
                    isActive ? 'ring-2 ring-white/30 shadow-2xl' : ''
                  }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}></div>
                    
                    {/* Icon */}
                    <div className={`relative mb-4 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 ${
                      isActive ? 'scale-110 rotate-6' : ''
                    }`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h4 className="relative text-sm md:text-base font-bold text-white mb-2 line-clamp-2">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="relative text-xs text-gray-400 leading-relaxed line-clamp-4">
                      {service.description}
                    </p>

                    {/* Number Badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold border border-white/20">
                      {service.id}
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 md:w-10 h-2 bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-8 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '300ms' }}>
          <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/50 text-sm md:text-base mb-4">
            View More Services
          </button>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-400 text-xs md:text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Available 24/7 for your hiring needs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;