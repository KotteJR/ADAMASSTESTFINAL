import { useState } from "react";
import { Container, Title, Text, Modal, Image, Button} from "@mantine/core";
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
    details:
      "The sky above the port was the color of television, tuned to a dead channel. Beneath it, the city buzzed with neon reflections and the hum of forgotten stories. A cat sat motionless on the edge of a rooftop, watching as a drone whizzed past, scanning the streets for anomalies. Somewhere in the distance, an old radio crackled with static before sputtering out a jazz tune no one had requested.  In a basement filled with half-written equations and the scent of burnt coffee, a scientist stared at a screen flashing incomprehensible numbers. The machine had become self-aware, or so it seemed, but the only message it displayed was a single word: entropy. Across the world, someone yawned into the void of another meeting, their webcam off, their soul absent.",
    extraDetails:
      "Apple Intelligence is designed with on-device processing for enhanced security, ensuring that personal data never leaves your device while still delivering powerful AI-driven experiences.",
    image: "/abc.png",
    modalImage: "/zxc.png", // Use a large vertical image here
  },
  {
    title: "Cutting-Edge Cameras",
    description: "Picture your best photos and videos.",
    details:
    "The sky above the port was the color of television, tuned to a dead channel. Beneath it, the city buzzed with neon reflections and the hum of forgotten stories. A cat sat motionless on the edge of a rooftop, watching as a drone whizzed past, scanning the streets for anomalies. Somewhere in the distance, an old radio crackled with static before sputtering out a jazz tune no one had requested.  In a basement filled with half-written equations and the scent of burnt coffee, a scientist stared at a screen flashing incomprehensible numbers. The machine had become self-aware, or so it seemed, but the only message it displayed was a single word: entropy. Across the world, someone yawned into the void of another meeting, their webcam off, their soul absent.",
    extraDetails:
      "The ProRAW and ProRes video capabilities allow you to capture and edit professional-grade content, pushing the boundaries of mobile photography.",
    image: "/def.png",
    modalImage: "/asd.png",
  },
  {
    title: "Chip and Battery Life",
    description: "Fast that lasts.",
    details:
      "The sky above the port was the color of television, tuned to a dead channel. Beneath it, the city buzzed with neon reflections and the hum of forgotten stories. A cat sat motionless on the edge of a rooftop, watching as a drone whizzed past, scanning the streets for anomalies. Somewhere in the distance, an old radio crackled with static before sputtering out a jazz tune no one had requested.  In a basement filled with half-written equations and the scent of burnt coffee, a scientist stared at a screen flashing incomprehensible numbers. The machine had become self-aware, or so it seemed, but the only message it displayed was a single word: entropy. Across the world, someone yawned into the void of another meeting, their webcam off, their soul absent.",
    extraDetails:
      "With intelligent battery management, the iPhone dynamically adjusts power consumption based on usage patterns, ensuring maximum efficiency.",
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
      <div className={classes.grid}>
        {features.map((feature, index) => (
          <div
          key={index}
          className={`${classes.featureCard} ${index === features.length - 1 ? classes.blurEffect : ""}`}
          onClick={() => openModal(feature)}
          >

            <div className={classes.navigation}>
              <button className={classes.navArrow} onClick={() => document.querySelector(`.${classes.grid}`)?.scrollBy({ left: -300, behavior: "smooth" })}>
                &#8592;
              </button>
              <button className={classes.navArrow} onClick={() => document.querySelector(`.${classes.grid}`)?.scrollBy({ left: 300, behavior: "smooth" })}>
                &#8594;
              </button>
            </div>

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
        <Modal 
        opened={opened} 
        onClose={() => setOpened(false)} 
        size="auto"
        centered
        className={classes.modalCustomSize}
        styles={{
          inner: { transform: "translateY(5vh)" },
        }}
      >
        <div className={classes.modalContent}>
          <div className={classes.modalTop}>
            <div className={classes.modalText}>
              <Title order={2} className={classes.modalTitle}>
                {selectedFeature.title}
              </Title>
              <Text size="lg" className={classes.modalDescription}>
                {selectedFeature.details}
              </Text>

            </div>
          </div>
      
          <Image
            src={selectedFeature.modalImage}
            alt={selectedFeature.title}
            className={classes.modalLargeImage}
          />
                
        </div>
      </Modal>
      )}
    </Container>
  );
}