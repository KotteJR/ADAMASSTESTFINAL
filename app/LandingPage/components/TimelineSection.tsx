'use client';

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
            <h1 className={styles.title}>Launch with Assurance</h1>
            <p className={styles.description}>
                Simplify your workflow with our tools that provide clear insights, minimizing the complexity of managing intricate deployment data.
            </p>

            <div className={styles.timeline}>
                <div ref={glowLineRef} className={styles.glowLine}></div>

                <div className={styles.step}>
                    <div className={styles.circle}>1</div>
                    <div className={styles.content}>
                        <h3>Monitor Deployments live</h3>
                        <p>Track your deployments with clarity, seeing updates take place as they happen.</p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.circle}>2</div>
                    <div className={styles.content}>
                        <h3>Immediate Issue Detection</h3>
                        <p>Spot issues instantly and address them with precise metrics for optimized performance.</p>
                    </div>
                </div>

                <div className={styles.step}>
                    <div className={styles.circle}>3</div>
                    <div className={styles.content}>
                        <h3>Seamless Automation</h3>
                        <p>Automate repetitive tasks and ensure consistent deployment workflows for better scalability.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
