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

const NovotionContact = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phoneNumber: "",
    companyName: "",
    inquiryType: "",
    primaryMarket: "",
    message: "",
    agreeToTerms: false,
  });
  const [activeLocation, setActiveLocation] = useState("usa");
  const sectionRefs = useRef({});

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost/custom-sites/novotion-backend/api/submit_form.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          workEmail: "",
          phoneNumber: "",
          companyName: "",
          inquiryType: "",
          primaryMarket: "",
          message: "",
          agreeToTerms: false,
        });
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  };

  const locations = [
    {
      id: "usa",
      name: "United States",
      address: "Orlando, FL",
      phone: "+1 (786) 652-3950",
      email: "hello@novotion.com",
      icon: "🇺🇸",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.536168588547!2d-81.47168!3d28.45668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzI0LjEiTiA4McKwMjgnMTguMSJX!5e0!3m2!1sen!2sus!4v1234567890",
    },
    {
      id: "india",
      name: "India (Offshore Support Center)",
      address: "Ahmedabad, Gujarat",
      phone: "+91 (XXX) XXX-XXXX",
      email: "hello@novotion.com",
      icon: "🇮🇳",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9876543!2d72.51234!3d23.01234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzQ0LjQiTiA3MsKwMzAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890",
    },
    {
      id: "uk",
      name: "United Kingdom (Operations)",
      address: "London, UK",
      phone: "+44 (XXX) XXX-XXXX",
      email: "hello@novotion.com",
      icon: "🇬🇧",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.182370726!2d-0.10159865000000001!3d51.52864165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890",
    },
  ];

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      value: "+1 (786) 652-3950",
      link: "tel:+17866523950",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "hello@novotion.com",
      link: "mailto:hello@novotion.com",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Hours",
      value: "24/7 Support",
      link: null,
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section - Compact */}
      <section
        ref={setRef("hero")}
        className={`relative flex items-center justify-center overflow-hidden ${BRAND_COLORS.dark.bg} min-h-[70vh]`}
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

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible.hero
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-semibold tracking-wider uppercase animate-pulse">
                Let's Start the Conversation
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Contact{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Novotion
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Thank you for your interest in Novotion. We are built on strong partnerships, and every great partnership begins with a simple, clear conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Compact Contact Methods - Horizontal Layout */}
      <section ref={setRef("methods")} className="py-8 -mt-20 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {contactMethods.map((method, idx) => (
              <a
                key={method.title}
                href={method.link || "#"}
                className={`group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden text-center ${
                  isVisible.methods
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-2 mx-auto text-blue-600 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  {method.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-xs text-gray-600 break-words leading-tight">
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Find the Right Path Section */}
      <section ref={setRef("path")} className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
              Find the Right Path
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              To ensure your inquiry reaches the correct team without delay, please select the option that best describes you:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* For Organizations */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-left">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">For Organizations (RPO Services)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Are you looking to optimize your talent acquisition, reduce hiring costs, or scale your team in the UK or USA? Connect with our RPO specialists to discuss your unique business needs.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-800">Email: rpo-solutions@novotion.com</p>
                  <p className="text-xs text-gray-500">Please use our contact form below and select "Organization (RPO)"</p>
                </div>
              </div>

              {/* For IT Professionals */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-left">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">For IT Professionals (Career Support Services)</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Are you a skilled IT professional in the USA market seeking expert marketing, placement support, and your next contract opportunity? Our Career Support team is ready to help you.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-green-800">Email: career-support@novotion.com</p>
                  <p className="text-xs text-gray-500">Please use our contact form below and select "IT Professional (Career Support)"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section - Compact */}
      <section
        ref={setRef("main")}
        className="py-12 bg-white min-h-[80vh] flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible.main
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">
                    Send Us a <span className="text-blue-800">Message</span>
                  </h2>
                  <p className="text-gray-600 text-sm">
                    For the fastest response, please fill out the form below. This helps us direct your message to the right specialist.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="workEmail"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Work Email *
                    </label>
                    <input
                      id="workEmail"
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Company Name (if applicable)
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      I am... (Required) *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="organization">An Organization seeking RPO services</option>
                      <option value="it-professional">An IT Professional seeking career support</option>
                      <option value="partner">A potential partner</option>
                      <option value="other">Other (General Inquiry)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="primaryMarket"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Your Primary Market
                    </label>
                    <select
                      id="primaryMarket"
                      name="primaryMarket"
                      value={formData.primaryMarket}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                    >
                      <option value="">Select your market</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      How can we help you? (Required) *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none resize-none text-sm"
                      placeholder="Tell us more about your needs..."
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                      I have read and agree to the Novotion Privacy Policy and Terms of Service.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Submit Message
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information - Compact */}
            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible.main
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                {/* Introduction Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Connect With Us <span className="text-blue-800">Directly</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    We are a specialized firm with two distinct missions. Whether you are an organization in the United Kingdom or the United States seeking a world-class RPO partner, or a skilled IT professional in the U.S. market looking to advance your career, our team is ready to listen.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    We are a global company with a local presence. Feel free to reach out to one of our primary operational centers during business hours.
                  </p>
                </div>

                {/* Quick Contact - Horizontal */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+17866523950"
                    className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center transform hover:-translate-y-1"
                  >
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      Call Us
                    </span>
                  </a>

                  <a
                    href="mailto:hello@novotion.com"
                    className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center transform hover:-translate-y-1"
                  >
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      Email Us
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section - Compact */}
      <section
        ref={setRef("locations")}
        className={`py-12 ${BRAND_COLORS.dark.bg} min-h-[80vh] flex items-center`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-8 transform transition-all duration-1000 ${
              isVisible.locations
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Our Global <span className="text-blue-400">Offices</span>
            </h2>
            <p className="text-blue-100 text-sm max-w-2xl mx-auto">
              We operate across multiple time zones to provide localized expertise and 24/7 support.
            </p>
          </div>

          {/* Location Tabs */}
          <div
            className={`flex justify-center gap-3 mb-8 transform transition-all duration-1000 delay-200 ${
              isVisible.locations
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border text-sm ${
                  activeLocation === location.id
                    ? `${BRAND_COLORS.dark.accent} text-white shadow-lg border-blue-400`
                    : "bg-white/10 text-blue-100 hover:bg-white/20 border-white/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{location.icon}</span>
                  {location.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Map and Location Details */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto transform transition-all duration-1000 delay-400 ${
              isVisible.locations
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Map */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <div className="relative h-64 sm:h-80">
                {locations.map((location) => (
                  <iframe
                    key={location.id}
                    src={location.mapUrl}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                      activeLocation === location.id
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ))}
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border transition-all duration-300 ${
                    activeLocation === location.id
                      ? "border-blue-400 shadow-2xl"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0 shadow-lg`}
                    >
                      {location.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {location.name}
                      </h3>
                      <div className="space-y-1 text-blue-100 text-xs">
                        <p className="break-words">{location.address}</p>
                        <p className="break-words font-semibold">{location.phone}</p>
                        <p className="break-words">{location.email}</p>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          location.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-xs hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-1"
                      >
                        Get Directions
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA Section */}
      <section
        ref={setRef("cta")}
        className={`py-12 ${BRAND_COLORS.dark.bg} min-h-[50vh] flex items-center`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-3xl mx-auto transform transition-all duration-1000 ${
              isVisible.cta
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Talent Strategy?
            </h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              We look forward to learning how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm">
                Get Started Today
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold border border-white/20 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NovotionContact;