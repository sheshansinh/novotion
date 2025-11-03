'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; // Assuming you have Next.js Image component

const GlobalTalentGateway = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden py-16 md:py-24 lg:py-32 px-4"
    >
      {/* Animated Background Graphics - subtle dots/lines */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="animate-gradient-shift w-full h-full" style={{
          background: 'linear-gradient(45deg, #1e3a8a, #0c4a6e, #1e3a8a, #0ea5e9)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite'
        }}></div>
      </div>
      {/* Add this to your global CSS:
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      */}

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Column: Content */}
        <div className="relative z-20 md:pr-8 lg:pr-16 text-center md:text-left">
          {/* Main Title */}
          <h2
            className={`
              text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white
              transition-all duration-1000 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Transform Your <br className="hidden sm:inline" />
            <span className="text-blue-400">Hiring with Novotion</span>
          </h2>

          {/* Mission Statement */}
          <p
            className={`
              text-sm md:text-lg text-blue-100 mb-6 md:mb-8 leading-relaxed
              transition-all duration-1000 ease-out delay-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Access world-class RPO solutions designed to optimize talent acquisition, reduce hiring costs, and drive sustainable growth. From strategic recruitment to comprehensive talent management, Novotion is your trusted partner in building exceptional teams and streamlining hiring operations across global markets. Let's unlock your organization's full potential.
          </p>

          {/* Goal Statement */}
          {/* <p
            className={`
              text-sm md:text-lg font-semibold text-blue-200 mb-8 md:mb-10
              transition-all duration-1000 ease-out delay-400
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            Our ultimate goal is to enable our clients to achieve their business objectives through the power of their people.
          </p> */}

          {/* Call to Action Button */}
      
          <button
            className={`
              bg-blue-400 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-bold
              transition-all duration-500 ease-in-out hover:bg-blue-300 hover:scale-105 shadow-lg
              focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionDelay: '600ms' }}
          >
            Book a Demo
          </button>
          
        </div>

        {/* Right Column: Image - Overlapping on Desktop */}
        <div
          className={`
            relative flex justify-center items-center h-72 md:h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]
            md:transform md:translate-x-8 lg:translate-x-16 md:z-10 md:mt-0
            ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-3'}
            transition-all duration-1000 ease-out delay-500
          `}
        >
          <Image
            src="/image/Gemini_Generated_Image_mi39a7mi39a7mi39.png" // Demo image URL
            alt="Global Talent Gateway"
            layout="fill" // Makes the image fill its parent div
            objectFit="cover" // Covers the area without distortion
            className="rounded-xl shadow-2xl saturate-150 brightness-90 hover:brightness-100 hover:saturate-100 transition-all duration-500"
          />
          {/* Optional overlay for styling */}
          <div className="absolute inset-0 rounded-xl bg-blue-900/20 mix-blend-multiply"></div>
        </div>
      </div>
    </section>
  );
};

export default GlobalTalentGateway;