import NovotionNavbar from "@/components/Navbar";
import NovotionContact from "./Contect";
import NovotionFooter from "@/components/Footer";


/**
 * This file is the mandatory route handler for the /services URL.
 * It imports the main Services component and renders it.
 */
export default function Contact() {
  return (
    <>
    <NovotionNavbar/>
    <NovotionContact/>
    <NovotionFooter/>
    </>
  );
}
