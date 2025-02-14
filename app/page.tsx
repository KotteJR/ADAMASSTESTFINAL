import "./globals.scss";

import { HeaderSimple } from "./components/Header";
import { HeroBullets } from "./components/HeroBullets";
import { FeaturesCards } from "./components/FeaturesCards";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { ContactUs } from "./components/ContactUs";
import { FooterCentered } from "./components/FooterCentered";



export default function HomePage() {
  return (
    <>
      <HeaderSimple />
      <HeroBullets /> 
      <FeaturesCards />
      <AboutUs />
      <AboutUs2 />
      <ContactUs />
      <FooterCentered />
    </>
  );
}
