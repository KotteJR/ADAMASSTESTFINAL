"use client";
import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "./globals.scss";

import { HeaderSimple } from "./components/Header";
import { HeroBullets } from "./components/HeroBullets";
import { FeaturesCards } from "./components/FeaturesCards";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { ContactUs } from "./components/ContactUs";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {
  useEffect(() => {
    // Scroll progress bar animation
    scroll(animate(".progress", { scaleX: [0, 1] }, { easing: "ease-in-out" }));

    // Section title animations
    document.querySelectorAll(".section-title").forEach((title) => {
      scroll(
        animate(title, { y: [-50, 50], opacity: [0, 1] }, { easing: "ease-in-out" }),
        { target: title }
      );
    });
  }, []);

  return (
    <>
      <HeaderSimple />
      <div className="progress"></div>

      <section className="section">
        <h2 className="section-title"></h2>
        <HeroBullets />
      </section>

      <section className="section">
        <h2 className="section-title">What We Do</h2>
        <FeaturesCards />
      </section>

      <section className="section">
        <h2 className="section-title">About Us</h2>
        <AboutUs2 />
      </section>

      <section className="section">
        <h2 className="section-title">Our Expertise</h2>
        <AboutUs />
      </section>

      <section className="section">
        <h2 className="section-title">Get In Touch</h2>
        <ContactUs />
      </section>

      <FooterCentered />
    </>
  );
}
