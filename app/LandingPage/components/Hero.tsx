"use client";

import { useEffect, useRef, useState } from "react";
import { Text, Button } from "@mantine/core";
import classes from "../styles/Hero.module.scss";

export function Hero() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsExpanded(window.scrollY > 0);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={classes.heroContainer}>
            <video
                id="hero-video"
                className={classes.heroVideo}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/HEROHERO.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div
                ref={cardRef}
                className={`${classes.expandingCard} ${isExpanded ? classes.expanded : ""}`}
            >
                <div className={classes.heroContent}>
                    <h1 className={classes.heroTitle}>Empowering Innovation with AI</h1>
                    <Text
                        className={`${classes.heroText} ${isExpanded ? classes.textVisible : ""}`}
                        c="dimmed"
                        size="lg"
                        mt="lg"
                    >
                        Unlock smarter decision-making with expert-driven analysis and advanced AI insights. Adamass empowers investors, businesses, and startups with in-depth technology assessments, risk evaluations, and strategic growth solutions — enabling informed decisions that accelerate growth, strengthen operations, and deliver sustainable success.
                    </Text>

                <div className={classes.buttons}>
                            <Button className={classes.primaryButton}>Contact Us</Button>
                        </div>
                </div>
            </div>
        </div>
    );
}
