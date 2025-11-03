"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NovotionNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // New state to control text color
  const [isLightSection, setIsLightSection] = useState(false);
  const pathname = usePathname();
  // Ref for the container you want to observe for a class name
  const containerRef = useRef(null);

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "/about" },
    { id: "services", label: "Services", href: "/services" },
    { id: "Blog", label: "BLog", href: "/blog" },
    { id: "Career", label: "Career", href: "/careeer" },
    //{ id: 'Hire', label: 'Hire Us', href: '/hire' },
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to detect a specific section
  useEffect(() => {
    const sections = document.querySelectorAll(".light-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLightSection(true);
          } else {
            setIsLightSection(false);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
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
                  className={`relative px-6 py-3 rounded-xl transition-all duration-300 group ${
                    isScrolled || !isLightSection
                      ? "text-white hover:bg-white/5"
                      : "text-black hover:bg-black/5 border-black/20 hover:border-black/40"
                  } ${
                    pathname === link.href ? "bg-black/10 border-black/40" : ""
                  }`}
                >
                  <span className="font-medium text-sm tracking-wide relative z-10">
                    {link.label}
                  </span>

                  {/* Animated underline - only when scrolled */}
                  {isScrolled && (
                    <span
                      className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                        pathname === link.href
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  )}
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
              <div
                className={`absolute inset-0 rounded-lg transform group-hover:scale-110 transition-all duration-300 ${
                  isScrolled || !isLightSection
                    ? "bg-white/10"
                    : "bg-black/5 border border-black/20"
                }`}
              ></div>
              <div className="relative flex flex-col items-center justify-center w-full h-full space-y-1.5">
                <span
                  className={`block w-6 h-0.5 transform transition-all duration-300 ${
                    isScrolled || !isLightSection ? "bg-white" : "bg-black"
                  } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isScrolled || !isLightSection ? "bg-white" : "bg-black"
                  } ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transform transition-all duration-300 ${
                    isScrolled || !isLightSection ? "bg-white" : "bg-black"
                  } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 transform transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-6 py-8 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.id}
                href={link.href}
                className={`block px-6 py-4 rounded-xl text-white font-medium text-lg transform transition-all duration-300 border border-white/10 hover:border-white/30 hover:bg-white/5 ${
                  pathname === link.href ? "bg-white/10 border-white/30" : ""
                } ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${index * 100}ms`
                    : "0ms",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="opacity-50"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </Link>
            ))}

            <div
              className={`pt-4 transform transition-all duration-500 ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NovotionNavbar;
