"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "../styles/FlippableCards.module.scss";

const cards = [
  {
    subtitle: "AI Powered - Due Diligence",
    image: "/abc.png",
    description: "Explore groundbreaking AI features designed to enhance your iPhone experience like never before.",
  },
  {
    subtitle: "Strategic Advisory",
    image: "/def.png",
    description: "Experience next-level photography with improved sensors and AI-driven enhancements for stunning visuals.",
  },
  {
    subtitle: "Capital Raising Advisory",
    image: "/ghi.png",
    description: "Unleash the full potential of the latest iPhone with unparalleled speed and energy efficiency.",
  },
];

export function FlippableCards() {
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));

  const handleFlip = (index: number) => {
    setFlipped((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`${styles.cardWrapper} ${flipped[index] ? styles.flipped : ""}`}
          onClick={() => handleFlip(index)}
        >
          <div className={styles.cardFront} style={{ backgroundImage: `url(${card.image})` }}>
            <div className={styles.textContainer}>
              <h2 className={styles.subtitle}>{card.subtitle}</h2>
            </div>
            <button className={styles.plusButton}>
              <Plus size={24} />
            </button>
          </div>
          <div className={styles.cardBack}>
            <p className={styles.description}>{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
