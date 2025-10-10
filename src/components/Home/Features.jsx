'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NovotionFeatures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const features = [
    {
      title: "24/7 Customer Service",
      description: "Our dedicated support team is available around the clock to assist you, ensuring a seamless experience for your clients.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "99.95% Accuracy",
      description: "We guarantee near-perfect accuracy in all our processes, minimizing errors and ensuring your data is reliable.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Flexible & Affordable",
      description: "Our services are tailored to your needs, offering scalable and cost-effective solutions without compromising on quality.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1m0 0l-2 1m2-1v2.5M10 9l2 1m0 0l2-1m-2 1v2.5M4 7l2 1m-2-1l2-1m-2 1v2.5M4 9l2-1m-2 1l2 1m-2 1v2.5" />
        </svg>
      )
    },
    {
      title: "Secure & Confidential",
      description: "We handle your sensitive data with the highest level of security and confidentiality, following industry-leading protocols.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Fast Turnaround Time",
      description: "Our optimized processes and expert team ensure your projects are completed efficiently and delivered on time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Experienced Team",
      description: "Our team of seasoned professionals brings years of industry experience to provide you with the best possible solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerPage(3);
      } else if (window.innerWidth >= 1024) {
        setCardsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const totalGap = (cardsPerPage - 1) * (cardsPerPage >= 2 ? 24 : 0);
        const singleCardWidth = (containerRef.current.offsetWidth - totalGap) / cardsPerPage;
        setCardWidth(singleCardWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [cardsPerPage]);

  const totalSlides = Math.ceil(features.length / cardsPerPage);

  useEffect(() => {
    if (!isHovering && totalSlides > 1) {
      const autoPlay = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
      return () => clearInterval(autoPlay);
    }
  }, [isHovering, totalSlides]);

  const onDragEnd = (event, info) => {
    const dragThreshold = 50;
    const dragDistance = info.offset.x;
    
    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance < 0) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const carouselX = -(currentSlide * (cardWidth * cardsPerPage + (cardsPerPage-1) * 24));

  return (
    <div className="light-section text-black relative w-full min-h-screen bg-white text-gray-900 overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center h-full">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
              Maximize Your Business Value
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Drive growth and efficiency with our comprehensive BPO solutions designed for modern businesses
          </p>
        </div>

        {/* Features Slider */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="flex space-x-6 md:space-x-8"
            drag="x"
            dragConstraints={{ left: -features.length * cardWidth, right: 0 }}
            onDragEnd={onDragEnd}
            animate={{ 
              x: carouselX 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                style={{ width: cardWidth, marginRight: cardsPerPage > 1 ? 24 : 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="relative bg-gray-100/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-300 hover:border-blue-500/30 transition-all duration-300 group h-full">
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-800 to-black text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dot Indicators - Only show if multiple slides */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-800 to-black'
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-8 md:mt-10 lg:mt-12">
          <p className="text-gray-600 mb-4 text-lg">
            Ready to transform your business operations?
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center space-x-3">
              <span className="text-lg">Start Your Journey</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovotionFeatures;