"use client";
import { PortfolioHero } from "./PortfolioHero";
import { ProjectOne } from "./ProjectOne";
import { ProjectTwo } from "./ProjectTwo";
import { ProjectThree } from "./ProjectThree";
import { FooterCentered } from "../LandingPage/components/FooterCentered";

export default function Portfolio() {
    return (
        <div className="portfolio-page">
            <PortfolioHero />
            <ProjectOne />
            <ProjectTwo />
            <ProjectThree />
            <FooterCentered />
        </div>
    );
}
