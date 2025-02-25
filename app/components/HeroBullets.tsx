"use client";

import { IconCheck } from "@tabler/icons-react";
import { Button, Container, Group, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import classes from "../styles/HeroBullets.module.scss";
import { TypingTitle } from "./TypingTitle";

export function HeroBullets() {
  return (
    <Container fluid className={classes.heroSection} id="home">
      <div className={classes.inner}>
        <div className={classes.content}>
        <TypingTitle text="Bla Bla Bla..." />
          <Text c="grey" mt="0" size="xl">
            Unlock smarter decision-making with expert-driven analysis and advanced AI insights.
            Adamass empowers investors, businesses, and startups with in-depth technology assessments,
            risk evaluations, and strategic growth solutions tailored to maximize value and minimize uncertainty.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="lg"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Strategic solutions</b> – Optimizing business growth with data-backed strategies.
            </List.Item>
            <List.Item>
              <b>Technology due diligence</b> – AI-driven insights for smarter investments.
            </List.Item>
            <List.Item>
              <b>Financial advisory</b> – Structuring capital for sustainable success.
            </List.Item>
          </List>

          <Group mt={35}>
            <a href="#contact-us">
              <Button radius="xl" size="md" className={classes.control}>
                Contact Us
              </Button>
            </a>
            <Button variant="default" radius="xl" size="md" className={classes.control1}>
              Learn More
            </Button>
          </Group>
        </div>
        <div className={classes.imageContainer}>
          <Image src="/7922058.jpg" alt="Hero Image" className={classes.image} />
        </div>
      </div>
    </Container>
  );
}
