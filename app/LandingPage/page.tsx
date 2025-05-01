"use client";

import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "../globals.scss";
import { Herosimple } from "../LandingPage/components/Herosimple";
import { FeatureSectionTest } from "../LandingPage/components/FeatureSectionTest";
import { TimelineSection } from "../LandingPage/components/TimelineSection";
import { FeatureCards } from "../LandingPage/components/FeatureCards";
import { CTA } from "../LandingPage/components/CTA";
import { FooterCentered } from "../LandingPage/components/FooterCentered";

export default function HomePage() {

  return (
    <>

      <div id="top"></div>

        <Herosimple />

        <FeatureSectionTest />

        <TimelineSection />

        <FeatureCards />

        <FooterCentered />
        
    </>
  );
}
