'use client';

import React, { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Novotion's BPO services transformed our operations. Their team is incredibly professional, and their attention to detail is unmatched. We've seen a significant increase in efficiency and customer satisfaction. The results are truly phenomenal and have exceeded our every expectation.",
    name: "Jane Doe",
    title: "CEO of Tech Innovators",
    rating: 5,
  },
  {
    quote: "Working with Novotion was a game-changer. The seamless integration of their solutions and their commitment to security gave us peace of mind. Highly recommend their services for any growing business.",
    name: "John Smith",
    title: "Director of Digital Growth",
    rating: 5,
  },
  {
    quote: "We needed a flexible and scalable solution, and Novotion delivered. Their quick turnaround time and accurate data handling have been crucial for our business. A truly reliable partner.",
    name: "Emily Clark",
    title: "Operations Manager, Global Corp",
    rating: 4,
  },
  {
    quote: "The 24/7 customer support from Novotion has exceeded our expectations. Our clients are happier, and we've been able to focus on our core business. Fantastic service and a fantastic team. We couldn't have done it without them.",
    name: "Michael Brown",
    title: "Head of Customer Experience",
    rating: 5,
  },
  {
    quote: "Their experienced team provided us with a cost-effective solution without compromising on quality. The results speak for themselves, and we look forward to a long partnership.",
    name: "Sarah Williams",
    title: "VP of Business Development",
    rating: 5,
  },
];

const NovotionTestimonials = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Auto slide functionality
  useEffect(() => {
    if (isHovered || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= testimonials.length) {
          return 0; // Loop back to first
        }
        return nextIndex;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  // Update scroll position when currentIndex changes
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && !isDragging) {
      const card = slider.querySelector('.snap-center');
      if (card) {
        const cardWidth = card.offsetWidth + 24; // width + gap
        slider.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex, isDragging]);

  // Smooth drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.scrollBehavior = 'smooth';
    }
    
    // Update current index based on scroll position
    const slider = sliderRef.current;
    if (slider) {
      const scrollPos = slider.scrollLeft;
      const card = slider.querySelector('.snap-center');
      if (card) {
        const cardWidth = card.offsetWidth + 24;
        const newIndex = Math.round(scrollPos / cardWidth);
        setCurrentIndex(Math.max(0, Math.min(newIndex, testimonials.length - 1)));
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="light-section text-black relative w-full py-16 md:py-24 bg-gradient-to-br from-white to-blue-50 text-gray-900 overflow-hidden">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider-container {
          scroll-behavior: smooth;
          user-select: none;
        }
        .testimonial-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-8px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Trusted by businesses worldwide to deliver exceptional results and unwavering support.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={sliderRef}
            className="slider-container relative w-full overflow-x-auto snap-x snap-mandatory scroll-p-4 md:scroll-p-8 pb-8 hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="flex space-x-6 md:space-x-8 px-4 md:px-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[450px] lg:w-[500px] transform transition-all duration-500"
                  style={{
                    opacity: Math.abs(index - currentIndex) > 1 ? 0.3 : 1,
                    transform: `scale(${index === currentIndex ? 1 : 0.95})`
                  }}
                >
                  <div className="testimonial-card bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/50 shadow-2xl shadow-blue-100/50 h-[380px] flex flex-col">
                    <div className="flex-grow overflow-y-auto pr-4 hide-scrollbar">
                      {renderStars(testimonial.rating)}
                      <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6 font-light">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-auto pt-6 border-t border-gray-200/50">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-gray-900 truncate">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{testimonial.title}</p>
                      </div>
                      <div className="text-4xl text-gray-200 opacity-50">"</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center space-x-3 mt-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200/50 hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center w-12 h-12 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200/50 hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center w-12 h-12 hover:scale-110"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scroll Hint */}
      
      </div>
    </div>
  );
};

export default NovotionTestimonials;