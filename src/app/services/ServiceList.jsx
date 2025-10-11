"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getServices } from "@/lib/servicesApi"; // Import the API function

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

export default function ServiceList() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef({});

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
        // You can set a fallback empty array or show error message
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
  }, [services]); // Re-run when services change

  const setRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && services.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Services Available</h2>
          <p className="text-gray-600">Check back later for our service offerings.</p>
        </div>
      </div>
    );
  }

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
                Our Services
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Premium <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">BPO Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover how Novotion can scale your business with our modern, comprehensive BPO solutions
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={setRef('services')} className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 sm:mb-20 transform transition-all duration-1000 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Our <span className="text-blue-800">Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive BPO solutions designed to drive your business growth and operational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                ref={setRef(`service-${index}`)}
                className={`group transform transition-all duration-1000 hover:scale-105 ${
                  isVisible[`service-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full cursor-pointer"
                  onClick={() => router.push(`/services?id=${service.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image || "/images/placeholder.jpg"}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/images/placeholder.jpg";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full text-lg font-medium shadow-lg">
                        {service.icon || "📝"}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`font-bold mb-3 text-xl leading-tight ${BRAND_COLORS.light.text.primary} group-hover:text-blue-800 transition-colors`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm mb-4 leading-relaxed ${BRAND_COLORS.light.text.secondary}`}>
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(service.features || []).slice(0, 3).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Learn More
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Dark Theme */}
     <section ref={setRef('whyUs')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible.whyUs ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-blue-400">Novotion</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "🚀", title: "Proven Expertise", desc: "Years of experience serving global clients across industries" },
                  { icon: "🌍", title: "Global Reach", desc: "Operations spanning across USA, UK, and India" },
                  { icon: "🛡️", title: "e-Verified Company", desc: "Highest standards of data security and compliance" },
                  { icon: "💡", title: "Innovation Driven", desc: "Cutting-edge solutions tailored to your business needs" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-2xl p-3 border border-blue-400/30">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-400 ${isVisible.whyUs ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop" 
                        alt="Team collaboration"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
                        alt="Professional team"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2940&auto=format&fit=crop" 
                        alt="Customer support"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <div className="group rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2940&auto=format&fit=crop" 
                        alt="Technical support"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Same as Other Pages */}
      <section ref={setRef('cta')} className={`py-16 sm:py-20 lg:py-24 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Join over 500 global clients who trust Novotion for their BPO needs. Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Today
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}