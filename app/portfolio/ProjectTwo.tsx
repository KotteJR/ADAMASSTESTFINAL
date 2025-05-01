"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";  // Import Image for the logo
import { Text } from "@mantine/core";
import styles from "./ProjectTwo.module.scss";

export function ProjectTwo() {
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
        <source src="/BOKSY.mp4" type="video/mp4" />
      </video>

      <div className={styles.projectContent}>
        {/* Replacing Title with Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/boksy.svg" // Path to your Adamass logo
            alt="Adamass Logo"
            width={200} // Adjust the width for desired size
            height={80}  // Adjust the height for desired size
            className={styles.logo}
          />
        </div>

        <Text size="lg" className={styles.projectDescription}>
        Boksy is a digital platform designed to enhance the reading experience by offering personalized book recommendations and facilitating community engagement among readers. It aims to streamline book discovery and foster a social environment for literature enthusiasts.​
        </Text>
      </div>
    </section>
  );
}
