"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sliderImages = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384764586-bb4be8f53b5d?q=80&w=2940&auto=format&fit=crop",
];

const NovotionAbout = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
      }
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, [isDragging, sliderImages.length]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);

    const dragThreshold = 0.2; // 20% of the image width
    const currentImageWidth = sliderContainerRef.current.offsetWidth;
    const dragDistance = info.offset.x / currentImageWidth;

    if (dragDistance < -dragThreshold) {
      // Swipe left, go to the next image (with loop)
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    } else if (dragDistance > dragThreshold) {
      // Swipe right, go to the previous image (with loop)
      setCurrentImageIndex(
        (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
      );
    }
  };

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
    
    <div className=" light-section text-black relative w-full py-20 md:py-32 bg-white text-gray-900 overflow-hidden">
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
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-12 lg:space-y-0 lg:space-x-16">
          {/* Left Side: Text Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                A Global Business Process Outsourcing Company
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-20 bg-gradient-to-r from-blue-800 to-black rounded-full mx-auto lg:mx-0 mb-6 md:mb-8"
            ></motion.div>

            {/* Main Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-8"
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
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              {/* About Us Button */}
              <button className="group relative px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg text-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <span className="relative z-10 transition-opacity duration-500 group-hover:opacity-0">
                  About Us
                </span>
                <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  About Us →
                </span>
              </button>

              {/* Get Employed Button */}
              <button className="group relative px-8 py-4 bg-transparent border-2 border-blue-800 text-blue-800 font-semibold rounded-lg text-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-blue-800 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                <span className="relative z-10 transition-colors duration-300 ">
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
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={itemVariants}
            className="relative flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div
              ref={sliderContainerRef}
              className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[500px] rounded-xl shadow-2xl overflow-hidden"
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
                    <Image
                      src={src}
                      alt={`Novotion team image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-blue-800 w-6"
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
