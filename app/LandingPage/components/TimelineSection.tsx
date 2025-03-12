'use client';

import { Text } from "@mantine/core";
import { useEffect, useRef } from 'react';
import styles from '../styles/TimelineSection.module.scss';

export function TimelineSection() {
    const glowLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const timeline = document.querySelector(`.${styles.timeline}`);
            const glowLine = glowLineRef.current;
    
            if (timeline && glowLine) {
                const timelineRect = timeline.getBoundingClientRect();
                const windowHeight = window.innerHeight;
    
                // Start glow only when timeline is actually in view
                if (timelineRect.top <= windowHeight && timelineRect.bottom >= 0) {
                    const totalTimelineHeight = timelineRect.height;
                    const visibleHeight = windowHeight - timelineRect.top;
                    const heightPercentage = Math.min((visibleHeight / totalTimelineHeight) * 60, 100);
    
                    glowLine.style.height = `${heightPercentage}%`;
                } else {
                    glowLine.style.height = '0'; // Prevents starting early
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    return (
        <section className={styles.timelineSection}>
            <h1 className={styles.title}>Empower Your Business</h1>
            <Text c="dimmed" mt="lg" size="lg">
            Adamass provides businesses with the insights and expertise they need to navigate complex challenges. By combining over 25 years of cumulative experience with a deep understanding of technology, finance, and strategy, we deliver solutions that drive growth, innovation, and stability. Our tailored approach ensures businesses make informed decisions that unlock new opportunities in dynamic markets.
            </Text>



            <div className={styles.timeline}>
                <div ref={glowLineRef} className={styles.glowLine}></div>

                <div className={styles.step}>
                    <div className={styles.circle}>a</div>
                    <div className={styles.content}>
                        <h3>Adaptive Solutions</h3>
                        <Text c="dimmed" mt="lg" size="ml">
                        We design flexible strategies that align with your unique objectives, ensuring agility in ever-changing business landscapes. 
                        </Text>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.circle}>b</div>
                    <div className={styles.content}>
                        <h3>Business Clarity</h3>
                        <Text c="dimmed" mt="lg" size="ml">
                        Our insights offer clear guidance, helping you assess risks, explore growth opportunities, and make confident decisions.
                        </Text>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.circle}>c</div>
                    <div className={styles.content}>
                        <h3>Comprehensive Support</h3>
                        <Text c="dimmed" mt="lg" size="ml">
                        From strategic consulting to financial advisory, our integrated approach empowers your organization to thrive at every stage.
                        </Text>
                    </div>
                </div>
            </div>
        </section>
    );
}
