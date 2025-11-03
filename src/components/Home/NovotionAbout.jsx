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
    threshold: 0.1,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    }, 4000);
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
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
    <div className="light-section text-black relative w-full py-8 md:py-16 lg:py-24 bg-white text-gray-900 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background patterns - reduced opacity for mobile */}
      <div className="absolute inset-0 z-0 opacity-3 md:opacity-5">
        <div
          className="absolute top-1/4 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Side: Text Content - Optimized for mobile */}
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={textControls}
            variants={textVariants}
            className="flex-1 w-full text-center lg:text-left"
          >
            {/* Heading - Better mobile sizing */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug md:leading-tight mb-3 md:mb-4 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                A Global Business Process Outsourcing Company Redefining Talent & Operations
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-12 md:w-16 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-3 md:mb-5"
            ></motion.div>

            {/* Main Description - Better mobile text */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6"
            >
              Novotion stands as your strategic partner in navigating the complexities of modern business. With expertise spanning Recruitment Process Outsourcing (RPO), talent placement, and comprehensive Business Process Outsourcing (BPO) solutions, we empower organizations to focus on core operations while we handle your critical HR and back-office needs.
            </motion.p>

            {/* Additional mobile-optimized paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-5 md:mb-7"
            >
              Operating across India, USA, and UK with 500+ satisfied clients, we bring local insight and global expertise to every engagement.
            </motion.p>

            {/* CTA Buttons - Stacked properly on mobile */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-stretch sm:items-center gap-3 sm:gap-4"
            >
              {/* About Us Button */}
              <button className="group relative px-5 sm:px-6 md:px-8 py-2.5 md:py-3 bg-blue-800 text-white font-semibold rounded-lg text-sm sm:text-base md:text-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                  About Us
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  About Us →
                </span>
              </button>

              {/* Get Employed Button */}
              <button className="group relative px-5 sm:px-6 md:px-8 py-2.5 md:py-3 bg-transparent border border-blue-800 text-blue-800 font-semibold rounded-lg text-sm sm:text-base md:text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Get Employed
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Get Employed →
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Interactive Image Slider - Optimized for mobile */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={imageVariants}
            className="relative flex-1 w-full max-w-md lg:max-w-none"
          >
            <div
              ref={sliderContainerRef}
              className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[450px] rounded-xl shadow-xl md:shadow-2xl overflow-hidden"
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
                      alt={`Novotion team image ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 md:bg-black/30"></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots - Smaller for mobile */}
            <div className="flex justify-center mt-3 md:mt-4 space-x-1.5 md:space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-blue-800 w-4 md:w-5"
                      : "bg-gray-300 md:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NovotionAbout;