'use client';

import Image from 'next/image';
import { Button, Text } from '@mantine/core';
import styles from '../styles/Herosimple.module.scss';

export function Herosimple() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Text className={styles.title}>Build journeys</Text>
          <Text className={styles.subtitle}>that drive revenue</Text>
          <Text className={styles.description}>
            Your <span>marketing automation</span>, <span>analytics</span>, <span>customer data</span> and <span>support</span>. Together.
          </Text>
          <div className={styles.buttons}>
            <Button color="blue" radius="xl" size="md">Book a demo</Button>
            <Button variant="default" radius="xl" size="md">Watch video</Button>
          </div>
          <Text className={styles.caption}>14 day free trial · Onboard in 2 minutes</Text>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/herodashboard.png"
          alt="Hero Dashboard"
          width={1000}
          height={650}
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}
