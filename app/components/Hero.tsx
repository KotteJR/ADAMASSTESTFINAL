"use client";

import { useState, useEffect } from "react";
import { Button, Text } from "@mantine/core";
import styles from "../styles/Hero.module.scss";

export function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);

  // Define an array of font class names
  const fonts = [styles.pressStart, styles.orbitron, styles.krona, styles.audiowide, styles.dseg7];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className={`${styles.heroCard} ${isExpanded ? styles.expanded : ""}`}>
  
        <h1>Welcome to Adamass</h1>
        <div className={styles.buttons}>
        <a href="#contact-us">
          <Button radius="xl" size="sm" className={styles.primaryButton}>
            Contact Us
          </Button>
            </a>

        <a href="#features">
          <Button variant="default" radius="xl" size="sm" className={styles.secondaryButton}>
            Learn More
          </Button>
          </a>
        </div>
        <div className={`${styles.hiddenContent} ${isExpanded ? styles.show : ""}`}>
        <div className={styles.textContainer}>
            <Text className={styles.text} size="lg" c="dimmed">
            Unlock smarter decision-making with expert-driven analysis and advanced AI insights. Adamass empowers investors, businesses, and startups with in-depth technology assessments, risk evaluations, and strategic growth solutions — enabling informed decisions that accelerate growth, strengthen operations, and deliver sustainable success.            </Text>
            </div>
        </div>
      </div>
    </section>
  );
}