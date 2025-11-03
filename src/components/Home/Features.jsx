'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NovotionFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Recruitment Process Outsourcing",
      description: "Comprehensive recruitment solutions for businesses in UK and USA markets seeking to optimize talent acquisition, reduce hiring costs, and build scalable recruitment operations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      )
    },
    {
      title: "End-to-End Recruitment Management",
      description: "From candidate sourcing to onboarding support, we function as an extension of your Talent Acquisition Team, with our India-based offshore support providing round-the-clock recruitment assistance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Talent Sourcing & Headhunting",
      description: "Comprehensive talent sourcing strategies and headhunting services to identify and attract top professionals for your organization.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Career Support Services & Recruitment Facilitation",
      description: "Specialized support services exclusively for the USA market, connecting skilled technology professionals with client companies seeking contract-based roles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Professional Marketing & Placement",
      description: "We manage the entire support process from marketing professionals to contract negotiation and project placement, helping IT consultants and professionals connect with the right career opportunities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      title: "Interview Coordination & Contract Support",
      description: "Comprehensive interview coordination and contract negotiation support ensuring smooth onboarding and project start for IT professionals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  const loopedFeatures = [...features, ...features];

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex >= features.length) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, features.length]);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        
        {/* Main Grid Container for a Two-Column Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          
          {/* Left Column: Header and CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black">
                Two Distinct Service Lines
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6">
              Strategic RPO Framework for organizations and Career Support Services for IT professionals - delivering precise matches, stronger partnerships, and long-term success.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a 
                href="/services/recruitment-process-outsourcing"
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 overflow-hidden transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                  Explore RPO Services
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              <a 
                href="/services/career-support-services"
                className="group relative px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-lg shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 overflow-hidden transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                  Career Support Services
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Service Scope Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">RPO Services Scope</h4>
                <p className="text-xs text-gray-600">UK and USA markets, supported by offshore team in India</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-1 text-sm">Career Support Scope</h4>
                <p className="text-xs text-gray-600">USA market only - specialized IT staffing services</p>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Slider - Compact */}
          <div className="w-full lg:w-1/2 relative overflow-hidden h-[320px] md:h-[350px] rounded-2xl p-2">
            <motion.div
              className="flex flex-col h-full"
              animate={{ y: `-${activeIndex * 25}%` }}
              transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
              onAnimationComplete={() => {
                if (activeIndex >= features.length) {
                  setActiveIndex(0);
                }
              }}
            >
              {loopedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-1/4 p-1"
                >
                  <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-black rounded-xl shadow-lg overflow-hidden h-full flex items-center">
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <div className="text-white">
                              {feature.icon}
                            </div>
                          </div>
                        </div>
                        {/* Content Section */}
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-white mb-1 leading-tight">
                            {feature.title}
                          </h3>
                          <p className="text-blue-100 text-xs leading-relaxed line-clamp-2">
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