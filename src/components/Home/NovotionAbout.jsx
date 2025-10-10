"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sliderImages = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384764586-bb4be8f53b5d?q=80&w=2940&auto=format&fit=crop",
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

  // Auto-slide effect
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
    <div className="light-section text-black relative w-full py-12 md:py-20 lg:py-28 bg-white text-gray-900 overflow-hidden">
      {/* Background patterns */}
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

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12 xl:space-x-16">
          {/* Left Side: Text Content */}
          <motion.div
            ref={textRef}
            initial="hidden"
            animate={textControls}
            variants={textVariants}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 md:mb-4 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                A Global Business Process Outsourcing Company
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-4 md:mb-6"
            ></motion.div>

            {/* Main Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8"
            >
              Novotion is a premier global provider of Business Process
              Outsourcing (BPO) solutions. With a strong international presence
              and operational hubs in the USA and India, we deliver exceptional
              services that drive business success. Novotion adheres to the
              highest global quality standards, ensuring robust security and
              superior quality in every aspect of our service delivery. Our
              commitment to excellence is underscored by our use of
              industry-leading talent, enabling us to offer innovative and
              effective solutions that help our clients remain competitive and
              achieve meaningful results. Partner with Novotion to leverage our
              expertise and experience unparalleled value in your business
              processes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6"
            >
              {/* About Us Button */}
              <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-blue-800 text-white font-semibold rounded-lg text-base md:text-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">
                  About Us
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  About Us →
                </span>
              </button>

              {/* Get Employed Button */}
              <button className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-blue-800 text-blue-800 font-semibold rounded-lg text-base md:text-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                <span className="relative z-10 transition-colors duration-300">
                  Get Employed
                </span>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Get Employed →
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Interactive Image Slider */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageControls}
            variants={imageVariants}
            className="relative flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div
              ref={sliderContainerRef}
              className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] rounded-xl shadow-2xl overflow-hidden"
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
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-blue-800 w-5 md:w-6"
                      : "bg-gray-400"
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