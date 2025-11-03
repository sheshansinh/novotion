"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const KeyStatistics = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);

  const statistics = [
    { value: 500, suffix: "+", label: "Organizations Served in UK & USA Markets" },
    { value: 10000, suffix: "+", label: "Professionals Successfully Placed" },
    { value: 150, suffix: "+", label: "Ongoing Recruitment Projects" },
    { value: 85, suffix: "%+", label: "Long-Term Placement Success Rate" },
    { value: 15, suffix: "+", label: "Specialized Industry Verticals" },
    { value: 4, suffix: "+", label: "Years of Consistent Excellence Since 2021" },
    { value: 3, suffix: "", label: "Countries: UK & USA Markets + India Support Hub" },
    { value: 40, suffix: "%", label: "Average Reduction in Client Hiring Time" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    },
  };

  return (
    <div className="light-section text-black relative w-full py-16 md:py-28 bg-white text-gray-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          {/* Section Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 md:mb-4 text-gray-900"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
              Our Track Record of Success
            </span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto mb-12 md:mb-16"
          ></motion.div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
            {statistics.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.2}
                inView={hasAnimated}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ value, suffix, label, delay, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, inView]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col justify-center">
        {/* Accent line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-800 to-cyan-500 rounded-full"></div>
        
        {/* Number */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 md:mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
            {count.toLocaleString()}
            {suffix}
          </span>
        </div>
        
        {/* Label */}
        <div className="text-sm font-semibold text-gray-600 leading-tight">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default KeyStatistics;