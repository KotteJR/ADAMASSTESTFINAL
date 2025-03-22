'use client';

import React from 'react';
import styles from '../styles/FeatureSectionTest.module.scss';
import { Text, Button } from '@mantine/core'; // Mantine Image replaced
import { ArrowRight } from 'lucide-react'; // ShadCN/Lucide icons
import Link from 'next/link';

export function FeatureSectionTest() {
  const links = [
    "/duediligence",
    "/strategicadvisory",
    "/capitaladvisory"
  ];

  return (
    <section className={styles.featureSection}>
      <div className={styles.topContent}>
        <h1 className={styles.title}>Expertise</h1>

        <div className={styles.textContent}>
          <Text c="dimmed" mt="lg" size="lg">
            We have now implemented our AI enhanced Desktop Review, feel free to try it or ask us for more information.
          </Text>

          <div className={styles.buttons}>
            <Button variant="default" className={styles.primaryButton}>Learn More</Button>
            <Button variant="default" className={styles.secondaryButton}>Try for Free</Button>
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        {[
          { 
            title: "Due Diligence", 
            description: "Effortlessly manage early-stage capital", 
            image: "/aidd.png" 
          },
          { 
            title: "Strategic Advisory", 
            description: "Adapt your funding strategy", 
            image: "/aisa.png" 
          },
          { 
            title: "Capital Advisory", 
            description: "Raise investment with ease", 
            image: "/aica.png" 
          }
        ].map((card, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}
            />

            <div className={styles.cardContent}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>

            <Link href={links[index]} passHref>
              <div className={styles.arrow} role="button" tabIndex={0}>
                <ArrowRight />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
