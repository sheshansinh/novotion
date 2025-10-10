"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const BRAND_COLORS = {
  dark: {
    bg: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    text: {
      primary: 'text-white',
      secondary: 'text-blue-100'
    }
  }
};

const services = [
  {
    id: 1,
    title: "Customer Support",
    description: "24/7 multilingual support to boost customer satisfaction and build lasting relationships.",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=2940&auto=format&fit=crop",
    icon: "💬",
    features: ["24/7 Availability", "Multilingual Support", "CRM Integration"],
    benefits: [
      "Reduce response time by 60%",
      "Increase customer satisfaction scores",
      "Lower operational costs",
      "Improve customer retention rates"
    ],
    process: [
      { step: "Assessment", desc: "We analyze your current support structure" },
      { step: "Strategy", desc: "Custom support plan tailored to your needs" },
      { step: "Implementation", desc: "Seamless integration with your systems" },
      { step: "Optimization", desc: "Continuous improvement and reporting" }
    ]
  },
  {
    id: 2,
    title: "Sales & Marketing",
    description: "Drive revenue growth with our expert sales and marketing teams and proven strategies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    icon: "📈",
    features: ["Lead Generation", "Market Research", "Campaign Management"],
    benefits: [
      "Generate qualified leads consistently",
      "Improve conversion rates by 45%",
      "Expand market reach globally",
      "Data-driven marketing decisions"
    ],
    process: [
      { step: "Research", desc: "Deep dive into your target market" },
      { step: "Strategy", desc: "Develop comprehensive marketing plan" },
      { step: "Execution", desc: "Launch campaigns across channels" },
      { step: "Analysis", desc: "Track metrics and optimize performance" }
    ]
  },
  {
    id: 3,
    title: "Data Management",
    description: "Accurate and scalable data handling solutions for your business intelligence needs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    icon: "📊",
    features: ["Data Entry", "Data Processing", "Quality Assurance"],
    benefits: [
      "99.9% data accuracy guarantee",
      "Faster processing times",
      "Secure data handling",
      "Scalable solutions"
    ],
    process: [
      { step: "Collection", desc: "Gather data from multiple sources" },
      { step: "Validation", desc: "Quality checks and verification" },
      { step: "Processing", desc: "Clean, organize, and structure data" },
      { step: "Delivery", desc: "Secure transfer to your systems" }
    ]
  },
  {
    id: 4,
    title: "Technical Support",
    description: "24/7 IT & software assistance to keep your systems running smoothly and efficiently.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2940&auto=format&fit=crop",
    icon: "🔧",
    features: ["IT Helpdesk", "Software Support", "Technical Troubleshooting"],
    benefits: [
      "Minimize system downtime",
      "Expert technical assistance",
      "Proactive issue resolution",
      "Comprehensive documentation"
    ],
    process: [
      { step: "Setup", desc: "Configure support infrastructure" },
      { step: "Training", desc: "Team familiarization with your tech stack" },
      { step: "Support", desc: "24/7 technical assistance" },
      { step: "Reporting", desc: "Detailed analytics and insights" }
    ]
  },
  {
    id: 5,
    title: "Back Office Support",
    description: "Comprehensive administrative support to streamline your business operations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop",
    icon: "📋",
    features: ["Administrative Tasks", "Document Processing", "Workflow Management"],
    benefits: [
      "Free up internal resources",
      "Improve operational efficiency",
      "Reduce administrative costs",
      "Enhanced productivity"
    ],
    process: [
      { step: "Audit", desc: "Review current workflows" },
      { step: "Design", desc: "Optimize processes" },
      { step: "Deploy", desc: "Implement new systems" },
      { step: "Monitor", desc: "Track and improve" }
    ]
  },
  {
    id: 6,
    title: "E-commerce Support",
    description: "End-to-end e-commerce solutions to enhance your online customer experience.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2940&auto=format&fit=crop",
    icon: "🛒",
    features: ["Order Processing", "Customer Service", "Inventory Management"],
    benefits: [
      "Faster order fulfillment",
      "Reduced cart abandonment",
      "Better inventory control",
      "Enhanced customer experience"
    ],
    process: [
      { step: "Integration", desc: "Connect with your e-commerce platform" },
      { step: "Setup", desc: "Configure workflows and processes" },
      { step: "Operation", desc: "Handle daily operations" },
      { step: "Growth", desc: "Scale with your business" }
    ]
  }
];

export default function ServiceDetail({serviceId}) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});
  
  const service = services.find(s => s.id === serviceId) || services[0];
  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

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
      {/* Hero Section with Service Image */}
      <section className={`relative ${BRAND_COLORS.dark.bg} py-20`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push("/services")}
            className="mb-8 text-blue-400 hover:text-blue-200 transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Services
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold">
                  {service.icon} {service.title}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {service.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section ref={setRef('benefits')} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key <span className="text-blue-800">Benefits</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our {service.title.toLowerCase()} service can transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-lg">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section ref={setRef('process')} className={`py-16 sm:py-20 ${BRAND_COLORS.dark.bg}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our <span className="text-blue-400">Process</span>
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                <div className="bg-blue-900/50 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 hover:bg-blue-900/70 transition-all hover:scale-105">
                  <div className="absolute -top-4 left-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-white mb-3">{item.step}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {idx < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section ref={setRef('why')} className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.why ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Partner With <span className="text-blue-800">Novotion</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our {service.title.toLowerCase()} solution combines innovation with expertise to ensure performance, reliability, and scalability for your business operations.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: "🎯", title: "Tailored Solutions", desc: "Customized strategies for your unique needs" },
                  { icon: "⚡", title: "Fast Implementation", desc: "Quick setup and seamless integration" },
                  { icon: "📈", title: "Proven Results", desc: "Track record of delivering measurable outcomes" },
                  { icon: "🤝", title: "Dedicated Support", desc: "Expert team available whenever you need" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transform transition-all duration-1000 ${isVisible.why ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
                <p className="text-blue-100 mb-8">
                  Partner with us and unlock efficiency, quality, and customer satisfaction like never before.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    Request a Quote
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-sm transition-all duration-300">
                    Schedule Consultation
                  </button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center justify-around text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-400">500+</div>
                      <div className="text-sm text-blue-100">Clients</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-400">98%</div>
                      <div className="text-sm text-blue-100">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-400">24/7</div>
                      <div className="text-sm text-blue-100">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section ref={setRef('related')} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible.related ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Related <span className="text-blue-800">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore other solutions that might interest you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((relatedService, idx) => (
              <motion.div
                key={relatedService.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => router.push(`/services?id=${relatedService.id}`)}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedService.image}
                      alt={relatedService.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full text-lg font-medium shadow-lg">
                        {relatedService.icon}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                      {relatedService.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {relatedService.description}
                    </p>
                    <span className="text-blue-800 font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}