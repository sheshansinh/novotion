import NovotionFooter from "@/components/Footer";
import PerfectParallax, { StickyScroll } from "@/components/Home/3dherocarosal";
import CarouselSection from "@/components/Home/CarouselSection";
import FaqSection from "@/components/Home/FaqSection";
import NovotionFeatures from "@/components/Home/Features";
import GlobalTalentGateway from "@/components/Home/GlobalTalentGateway";
import NovotionHero from "@/components/Home/Herosection";
import OysterCta from "@/components/Home/HomeCtaSection";
import CtaSection from "@/components/Home/HomeCtaSection";
import IndustrySlider from "@/components/Home/IndustrySlider";
import KeyStatistics from "@/components/Home/KeyStatistics";
import NovotionAbout from "@/components/Home/NovotionAbout";
import NovotionTestimonials from "@/components/Home/NovotionTestimonials";
import PlacementSection from "@/components/Home/PlacementSection";
import ServicesCarousel from "@/components/Home/ServicesCarousel";
import TestimonialSlider from "@/components/Home/Testimonial";
import NovotionNavbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <NovotionNavbar/>
      <NovotionHero />
      <NovotionAbout/>
  
      <CarouselSection/>
      
      <NovotionFeatures/>

      <PlacementSection/>

      <IndustrySlider/>

      <KeyStatistics/>

      <GlobalTalentGateway/>

      <TestimonialSlider/>

      <FaqSection/>

      <OysterCta/>

      

    <NovotionFooter/>

    </>
  );
}
