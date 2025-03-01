import { useState } from "react";
import { Container, Title, Text, Modal, Image, Button } from "@mantine/core";
import classes from "../styles/FeatureSection.module.scss";

interface Feature {
  title: string;
  description: string;
  details: string;
  extraDetails: string;
  image: string;
  modalImage: string;
}

const features: Feature[] = [
  {
    title: "Due Diligence",
    description: "Industry-leading AI...",
    details: "Some long text here...",
    extraDetails: "Extra details...",
    image: "/abc.png",
    modalImage: "/zxc.png",
  },
  {
    title: "Cutting-Edge Cameras",
    description: "Picture your best photos and videos.",
    details: "Some long text here...",
    extraDetails: "Extra details...",
    image: "/def.png",
    modalImage: "/asd.png",
  },
  {
    title: "Chip and Battery Life",
    description: "Fast that lasts.",
    details: "Some long text here...",
    extraDetails: "Extra details...",
    image: "/ghi.png",
    modalImage: "/qwe.png",
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
    <Container className={classes.featureSection} id="features">
      <div className={classes.gridWrapper}>
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

        {/* Navigation Arrows - Only show on smaller screens */}
        <div className={classes.navigation}>
          <button
            className={classes.navArrow}
            onClick={() =>
              document.querySelector(`.${classes.grid}`)?.scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            &#8592;
          </button>
          <button
            className={classes.navArrow}
            onClick={() =>
              document.querySelector(`.${classes.grid}`)?.scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            &#8594;
          </button>
        </div>
      </div>

      {selectedFeature && (
        <Modal opened={opened} onClose={() => setOpened(false)} size="auto" centered>
          <div className={classes.modalContent}>
            <div className={classes.modalTop}>
              <div className={classes.modalText}>
                <Title order={2} className={classes.modalTitle}>{selectedFeature.title}</Title>
                <Text size="lg" className={classes.modalDescription}>
                  {selectedFeature.details}
                </Text>
              </div>
            </div>
            <Image src={selectedFeature.modalImage} alt={selectedFeature.title} className={classes.modalLargeImage} />
          </div>
        </Modal>
      )}
    </Container>
  );
}