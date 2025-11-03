"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sliderImages = [
  "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2940&auto=format&fit=crop",
];

const NovotionAbout = () => {
  const textControls = useAnimation();
  const imageControls = useAnimation();
  
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    if (textInView) {
      textControls.start("visible");
    }
  }, [textControls, textInView]);

  useEffect(() => {
    if (imageInView) {
      imageControls.start("visible");
    }
  }, [imageControls, imageInView]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);

    const dragThreshold = 0.2;
    const currentImageWidth = sliderContainerRef.current?.offsetWidth || 1;
    const dragDistance = info.offset.x / currentImageWidth;

    if (dragDistance < -dragThreshold) {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    } else if (dragDistance > dragThreshold) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
      );
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <div className="light-section text-black relative w-full min-h-screen flex items-center py-8 bg-white text-gray-900 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEFT SIDE - TEXT CONTENT (70%) */}
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={textControls}
            variants={textVariants}
            className="w-full lg:w-7/12 text-center lg:text-left"
          >
            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 md:mb-6 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                Your Strategic RPO Partner Delivering Recruitment Excellence
              </span>
              <br />
              <span className="text-blue-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Across UK and USA Markets
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-4 md:mb-6"
            ></motion.div>

            {/* Paragraph */}
            <motion.div
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8 space-y-3"
            >
              <p className="font-semibold text-blue-800">
                Since 2021, Novotion has been redefining recruitment for organizations and IT professionals across the UK and USA.
              </p>
              <p>
                We specialize in two core areas: Recruitment Process Outsourcing for UK and USA businesses, and Career Support Services & Recruitment Facilitation for IT professionals in the USA.
              </p>
              <p>
                Unlike traditional staffing firms, we go beyond resume matching. We understand business goals, industry challenges, and talent strategies while helping professionals market their skills and secure contract roles in the American IT market.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 md:mb-8"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-blue-800">500+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-blue-800">10,000+</div>
                <div className="text-sm text-gray-600">Placements</div>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-blue-800">15+</div>
                <div className="text-sm text-gray-600">Industries</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-3 sm:space-y-0 sm:space-x-4"
            >
              {/* Learn About Our Approach */}
              <a href="/about-us">
                <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg text-sm md:text-base shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">
                    Learn About Our Approach
                  </span>
                  <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Learn About Our Approach →
                  </span>
                </button>
              </a>

              {/* Explore Services */}
              <a href="/services">
                <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 bg-transparent border-2 border-blue-800 text-blue-800 font-semibold rounded-lg text-sm md:text-base overflow-hidden transform transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                  <span className="relative z-10 transition-colors duration-300">
                    Explore Services
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Explore Services →
                  </span>
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - IMAGE SLIDER (30%) */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={imageVariants}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="w-full max-w-md">
              <div
                ref={sliderContainerRef}
                className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl shadow-2xl overflow-hidden"
                style={{ touchAction: "pan-y" }}
              >
                <motion.div
                  className="flex cursor-grab active:cursor-grabbing h-full"
                  drag="x"
                  dragConstraints={{
                    left:
                      -sliderImages.length *
                        (sliderContainerRef.current?.offsetWidth || 0) +
                      (sliderContainerRef.current?.offsetWidth || 0),
                    right: 0,
                  }}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x:
                      -currentImageIndex *
                      (sliderContainerRef.current?.offsetWidth || 0),
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {sliderImages.map((src, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full h-full relative"
                    >
                      <img
                        src={src}
                        alt={`Novotion global team ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-blue-800 w-4"
                        : "bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NovotionAbout;