"use client";

import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import styles from "../styles/Hero.module.scss";

export function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <section className={styles.hero}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src="/hello.mp4" type="video/mp4" />
      </video>
      <div className={`${styles.heroCard} ${isExpanded ? styles.expanded : ""}`}>
        <h1 className={styles.title}>Adamass</h1>
        <div className={styles.buttons}>
          <Button radius="xl" size="md" className={styles.primaryButton}>
            Learn More
          </Button>
          <Button variant="default" radius="xl" size="md" className={styles.secondaryButton}>
            Contact Us
          </Button>
        </div>
        <div className={`${styles.hiddenContent} ${isExpanded ? styles.show : ""}`}>
  <div className={styles.textContainer}>
    <p>
      Unlock smarter decision-making with expert-driven analysis and advanced AI insights. 
      Adamass empowers investors, businesses, and startups with in-depth technology assessments, 
      risk evaluations, and strategic growth solutions tailored to maximize value and minimize uncertainty.
    </p>
  </div>
</div>
      </div>
    </section>
  );
}