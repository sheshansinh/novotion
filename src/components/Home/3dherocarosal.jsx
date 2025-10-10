"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Lenis from "lenis";

// Product data remains the same for consistency
const products = [
  { title: "FinTech LedgerFlow", thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop", category: "Finance" },
  { title: "AI Risk Portfolio", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", category: "Finance" },
  { title: "Crypto Vault Manager", thumbnail: "https://images.unsplash.com/photo-1621761191311-89cc6693c9c9?w=400&h=300&fit-crop", category: "Finance" },
  { title: "Tax Automation Suite", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", category: "Finance" },
  { title: "Wealth Tracker Pro", thumbnail: "https://images.unsplash.com/photo-1565373677401-ef2940eedc1b?w=400&h=300&fit=crop", category: "Finance" },
  { title: "TeleMed Connect", thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit-crop", category: "Healthcare" },
  { title: "Genomics Analyzer", thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit-crop", category: "Healthcare" },
  { title: "Clinical Trial Manager", thumbnail: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit-crop", category: "Healthcare" },
  { title: "Patient Portal UX", thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit-crop", category: "Healthcare" },
  { title: "Medical Billing AI", thumbnail: "https://images.unsplash.com/photo-1584467735871-8db9ac8d0e53?w=400&h=300&fit-crop", category: "Healthcare" },
  { title: "E-Learning Platform", thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit-crop", category: "Education" },
  { title: "Student Progress Hub", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit-crop", category: "Education" },
  { title: "Curriculum Builder", thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit-crop", category: "Education" },
  { title: "Online Exam Grader", thumbnail: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit-crop", category: "Education" },
  { title: "Virtual Classroom", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit-crop", category: "Education" },
];

export default function PerfectParallax() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  
  const springScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Responsive Parallax Values
  const parallaxX = isMobile ? "0%" : "200%";
  const parallaxXReverse = isMobile ? "0%" : "-200%";
  const translateX = useTransform(springScrollYProgress, [0, 1], ["0%", parallaxX]);
  const translateXReverse = useTransform(springScrollYProgress, [0, 1], ["0%", parallaxXReverse]);

  const opacity = useTransform(springScrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(springScrollYProgress, [0, 0.5, 1], [1, 1, 0.9]);

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div ref={ref} className="h-auto md:h-[400vh]">
        <motion.div 
          style={{ opacity, scale }}
          className="md:sticky top-0 h-auto md:h-screen flex flex-col justify-center overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-10 md:mb-20 px-4 z-20 relative pt-20 md:pt-0">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="text-4xl md:text-8xl font-bold text-white mb-4"
            >
              Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Solutions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-base md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Transform your business with our specialized solutions across finance, healthcare, and education
            </motion.p>
          </div>

          {/* Product Rows */}
          <div className="flex flex-col gap-6 md:gap-12 relative z-10 py-10">
            {/* Row 1 */}
            <motion.div 
              style={{ x: translateX }}
              className="flex gap-6 relative"
            >
              {firstRow.map((product, index) => (
                <ProductCard key={product.title} product={product} index={index} />
              ))}
            </motion.div>

            {/* Row 2 */}
            <motion.div 
              style={{ x: translateXReverse }}
              className="flex gap-6 relative"
            >
              {secondRow.map((product, index) => (
                <ProductCard key={product.title} product={product} index={index + 5} />
              ))}
            </motion.div>

            {/* Row 3 */}
            <motion.div 
              style={{ x: translateX }}
              className="flex gap-6 relative"
            >
              {thirdRow.map((product, index) => (
                <ProductCard key={product.title} product={product} index={index + 10} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-blue-400">Transform?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's build something amazing together with our industry-specific solutions
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Product Card component
const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -25,
        scale: 1.08,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="group relative flex-shrink-0 w-64 md:w-80 h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-white/10"
    >
      {/* Background Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
          {product.category}
        </span>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500 group-hover:translate-y-[-10px]">
        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
          {product.title}
        </h3>
        <motion.p 
          className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          Discover solution ↗
        </motion.p>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.div>
  );
};