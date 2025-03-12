"use client";

import { useEffect } from "react";
import { animate, scroll } from "@motionone/dom";
import "../globals.scss";
import { Hero } from "./components/Hero";
import { FeatureSectionTest } from "./components/FeatureSectionTest";
import { AboutUs } from "./components/AboutUs";
import { AboutUs2 } from "./components/AboutUs2";
import { FooterCentered } from "./components/FooterCentered";

export default function HomePage() {

  return (
    <>

      <div id="top"></div>

        <Hero />

        <FeatureSectionTest />

        <AboutUs2 />

        <AboutUs />

        <FooterCentered />
    </>
  );
}
