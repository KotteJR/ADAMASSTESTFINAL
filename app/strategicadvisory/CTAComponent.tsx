"use client";

import React from 'react';
import styles from './CTAComponent.module.scss';
import { Text, Button } from '@mantine/core';

export function CTAComponent() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.leftContent}>
        <h1 className={styles.title}>Start building your websites faster</h1>
      </div>
      <div className={styles.rightContent}>
        <Text className={styles.description}>
          Try our tools and services to build your website faster. Start with a 14-day free trial. No credit card required. No setup fees. Cancel anytime.
        </Text>

        <div className={styles.buttons}>
          <Button className={styles.primaryButton}>Get Started</Button>
          <Button variant="outline" className={styles.secondaryButton}>Learn More</Button>
        </div>
      </div>
    </section>
  );
}
