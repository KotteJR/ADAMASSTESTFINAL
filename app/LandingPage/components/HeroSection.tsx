"use client";

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import styles from '../styles/HeroSection.module.scss';

interface AnimatedVideoProps {
  src: string;
  className?: string;
}

const AnimatedVideo: React.FC<AnimatedVideoProps> = ({ src, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0, true);
    y.set(0, true);
  };

  return (
    <motion.div 
      className={styles.animatedVideoContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.video
        className={className}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        autoPlay
        muted
        loop
        playsInline
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
    </motion.div>
  );
};

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export function HeroSection() {
  return (
    <NextThemesProvider>
      <section className={styles.heroSection}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Empowering Innovation with AI</h1>
          <p className={styles.description}>
            Unlock smarter decision-making with expert-driven analysis and advanced AI insights. 
            Adamass empowers investors, businesses, and startups with in-depth technology assessments, 
            risk evaluations, and strategic growth solutions — enabling informed decisions that accelerate 
            growth, strengthen operations, and deliver sustainable success.
          </p>
          <div className={styles.buttons}>
            <ButtonComponent onClick={() => alert('Get Started clicked!')} className={styles.primaryButton}>Get Started</ButtonComponent>
            <ButtonComponent onClick={() => alert('Learn More clicked!')} className={styles.secondaryButton}>Learn More</ButtonComponent>
          </div>
        </div>
        <AnimatedVideo 
          src="/hero.mp4"
          className={styles.heroVideo}
        />
      </section>
    </NextThemesProvider>
  );
}
