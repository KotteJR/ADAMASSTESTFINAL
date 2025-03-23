'use client';

import { Card } from "@mantine/core";
import { Text } from "@mantine/core";
import { Clock, Search, Zap } from "lucide-react";
import styles from "../styles/FeatureCards.module.scss";

export function FeatureCards() {
    return (
        <section className={styles.featureCardsSection}>
            <h4 className={styles.subTitle}>Impact Through Innovation</h4>
            <h1 className={styles.title}>Our Approach</h1>

            <div className={styles.cardsContainer}>
                <Card className={styles.card}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.icon}><Clock size={24} /></div>
                        <div className={styles.textContent}>
                            <h3>Strategic Insight</h3>
                            <p>
                            We leverage deep industry expertise and data-driven insights to deliver strategic guidance tailored to your unique challenges.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.icon}><Search size={24} /></div>
                        <div className={styles.textContent}>
                            <h3>Tech Excellence</h3>
                            <p>
                            Our proprietary AI tools enhance decision-making, providing precision and efficiency in every analysis.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.icon}><Zap size={24} /></div>
                        <div className={styles.textContent}>
                            <h3>Collaborative Execution</h3>
                            <p>
                            We prioritize close collaboration, ensuring practical solutions that align with your goals and drive measurable results.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
