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
      testimonial: "Novotion's resume and interview preparation services gave me the edge I needed. Their technical trainer helped me refine my QA testing approach, and within weeks, I received an offer from Ampup. The post-placement support was exceptional — they guided me even after joining.",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Abhinav Dasari",
      role: "Electrical Engineer, UPS",
      testimonial: "The Novotion team rebuilt my resume and provided focused interview coaching. Their career consultant helped me clearly position my electrical engineering skills for global roles. I'm now working at UPS, and I couldn't be happier with their guidance.",
      bgImage: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1581094794325-bf55348dfa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Anvith Goud Durki",
      role: "Network Engineer, Sarasota County Government",
      testimonial: "I was struggling to get noticed despite solid technical skills. Novotion optimized my LinkedIn profile and provided customized interview sessions. Within a short period, I secured a role with Sarasota County Government. Their personal attention truly sets them apart.",
      bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1560415751-3e3c75a350d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dixit Gupta Garlapati",
      role: "DevOps Engineer, Meta",
      testimonial: "Novotion connected me to great opportunities and provided deep technical training on CI/CD and cloud concepts. Their trainers are industry experts who understand what top companies like Meta look for. I owe a big part of my success to their team.",
      bgImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Shajahan Shaik",
      role: "Full Stack Developer, Amazon Audible",
      testimonial: "From resume optimization to advanced interview rounds, Novotion supported me throughout. My consultant and trainer worked tirelessly to improve my coding and problem-solving skills. The result — I joined Amazon Audible as a Full Stack Developer!",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      thumbImage: "https://images.unsplash.com/photo-1551135049-8a33b42738b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Auto-slide functionality - 3 seconds
  useEffect(() => {
    if (isPaused) return;

    autoSlideRef.current = setInterval(() => {
      setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [testimonials.length, isPaused]);

  // Center card when current changes
  useEffect(() => {
    if (trackRef.current && wrapRef.current) {
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

  return (
    <section 
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 md:py-12 px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Success Stories from Our Professionals
          </h2>
          
          <div className="flex gap-2 self-center md:self-auto">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:bg-blue-400"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 text-white text-xl md:text-2xl flex items-center justify-center transition-all duration-300 hover:bg-blue-400"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div 
          ref={wrapRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div 
            ref={trackRef}
            className="flex gap-4 md:gap-6 items-start justify-start scroll-smooth snap-x snap-mandatory py-4 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <article 
                key={index}
                className={`
                  relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  snap-center
                  ${index === current 
                    ? 'w-[85vw] md:w-[600px] transform -translate-y-2 shadow-2xl' 
                    : 'w-16 md:w-20 hover:scale-105'
                  }
                  h-80 md:h-96
                `}
                onClick={() => activate(index)}
              >
                {/* Background Image */}
                <img 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: index === current ? 'brightness(0.85) saturate(110%)' : 'brightness(0.7) saturate(80%)',
                    transform: index === current ? 'scale(1.05)' : 'scale(1.01)'
                  }}
                  src={testimonial.bgImage} 
                  alt={testimonial.name}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />
                
                {/* Content */}
                <div className={`
                  absolute inset-0 z-20 flex transition-all duration-500 p-4 md:p-6
                  ${index === current 
                    ? 'flex-col md:flex-row items-start md:items-center justify-end md:justify-start' 
                    : 'flex-col justify-center items-center'
                  }
                `}>
                  
                  {/* Thumbnail Image - Only show when active */}
                  {index === current && (
                    <img 
                      className="w-20 h-32 md:w-28 md:h-40 rounded-xl object-cover shadow-xl flex-shrink-0 mb-4 md:mb-0 md:mr-6 border-2 border-blue-400"
                      src={testimonial.thumbImage} 
                      alt={testimonial.name}
                    />
                  )}
                  
                  {/* Text Content */}
                  <div className={`
                    ${index === current ? 'flex-1' : 'text-center'}
                    ${index === current ? 'space-y-3 md:space-y-4' : 'space-y-2'}
                  `}>
                    {/* Title */}
                    <h3 className={`
                      font-bold text-white transition-all duration-500
                      ${index === current 
                        ? 'text-xl md:text-2xl leading-tight' 
                        : 'text-sm md:text-base [writing-mode:vertical-rl] rotate-180'
                      }
                    `}>
                      {testimonial.name}
                    </h3>
                    
                    {/* Role and Description - Only show when active */}
                    {index === current && (
                      <div className="space-y-3 md:space-y-4">
                        <p className="text-blue-300 font-semibold text-sm md:text-base">
                          {testimonial.role}
                        </p>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed md:leading-loose">
                          {testimonial.testimonial}
                        </p>
                        <button className="bg-blue-400 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:bg-blue-300 hover:scale-105 w-full md:w-auto text-center">
                          Read Success Story
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 md:gap-3 py-6 md:py-8 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`
              w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer
              ${index === current 
                ? 'bg-blue-400 scale-110' 
                : 'bg-white/25 hover:bg-white/40'
              }
            `}
            onClick={() => activate(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

   
    </section>
  );
};

export default TestimonialSlider;