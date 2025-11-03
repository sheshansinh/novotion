"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Company logos - Updated with your specified companies
const companyLogos = [
  { name: "Amazon", url: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" },
  { name: "Meta", url: "https://cdn.worldvectorlogo.com/logos/meta-1.svg" },
  { name: "Google", url: "https://cdn.worldvectorlogo.com/logos/google-icon.svg" },
  { name: "Microsoft", url: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg" },
  { name: "IBM", url: "https://cdn.worldvectorlogo.com/logos/ibm-1.svg" },
  { name: "Oracle", url: "https://cdn.worldvectorlogo.com/logos/oracle-6.svg" },
  { name: "UPS", url: "https://cdn.worldvectorlogo.com/logos/ups-3.svg" },
  { name: "Honeywell", url: "https://cdn.worldvectorlogo.com/logos/honeywell-2.svg" },
  { name: "Intel", url: "https://cdn.worldvectorlogo.com/logos/intel-2.svg" },
  { name: "Sarasota County Government", url: "https://cdn.worldvectorlogo.com/logos/government-svgrepo-com.svg" },
];

const PlacementSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
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
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...companyLogos, ...companyLogos];

  return (
    <div className="light-section text-black relative w-full py-12 md:py-24 bg-white text-gray-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
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
              Trusted by Leading Organizations Across Multiple Sectors
            </span>
          </motion.h2>

          {/* Sub-Headline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Our Professionals and Candidates Thrive at Industry-Leading Companies
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto mb-6 md:mb-10"
          ></motion.div>

          {/* Animated Logo Slider */}
          <motion.div
            variants={itemVariants}
            className="relative w-full overflow-hidden"
          >
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Sliding logos container */}
            <div className="flex items-center py-6 md:py-8">
              <motion.div
                className="flex items-center space-x-8 md:space-x-16"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedLogos.map((company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex-shrink-0 w-24 h-14 md:w-40 md:h-24 flex items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    <img
                      src={company.url}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain filter brightness-0"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Companies Count */}
          <motion.div
            variants={itemVariants}
            className="mt-6 md:mt-8"
          >
            <p className="text-base md:text-lg text-gray-500 font-medium">
              And 490+ more organizations across UK and USA markets
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlacementSection;