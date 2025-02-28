"use client";
import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "./globals.scss";

import { HeaderSimple } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeatureSection } from "./components/FeatureSection";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { ContactUs } from "./components/ContactUs";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Get the footer's position
      const footer = document.querySelector("footer");
      const footerOffset = footer ? footer.offsetTop : documentHeight;
  
      // Calculate scroll progress stopping before the footer
      const maxScrollableHeight = footerOffset - windowHeight;
      const progress = Math.min(scrollTop / maxScrollableHeight, 1) * 100;
  
      // Apply progress to the CSS variable
      document.documentElement.style.setProperty("--progress-bottom-width", `${progress}%`);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Restore Section Title Animation
    document.querySelectorAll(".section-title").forEach((title) => {
      scroll(
        animate(title, { y: [-50, 50], opacity: [0.2, 1, 0.2,] }, { easing: "ease-in-out" }),
        { target: title }
      );
    });
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  

  return (
    <>
      <HeaderSimple />
      
      {/* Progress Square */}
      <div className="progress-square">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="right"></div>
      </div>

      <section className="section">
        <h2 className="section-title"></h2>
        <Hero />
      </section>

      <section className="section">
        <h2 className="section-title">Offerings.</h2>
        <FeatureSection />
      </section>

      <section className="section">
        <h2 className="section-title">About Us.</h2>
        <AboutUs2 />
      </section>

      <section className="section">
        <h2 className="section-title">Expertise.</h2>
        <AboutUs />
      </section>

      <section className="section">
        <h2 className="section-title">Contact.</h2>
        <ContactUs />
      </section>

      <FooterCentered />
    </>
  );
}