'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const industries = [
  {
    title: "Technology & Information Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    description: "Software Engineers, DevOps Specialists, QA Analysts, Full Stack Developers, Network Engineers, DFT Verification Engineers, Data Scientists, Cybersecurity Professionals"
  },
  {
    title: "Logistics & Supply Chain Management",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop",
    description: "Warehouse Operations Managers, Logistics Coordinators, Supply Chain Analysts, Distribution Specialists, Transportation Managers, Inventory Control Specialists"
  },
  {
    title: "Healthcare & Life Sciences",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    description: "Medical Professionals, Healthcare Administrators, Clinical Research Coordinators, Pharmaceutical Sales Representatives, Medical Billing Specialists, Healthcare IT Professionals"
  },
  {
    title: "Finance & Banking Services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Financial Analysts, Investment Advisors, Compliance Officers, Banking Operations Specialists, Risk Management Professionals, Accounting Specialists"
  },
  {
    title: "Human Resources & Talent Acquisition",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    description: "HR Business Partners, Recruitment Specialists, Employee Relations Managers, Compensation & Benefits Analysts, HRIS Administrators, Training Coordinators"
  },
  {
    title: "Oil, Gas & Energy",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
    description: "Operations Engineers, Technical Support Specialists, Field Service Engineers, Energy Analysts, Safety Compliance Officers, Project Managers"
  },
  {
    title: "Customer Support & Service Centers",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&h=600&fit=crop",
    description: "Customer Success Managers, Technical Support Representatives, Call Center Supervisors, Service Quality Analysts, Client Relations Specialists"
  },
  {
    title: "Manufacturing & Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    description: "Quality Engineers, Production Managers, Process Engineers, Operations Supervisors, Manufacturing Technicians, Industrial Engineers"
  },
  {
    title: "Telecommunications",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    description: "Network Engineers, Telecom Sales Professionals, Technical Support Specialists, Systems Administrators, Wireless Technicians"
  },
  {
    title: "Retail & E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "Store Managers, E-Commerce Specialists, Merchandising Professionals, Inventory Managers, Customer Experience Specialists"
  },
  {
    title: "Insurance Services",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    description: "Claims Adjusters, Underwriters, Insurance Sales Representatives, Risk Analysts, Policy Administrators"
  },
  {
    title: "Travel & Hospitality",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    description: "Hotel Management, Travel Coordinators, Customer Service Representatives, Event Planners, Tourism Specialists"
  },
  {
    title: "Automotive Industry",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    description: "Automotive Engineers, Service Technicians, Sales Professionals, Quality Control Specialists, Supply Chain Managers"
  },
  {
    title: "Media & Publishing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    description: "Content Creators, Digital Marketing Specialists, Publishing Professionals, Graphic Designers, Media Production Specialists"
  },
  {
    title: "Government & Public Sector",
    image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=800&h=600&fit=crop",
    description: "Public Administrators, Policy Analysts, IT Specialists, Program Managers, Compliance Officers"
  }
];

const IndustrySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState('90vh');

  // Set initial window width and adjust height for nav
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Adjust height based on screen size and account for large nav
      if (window.innerHeight < 700) {
        setContainerHeight('85vh');
      } else {
        setContainerHeight('90vh');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % industries.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isDragging]);

  // Drag handlers
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
      setCurrentSlide((prev) => (prev - 1 + industries.length) % industries.length);
    } else if (dragOffset < -threshold) {
      setCurrentSlide((prev) => (prev + 1) % industries.length);
    }
    setDragOffset(0);
  };

  const getVisibleSlides = () => {
    if (windowWidth === 0) return [];
    
    const slides = [];
    const slideRange = windowWidth < 768 ? 1 : 2;
    
    for (let i = -slideRange; i <= slideRange; i++) {
      const index = (currentSlide + i + industries.length) % industries.length;
      slides.push({ ...industries[index], position: i, index });
    }
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div 
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center"
      style={{ height: containerHeight }}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">
            Specialized Recruitment Across 15+ Industries
          </h2>
          <div className="w-12 md:w-16 h-1 bg-blue-400 mx-auto mb-2 md:mb-4"></div>
          <p className="text-xs md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed mb-2">
            Deep Sector Knowledge | Tailored Solutions for Every Industry
          </p>
        </div>

        {/* Compact Carousel Slider */}
        <div 
          className="relative h-[200px] md:h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {visibleSlides.map((industry) => {
              const isCenter = industry.position === 0;
              const isLeft1 = industry.position === -1;
              const isRight1 = industry.position === 1;
              const isLeft2 = industry.position === -2;
              const isRight2 = industry.position === 2;
              
              const isMobile = windowWidth < 768;
              
              // Adjusted baseTranslate for compact layout
              const baseTranslate = isMobile ? 70 : 150;
              
              let translateX = 0;
              let scale = 0.6;
              let opacity = 0;
              let zIndex = 0;
              let blur = 4;

              if (isCenter) {
                translateX = 0 + (dragOffset * 0.5);
                scale = 1;
                opacity = 1;
                zIndex = 30;
                blur = 0;
              } else if (isLeft1) {
                translateX = -baseTranslate + (dragOffset * 0.5);
                scale = 0.75;
                opacity = 0.6;
                zIndex = 20;
                blur = 1;
              } else if (isRight1) {
                translateX = baseTranslate + (dragOffset * 0.5);
                scale = 0.75;
                opacity = 0.6;
                zIndex = 20;
                blur = 1;
              } else if (isLeft2) {
                translateX = -(baseTranslate * 2) + (dragOffset * 0.5);
                scale = 0.5;
                opacity = 0.3;
                zIndex = 10;
                blur = 3;
              } else if (isRight2) {
                translateX = (baseTranslate * 2) + (dragOffset * 0.5);
                scale = 0.5;
                opacity = 0.3;
                zIndex = 10;
                blur = 3;
              }
              
              return (
                <div
                  key={industry.index}
                  className="absolute transition-all duration-700 ease-out select-none"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    filter: `blur(${blur}px)`,
                  }}
                >
                  {/* Compact Card */}
                  <div className="group relative w-[180px] md:w-[250px] h-[180px] md:h-[250px] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
                      <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                        {industry.title}
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-xs text-blue-100 leading-relaxed transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-2">
                          {industry.description}
                        </p>
                      </div>
                      <div className="w-0 h-0.5 bg-blue-400 mt-1 md:mt-2 group-hover:w-full transition-all duration-700"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Dot Navigation */}
        <div className="flex justify-center gap-1 mt-4 md:mt-6">
          {industries.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-4 md:w-6 h-1.5 bg-blue-400'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Compact Footer Text */}
        <div className="text-center mt-4">
          <p className="text-blue-200 text-xs md:text-sm max-w-xl mx-auto">
            Connecting top talent with leading organizations across 15+ specialized industry verticals worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustrySlider;