"use client";

import { useState } from "react";
import { NavbarSimpleColored } from "./NavbarSimpleColored";
import { CompanyInformation } from "./PAGES/CompanyInformation";
import { PublicInformation } from "./PAGES/PublicInformation";
import { Architecture } from "./PAGES/Architecture";
import { Security } from "./PAGES/Security";
import { Legal } from "./PAGES/Legal";
import { CompanyIntelligenceProfile } from "./PAGES/CompanyIntelligenceProfile";
import { HumanCapital } from "./PAGES/HumanCapital";

const SECTIONS = [
  "Company Information",
  "Public Information",
  "Architecture",
  "Security",
  "Legal",
  "Company Intelligence Profile",
  "Human Capital",
];

export function ChatbotClient() {
  const [activeSection, setActiveSection] = useState("Company Information");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <NavbarSimpleColored active={activeSection} onChange={setActiveSection} />

      <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
        <div style={{ display: activeSection === "Company Information" ? "block" : "none" }}>
          <CompanyInformation />
        </div>
        <div style={{ display: activeSection === "Public Information" ? "block" : "none" }}>
          <PublicInformation />
        </div>
        <div style={{ display: activeSection === "Architecture" ? "block" : "none" }}>
          <Architecture />
        </div>
        <div style={{ display: activeSection === "Security" ? "block" : "none" }}>
          <Security />
        </div>
        <div style={{ display: activeSection === "Legal" ? "block" : "none" }}>
          <Legal />
        </div>
        <div style={{ display: activeSection === "Company Intelligence Profile" ? "block" : "none" }}>
          <CompanyIntelligenceProfile />
        </div>
        <div style={{ display: activeSection === "Human Capital" ? "block" : "none" }}>
          <HumanCapital />
        </div>

      </div>
    </div>
  );
}
