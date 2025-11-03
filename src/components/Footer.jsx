'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NovotionFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer-container');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Journey', href: '/journey' },
      { label: 'Core Values', href: '/values' },
      { label: 'Careers at Novotion', href: '/careers' },
      { label: 'Contact Us', href: '/contact' }
    ],
    organizations: [
      { label: 'Recruitment Process Outsourcing', href: '/services/rpo' },
      { label: 'Offshore Recruitment Support', href: '/services/offshore-support' },
      { label: 'Talent Sourcing & Headhunting', href: '/services/talent-sourcing' },
      { label: 'CV Formatting Services', href: '/services/cv-formatting' },
      { label: 'Lead Generation Support', href: '/services/lead-generation' },
      { label: 'Request RPO Consultation', href: '/contact?service=rpo' }
    ],
    professionals: [
      { label: 'Career Support Services Overview', href: '/services/career-support' },
      { label: 'Professional Marketing Services', href: '/services/professional-marketing' },
      { label: 'Contract Placement Support', href: '/services/contract-placement' },
      { label: 'Interview Preparation', href: '/services/interview-preparation' },
      { label: 'Schedule Consultation', href: '/contact?service=career-support' }
    ],
    resources: [
      { label: 'Blog & Insights', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Protection (GDPR)', href: '/gdpr' },
      { label: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      href: '#'
    },
    { 
      name: 'Twitter', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
        </svg>
      ),
      href: '#'
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: '#'
    }
  ];

  return (
    <footer id="footer-container" className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden w-full min-h-[500px]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-full">
          
          {/* Brand Section - Left Side */}
          <div className={`lg:col-span-4 flex flex-col justify-between transform transition-all duration-700 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div>
              <Link href="/" className="inline-block group mb-3">
                <Image
                  src="/logo/cropped-novotion_01-e1738178048480 (1).png"
                  alt="Novotion - Recruitment Solutions"
                  width={140}
                  height={30}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              
              <p className="text-gray-300 leading-relaxed mb-2 text-xs">
                Novotion is a specialized recruitment solutions provider with operational centers in the United Kingdom, United States, and India since 2021.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4 text-xs">
                With our India-based offshore support team providing round-the-clock assistance, we deliver 500+ satisfied clients across 15+ industries and 10,000+ successful placements.
              </p>

              {/* Contact Information */}
              <div className="space-y-1 mb-4">
                <h3 className="text-white font-semibold text-sm mb-1">Contact Information</h3>
                <div className="space-y-1 text-xs text-gray-300">
                  <div><strong>Email:</strong> hello@novotion.com</div>
                  <div className="flex flex-wrap gap-3">
                    <span><strong>USA:</strong> +1 (786) 652-3950</span>
                    <span><strong>UK:</strong> +44 (XXX) XXX-XXXX</span>
                  </div>
                  <div><strong>India:</strong> +91 (XXX) XXX-XXXX</div>
                  <div className="text-gray-400 text-xs">
                    <span>Orlando, FL • Ahmedabad, Gujarat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-sm">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 pr-10 rounded-lg text-xs text-gray-200 placeholder-gray-400 bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-2"
                  aria-label="Subscribe"
                >
                  <svg className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Links Section - Right Side */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {Object.keys(footerLinks).map((sectionKey, index) => (
              <div
                key={sectionKey}
                className={`transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <h3 className="text-white font-semibold mb-2 text-xs uppercase tracking-wide">
                  {sectionKey === 'organizations' ? 'For Organizations' : 
                   sectionKey === 'professionals' ? 'For IT Professionals' : 
                   sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
                </h3>
                <ul className="space-y-1">
                  {footerLinks[sectionKey].map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-xs hover:underline leading-tight"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Fixed at bottom */}
      <div className="relative border-t border-white/10 py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-gray-400">
            <div className="text-center md:text-left">
              <p>&copy; 2025 Novotion. All Rights Reserved.</p>
              <p className="text-gray-500 text-xs">Serving UK & USA Markets | Offshore Support in India</p>
            </div>
            <div className="flex justify-center md:justify-end items-center gap-3">
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NovotionFooter;