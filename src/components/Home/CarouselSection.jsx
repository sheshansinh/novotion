'use client';

import { useState, useEffect, useRef } from 'react';

const carouselData = [
  {
    title: 'Recruitment Process Outsourcing',
    text: 'Streamline hiring, reduce time-to-hire, and access top talent for organizations in UK and USA markets.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', 
  },
  {
    title: 'Career Support Services & Recruitment Facilitation',
    text: 'Connecting IT professionals with contract-based technology opportunities in the USA market.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
  },
  {
    title: 'Talent Acquisition Strategy',
    text: 'Comprehensive workforce planning and talent pipeline development for sustainable growth.',
    image: 'https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'IT Professional Placement',
    text: 'Specialized recruitment for technology roles with focus on contract-based opportunities.',
    image: 'https://images.unsplash.com/photo-1554224155-cfa08c2a758f?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Market Analysis & Insights',
    text: 'Data-driven insights on talent availability, compensation trends, and market dynamics.',
    image: 'https://images.unsplash.com/photo-1621184078806-6fa2fc6b1c7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Candidate Development',
    text: 'Skill enhancement and career coaching to prepare professionals for market opportunities.',
    image: 'https://images.unsplash.com/photo-1729824186568-be656d0eecf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fE9uJTIwSm9iJTIwU3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Interview & Selection Process',
    text: 'Structured assessment methods to ensure precise candidate-organization matching.',
    image: 'https://images.unsplash.com/photo-1698047681452-08eba22d0c64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW50ZXJ2aWV3JTIwU3VwcG9ydCUyMCUyNiUyMFByZXBhcmF0aW9uc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Long-term Partnership Support',
    text: 'Ongoing relationship management and performance tracking for continued success.',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW50ZXJ2aWV3JTIwQ29uc3VsdGF0aW9ufGVufDB8fDB8fHww',
  },
];

const getZindex = (array, index) =>
  array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

const CarouselSection = () => {
  const [active, setActive] = useState(0);
  const progressRef = useRef(50);
  const startXRef = useRef(0);
  const isDownRef = useRef(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const items = carouselRef.current?.querySelectorAll('.carousel-item');
    const cursors = document.querySelectorAll('.cursor');

    if (!items) return;

    const displayItems = () => {
      const zIndex = getZindex(Array.from(items), active);
      items.forEach((item, index) => {
        item.style.setProperty('--zIndex', zIndex[index]);
        item.style.setProperty('--active', (index - active) / items.length);
      });
    };

    const animate = () => {
      progressRef.current = Math.max(0, Math.min(progressRef.current, 100));
      setActive(Math.floor(progressRef.current / 100 * (items.length - 1)));
      displayItems();
    };

    const handleWheel = (e) => {
      const wheelProgress = e.deltaY * 0.02;
      progressRef.current += wheelProgress;
      animate();
    };

    const handleMouseMove = (e) => {
      cursors.forEach((cursor) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
      if (!isDownRef.current) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (x - startXRef.current) * -0.1;
      progressRef.current += mouseProgress;
      startXRef.current = x;
      animate();
    };

    const handleMouseDown = (e) => {
      isDownRef.current = true;
      startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
    };

    const handleItemClick = (index) => {
      progressRef.current = (index / items.length) * 100 + 10;
      animate();
    };

    animate();

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel);
      carouselElement.addEventListener('mousedown', handleMouseDown);
      carouselElement.addEventListener('mousemove', handleMouseMove);
      carouselElement.addEventListener('mouseup', handleMouseUp);
      carouselElement.addEventListener('mouseleave', handleMouseUp);
      carouselElement.addEventListener('touchstart', handleMouseDown);
      carouselElement.addEventListener('touchmove', handleMouseMove);
      carouselElement.addEventListener('touchend', handleMouseUp);
      
      items.forEach((item, index) => {
        item.addEventListener('click', () => handleItemClick(index));
      });
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
        carouselElement.removeEventListener('mousedown', handleMouseDown);
        carouselElement.removeEventListener('mousemove', handleMouseMove);
        carouselElement.removeEventListener('mouseup', handleMouseUp);
        carouselElement.removeEventListener('mouseleave', handleMouseUp);
        carouselElement.removeEventListener('touchstart', handleMouseDown);
        carouselElement.removeEventListener('touchmove', handleMouseMove);
        carouselElement.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [active]);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden font-sans text-white bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        
        {/* Left Content Section - More Space */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12 text-center lg:text-left order-2 lg:order-1">
          <div className="max-w-2xl w-full mx-auto lg:mx-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
              Two Distinct Service Lines,
              <span className="block text-blue-300 mt-2">One Unified Mission</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-blue-100 text-lg leading-relaxed">
                At Novotion, we operate through two specialized divisions tailored to distinct talent needs.
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                Our <span className="text-white font-semibold">Recruitment Process Outsourcing</span> division supports organizations in the UK and USA in streamlining hiring, reducing time-to-hire, and accessing top talent.
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                Meanwhile, our <span className="text-white font-semibold">Career Support Services</span> division connects IT professionals with contract-based technology opportunities in the USA market.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-300">500+</div>
                <div className="text-sm text-blue-200">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-300">10K+</div>
                <div className="text-sm text-blue-200">Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-300">15+</div>
                <div className="text-sm text-blue-200">Industries</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-4">
                Discover Which Service Fits Your Needs
              </h3>
            </div>
            
            <a 
              href="/services" 
              className="inline-block px-8 py-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Services
            </a>
          </div>
        </div>

        {/* Right Carousel Section - Compact */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col justify-center items-center order-1 lg:order-2 py-6 lg:py-0">
          {/* Carousel Container - Smaller */}
          <div className="relative w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] max-w-lg mx-auto" ref={carouselRef}>
            {carouselData.map((item, index) => (
              <div
                className="carousel-item absolute top-1/2 left-1/2 rounded-xl shadow-2xl bg-black overflow-hidden transition-transform duration-800 ease-[cubic-bezier(0,0.02,0,1)] cursor-pointer"
                key={index}
                style={{
                  '--items': carouselData.length,
                  '--active': 0,
                  '--width': 'clamp(200px, 50vw, 280px)',
                  '--height': 'clamp(250px, 60vw, 320px)',
                  width: 'var(--width)',
                  height: 'var(--height)',
                  '--x': 'calc(var(--active) * 600%)',
                  '--y': 'calc(var(--active) * 150%)',
                  '--rot': 'calc(var(--active) * 100deg)',
                  '--opacity': 'calc(var(--zIndex) / var(--items) * 3 - 2)',
                  transform: 'translate(-50%, -50%) translate(var(--x), var(--y)) rotate(var(--rot))',
                  zIndex: `var(--zIndex)`,
                }}
              >
                <div 
                  className="carousel-box relative z-10 w-full h-full transition-opacity duration-800 ease-[cubic-bezier(0,0.02,0,1)]"
                  style={{ opacity: 'var(--opacity)' }}
                >
                  {/* Gradient Overlays */}
                  <div className="absolute z-20 inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
                  
                  {/* Number Badge - Desktop Only */}
                  <div className="hidden lg:block absolute z-30 top-3 left-3 text-lg font-extrabold text-blue-400 drop-shadow-lg">
                    {`0${index + 1}`}
                  </div>
                  
                  {/* Title & Description - Desktop Only */}
                  <div className="hidden lg:block">
                    <div className="absolute z-30 bottom-12 left-3 right-3">
                      <h3 className="text-white text-sm font-bold leading-tight drop-shadow-lg line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="absolute z-30 bottom-3 left-3 right-3">
                      <p className="text-blue-100 text-xs leading-relaxed drop-shadow-md line-clamp-2">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Content Below Card */}
          <div className="lg:hidden w-full max-w-sm mx-auto px-4 mt-6 text-center">
            <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-blue-300 text-sm font-semibold mb-2">
                0{active + 1} / 0{carouselData.length}
              </div>
              <h3 className="text-white text-lg font-bold leading-tight mb-2">
                {carouselData[active].title}
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                {carouselData[active].text}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Cursors - Desktop Only */}
      <div className="cursor fixed z-50 w-10 h-10 rounded-full border-2 border-blue-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[850ms] ease-[cubic-bezier(0,0.02,0,1)] hidden lg:block pointer-events-none opacity-60"></div>
      <div className="cursor cursor2 fixed z-50 w-1 h-1 rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(0,0.02,0,1)] hidden lg:block pointer-events-none"></div>
    </>
  );
};

export default CarouselSection;