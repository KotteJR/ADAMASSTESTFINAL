"use client";

import styles from "./CardSection.module.scss";
import { Text, Image } from "@mantine/core";

export function CardSection() {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <Image
                    src="/DDL.png"
                    className={styles.cardImage}
                />
                <div className={styles.content}>
                    <h2>Streamline Sales</h2>
                    <Text className={styles.whiteText} c="dimmed" mt="lg" size="lg">
                    Adamass is a consulting firm dedicated to guiding businesses through complex challenges by delivering tailored solutions.
                    </Text>

                </div>
            </div>

            <div className={styles.card}>
                <Image
                    src="/DDR.png"
                    className={styles.cardImage}
                />
                <div className={styles.content}>
                    <h2>Measure Success</h2>
                    <Text className={styles.whiteText} c="dimmed" mt="lg" size="lg">
                    Adamass is a consulting firm dedicated to guiding businesses through complex challenges by delivering tailored solutions.
                    </Text>

                </div>
            </div>
        </div>
    );
}
