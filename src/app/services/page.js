"use client";

import { useSearchParams } from "next/navigation";
import ServiceList from "./ServiceList";
import ServiceDetail from "./ServiceDetail";
import NovotionNavbar from "@/components/Navbar";
import NovotionFooter from "@/components/Footer";

const services = [
  {
    id: 1,
    title: "Customer Support",
    description: "24/7 multilingual support to boost customer satisfaction.",
    image: "https://source.unsplash.com/800x600/?customer,service",
  },
  {
    id: 2,
    title: "Sales & Marketing",
    description: "Drive revenue growth with our expert sales and marketing teams.",
    image: "https://source.unsplash.com/800x600/?marketing,team",
  },
  {
    id: 3,
    title: "Data Management",
    description: "Accurate and scalable data handling for your business.",
    image: "https://source.unsplash.com/800x600/?data,analytics",
  },
  {
    id: 4,
    title: "Technical Support",
    description: "24/7 IT & software assistance to keep your systems smooth.",
    image: "https://source.unsplash.com/800x600/?technical,support",
  },
];

export default function Page() {
  const params = useSearchParams();
  const id = params.get("id");
  const service = services.find((s) => s.id === parseInt(id));

  return (
    <>
      <NovotionNavbar />
      {id && service ? <ServiceDetail service={service} /> : <ServiceList />}

      <NovotionFooter/>
    </>
  );
}
