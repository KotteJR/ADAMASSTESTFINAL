import { Button, Container, Text, Title } from "@mantine/core";
import classes from "../styles/CTA.module.scss";

export function CTA() {
  return (
    <div className={classes.heroCTAContainer}>
      <Container className={classes.heroCTACard}>
        <Title order={2} className={classes.heroCTATitle}>
          Ready to Get Started?
        </Title>
        <Text size="lg" c="white" className={classes.heroCTAText}>
          Join thousands of satisfied customers using our platform to build amazing websites.
        </Text>
        <div className={classes.heroCTAButtons}>
          <Button variant="default" className={classes.learnMoreButton}>Learn More</Button>
          <Button variant="filled" className={classes.getStartedButton}>Get Started</Button>
        </div>
      </Container>
    </div>
  );
} 