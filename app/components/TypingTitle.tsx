"use client";

import { motion } from "framer-motion";
import classes from "../styles/HeroBullets.module.scss"; // Use same styles

export function TypingTitle({ text }: { text: string }) {
  return (
    <motion.h1
      className={`${classes.title} typing-title`} // Apply same class
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
