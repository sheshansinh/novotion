'use client';

import React, { useState, useEffect, useRef } from 'react';

export const BRAND_COLORS = {
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
}

const CountUp = ({ end, duration = 2000, suffix = '', visible }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (visible && !hasAnimated) {
      setHasAnimated(true);
      let startTime = null;
      const startValue = 0;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * (end - startValue) + startValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [visible, end, duration, hasAnimated]);

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ number, suffix, label, visible, delay, dark = false }) => (
  <div 
    className={`${dark ? 'bg-white/10 backdrop-blur-md border-white/20' : 'bg-slate-900/5 border-gray-200'} px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={`text-2xl sm:text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
      <CountUp end={number} suffix={suffix} visible={visible} />
    </div>
    <div className={`text-xs sm:text-sm ${dark ? 'text-blue-200' : 'text-gray-600'}`}>{label}</div>
  </div>
);

const NovotionAbout = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const coreValues = [
    {
      title: 'Integrity',
      description: 'We operate with unwavering honesty, transparency, and respect. No exceptions.',
      icon: '⭐',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      title: 'Excellence',
      description: 'We aim for the highest standard in every service we deliver, from a single resume to a full RPO implementation.',
      icon: '💪',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Commitment',
      description: 'We are personally invested in the success of our clients and candidates. Your goals become our goals.',
      icon: '🔒',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Innovation',
      description: 'We are constantly evolving, adopting smarter, more human-centric methods and technologies to stay ahead.',
      icon: '🚀',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const journeySteps = [
    {
      year: '2021',
      title: 'Foundation',
      description: 'Novotion was founded with a vision to revolutionize recruitment services',
      icon: '🏁'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations to USA, UK, and established strong presence in India',
      icon: '🌍'
    },
    {
      year: '2023',
      title: 'e-Verification',
      description: 'Achieved e-Verified company status ensuring highest security standards',
      icon: '✅'
    },
    {
      year: '2024',
      title: '500+ Clients',
      description: 'Served over 500 global clients across multiple industries',
      icon: '📈'
    }
  ];

  const industries = [
    { name: 'Telecom', icon: '📡', color: 'from-blue-500 to-cyan-500' },
    { name: 'Retail', icon: '🛍️', color: 'from-purple-500 to-pink-500' },
    { name: 'Manufacturing', icon: '🏭', color: 'from-orange-500 to-red-500' },
    { name: 'Automotive', icon: '🚗', color: 'from-green-500 to-emerald-500' },
    { name: 'Insurance', icon: '🛡️', color: 'from-indigo-500 to-blue-500' },
    { name: 'Healthcare', icon: '⚕️', color: 'from-pink-500 to-rose-500' },
    { name: 'E-commerce', icon: '🛒', color: 'from-violet-500 to-purple-500' },
    { name: 'Travel', icon: '✈️', color: 'from-cyan-500 to-blue-500' },
    { name: 'Logistics', icon: '📦', color: 'from-amber-500 to-orange-500' },
    { name: 'Banking', icon: '🏦', color: 'from-teal-500 to-green-500' },
    { name: 'Utilities', icon: '⚡', color: 'from-yellow-500 to-amber-500' },
    { name: 'Publishing', icon: '📚', color: 'from-rose-500 to-pink-500' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

// Auto slide every 2 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  }, 2000);

  return () => clearInterval(interval);
}, []);

// Manual navigation functions
const nextSlide = () => {
  setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
};

  useEffect(() => {
    const observers = {};
    
    Object.keys(sectionRefs.current).forEach(key => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section 
  ref={setRef('hero')}
  className={`relative flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg}`}
>
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
  </div>

  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className={`text-center transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="mb-6 mt-14">
        <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold tracking-wider uppercase animate-pulse">
          ABOUT NOVOTION
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
        Our Story: People, Potential, Partnership.
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
        At its core, recruitment is a deeply human endeavor. It's about connecting ambition with opportunity, and vision with the precise talent that can bring it to life. Novotion was founded on this simple, powerful idea.
      </p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <StatCard number={500} suffix="+" label="Organizations Trust Us" visible={isVisible.hero} delay={200} dark />
        <StatCard number={10000} suffix="+" label="Professionals Placed" visible={isVisible.hero} delay={400} dark />
        <StatCard number={3} suffix=" Countries" label="Global Operations" visible={isVisible.hero} delay={600} dark />
      </div>
    </div>
  </div>
</section>

      {/* Company Overview Section */}
   {/* Trusted RPO Partner Section */}
<section ref={setRef('overview')} className="py-16 sm:py-20 lg:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      {/* Image Column - 30% width on desktop, full width on mobile */}
      <div className={`w-full lg:w-[30%] relative transform transition-all duration-1000 delay-200 ${isVisible.overview ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop" 
              alt="Team collaboration"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
            {/* Floating certification badges on image */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-800">e-Verified</span>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-800">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Column - 70% width on desktop, full width on mobile */}
      <div className={`w-full lg:w-[70%] transform transition-all duration-1000 delay-400 ${isVisible.overview ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
        <div className="lg:pl-8">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Architects of <span className="text-blue-800">Opportunity</span>
          </h2>
          
          <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            <div className="relative pl-4 sm:pl-6 border-l-4 border-blue-500 bg-blue-50/50 rounded-r-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                We are a specialized Recruitment Process Outsourcing (RPO) and Career Support Services company, but we see ourselves as something more: we are architects of opportunity. For our organizational clients in the UK and USA, we build the high-performing teams that drive sustainable growth. For the skilled professionals we support, we pave the way for long-term career success.
              </p>
            </div>
            
            <div className="relative pl-4 sm:pl-6 border-l-4 border-blue-600 bg-blue-50/30 rounded-r-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                Founded in 2021, Novotion operates with a global footprint—with strategic centers in India, the USA, and the UK. This structure allows us to blend deep local market expertise with the 24/7 operational power of a global team. Our goal isn't just to fill a position or find a job; it's to empower businesses and professionals to achieve their absolute full potential.
              </p>
            </div>
            
            <div className="relative pl-4 sm:pl-6 border-l-4 border-blue-700 bg-blue-50/10 rounded-r-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                This dual approach enables deep expertise in both corporate recruitment and IT staffing delivering precise matches, stronger partnerships, and long-term success for clients and professionals alike.
              </p>
            </div>

            {/* Key Metrics Grid */}
          
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Our Journey Timeline Section */}
     <section ref={setRef('journey')} className="py-16 sm:py-20 lg:py-24 bg-slate-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className={`text-center mb-16 sm:mb-20 transform transition-all duration-1000 ${isVisible.journey ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
        Our Journey
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        Our story began in 2021, not just as a business plan, but as a response to a clear gap in the market.
      </p>
    </div>

    <div className="relative max-w-6xl mx-auto">
      <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-blue-800 h-full"></div>
      
      <div className="space-y-8 sm:space-y-12">
        {[
          {
            year: '2021',
            title: 'Foundation',
            description: 'Our story began in 2021, not just as a business plan, but as a response to a clear gap in the market. We saw companies struggling with one-size-fits-all recruitment models and talented professionals getting lost in the noise. We believed there was a better, more personal and efficient way.',
            icon: '🎯'
          },
          {
            year: '2022',
            title: 'Growth & Expansion',
            description: 'We started as a focused team, honing our craft in resume services and interview preparation. This grassroots beginning gave us an invaluable, ground-level understanding of what candidates and companies really need to connect. We learned that success isn\'t just about a keyword match; it\'s about preparation, presentation, and personal guidance.',
            icon: '🌍'
          },
          {
            year: '2023',
            title: 'Service Diversification',
            description: 'This foundation allowed us to grow quickly and organically. Our expertise naturally expanded from individual career consulting into comprehensive Recruitment Process Outsourcing. We applied our human-centric approach to a larger scale, helping organizations build entire teams.',
            icon: '✅'
          },
          {
            year: '2024',
            title: 'Global Recognition',
            description: 'Today, Novotion stands as a symbol of our commitment to excellence in the recruitment industry, continually evolving to meet the complex demands of talent and technology. Our journey is fueled by a core belief: every professional deserves the right opportunity, and every organization deserves the right talent.',
            icon: '📈'
          }
        ].map((step, index) => (
          <div 
            key={index}
            ref={setRef(`journey-item-${index}`)}
            className={`relative flex items-start sm:items-center transform transition-all duration-1000 ${
              isVisible[`journey-item-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-600 rounded-full z-20 flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-blue-800">{index + 1}</span>
            </div>

            <div className={`ml-12 sm:ml-0 sm:w-1/2 ${
              index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left sm:ml-auto'
            }`}>
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{step.icon}</span>
                  <div className="bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {step.year}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Comprehensive B2B & B2C Solutions Section - DARK THEME */}
  <section ref={setRef('solutions')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Content Column - 60% width */}
      <div className={`w-full lg:w-[70%] transform transition-all duration-1000 delay-200 ${isVisible.solutions ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Why Choose <span className="text-blue-400">Novotion?</span>
        </h2>
        <div className="space-y-6 text-blue-100 text-base sm:text-lg leading-relaxed mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">Guidance That's Personal</h3>
            <p>You're not a number on a spreadsheet. You get dedicated consultants who know your name, understand your industry, and are invested in your specific goals.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">Expertise That's Deep</h3>
            <p>Our teams are specialized across 15+ industries and countless job functions. We speak your language and understand the nuances of your market.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">A Process That's Transparent</h3>
            <p>We believe in complete visibility. You'll receive measurable outcomes and clear communication at every step of the process.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">Support That's End-to-End</h3>
            <p>From the first resume draft to long-term post-placement support, we are your partners for the entire journey.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">A Team That's Always On</h3>
            <p>Our global reach and 24/7 support model mean we are working for you around the clock, ensuring no opportunity is missed.</p>
          </div>
        </div>
        
        {/* Channel Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-2 mb-0">
          {[
            { name: 'Phone Consultations', icon: '📞' },
            { name: 'Email Communication', icon: '✉️' },
            { name: 'Social Media Recruiting', icon: '📱' },
            { name: 'Video Interview Support', icon: '🎥' },
            { name: 'Web-Based Platforms', icon: '🌐' },
            { name: 'Text Communication', icon: '💬' }
          ].map((channel, idx) => (
            <div 
              key={channel.name}
              className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative text-center">
                <div className="text-lg sm:text-xl mb-1 transform group-hover:scale-110 transition-transform duration-300">{channel.icon}</div>
                <div className="text-blue-200 group-hover:text-white font-semibold text-xs sm:text-sm transition-colors duration-300">{channel.name}</div>
              </div>
            </div>
          ))}
        </div>

        
       
      </div>

      {/* Image Column - 40% width */}
      <div className={`w-full lg:w-[30%] transform transition-all duration-1000 delay-400 ${isVisible.solutions ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop" 
                  alt="Team collaboration"
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-sm">Team Collaboration</p>
                </div>
              </div>
              <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop" 
                  alt="Candidate interviews"
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-sm">Candidate Interviews</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12 lg:pt-16">
              <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
                  alt="Professional training"
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-700 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-sm">Professional Training</p>
                </div>
              </div>
              <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2940&auto=format&fit=crop" 
                  alt="Global operations"
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold text-sm">Global Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Industries We Serve Section */}
<section ref={setRef('industries')} className="py-16 sm:py-20 lg:py-24 bg-slate-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible.industries ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
        Industries We <span className="text-blue-800">Serve</span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 mx-auto leading-relaxed">
        With expertise spanning 15+ industry verticals, we deliver specialized recruitment solutions that understand the unique demands and skill requirements of each sector.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
      {industries.map((industry, idx) => (
        <div
          key={industry.name}
          className={`group relative bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden min-h-[180px] flex items-center justify-center ${isVisible.industries ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: `${idx * 50}ms` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          
          {/* Default State - Icon and Title */}
          <div className="relative z-10 text-center group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
              {industry.icon}
            </div>
            <h3 className="font-bold text-gray-800 text-base sm:text-lg">
              {industry.name}
            </h3>
          </div>

          {/* Hover State - Description Only */}
          <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
              Specialized recruitment solutions for {industry.name} sector
            </p>
          </div>

          <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${industry.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Core Values Section */}
    {/* Core Values Section with Mobile Slider */}
<section ref={setRef('coreValues')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className={`text-center mb-16 sm:mb-20 transform transition-all duration-1000 ${isVisible.coreValues ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        Our Core Values
      </h2>
      <p className="text-lg sm:text-xl text-blue-100 mx-auto">
        These aren't just words on a wall; they are the principles that guide every decision, every partnership, and every placement we make.
      </p>
    </div>

    {/* Desktop Grid Layout */}
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {coreValues.map((value, index) => (
        <div
          key={value.title}
          className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 ${
            isVisible.coreValues ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="relative z-10">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {value.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {value.title}
            </h3>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {value.description}
            </p>
          </div>
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
        </div>
      ))}
    </div>

    {/* Mobile Slider */}
    <div className="md:hidden relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {coreValues.map((value, index) => (
            <div
              key={value.title}
              className="w-full flex-shrink-0 px-2"
            >
              <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
                <div className="relative z-10">
                  <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
     
    </div>
  </div>
</section>
      {/* Vision & Mission Section */}
      <section ref={setRef('vision')} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className={`group bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-1000 delay-200 hover:scale-105 ${isVisible.vision ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 text-center lg:text-left">Our Mission</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center lg:text-left">
                To redefine how recruitment and placement services operate by providing personalized, transparent, and value-driven solutions that enhance both employability and organizational growth.
              </p>
            </div>

            <div className={`group bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-1000 delay-400 hover:scale-105 ${isVisible.vision ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 text-center lg:text-left">Our Vision</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center lg:text-left">
                To be the most trusted partner in career and talent development, known not just for our results, but for our integrity and our unwavering commitment to the success of every client and candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={setRef('cta')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Talent Strategy?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Join 500+ organizations and 10,000+ professionals who trust Novotion for their recruitment and career success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Today
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovotionAbout;