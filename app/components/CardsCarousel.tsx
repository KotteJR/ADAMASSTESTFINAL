"use client"; // ✅ Needed for Mantine in Next.js

import { Carousel } from "@mantine/carousel";
import { Button, Paper, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../styles/CardsCarousel.module.scss";

interface CardProps {
  image: string;
  title: string;
  category: string;
}

export function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

const data: CardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best forests to visit in North America",
    category: "Nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Hawaii beaches review: better than you think",
    category: "Beach",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "Nature",
  },
];

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <div className={classes.carouselContainer}>
      <Carousel
        withIndicators
        loop
        dragFree
        slideSize={{ base: "100%", sm: "50%", md: "33.333%" }} // ✅ Controls how many slides show at once
        slideGap="md"
        align="center" // ✅ Centers slides instead of stacking
        slidesToScroll={mobile ? 1 : 2} // ✅ Scrolls one by one on mobile, two on larger screens
        containScroll="trimSnaps" // ✅ Fixes weird alignment issues
      >
        {data.map((item) => (
          <Carousel.Slide key={item.title}>
            <Card {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
