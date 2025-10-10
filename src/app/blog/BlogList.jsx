"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

export default function BlogList({ blogs = [], categories = [], selectedCategory, onCategoryChange }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Featured blogs - always the same 4 featured blogs
  const featuredBlogs = blogs.filter(blog => blog.featured).slice(0, 4);
  
  // Regular blogs - show ALL blogs when "All" is selected, otherwise filter by category
  const displayBlogs = selectedCategory === "All" 
    ? blogs // Show ALL blogs including featured ones
    : blogs.filter(blog => blog.category === selectedCategory);

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
      {/* Hero Section - CLEAN WITHOUT COUNTERS */}
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
                Career Resources
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Career <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Expert advice and strategies to advance your IT career
            </p>
            {/* COUNTERS SECTION REMOVED - Clean and focused hero */}
          </div>
        </div>
      </section>

      {/* Featured Insights - Light Theme */}
      <section ref={setRef('featured')} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 sm:mb-20 transform transition-all duration-1000 ${isVisible.featured ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Featured <span className="text-blue-800">Insights</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked career resources to accelerate your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                ref={setRef(`featured-${index}`)}
                className={`group transform transition-all duration-1000 hover:scale-105 ${
                  isVisible[`featured-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className={`${BRAND_COLORS.light.accent} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className={`font-bold mb-3 line-clamp-2 leading-tight text-lg ${BRAND_COLORS.light.text.primary} group-hover:text-blue-800 transition-colors`}>
                      {blog.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${BRAND_COLORS.light.text.secondary}`}>
                      {blog.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium ${BRAND_COLORS.light.text.secondary}`}>
                        {blog.readTime}
                      </span>
                      <Link
                        href={`/blog?id=${blog.id}`}
                        className={`font-semibold text-sm inline-flex items-center gap-2 text-blue-800 hover:text-blue-600 transition-all duration-300 group-hover:gap-3`}
                      >
                        Read More
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Dark Theme */}
      <section ref={setRef('main')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 transform transition-all duration-1000 ${isVisible.main ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm border ${
                  selectedCategory === category
                    ? `${BRAND_COLORS.dark.accent} text-white shadow-lg border-blue-400`
                    : 'bg-white/10 text-blue-100 hover:bg-white/20 border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Section Header */}
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible.main ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {selectedCategory === "All" ? "All Career Resources" : `${selectedCategory} Resources`}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              {selectedCategory === "All" 
                ? "Browse our complete collection of career development resources" 
                : `Explore ${selectedCategory.toLowerCase()} specific insights and strategies`}
            </p>
          </div>

          {/* Blog Grid */}
          {displayBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  ref={setRef(`blog-${index}`)}
                  className={`group transform transition-all duration-1000 hover:scale-105 ${
                    isVisible[`blog-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-blue-400/30 transition-all duration-300 overflow-hidden h-full shadow-xl hover:shadow-2xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`font-bold mb-3 line-clamp-2 text-lg leading-tight text-white group-hover:text-blue-300 transition-colors`}>
                        {blog.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-3 leading-relaxed text-blue-100`}>
                        {blog.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium text-blue-200`}>
                          {blog.readTime}
                        </span>
                        <Link
                          href={`/blog?id=${blog.id}`}
                          className="text-blue-300 hover:text-white font-medium text-sm transition-all duration-300 inline-flex items-center gap-2 group-hover:gap-3"
                        >
                          Read More
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className={`text-2xl font-bold mb-2 text-white`}>
                No articles found
              </h3>
              <p className="text-blue-100">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={setRef('cta')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Advance Your Career?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Explore more career resources and take the next step in your professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Browse All Articles
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Career Advice
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}