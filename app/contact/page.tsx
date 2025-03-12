"use client";

import { ContactForm } from "./ContactForm";
import { FooterCentered } from "../LandingPage/components/FooterCentered";

export default function ContactPage() {
    return (
        <div className="pageContainer">
            <div className="contactSection">
            <ContactForm />
            </div>
            <FooterCentered />
        </div>
    );
}
