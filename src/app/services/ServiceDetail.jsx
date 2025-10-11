"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getServices } from "@/lib/servicesApi";

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
};

export default function ServiceDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id"); // Get id from query params

  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Fetch all services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        setServices(data);

        // Find selected service
        const selected = data.find(s => s.id === serviceId) || data[0];
        setService(selected);
      } catch (err) {
        console.error("Error fetching services:", err);
        setServices([]);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

  // Intersection observers for animation
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

    return () => Object.values(observers).forEach(o => o.disconnect());
  }, [service]);

  const setRef = key => el => (sectionRefs.current[key] = el);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <button
            onClick={() => router.push("/services")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className={`relative ${BRAND_COLORS.dark.bg} py-20`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.push("/services")}
            className="mb-8 text-blue-400 hover:text-blue-200 transition-colors flex items-center gap-2"
          >
            ← Back to Services
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
                {(service.features || []).map((feature, idx) => (
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
                  src={service.image || "/images/placeholder.jpg"}
                  alt={service.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section ref={setRef("benefits")} className="py-16 sm:py-20 bg-white">
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
            {(service.benefits || []).map((benefit, idx) => (
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

      {/* Related Services Section */}
      <section ref={setRef("related")} className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible.related ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Related <span className="text-blue-800">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel, idx) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="cursor-pointer"
                onClick={() => router.push(`/services?id=${rel.id}`)}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <img
                    src={rel.image || "/images/placeholder.jpg"}
                    alt={rel.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{rel.title}</h3>
                    <p className="text-gray-600 text-sm">{rel.description}</p>
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
