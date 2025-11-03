'use client';

import { useState } from 'react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your pricing options?",
      answer: "Our pricing depends on the specific service or package you select—whether it's resume creation, interview training, or full placement assistance. We offer flexible plans to suit freshers, professionals, and executives. A detailed quote is provided after an initial consultation."
    },
    {
      question: "Is there a guarantee that I will get a job?",
      answer: "While we cannot guarantee employment—no legitimate recruitment firm can—we do guarantee maximum visibility, professional preparation, and tailored job marketing to significantly increase your chances of securing the right opportunity."
    },
    {
      question: "How do you provide interview preparation and support?",
      answer: "Interview support is offered through virtual one-on-one sessions, mock interviews, Q&A materials, and personalized coaching. Our experts guide you on communication, technical topics, and behavioral questions relevant to your target role."
    },
    {
      question: "How does your training process work?",
      answer: "Our training begins with an assessment of your current skills. Based on your career goals, we assign a personal technical trainer who delivers customized online or hybrid sessions focusing on real-world project knowledge, interview readiness, and role-specific tools."
    },
    {
      question: "How do you help after placement?",
      answer: "We provide post-placement support for up to 3 months (extendable). This includes professional mentoring, issue resolution, and progress tracking to ensure you adjust well and succeed in your new position."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight mb-12 md:mb-16">
          Common Client Queries
        </h2>

        {/* FAQ Grid with Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side - FAQ List */}
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`
                  rounded-xl shadow-lg transition-all duration-300
                  ${openIndex === index ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'}
                `}
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 md:px-8 md:py-5 text-left text-white"
                  onClick={() => handleToggle(index)}
                  aria-expanded={openIndex === index ? 'true' : 'false'}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-base md:text-lg font-semibold pr-4">
                    {faq.question}
                  </h3>
                  <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`
                    grid overflow-hidden transition-all duration-300 ease-in-out
                    ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  `}
                >
                  <div className="overflow-hidden px-6 pb-6 md:px-8 md:pb-8">
                    <p className="text-blue-200 text-sm md:text-base leading-relaxed md:leading-loose">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Sticky Video */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800/50 backdrop-blur-sm border border-blue-500/20">
              {/* Video Container */}
              <div className="relative aspect-video bg-slate-900">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Optional Play Icon Overlay */}
            
              </div>

              {/* Video Info/Caption */}
              <div className="p-4 md:p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                <h4 className="text-white font-semibold text-lg mb-2">
                  See How We Help You Succeed
                </h4>
                <p className="text-blue-200 text-sm">
                  Watch our process in action and discover how we transform careers.
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>

          
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;