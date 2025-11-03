'use client';

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Component to handle the counting animation
const StatCard = ({ value, suffix, label, delay, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // ~60fps

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
      {/* REDUCED PADDING: p-5/7 instead of p-6/8 for a smaller card */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-5 md:p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col justify-center">
        {/* Accent line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-800 to-cyan-500 rounded-full"></div>

        {/* Number - Adjusted font size for a slightly smaller look */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 md:mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
            {count.toLocaleString()}
            {suffix}
          </span>
        </div>

        {/* Label - Adjusted font size */}
        <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-600 tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

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

  // NEW REAL DATA WITH PROPER VALUES FOR ANIMATION
  const statistics = [
    { value: 500, suffix: "+", label: "Corporate Clients Worldwide" },
    { value: 10000, suffix: "+", label: "Professionals Placed" },
    { value: 150, suffix: "+", label: "Ongoing Projects" },
    { value: 85, suffix: "+%", label: "Post-Placement Retention" }, // Note: I used 85 as value and "+%" as suffix for the animation
    { value: 15, suffix: "+", label: "Industry Verticals" },
    { value: 4, suffix: "+", label: "Years of Proven Service" },
  ];
  
  // Helper to adjust the suffix for the retention rate to look correct after counting
  const displaySuffix = (suffix) => {
      // Logic to handle the 85+% case correctly after the count is complete
      if (suffix === '+%') {
          return hasAnimated ? suffix : '+'; // Show just '+' during animation, then '+%' when finished
      }
      return suffix;
  }


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
    <div className="light-section text-black relative w-full py-12 md:py-20 bg-white text-gray-900 overflow-hidden min-h-screen-md flex items-center"> {/* Added min-h-screen-md and flex for better viewport fit */}
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
              Key Statistics
            </span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto mb-10 md:mb-14"
          ></motion.div>

          {/* Statistics Grid - CHANGED TO lg:grid-cols-3 for 6 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-10 max-w-7xl mx-auto">
            {statistics.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                suffix={displaySuffix(stat.suffix)} // Use the helper function here
                label={stat.label}
                delay={index * 0.15} // Reduced stagger delay slightly
                inView={hasAnimated}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KeyStatistics;