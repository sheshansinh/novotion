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
      description: "Comprehensive recruitment solutions for businesses in UK and USA markets seeking to optimize talent acquisition, reduce hiring costs, and build scalable recruitment operations.",
      fullDescription: "From candidate sourcing to onboarding support, we function as an extension of your Talent Acquisition Team, with our India-based offshore support providing round-the-clock recruitment assistance.",
      keyServices: [
        "End-to-End Recruitment Management",
        "Offshore Recruitment Support (India-based teams)",
        "Talent Sourcing & Headhunting",
        "CV Formatting & Candidate Preparation",
        "Lead Generation & Marketing Support"
      ],
      geographicScope: "UK and USA markets, supported by offshore team in India",
      cta: "Explore RPO Services",
      ctaLink: "/services/recruitment-process-outsourcing",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
      type: "rpo"
    },
    {
      id: 2,
      title: "Career Support Services & Recruitment Facilitation",
      description: "Specialized IT staffing services exclusively for the USA market, connecting skilled technology professionals with client companies seeking contract-based roles.",
      fullDescription: "We manage the entire support process from marketing professionals to contract negotiation and project placement, helping IT consultants and professionals connect with the right career opportunities.",
      keyServices: [
        "Professional Marketing & Placement",
        "Requirement Matching",
        "Interview Coordination",
        "Contract Negotiation Support",
        "Onboarding & Project Start Support"
      ],
      geographicScope: "USA market only",
      cta: "Explore Career Support Services",
      ctaLink: "/services/career-support-services",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      type: "career"
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
      }, 5000);
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
    const radius = 400; // Increased radius for better spacing
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    
    const scale = normalizedDiff === 0 ? 1 : 0.8 - Math.abs(normalizedDiff) * 0.1;
    const opacity = normalizedDiff === 0 ? 1 : 0.6 - Math.abs(normalizedDiff) * 0.2;
    const zIndex = Math.round(100 - Math.abs(z));

    return { x, z, scale, opacity, zIndex };
  };

  const currentService = services[currentIndex];

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 py-12 md:py-20 px-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-blue-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Our Service Lines</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Two Distinct Service Lines, <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">One Unified Mission</span>
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            At Novotion, we operate through two specialized divisions tailored to distinct talent needs. Our dual approach enables deep expertise in both corporate recruitment and IT staffing, delivering precise matches, stronger partnerships, and long-term success for clients and professionals alike.
          </p>
        </div>

        {/* 3D Carousel */}
        <div 
          className="relative h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing select-none mb-8"
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
                  <div className={`relative w-[320px] h-[420px] md:w-[380px] md:h-[480px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 overflow-hidden ${
                    isActive ? 'ring-2 ring-white/30 shadow-2xl' : ''
                  }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}></div>
                    
                    {/* Icon */}
                    <div className={`relative mb-6 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-500 ${
                      isActive ? 'scale-110 rotate-6' : ''
                    }`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h4 className="relative text-lg md:text-xl font-bold text-white mb-4 line-clamp-2">
                      {service.title}
                    </h4>

                    {/* Main Description */}
                    <p className="relative text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Full Description */}
                    <p className="relative text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {service.fullDescription}
                    </p>

                    {/* Key Services */}
                    <div className="relative mb-4">
                      <h5 className="text-xs font-semibold text-blue-400 mb-2">Key Services Preview:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {service.keyServices.slice(0, 3).map((serviceItem, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {serviceItem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Geographic Scope */}
                    <div className="relative mb-6">
                      <h5 className="text-xs font-semibold text-purple-400 mb-1">Geographic Scope:</h5>
                      <p className="text-xs text-gray-400">{service.geographicScope}</p>
                    </div>

                    {/* CTA Button */}
                    <a 
                      href={service.ctaLink}
                      className={`relative w-full py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg text-sm text-center block hover:scale-105 transform transition-all duration-300 shadow-lg`}
                    >
                      {service.cta}
                    </a>

                    {/* Number Badge */}
                    <div className="absolute top-6 right-6 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold border border-white/20">
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm md:text-base mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Discover Which Service Fits Your Needs</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;