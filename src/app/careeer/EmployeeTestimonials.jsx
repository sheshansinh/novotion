'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

const BRAND_COLORS = {
  dark: {
    bg: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    text: {
      primary: 'text-white',
      secondary: 'text-blue-100'
    },
    accent: 'bg-blue-400'
  },
  light: {
    bg: 'bg-white',
    text: {
      primary: 'text-gray-900', 
      secondary: 'text-gray-600'
    },
    accent: 'bg-blue-800'
  }
};

const EmployeeTestimonials = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const testimonialTimerRef = useRef(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      position: 'Senior Operations Manager',
      department: 'Operations',
      location: 'India',
      tenure: '2 years',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000',
      rating: 5,
      text: "Novotion's collaborative environment and growth opportunities have been incredible. The leadership truly invests in your development and the global exposure is unmatched in the BPO industry.",
      highlight: 'Growth opportunities and global exposure'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      position: 'Customer Success Lead',
      department: 'Customer Service',
      location: 'USA',
      tenure: '1.5 years',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000',
      rating: 5,
      text: "The work-life balance here is real. Flexible hours and remote options let me perform at my best while maintaining personal commitments. The team feels like family.",
      highlight: 'Real work-life balance'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      position: 'Quality Assurance Analyst',
      department: 'Quality',
      location: 'India',
      tenure: '3 years',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000',
      rating: 5,
      text: "I've grown from a junior analyst to leading a team of 15. The learning budget and mentorship programs accelerated my career growth beyond expectations.",
      highlight: 'Rapid career progression'
    },
    {
      id: 4,
      name: 'James Wilson',
      position: 'Sales Development Rep',
      department: 'Sales',
      location: 'Remote',
      tenure: '1 year',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
      rating: 5,
      text: "The commission structure and performance bonuses are truly rewarding. Management recognizes hard work immediately, and the sales tools provided are top-notch.",
      highlight: 'Rewarding performance culture'
    },
    {
      id: 5,
      name: 'Aisha Khan',
      position: 'HR & Talent Manager',
      department: 'HR',
      location: 'Remote',
      tenure: '2.5 years',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000',
      rating: 5,
      text: "Building diverse, inclusive teams across three continents has been incredibly fulfilling. Novotion genuinely values different perspectives and backgrounds.",
      highlight: 'Inclusive and diverse environment'
    },
    {
      id: 6,
      name: 'David Kim',
      position: 'Technical Support Engineer',
      department: 'Technical',
      location: 'Remote',
      tenure: '2 years',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000',
      rating: 5,
      text: "The technical challenges and cutting-edge projects keep me engaged every day. The innovation budget allows us to experiment with new technologies regularly.",
      highlight: 'Innovative technical challenges'
    }
  ];

  // Number of testimonials to show per slide based on screen size
  const getTestimonialsPerSlide = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1280) return 3; // xl screens
    if (width >= 1024) return 3; // lg screens
    if (width >= 768) return 2;  // md screens
    return 1; // mobile
  };

  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setTestimonialsPerSlide(getTestimonialsPerSlide());
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide effect for testimonials
  useEffect(() => {
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current);
    }

    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        (prev + 1) % Math.ceil(testimonials.length / testimonialsPerSlide)
      );
    }, 4000);

    return () => {
      if (testimonialTimerRef.current) {
        clearInterval(testimonialTimerRef.current);
      }
    };
  }, [testimonials.length, testimonialsPerSlide]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Navigation functions
  const nextTestimonial = () => {
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current);
    }
    setCurrentTestimonialIndex((prev) => 
      (prev + 1) % Math.ceil(testimonials.length / testimonialsPerSlide)
    );
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        (prev + 1) % Math.ceil(testimonials.length / testimonialsPerSlide)
      );
    }, 4000);
  };

  const prevTestimonial = () => {
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current);
    }
    setCurrentTestimonialIndex((prev) => 
      (prev - 1 + Math.ceil(testimonials.length / testimonialsPerSlide)) % Math.ceil(testimonials.length / testimonialsPerSlide)
    );
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        (prev + 1) % Math.ceil(testimonials.length / testimonialsPerSlide)
      );
    }, 4000);
  };

  const goToTestimonialSlide = (slideIndex) => {
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current);
    }
    setCurrentTestimonialIndex(slideIndex);
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        (prev + 1) % Math.ceil(testimonials.length / testimonialsPerSlide)
      );
    }, 4000);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  const startIndex = currentTestimonialIndex * testimonialsPerSlide;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + testimonialsPerSlide);

  return (
    <section 
      ref={sectionRef}
      className="py-12 bg-slate-50 min-h-[80vh] flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Employee <span className="text-blue-800">Testimonials</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Hear from our team members about their experiences working at Novotion
          </p>
        </div>

        {/* Main Carousel Container - For ALL screen sizes */}
        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Wrapper */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-2">
                    {testimonials.slice(
                      slideIndex * testimonialsPerSlide, 
                      slideIndex * testimonialsPerSlide + testimonialsPerSlide
                    ).map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full"
                      >
                        {/* Quote Icon */}
                        <div className="flex justify-between items-start mb-4">
                          <Quote className="w-8 h-8 text-blue-200 transform rotate-180" />
                          <div className="flex gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                          "{testimonial.text}"
                        </p>

                        {/* Highlight */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                          <p className="text-blue-800 text-xs font-semibold">
                            💫 {testimonial.highlight}
                          </p>
                        </div>

                        {/* Employee Info */}
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-xs text-gray-600">{testimonial.position}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" />
                                {testimonial.location}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {testimonial.tenure}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Department Badge */}
                        <div className="mt-3">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            {testimonial.department}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Slider Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial} 
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonialSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-12 text-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-800 mb-1">94%</div>
              <div className="text-xs text-gray-600">Employee Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-800 mb-1">2.5yrs</div>
              <div className="text-xs text-gray-600">Avg. Tenure</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-800 mb-1">85%</div>
              <div className="text-xs text-gray-600">Promotion Rate</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-800 mb-1">4.9/5</div>
              <div className="text-xs text-gray-600">Company Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeTestimonials;