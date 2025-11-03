'use client';

import { useState, useEffect, useRef } from 'react';

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const autoSlideRef = useRef(null);

  const testimonials = [
    {
      name: "Phani Datta Pabisetty",
      role: "QA Analyst, Ampup",
      testimonial: "Novotion's help was a game-changer. Their trainer didn't just prep me; they refined my entire approach to QA testing. I had an offer from Ampup within weeks. What really stood out was the post-placement support—they actually checked in and guided me after I started.",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Abhinav Dasari",
      role: "Electrical Engineer, UPS",
      testimonial: "The Novotion team didn't just rebuild my resume; they helped me see how to position my electrical engineering skills for the roles I really wanted. The interview coaching was focused and practical. I'm now at UPS, and I know their guidance was what made the difference.",
      bgImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581094794325-bf55348dfa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Anvith Goud Durki",
      role: "Network Engineer, Sarasota County Government",
      testimonial: "I had strong technical skills but was struggling to even get noticed. Novotion's team got to work, optimized my LinkedIn profile, and ran customized interview sessions that built my confidence. I secured my role with Sarasota County Government shortly after. Their personal attention is what sets them apart.",
      bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1560415751-3e3c75a350d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dixit Gupta Garlapati",
      role: "DevOps Engineer, Meta",
      testimonial: "Novotion has real industry experts. They connected me with a trainer who understood exactly what companies like Meta look for in a DevOps Engineer. We dove deep into CI/CD and cloud concepts, which was critical in my interviews. I owe a huge part of my success to their team.",
      bgImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Shajahan Shaik",
      role: "Full Stack Developer, Amazon Audible",
      testimonial: "From the first resume edit to the final, advanced interview rounds, Novotion was with me. My consultant and trainer were relentless, working with me to sharpen my coding and problem-solving skills. The result? I landed my dream job as a Full Stack Developer at Amazon Audible.",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1551135049-8a33b42738b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Nitesh Battu",
      role: "Electrical Engineer, Honeywell",
      testimonial: "I was stuck in a cycle of rejections before I found Novotion. They were honest about what needed to change. They refined my resume and put me through targeted technical mock interviews that felt like the real thing. It gave me the confidence I was missing. Now, I'm part of the engineering team at Honeywell.",
      bgImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Nikhitha Anugu",
      role: "Design Engineer, TekWissen",
      testimonial: "The team at Novotion genuinely treated me like family. My consultant guided me through every single step, from finding the right openings to helping me prepare for salary negotiation. The mock interviews were so realistic and incredibly effective. I'm now a Design Engineer at TekWissen!",
      bgImage: "https://images.unsplash.com/photo-1581092335397-20ffc55e1c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581092335397-20ffc55e1c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Pravallika Yarragudi",
      role: "Sr. DFT Verification Engineer, Lightmatter",
      testimonial: "Novotion's tailored approach made all the difference. They understood my niche technical field. Their resume and LinkedIn optimization immediately helped me land more interviews. I'm now at Lightmatter in a role that is a perfect fit for my career goals.",
      bgImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Naveen Kumar Mandadi",
      role: "SOC Analyst, Fivesky",
      testimonial: "The Novotion team truly understands the cybersecurity domain. They connected me with a personal technical trainer who strengthened my SIEM and SOC fundamentals, moving me from theory to practical application. Within a month, I joined Fivesky. Their support and mentoring are excellent.",
      bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1560415751-3e3c75a350d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Nagasai Mirthivada",
      role: "Network Admin, Sierra Digital Inc",
      testimonial: "Novotion helped me shape my professional journey. It wasn't just a placement service. From the resume revamp to their continuous follow-ups, they provided genuine career assistance. Their after-placement guidance made sure I was well-prepared for my role at Sierra Digital Inc.",
      bgImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581094794325-bf55348dfa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [testimonials.length, isPaused]);

  // Handle card centering and swipe on mobile
  useEffect(() => {
    if (trackRef.current) {
      centerCard(current);
    }
  }, [current]);

  const centerCard = (index) => {
    if (!trackRef.current || !wrapRef.current) return;

    const cards = trackRef.current.children;
    if (!cards[index]) return;

    const card = cards[index];
    const cardLeft = card.offsetLeft;
    const cardWidth = card.clientWidth;
    const containerWidth = wrapRef.current.clientWidth;
    
    wrapRef.current.scrollTo({
      left: cardLeft - (containerWidth / 2 - cardWidth / 2),
      behavior: "smooth"
    });
  };

  const go = (step) => {
    const newIndex = current + step;
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setCurrent(newIndex);
    } else if (newIndex < 0) {
      setCurrent(testimonials.length - 1);
    } else {
      setCurrent(0);
    }
    
    // Reset auto-slide timer on manual navigation
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const activate = (index) => {
    if (index === current) return;
    setCurrent(index);
    
    // Reset auto-slide timer on manual navigation
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch swipe functionality for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next
      go(1);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right - previous
      go(-1);
    }
  };

  return (
    <section 
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 px-4 sm:py-8 md:py-12 lg:py-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header - Mobile First */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            Success Stories from Our Professionals
          </h2>
          
          <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-2xl">
            Real people, real results - discover how Novotion helped professionals land their dream jobs
          </p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div 
          ref={wrapRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={trackRef}
            className="flex gap-3 sm:gap-4 md:gap-6 items-start justify-start scroll-smooth snap-x snap-mandatory py-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <article 
                key={index}
                className={`
                  relative flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  snap-center
                  ${index === current 
                    ? 'w-[85vw] sm:w-[75vw] md:w-[600px] lg:w-[700px] transform -translate-y-1 sm:-translate-y-2 shadow-xl sm:shadow-2xl' 
                    : 'w-12 sm:w-14 md:w-16 lg:w-20 hover:scale-105 opacity-90'
                  }
                  h-64 sm:h-72 md:h-80 lg:h-96
                `}
                onClick={() => activate(index)}
              >
                {/* Background Image */}
                <img 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: index === current ? 'brightness(0.8) saturate(110%)' : 'brightness(0.6) saturate(80%)',
                    transform: index === current ? 'scale(1.05)' : 'scale(1.01)'
                  }}
                  src={testimonial.bgImage} 
                  alt={testimonial.name}
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90 z-10" />
                
                {/* Content */}
                <div className={`
                  absolute inset-0 z-20 flex transition-all duration-500 p-3 sm:p-4 md:p-6
                  ${index === current 
                    ? 'flex-col justify-end' 
                    : 'flex-col justify-center items-center'
                  }
                `}>
                  
                  {/* Thumbnail Image - Only show when active */}
                  {index === current && (
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <img 
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shadow-lg border-2 border-blue-400 flex-shrink-0"
                        src={testimonial.thumbImage} 
                        alt={testimonial.name}
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight truncate">
                          {testimonial.name}
                        </h3>
                        <p className="text-blue-300 font-semibold text-xs sm:text-sm md:text-base truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Text Content */}
                  <div className={`
                    ${index === current ? 'block' : 'hidden'}
                    space-y-2 sm:space-y-3 md:space-y-4
                  `}>
                    {/* Testimonial Text */}
                    <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose line-clamp-3 sm:line-clamp-4">
                      {testimonial.testimonial}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 w-full text-center active:scale-95">
                      Read Full Story
                    </button>
                  </div>

                  {/* Inactive State - Just name */}
                  {index !== current && (
                    <h3 className={`
                      font-bold text-white text-center
                      text-xs sm:text-sm [writing-mode:vertical-rl] rotate-180
                    `}>
                      {testimonial.name.split(' ')[0]}
                    </h3>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-1 sm:gap-2 md:gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`
                  w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer
                  ${index === current 
                    ? 'bg-blue-400 scale-110 sm:scale-125' 
                    : 'bg-white/25 hover:bg-white/40'
                  }
                `}
                onClick={() => activate(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex gap-2 sm:gap-3">
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white text-lg sm:text-xl flex items-center justify-center transition-all duration-300 hover:bg-blue-500 active:scale-95 touch-manipulation"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white text-lg sm:text-xl flex items-center justify-center transition-all duration-300 hover:bg-blue-500 active:scale-95 touch-manipulation"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default TestimonialSlider;