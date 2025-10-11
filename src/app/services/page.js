"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ServiceList from "./ServiceList";
import ServiceDetail from "./ServiceDetail";
import NovotionNavbar from "@/components/Navbar";
import NovotionFooter from "@/components/Footer";

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

function ServicePageContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const service = services.find((s) => s.id === parseInt(id));

  return id && service ? <ServiceDetail service={service} /> : <ServiceList />;
}

export default function Page() {
  return (
    <>
      <NovotionNavbar />
      {/* Wrap with Suspense to prevent CSR bailout error */}
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <ServicePageContent />
      </Suspense>
      <NovotionFooter />
    </>
  );
}
