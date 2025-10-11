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
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    comments: "",
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        comments: "",
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
      name: "USA Office",
      address: "7345 W Sand Lake RD, STE 210",
      city: "Office 6695, Orlando, FL 32819",
      icon: "🇺🇸",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.536168588547!2d-81.47168!3d28.45668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzI0LjEiTiA4McKwMjgnMTguMSJX!5e0!3m2!1sen!2sus!4v1234567890",
    },
    {
      id: "india",
      name: "India Office",
      address: "1410, Shapath V, Prahladnagar",
      city: "Ahmedabad, Gujarat",
      icon: "🇮🇳",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9876543!2d72.51234!3d23.01234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAwJzQ0LjQiTiA3MsKwMzAnNDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890",
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
      value: "info@novotionservices.com",
      link: "mailto:info@novotionservices.com",
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
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Contact{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Us
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to take your business to the next level? Get in touch with
              us today
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

      {/* Main Contact Section - Compact */}
      <section
        ref={setRef("main")}
        className="py-12 bg-slate-50 min-h-[80vh] flex items-center"
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
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none text-sm"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comments"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all duration-200 outline-none resize-none text-sm"
                      placeholder="Tell us more about your needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-6 py-3 bg-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
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
                {/* Why Choose Us Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Why Choose <span className="text-blue-800">Novotion?</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    Ready to take your recruitment strategy to the next level?
                    Get in touch with us today.
                  </p>

                  <div className="space-y-3">
                    {[
                      { icon: "🚀", text: "24/7 Customer Support" },
                      { icon: "🌍", text: "Global Presence" },
                      { icon: "💼", text: "Expert Team" },
                      { icon: "📈", text: "Proven Track Record" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 text-sm flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
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
                    href="mailto:info@novotionservices.com"
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
              Visit us at any of our locations worldwide
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
                        <p className="break-words">{location.city}</p>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          location.address
                        )},${encodeURIComponent(location.city)}`}
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Join over 500 global clients who trust Novotion for their BPO
              needs.
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
