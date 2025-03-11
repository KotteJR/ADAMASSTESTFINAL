"use client";
import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "./globals.scss";

import { HeaderSimple } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeatureSection } from "./components/FeatureSection";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { ProjectOne } from "./components/ProjectOne";
import { ProjectTwo } from "./components/ProjectTwo";
import { ProjectThree } from "./components/ProjectThree";
import { ContactUs } from "./components/ContactUs";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {
  useEffect(() => {
    const titles = document.querySelectorAll(`.${'sectionTitle'}`);
    titles.forEach((title) => {
      scroll(
        animate(title, 
          { 
            y: [-50, 50], 
            opacity: [0.2, 1, 0.2] 
          }, 
          { easing: "ease-in-out", duration: 1.5 }
        ),
        { target: title }
      );
    });
  }, []);

  return (
    <>
      <HeaderSimple />

      <div className="progress-square">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>

        <Hero />

        <FeatureSection />

        <AboutUs2 />

        <AboutUs />

        <ProjectOne />

        <ProjectTwo />

        <ProjectThree />

        <FooterCentered />
    </>
  );
}
