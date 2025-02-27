import { useState } from "react";
import { Container, Title, Text, Modal, Image } from "@mantine/core";
import classes from "../styles/FeatureSection.module.scss";

interface Feature {
  title: string;
  description: string;
  details: string;
  image: string;
  modalImage: string;
}

const features: Feature[] = [
  {
    title: "Apple Intelligence",
    description: "AI-opening possibilities.",
    details:
      "Now that’s smart. Our latest iPhone models are built for Apple Intelligence, the personal intelligence system that helps you write, express yourself, and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple.",
    image: "/abc.png",
    modalImage: "123.png",
  },
  {
    title: "Cutting-Edge Cameras",
    description: "Picture your best photos and videos.",
    details:
      "With advanced computational photography, iPhone captures stunning images with incredible detail. Whether in bright daylight or low light, every shot is optimized for clarity and color accuracy.",
    image: "/def.png",
    modalImage: "/456.png",
  },
  {
    title: "Chip and Battery Life",
    description: "Fast that lasts.",
    details:
      "The A18 Pro chip delivers unmatched performance while optimizing power efficiency. Combined with an advanced battery system, you get all-day battery life without compromise.",
    image: "/ghi.png",
    modalImage: "789.png",
  },
];

export function FeatureSection() {
  const [opened, setOpened] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature);
    setOpened(true);
  };

  return (
    <Container className={classes.featureSection}>
      <div className={classes.grid}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={classes.featureCard}
            onClick={() => openModal(feature)}
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${feature.image})` }}
            />
            <div className={classes.content}>
              <Title order={3} className={classes.featureTitle}>
                {feature.title}
              </Title>
              <Text size="lg">{feature.description}</Text>
            </div>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <Modal opened={opened} onClose={() => setOpened(false)} size="lg" centered>
          <Title order={2} className={classes.modalTitle}>
            {selectedFeature.title}
          </Title>
          <Text size="lg" className={classes.modalDescription}>
            {selectedFeature.details}
          </Text>
          <Image
            src={selectedFeature.modalImage}
            alt={selectedFeature.title}
            className={classes.modalImage}
          />
        </Modal>
      )}
    </Container>
  );
}