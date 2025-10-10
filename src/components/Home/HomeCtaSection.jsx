'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const OysterCta = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-white text-gray-900 overflow-hidden relative flex justify-center">
      {/* Background patterns from the NovotionAbout section */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row-reverse items-center space-y-12 lg:space-y-0 lg:space-x-12">
          
          {/* Left Column: Text Content and Buttons */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                The World is your Oyster
              </span>
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              className="h-1 w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-6 md:mb-8"
            ></motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-8"
            >
              With Oyster, you're just a few clicks away from hiring the best talent across the world. Get started today and see how quickly you can make your global employment goals a reality.
            </motion.p>
            
            {/* CTA Buttons matching the NovotionAbout section */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              {/* Primary Button */}
              <button className="group relative px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg text-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">
                  Book a Demo
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Book a Demo →
                </span>
              </button>

              {/* Secondary Button */}
              <button className="group relative px-8 py-4 bg-transparent border-2 border-blue-800 text-blue-800 font-semibold rounded-lg text-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                <span className="relative z-10 transition-colors duration-300 ">
                  Preview the Platform
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Preview the Platform →
                </span>
              </button>
            </motion.div>
          </div>
          
          {/* Right Column: Illustration */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full lg:w-auto lg:justify-end mt-8 lg:mt-0"
          >
            {/* You will need to add your illustration here */}
            <img
              src="/image/Gemini_Generated_Image_88iugl88iugl88iu-removebg-preview.png" 
              alt="The world is your oyster illustration"
              className="w-full max-w-md lg:max-w-lg"
            />
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default OysterCta;