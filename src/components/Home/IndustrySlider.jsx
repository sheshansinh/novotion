'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const industries = [
  {
    title: "Human Resource",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    description: "Streamline HR operations with cutting-edge technology solutions and workforce management systems."
  },
  {
    title: "Energy, Oil & Gas",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop",
    description: "Advanced solutions for energy sector optimization and sustainable resource management."
  },
  {
    title: "Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    description: "Innovative engineering services driving technological advancement and infrastructure development."
  },
  {
    title: "Telecom",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    description: "Next-generation telecommunications solutions for seamless global connectivity."
  },
  {
    title: "Aerospace",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    description: "Precision engineering and advanced solutions for aerospace industry excellence."
  },
  {
    title: "Financial Services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Secure financial solutions and digital transformation for banking and finance sectors."
  },
  {
    title: "Media Communications",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    description: "Revolutionary media solutions driving content creation and digital broadcasting."
  },
  {
    title: "Automotive",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    description: "Transforming automotive industry with smart manufacturing and mobility solutions."
  },
  {
    title: "Electricity & Utility",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    description: "Smart grid solutions and utility management for sustainable energy distribution."
  },
  {
    title: "Information & Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    description: "Cutting-edge IT solutions powering digital transformation across industries."
  },
  {
    title: "Retail & Manufacturing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description: "End-to-end retail and manufacturing solutions for operational excellence."
  },
  {
    title: "Logistics",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop",
    description: "Intelligent supply chain and logistics solutions for global commerce efficiency."
  }
];

const IndustrySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Set initial window width on the client
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
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
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 md:py-12 px-4 flex items-center">
      <div className="max-w-auto mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Industries We Cater
          </h2>
          <div className="w-16 md:w-20 h-1 bg-blue-400 mx-auto mb-3 md:mb-6"></div>
          <p className="text-sm md:text-lg text-blue-100 max-w-auto mx-auto leading-relaxed mb-3 px-4">
            Novotion is working with different industry verticals to help companies in business and technology solutions around the globe with its value added services.
          </p>
          <div className="hidden md:block">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 px-4">
              World Class Business Outsourcing Services to Clients Globally from Different Industry
            </h3>
            <p className="text-sm md:text-base text-blue-100 max-w-auto mx-auto leading-relaxed px-4">
              We are a global outsourcing service provider to startups, mid-size, and fortune 500 companies. As a trusted BPO in India, we provide result-oriented services to businesses of any size, any industry, and any geographical region.
            </p>
          </div>
        </div>

        {/* Carousel Slider */}
        <div 
          className="relative h-[280px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing"
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
              
              // Corrected baseTranslate values for better mobile fit
              const baseTranslate = isMobile ? 80 : 180;
              
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
                  <div className="group relative w-[220px] md:w-[300px] h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                        {industry.title}
                      </h3>
                      <div className="overflow-hidden">
                        <p className="text-xs md:text-sm text-blue-100 leading-relaxed transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          {industry.description}
                        </p>
                      </div>
                      <div className="w-0 h-1 bg-blue-400 mt-2 md:mt-3 group-hover:w-full transition-all duration-700"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-1 md:gap-2 mt-6 md:mt-8">
          {industries.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-6 md:w-8 h-1.5 md:h-2 bg-blue-400'
                  : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hidden md:block text-center mt-6">
          <p className="text-blue-200 text-sm max-w-2xl mx-auto">
            Founded in 2021, Novotion has served clients across 4 continents and 30+ countries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustrySlider;