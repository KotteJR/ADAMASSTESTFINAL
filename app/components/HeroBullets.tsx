"use client";

import { Container, Grid, Title, Text, List, ThemeIcon, Button, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from '../styles/HeroBullets.module.scss';

export function HeroBullets() {
  return (
    <Container size="xl" className={classes.heroSection}>
      <Grid gutter={20} align="center"> {/* Reduce gutter spacing */}
        <Grid.Col span={{ base: 12, sm: 6, md: 6 }} className={classes.textSection}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Strategic Advisory & AI-Powered Due Diligence</span><br />
          </Title>
          <Text c="dimmed" mt="md">
          Unlock smarter decision-making with expert-driven analysis and advanced AI insights. Adamass empowers investors, businesses, and startups with in-depth technology assessments, risk evaluations, and strategic growth solutions tailored to maximize value and minimize uncertainty.
          </Text>

          <List
  mt={20} // Reduce spacing
  spacing="md" // Use "md" or "lg" for larger spacing
  size="sm"
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


          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Contact Us
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Learn More
            </Button>
          </Group>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6 }} className={classes.imageContainer}>
          <img src="/7922058.jpg" alt="Hero Image" className={classes.image} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
