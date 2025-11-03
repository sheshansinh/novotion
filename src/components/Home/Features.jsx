"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const NovotionFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef(null);

  const features = [
    {
      title: "Secure & Confidential",
      description:
        "Industry-leading data security protocols and strict confidentiality standards ensuring your information is always protected.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Fast Turnaround Time",
      description:
        "Rapid onboarding and implementation with dedicated teams ready to support your immediate business needs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "24/7 Customer Service",
      description:
        "Round-the-clock multilingual support ensuring seamless operations across all time zones and regions.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1m0 0l-2 1m2-1v2.5M10 9l2 1m0 0l2-1m-2 1v2.5M4 7l2 1m-2-1l2-1m-2 1v2.5M4 9l2-1m-2 1l2 1m-2 1v2.5"
          />
        </svg>
      ),
    },
    {
      title: "Cost-Effective Solutions",
      description:
        "Optimized pricing models that deliver maximum ROI without compromising on quality or service delivery.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Experienced Team",
      description:
        "Highly trained professionals with domain expertise across industries and specialized skill sets.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Scalable Services",
      description:
        "Flexible solutions that grow with your business, whether you need 10 or 1,000 resources.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const loopedFeatures = [...features, ...features];

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isDragging) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging, features.length]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const offset = info.offset.y;
    const cardHeight = 112.5;
    const draggedCards = Math.round(offset / cardHeight);
    const newIndex = activeIndex - draggedCards;
    setActiveIndex(Math.max(0, Math.min(features.length - 1, newIndex)));
  };

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        {/* Main Grid Container for a Two-Column Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Left Column: Header and CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                Maximize Your Business Value with Novotion BPO Solutions
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Drive sustainable growth and operational excellence with our
              comprehensive BPO solutions. From data management and customer
              support to specialized back-office operations, we deliver
              cost-effective, scalable solutions that allow you to focus on
              strategic priorities. Our proven methodologies ensure quality,
              compliance, and consistent delivery across all services.{" "}
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-3 text-base md:text-lg">
                Start Your Journey
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Right Column: Vertical Slider - Compact */}
          <div className="w-full lg:w-1/2 relative overflow-hidden h-[320px] md:h-[350px] rounded-2xl p-2">
            <motion.div
              className="flex flex-col h-full cursor-grab active:cursor-grabbing"
              drag="y"
              dragConstraints={{
                top: -(features.length * 112.5 - 450),
                bottom: 0,
              }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              animate={{ y: `-${activeIndex * 25}%` }}
              transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
            >
              {loopedFeatures.map((feature, index) => (
                <div key={index} className="flex-shrink-0 w-full h-1/4 p-2">
                  <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-black rounded-2xl shadow-2xl overflow-hidden h-full flex items-center">
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-2 md:gap-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <div className="text-white">{feature.icon}</div>
                          </div>
                        </div>
                        {/* Content Section */}
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold text-white mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovotionFeatures;
