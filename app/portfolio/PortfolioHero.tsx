'use client';

import { Container, Title, Text } from "@mantine/core";
import { FaArrowDown } from "react-icons/fa";  // Import scroll-down arrow icon
import classes from "./PortfolioHero.module.scss";

export function PortfolioHero() {
  return (
    <Container className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Explore Our{" "}
          <span className={classes.highlight}>Portfolio</span>
        </Title>

        <Container size={600} className={classes.description}>
          <Text c="dimmed" size="lg">
            Discover how Adamass empowers innovation and drives growth with strategic insights, AI-powered analytics, and robust due diligence processes tailored specifically to elevate your business decisions.
          </Text>
        </Container>

        <div className={classes.scrollArrow}>
          <FaArrowDown className={classes.arrowIcon} />
        </div>
      </div>
    </Container>
  );
}
