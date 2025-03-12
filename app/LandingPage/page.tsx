"use client";
import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "../globals.scss";
import { Hero } from "./components/Hero";
import { FeatureSection } from "./components/FeatureSection";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {

  return (
    <>

      <div id="top"></div>

        <Hero />

        <FeatureSection />

        <AboutUs2 />

        <AboutUs />

        <FooterCentered />
    </>
  );
}
