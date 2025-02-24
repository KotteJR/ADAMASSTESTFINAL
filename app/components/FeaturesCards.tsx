"use client";  // Marking this as a client component

import { IconCookie, IconGauge, IconUser } from '@tabler/icons-react';
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,  // useMantineTheme can now be used safely
} from '@mantine/core';
import classes from '../styles/FeaturesCards.module.scss';

const mockdata = [
  {
    title: 'Strategic Advising',
    description:
      'Helping you and your business navigate challenges, optimize performance, and achieve long-term growth.',
    icon: IconGauge,
  },
  {
    title: 'Due Diligence',
    description:
      'Comprehensive risk assessments, financial analysis, and operational evaluations for informed decision-making.',
    icon: IconUser,
  },
  {
    title: 'Capital Advisory',
    description:
      'Optimizing capital allocation, securing financing, and managing liquidity for sustainable business success.',
    icon: IconCookie,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" mt ="lg" radius="md" className={classes.card} padding="xl">
      <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" id="features-cards">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          LEARN MORE ABOUT WHAT WE DO
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="lg">
        Driving Growth, Reducing Risk, and Structuring Success
      </Title>
      

      <Text c="dimmed" className={classes.description} ta="center" mt="lg">
        Our expertise in strategic advising, due diligence, and financial structuring ensures businesses and investors make informed, data-driven decisions.
      </Text>

      <Group justify="center" mt={20}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt={30}>
          {features}
        </SimpleGrid>
      </Group>
      
    </Container>
  );
}
