import NovotionNavbar from "@/components/Navbar";
import NovotionAbout from "./About";
import NovotionFooter from "@/components/Footer";

/**
 * This file is the mandatory route handler for the /services URL.
 * It imports the main Services component and renders it.
 */
export default function About() {
  return (
    <>
    <NovotionNavbar/>
    <NovotionAbout/>
    <NovotionFooter/>
    </>
  );
}
