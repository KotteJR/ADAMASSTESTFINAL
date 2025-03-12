"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Text } from "@mantine/core";
import { animate, scroll } from "@motionone/dom";
import styles from "./ProjectOne.module.scss";

export function ProjectOne() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionTitleRef.current) {
      scroll(
        animate(sectionTitleRef.current, 
          { 
            y: [-50, 0, 50], 
            opacity: [0.4, 1, 0.2] 
          }, 
          { easing: "ease-in-out", duration: 1.5 }
        ),
        { target: sectionTitleRef.current }
      );
    }
  }, []);

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
    <>
      {/* Section Title Added Above */}


      <section
        ref={sectionRef}
        className={`${styles.projectSection} ${isExpanded ? styles.expanded : ""}`}
      >
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src="/ZOION.mp4" type="video/mp4" />
        </video>

        <div className={styles.projectContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/zoion-logo.svg"
              alt="Adamass Logo"
              width={200}
              height={80}
              className={styles.logo}
            />
          </div>

          <Text size="lg" className={styles.projectDescription}>
            Our cutting-edge AI-driven solutions empower businesses with deep insights and smarter decision-making.
          </Text>
        </div>
      </section>
    </>
  );
}
