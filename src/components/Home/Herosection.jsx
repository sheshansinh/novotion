'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const NovotionHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const containerRef = useRef(null);
  const totalSlides = 3;

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const slides = [
    {
      title: "Transform Your Business with Novotion",
      subtitle: "Premier Global BPO Solutions",
      description: "Delivering innovation, quality, and security from our hubs in the USA and India.",
      buttonText: "Partner With Us",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Excellence in Customer Support",
      subtitle: "24/7 Multilingual Solutions",
      description: "Enhance customer satisfaction with our world-class support services across multiple languages and time zones.",
      buttonText: "Explore Services",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop"
    },
    {
      title: "Secure Data Management",
      subtitle: "Industry-Leading Standards",
      description: "Accurate, secure, and scalable data handling solutions that protect your business and drive growth.",
      buttonText: "Learn More",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
    }
  ];

  // Touch handlers for mobile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse handlers for desktop
  const onMouseDown = (e) => {
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (mouseStart !== null) {
      setMouseEnd(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (!mouseStart || !mouseEnd) return;
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset mouse states
    setMouseStart(null);
    setMouseEnd(null);
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  // Reset animation state after slide transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Autoplay functionality
  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(autoPlay);
  }, [currentSlide]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-950 text-white select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Reset if mouse leaves container
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.image}
            alt={`Background for slide ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
          />
        ))}
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Slide Content Container */}
      <div className="relative h-full z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="max-w-4xl mx-auto text-center md:text-left">
                <div className="mb-4 md:mb-6">
                  <p className={`text-blue-300 font-semibold text-sm md:text-base tracking-wider uppercase transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`} style={{ transitionDelay: '100ms' }}>
                    {slide.subtitle}
                  </p>
                </div>
                
                <div className="mb-4 md:mb-6">
                  <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`} style={{ transitionDelay: '200ms' }}>
                    {slide.title}
                  </h1>
                </div>
                
                <div className="mb-6 md:mb-8 max-w-2xl">
                  <p className={`text-base md:text-lg text-gray-200 leading-relaxed transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`} style={{ transitionDelay: '300ms' }}>
                    {slide.description}
                  </p>
                </div>
                
                <div className="mb-8 md:mb-10">
                  <button className={`group relative px-6 py-3 md:px-8 md:py-4 bg-white text-blue-900 font-semibold rounded-lg text-base md:text-lg overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`} style={{ transitionDelay: '400ms' }}>
                    <span className="relative">{slide.buttonText}</span>
                    <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {slide.buttonText} →
                    </span>
                  </button>
                </div>
                
                <div className={`flex items-center justify-center md:justify-start space-x-4 transform transition-all duration-700 ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                }`} style={{ transitionDelay: '500ms' }}>
                  <div className="h-1 w-12 md:w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <p className="text-gray-300 text-sm md:text-base">Trusted by Global Leaders</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide
                ? 'w-8 md:w-12 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      

      {/* Swipe Instruction Hint (only shows briefly on first load) */}
      <SwipeHint />
    </div>
  );
};

// Optional: Swipe hint component that disappears after first interaction
const SwipeHint = () => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    const handleInteraction = () => {
      setShowHint(false);
    };

    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('mousedown', handleInteraction);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('mousedown', handleInteraction);
    };
  }, []);

  if (!showHint) return null;

  return (
    <>
 
    </>
  );
};

export default NovotionHero;