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
                    const heightPercentage = Math.min((visibleHeight / totalTimelineHeight) * 62, 100);
    
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
            <p>
            Adamass provides businesses with the insights and expertise they need to navigate complex challenges. By combining over 25 years of cumulative experience with a deep understanding of technology, finance, and strategy, we deliver solutions that drive growth, innovation, and stability. Our tailored approach ensures businesses make informed decisions that unlock new opportunities in dynamic markets.
            </p>



            <div className={styles.timeline}>
                <div ref={glowLineRef} className={styles.glowLine}></div>

                <div className={styles.step}>
                    <div className={styles.content}>
                        <h3>Adaptive Solutions</h3>
                        <p>
                        We design flexible strategies that align with your unique objectives, ensuring agility in ever-changing business landscapes. 
                        </p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.content}>
                        <h3>Business Clarity</h3>
                        <p>
                        Our insights offer clear guidance, helping you assess risks, explore growth opportunities, and make confident decisions.
                        </p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.content}>
                        <h3>Comprehensive Support</h3>
                        <p>
                        From strategic consulting to financial advisory, our integrated approach empowers your organization to thrive at every stage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}