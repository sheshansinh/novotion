'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const carouselData = [
  {
    title: 'Recruitment Process Outsourcing',
    text: 'Novotion provides a wide range of services to aid organizations with Recruitment Process Outsourcing.',
    image: '/images/img1.jpg',
  },
  {
    title: 'Career Consultation',
    text: 'Novotion provides expert guidance on career choices, job search, and skill development to help individuals achieve professional success.',
    image: '/images/img2.jpg',
  },
  {
    title: 'Resume Crafting',
    text: 'Creating a polished, tailored resume that highlights skills, experience, and achievements to improve job prospects.',
    image: '/images/img3.jpg',
  },
  {
    title: 'Resume Understanding',
    text: 'Analyzing a resume to interpret its strengths, weaknesses, and alignment with job requirements.',
    image: 'https://images.unsplash.com/photo-1543286307-e4359d997ccb?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Marketing of Profile',
    text: 'Strategically presenting skills and experience to enhance visibility and attract job opportunities.',
    image: 'https://images.unsplash.com/photo-1594950793134-2e21ef263d91?q=80&w=1968&auto=format&fit=crop',
  },
  {
    title: 'On Job Support',
    text: 'Guidance and assistance to employees in handling workplace challenges and improving performance.',
    image: 'https://images.unsplash.com/photo-1557804506-690226c6d267?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Interview Support & Preparations',
    text: 'We help candidates build confidence, refine answers, and develop strategies to succeed in job interviews.',
    image: 'https://images.unsplash.com/photo-1563986768494-06900f07c11f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    title: 'Interview Consultation',
    text: 'We offer expert advice and strategies to improve interview performance and increase job success chances.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88a04?q=80&w=1974&auto=format&fit=crop',
  },
];

const CarouselSection = () => {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % carouselData.length);
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, carouselData.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index) => {
    setActive(index);
  };

  // Calculate positions for all cards
  const getCardPosition = (index) => {
    const diff = index - active;
    const total = carouselData.length;
    
    // Normalize difference for circular carousel
    let normalizedDiff = diff;
    if (Math.abs(diff) > total / 2) {
      normalizedDiff = diff > 0 ? diff - total : diff + total;
    }

    // Calculate position values
    const x = normalizedDiff * 120; // Increased spacing between cards
    const scale = 1 - Math.abs(normalizedDiff) * 0.15;
    const opacity = 1 - Math.abs(normalizedDiff) * 0.3;
    const zIndex = total - Math.abs(normalizedDiff);

    return { x, scale, opacity, zIndex };
  };

  return (
    <>
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden font-sans text-white bg-gradient-to-br from-black via-gray-900 to-purple-900">
        
        {/* Left Content Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">Our Services</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Targeted <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Placements</span>, 
              <br />
              Exceptional <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Results</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Our team is our greatest asset. Comprising seasoned recruiters, industry experts, and
              dedicated professionals, we bring a wealth of experience and expertise to every client engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
                Get Started
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <div className="text-2xl font-bold text-white">
                <span className="text-blue-400">{active + 1}</span>
                <span className="text-gray-400">/{carouselData.length}</span>
              </div>
              <div className="flex gap-2">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === active
                        ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Carousel Section */}
        <div 
          className="flex-1 relative min-h-[600px] lg:min-h-screen flex items-center justify-center py-8 lg:py-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-full max-w-6xl mx-auto" ref={carouselRef}>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              →
            </button>

            {/* Carousel Cards */}
            <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              {carouselData.map((item, index) => {
                const { x, scale, opacity, zIndex } = getCardPosition(index);
                const isActive = index === active;

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: `translateX(${x}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    onClick={() => goToSlide(index)}
                  >
                    <div className={`relative w-[280px] lg:w-[320px] h-[380px] lg:h-[420px] rounded-2xl overflow-hidden transition-all duration-500 ${
                      isActive 
                        ? 'shadow-2xl shadow-blue-500/30 ring-2 ring-white/30' 
                        : 'shadow-lg shadow-black/30'
                    }`}>
                      {/* Image */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        priority={index < 3}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-2xl lg:text-3xl font-bold bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                            {index + 1}
                          </div>
                          {isActive && (
                            <div className="flex gap-1">
                              {[1, 2, 3].map((dot) => (
                                <div
                                  key={dot}
                                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                                  style={{ animationDelay: `${dot * 0.2}s` }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-all duration-500 ${
                          isActive ? 'text-white' : 'text-gray-300'
                        }`}>
                          {item.title}
                        </h3>
                        
                        <p className={`text-sm lg:text-base leading-relaxed transition-all duration-500 ${
                          isActive ? 'text-gray-200 opacity-100' : 'text-gray-400 opacity-0'
                        }`}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselSection;