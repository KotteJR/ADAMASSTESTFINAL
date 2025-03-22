import { Button, Text, Title } from "@mantine/core";
import classes from "../styles/CTA.module.scss";

export function CTA() {
  return (
    <div className={classes.heroCTAContainer}>
      <div className={classes.heroCTACard}>
        <h1 className={classes.title}>Our Approach</h1>

        <Text c="dimmed" size="lg" className={classes.heroCTAtext}>
          Partner with Adamass to unlock strategic insights, optimize operations, and drive success.
        </Text>

        <div className={classes.heroCTAButtons}>
          <Button variant="default" className={classes.learnMoreButton}>Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
