'use client';

import { useState } from 'react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are your pricing options?",
      answer: "Our pricing depends on the specific service or package you select—whether it’s resume creation, interview training, or full placement assistance. We offer flexible plans to suit freshers, professionals, and executives. A detailed quote is provided after an initial consultation."
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
    },
    {
      question: "Do you help with H1-B sponsorship?",
      answer: "While we do not directly provide visa sponsorship, we assist candidates in connecting with partner organizations that offer H1-B sponsorships or similar visa pathways, based on eligibility and availability."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight mb-12 md:mb-16">
          Common Client Queries
        </h2>

        {/* FAQ List */}
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
      </div>
    </section>
  );
};

export default FaqSection;