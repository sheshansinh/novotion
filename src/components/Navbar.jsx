'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NovotionNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'Blog', label: 'Blog', href: '/blog' },
    { id: 'Career', label: 'Career', href: '/career' },
 
  ];

  // Scroll handler for showing/hiding the navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep navbar transparent at the top
      if (currentScrollY <= 50) {
        setIsScrolled(false);
      } 
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsScrolled(false); 
      } 
      // Show navbar when scrolling up
      else {
        setIsScrolled(true); 
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200' 
            : 'bg-white shadow-md border-b border-gray-100'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/logo/cropped-novotion_01-e1738178048480 (1).png"
                alt="Novotion"
                width={150}
                height={32}
                className="rounded-lg"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-6 py-3 rounded-xl transition-all duration-300 group text-gray-800 hover:bg-gray-100 ${
                    pathname === link.href ? 'bg-gray-100 border border-gray-300' : ''
                  }`}
                >
                  <span className="font-medium text-sm tracking-wide relative z-10">
                    {link.label}
                  </span>
                  
                  {/* Animated underline */}
                  <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                      pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/contect">
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 group"
            >
              <div className={`absolute inset-0 rounded-lg transform group-hover:scale-110 transition-all duration-300 bg-gray-100 border border-gray-300`}></div>
              <div className="relative flex flex-col items-center justify-center w-full h-full space-y-1.5">
                <span className={`block w-6 h-0.5 transform transition-all duration-300 bg-gray-800 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block w-6 h-0.5 transition-all duration-300 bg-gray-800 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block w-6 h-0.5 transform transition-all duration-300 bg-gray-800 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-6 py-8 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                className={`block px-6 py-4 rounded-xl text-gray-800 font-medium text-lg transform transition-all duration-300 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 ${
                  pathname === link.href ? 'bg-gray-50 border-gray-400' : ''
                } ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-50 text-gray-600">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </Link>
            ))}
            
            <div className={`pt-4 transform transition-all duration-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NovotionNavbar;