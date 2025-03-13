"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";  // Import Image for the logo
import { Text } from "@mantine/core";
import styles from "./ProjectThree.module.scss";

export function ProjectThree() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Expand only once when section reaches 50% visibility
      if (rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2) {
        setIsExpanded(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.projectSection} ${isExpanded ? styles.expanded : ""}`}
    >
      <video autoPlay loop muted playsInline className={styles.backgroundVideo}>
        <source src="/DALIA.mp4" type="video/mp4" />
      </video>

      <div className={styles.projectContent}>
        {/* Replacing Title with Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/dalia.png" // Path to your Adamass logo
            alt="Adamass Logo"
            width={200} // Adjust the width for desired size
            height={80}  // Adjust the height for desired size
            className={styles.logo}
          />
        </div>

        <Text size="lg" className={styles.projectDescription}>
          Our cutting-edge AI-driven solutions empower businesses with deep insights and smarter decision-making.
        </Text>
      </div>
    </section>
  );
}
