'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NovotionCta = () => {
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

  React.useEffect(() => {
    if (textInView) {
      textControls.start("visible");
    }
  }, [textControls, textInView]);

  React.useEffect(() => {
    if (imageInView) {
      imageControls.start("visible");
    }
  }, [imageControls, imageInView]);

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
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
    <div className="w-full bg-white text-gray-900 overflow-hidden relative min-h-[80vh] flex items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center space-y-8 lg:space-y-0 lg:space-x-12 lg:space-x-reverse">

          {/* Right Column: Text Content and Buttons */}
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={textControls}
            variants={textVariants}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight mb-3 md:mb-4 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                Ready to Transform Your Recruitment Strategy or Advance Your IT Career?
              </span>
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-4 md:mb-5"
            ></motion.div>

            {/* UPDATED PARAGRAPH CONTENT */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 md:mb-5 line-clamp-4"
            >
              Access world-class BPO solutions designed to optimize operations, reduce costs, and drive sustainable growth. From strategic recruitment to comprehensive back-office services, Novotion is your trusted partner in building exceptional teams and streamlining operations across global markets. Let's unlock your organization's full potential.
            </motion.p>

            {/* CTA Buttons (Labels are correct) */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4"
            >
              {/* Primary Button (Book a Demo) */}
              <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-blue-800 text-white font-semibold rounded-lg text-base md:text-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">
                  Book a Demo
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs md:text-sm">
                  Discuss RPO Solutions →
                </span>
              </button>

              {/* Secondary Button (Contact Us) */}
              <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-blue-800 text-blue-800 font-semibold rounded-lg text-base md:text-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                <span className="relative z-10 transition-colors duration-300 text-xs md:text-sm">
                  For IT Professionals: Explore Career Support
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 text-xs md:text-sm">
                  Explore Career Support →
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Left Column: Illustration */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={imageVariants}
            className="flex-1 w-full lg:w-auto flex justify-center lg:justify-start"
          >
            <img
              src="/image/Gemini_Generated_Image_88iugl88iugl88iu-removebg-preview.png" 
              alt="Novotion Recruitment Solutions"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default NovotionCta;
