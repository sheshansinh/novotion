"use client";

import React, { useState, useEffect, useRef } from "react";

export const BRAND_COLORS = {
  dark: {
    bg: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
    text: {
      primary: "text-white",
      secondary: "text-blue-100",
    },
    accent: "bg-blue-400",
  },
  light: {
    bg: "bg-white",
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
    },
    accent: "bg-blue-800",
  },
};

// Text Animation Component
const AnimatedText = ({
  children,
  delay = 0,
  duration = 800,
  className = "",
  animateOnScroll = true,
  animation = "fadeInUp",
}) => {
  const [isVisible, setIsVisible] = useState(!animateOnScroll);
  const textRef = useRef(null);

  useEffect(() => {
    if (!animateOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [animateOnScroll]);

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-800 ease-out";

    switch (animation) {
      case "fadeInLeft":
        return `${baseClass} ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`;
      case "fadeInRight":
        return `${baseClass} ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`;
      case "fadeInUp":
      default:
        return `${baseClass} ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`;
    }
  };

  return (
    <div
      ref={textRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
  animateOnScroll = true,
}) => {
  const [isVisible, setIsVisible] = useState(!animateOnScroll);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!animateOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animateOnScroll]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-10 opacity-0 scale-95"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CountUp = ({ end, duration = 2000, suffix = "", visible }) => {
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

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatCard = ({ number, suffix, label, visible, delay, dark = false }) => (
  <AnimatedCard
    delay={delay}
    className={`${
      dark
        ? "bg-white/10 backdrop-blur-md border-white/20"
        : "bg-slate-900/5 border-gray-200"
    } px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500`}
  >
    <div
      className={`text-2xl sm:text-3xl font-bold ${
        dark ? "text-white" : "text-gray-900"
      }`}
    >
      <CountUp end={number} suffix={suffix} visible={visible} />
    </div>
    <div
      className={`text-xs sm:text-sm ${
        dark ? "text-blue-200" : "text-gray-600"
      }`}
    >
      {label}
    </div>
  </AnimatedCard>
);

const NovotionAbout = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const coreValues = [
    {
      title: "Integrity",
      description:
        "We operate with unwavering honesty, transparency, and respect. No exceptions.",
      icon: "⭐",
      color: "from-yellow-400 to-amber-500",
    },
    {
      title: "Excellence",
      description:
        "We aim for the highest standard in every service we deliver, from a single resume to a full RPO implementation.",
      icon: "💪",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Commitment",
      description:
        "We are personally invested in the success of our clients and candidates. Your goals become our goals.",
      icon: "🔒",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Innovation",
      description:
        "We are constantly evolving, adopting smarter, more human-centric methods and technologies to stay ahead.",
      icon: "🚀",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const journeySteps = [
    {
      year: "2021",
      title: "Foundation",
      description:
        "Novotion was founded with a vision to revolutionize recruitment services",
      icon: "🏁",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Expanded operations to USA, UK, and established strong presence in India",
      icon: "🌍",
    },
    {
      year: "2023",
      title: "e-Verification",
      description:
        "Achieved e-Verified company status ensuring highest security standards",
      icon: "✅",
    },
    {
      year: "2024",
      title: "500+ Clients",
      description: "Served over 500 global clients across multiple industries",
      icon: "📈",
    },
  ];

  const industries = [
    { name: "Telecom", icon: "📡", color: "from-blue-500 to-cyan-500" },
    { name: "Retail", icon: "🛍️", color: "from-purple-500 to-pink-500" },
    { name: "Manufacturing", icon: "🏭", color: "from-orange-500 to-red-500" },
    { name: "Automotive", icon: "🚗", color: "from-green-500 to-emerald-500" },
    { name: "Insurance", icon: "🛡️", color: "from-indigo-500 to-blue-500" },
    { name: "Healthcare", icon: "⚕️", color: "from-pink-500 to-rose-500" },
    { name: "E-commerce", icon: "🛒", color: "from-violet-500 to-purple-500" },
    { name: "Travel", icon: "✈️", color: "from-cyan-500 to-blue-500" },
    { name: "Logistics", icon: "📦", color: "from-amber-500 to-orange-500" },
    { name: "Banking", icon: "🏦", color: "from-teal-500 to-green-500" },
    { name: "Utilities", icon: "⚡", color: "from-yellow-500 to-amber-500" },
    { name: "Publishing", icon: "📚", color: "from-rose-500 to-pink-500" },
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

    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={setRef("hero")}
        className={`relative flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <AnimatedText delay={200} className="mb-6 mt-14">
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold tracking-wider uppercase animate-pulse">
                About Novotion
              </span>
            </AnimatedText>

            <AnimatedText delay={400} className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Connecting Talent,
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  Building Careers
                </span>
              </h1>
            </AnimatedText>

            <AnimatedText delay={600} className="mb-8">
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Leading business process outsourcing with a global presence
                since 2021
              </p>
            </AnimatedText>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <StatCard
                number={500}
                suffix="+"
                label="Global Clients"
                visible={isVisible.hero}
                delay={200}
                dark
              />
              <StatCard
                number={3}
                suffix=""
                label="Countries"
                visible={isVisible.hero}
                delay={400}
                dark
              />
              <StatCard
                number={2021}
                suffix=""
                label="Founded"
                visible={isVisible.hero}
                delay={600}
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section ref={setRef("overview")} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedCard delay={200} className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                </div>
              </div>
            </AnimatedCard>

            <div>
              <AnimatedText delay={400} animation="fadeInRight">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Trusted BPO Partner{" "}
                  <span className="text-blue-800">Since 2021</span>
                </h2>
              </AnimatedText>

              <AnimatedText delay={500} animation="fadeInRight">
                <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                  <p className="relative pl-4 border-l-4 border-blue-500">
                    Founded in 2021, Novotion is a leading business process
                    outsourcing (BPO) company with a strong presence in the{" "}
                    <span className="font-semibold text-blue-800">
                      USA, UK, and India
                    </span>
                    . As a trusted partner in the outsourcing industry, Novotion
                    serves a diverse global clientele of over 500 clients across
                    various sectors and regions.
                  </p>
                  <p className="relative pl-4 border-l-4 border-blue-600">
                    As an{" "}
                    <span className="font-semibold text-blue-800">
                      e-Verified company
                    </span>
                    , Novotion demonstrates its commitment to maintaining
                    rigorous standards in data security and operational
                    excellence.
                  </p>
                </div>
              </AnimatedText>

              <AnimatedText delay={700} animation="fadeInRight">
                <div className="pt-6">
                  <div className="inline-flex items-center gap-3 bg-slate-900/5 px-6 py-4 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <svg
                      className="w-6 h-6 text-blue-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-blue-800 font-bold text-lg">
                      e-Verified Company
                    </span>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
      {/* Our Journey Timeline Section */}
      <section
        ref={setRef("journey")}
        className="py-16 sm:py-20 lg:py-24 bg-slate-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global recognition - our story of growth
              and innovation
            </p>
          </AnimatedText>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-blue-800 h-full"></div>

            <div className="space-y-8 sm:space-y-12">
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start sm:items-center ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-600 rounded-full z-20 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-blue-800">
                      {index + 1}
                    </span>
                  </div>

                  <AnimatedCard
                    delay={index * 200}
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      index % 2 === 0
                        ? "sm:pr-8 sm:text-right"
                        : "sm:pl-8 sm:text-left"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <div className="bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {step.year}
                        </div>
                      </div>
                      <AnimatedText delay={300} animateOnScroll={false}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                      </AnimatedText>
                      <AnimatedText delay={500} animateOnScroll={false}>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </AnimatedText>
                    </div>
                  </AnimatedCard>
                </div>
              ))}
            </div>

            <div className="relative pl-4 sm:pl-6 border-l-4 border-blue-700 bg-blue-50/10 rounded-r-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                This dual approach enables deep expertise in both corporate
                recruitment and IT staffing delivering precise matches, stronger
                partnerships, and long-term success for clients and
                professionals alike.
              </p>
            </div>

            {/* Key Metrics Grid */}
          </div>
        </div>
      </section>
      {/* Our Journey Timeline Section */}
      <section
        ref={setRef("journey")}
        className="py-16 sm:py-20 lg:py-24 bg-slate-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 sm:mb-20 transform transition-all duration-1000 ${
              isVisible.journey
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our story began in 2021, not just as a business plan, but as a
              response to a clear gap in the market.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-blue-800 h-full"></div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2021",
                  title: "Foundation",
                  description:
                    "Our story began in 2021, not just as a business plan, but as a response to a clear gap in the market. We saw companies struggling with one-size-fits-all recruitment models and talented professionals getting lost in the noise. We believed there was a better, more personal and efficient way.",
                  icon: "🎯",
                },
                {
                  year: "2022",
                  title: "Growth & Expansion",
                  description:
                    "We started as a focused team, honing our craft in resume services and interview preparation. This grassroots beginning gave us an invaluable, ground-level understanding of what candidates and companies really need to connect. We learned that success isn't just about a keyword match; it's about preparation, presentation, and personal guidance.",
                  icon: "🌍",
                },
                {
                  year: "2023",
                  title: "Service Diversification",
                  description:
                    "This foundation allowed us to grow quickly and organically. Our expertise naturally expanded from individual career consulting into comprehensive Recruitment Process Outsourcing. We applied our human-centric approach to a larger scale, helping organizations build entire teams.",
                  icon: "✅",
                },
                {
                  year: "2024",
                  title: "Global Recognition",
                  description:
                    "Today, Novotion stands as a symbol of our commitment to excellence in the recruitment industry, continually evolving to meet the complex demands of talent and technology. Our journey is fueled by a core belief: every professional deserves the right opportunity, and every organization deserves the right talent.",
                  icon: "📈",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  ref={setRef(`journey-item-${index}`)}
                  className={`relative flex items-start sm:items-center transform transition-all duration-1000 ${
                    isVisible[`journey-item-${index}`]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-600 rounded-full z-20 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-blue-800">
                      {index + 1}
                    </span>
                  </div>

                  <div
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      index % 2 === 0
                        ? "sm:pr-8 sm:text-right"
                        : "sm:pl-8 sm:text-left sm:ml-auto"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <div className="bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {step.year}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive B2B & B2C Solutions Section - DARK THEME */}
      <section
        ref={setRef("solutions")}
        className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedText delay={200} animation="fadeInLeft">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Comprehensive <span className="text-blue-400">B2B & B2C</span>{" "}
                  Solutions
                </h2>
              </AnimatedText>

              <AnimatedText delay={400} animation="fadeInLeft">
                <div className="space-y-4 text-blue-100 text-base sm:text-lg leading-relaxed mb-8">
                  <p>
                    Novotion INC specializes in a comprehensive range of B2B and
                    B2C services, including outbound call center solutions for
                    lead generation, upselling, cross-selling, and sales
                    support, as well as inbound call center services for phone
                    answering, back office support, and order processing.
                  </p>
                  <p>
                    We empower businesses to grow and engage with their target
                    markets through multiple channels.
                  </p>
                </div>
              </AnimatedText>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {["Voice", "Email", "Social Media", "Chat", "Web", "SMS"].map(
                  (channel, idx) => (
                    <AnimatedCard key={channel} delay={idx * 100}>
                      <div className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-white/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative text-blue-200 group-hover:text-white font-semibold text-center text-sm transition-colors duration-300">
                          {channel}
                        </div>
                      </div>
                    </AnimatedCard>
                  )
                )}
              </div>
            </div>
      
          </div>

          <AnimatedCard delay={600} className="order-1 lg:order-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <AnimatedCard delay={700}>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2940&auto=format&fit=crop"
                        alt="Call center operations"
                        className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-sm">
                          Call Center Excellence
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard delay={900}>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop"
                        alt="Customer support"
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-sm">
                          Customer Support
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12 lg:pt-16">
                  <AnimatedCard delay={800}>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                        alt="Team meeting"
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-700 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-sm">
                          Team Collaboration
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                  <AnimatedCard delay={1000}>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img
                        src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2940&auto=format&fit=crop"
                        alt="Professional workspace"
                        className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-sm">
                          Professional Workspace
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section
        ref={setRef("industries")}
        className="py-16 sm:py-20 lg:py-24 bg-slate-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Industries We <span className="text-blue-800">Serve</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise extends across various sectors with specialized
              solutions
            </p>
          </AnimatedText>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {industries.map((industry, idx) => (
              <AnimatedCard
                key={industry.name}
                delay={idx * 50}
                className="group relative bg-white rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4 text-center transform group-hover:scale-125 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <AnimatedText delay={100} animateOnScroll={false}>
                    <div className="text-center font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
                      {industry.name}
                    </div>
                  </AnimatedText>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${industry.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                ></div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      {/* Core Values Section */}
      <section
        ref={setRef("coreValues")}
        className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              The principles that guide our actions and define our culture
            </p>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {coreValues.map((value, index) => (
              <AnimatedCard
                key={value.title}
                delay={index * 150}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/15"
              >
                <div className="relative z-10">
                  <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <AnimatedText delay={200} animateOnScroll={false}>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                  </AnimatedText>
                  <AnimatedText delay={400} animateOnScroll={false}>
                    <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                      {value.description}
                    </p>
                  </AnimatedText>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
                ></div>
              </AnimatedCard>
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
                currentSlide === index ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
      </section>
      {/* Vision & Mission Section */}
      <section ref={setRef("vision")} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <AnimatedCard
              delay={200}
              className="group bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-1000 delay-200 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <AnimatedText delay={300} animateOnScroll={false}>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 text-center lg:text-left">
                  Our Vision
                </h3>
              </AnimatedText>
              <AnimatedText delay={500} animateOnScroll={false}>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center lg:text-left">
                  Our vision is to be one of the most reliable and trusted
                  business process outsourcing Services providers. We will
                  continuously strive for success and enhance our brand
                  conception worldwide.
                </p>
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard
              delay={400}
              className="group bg-slate-50 rounded-2xl p-6 sm:p-8 lg:p-10 transform transition-all duration-1000 delay-400 hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <AnimatedText delay={500} animateOnScroll={false}>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 text-center lg:text-left">
                  Our Mission
                </h3>
              </AnimatedText>
              <AnimatedText delay={700} animateOnScroll={false}>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center lg:text-left">
                  Our mission is to empower our clients by providing innovative,
                  cost-effective, and high-quality BPO solutions that enable
                  them to achieve their business objectives with efficiency and
                  excellence.
                </p>
              </AnimatedText>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={setRef("cta")}
        className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText delay={200}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
            </AnimatedText>

            <AnimatedText delay={400}>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                Join over 500 global clients who trust Novotion for their BPO
                needs. Let's build something amazing together.
              </p>
            </AnimatedText>

            <AnimatedText delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Get Started Today
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovotionAbout;
