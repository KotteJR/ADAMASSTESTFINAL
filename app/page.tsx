// page.tsx
import "./globals.scss"; // Make sure this path is correct

import { HeaderSimple } from "./components/Header";
import { HeroBullets } from "./components/HeroBullets";
import { FeaturesCards } from "./components/FeaturesCards";
import { ArticlesCardsGrid } from "./components/ArticlesCardsGrid";
import { ContactUs } from "./components/ContactUs";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {
  return (
    <>
      <HeaderSimple />
      <HeroBullets /> 
      <FeaturesCards />
      <FeaturesGrid />
      <ArticlesCardsGrid />
      <ContactUs />
      <FooterCentered />
    </>
  );
}
