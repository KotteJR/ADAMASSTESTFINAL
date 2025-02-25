import { useState } from "react";
import { Modal, Image, Text, Title, Container, SimpleGrid, Button } from "@mantine/core";
import classes from "../styles/InteractiveCards.module.scss";

interface CardData {
  title: string;
  image: string;
  description: string;
  modalImage: string;
}

const cardsData: CardData[] = [
  {
    title: "Due Diligence",
    image: "/123.png",
    modalImage: "/images/mac-intelligence-large.jpg",
    description: "Comprehensive risk assessments, financial analysis, and operational evaluations for informed decision-making.",
  },
  {
    title: "Strategic Advisory",
    image: "/456.png",
    modalImage: "/images/mac-performance-large.jpg",
    description: "Helping businesses navigate challenges, optimize performance, and achieve long-term growth.",
  },
  {
    title: "Capital Advisory",
    image: "/789.png",
    modalImage: "/images/mac-iphone-large.jpg",
    description: "Optimizing capital allocation, securing financing, and managing liquidity for sustainable business success.",
  },
];

export function InteractiveCards() {
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const openModal = (card: CardData) => {
    setSelectedCard(card);
    setOpened(true);
  };

  return (
    <Container size="lg" className={classes.cardsSection}>
      <Title order={2} ta="center" className={classes.title}>
       </Title>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" className={classes.cardsGrid}>
        {cardsData.map((card, index) => (
          <div key={index} className={classes.card} onClick={() => openModal(card)}>
            <Image src={card.image} className={classes.cardImage} alt={card.title} />
            <div className={classes.overlay}>
              <Text className={classes.overlayText}>{card.title}</Text>
              <Button className={classes.learnMore} size="md" variant="filled" radius="xl">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </SimpleGrid>

      <Modal opened={opened} onClose={() => setOpened(false)} centered className={classes.modal} overlayBlur={5}>
        {selectedCard?.modalImage && <Image src={selectedCard.modalImage} className={classes.modalImage} alt={selectedCard.title} />}
        <Title order={3}>{selectedCard?.title}</Title>
        <Text>{selectedCard?.description}</Text>
      </Modal>
    </Container>
  );
}
