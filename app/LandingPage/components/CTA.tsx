import { Button, Container, Text, Title } from "@mantine/core";
import classes from "../styles/CTA.module.scss";

export function CTA() {
  return (
    <div className={classes.heroCTAContainer}>
      <Container className={classes.heroCTACard}>
        <Title order={2} className={classes.heroCTATitle}>
        Accelerate Your Growth Today        </Title>
        <Text size="lg" className={classes.heroCTAText}>
        Partner with Adamass to unlock strategic insights, optimize operations, and drive success.        </Text>
        <div className={classes.heroCTAButtons}>
          <Button variant="default" className={classes.learnMoreButton}>Contact Us</Button>
        </div>
      </Container>
    </div>
  );
} 