import React, { useEffect, useState } from 'react';
import styles from './comingsoon.module.scss';

export function ComingSoon() {
    const calculateTimeLeft = () => {
        const launchDate = new Date("2025-06-01T00:00:00").getTime();
        const now = new Date().getTime();
        const difference = launchDate - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.comingSoonSection}>
            <h1 className={styles.title}>Exciting things are happening!</h1>
            <p className={styles.description}>We are still building this page. Stay tuned for updates. </p>

            <div className={styles.countdown}>
                <div className={styles.timerBox}>
                    <span>{timeLeft.days}</span>
                    <small>Days</small>
                </div>
                <div className={styles.timerBox}>
                    <span>{timeLeft.hours}</span>
                    <small>Hours</small>
                </div>
                <div className={styles.timerBox}>
                    <span>{timeLeft.minutes}</span>
                    <small>Minutes</small>
                </div>
                <div className={styles.timerBox}>
                    <span>{timeLeft.seconds}</span>
                    <small>Seconds</small>
                </div>
            </div>
        </section>
    );
}
