import { Container, Image, Text, Title } from "@mantine/core";
import classes from "../styles/AboutUs2.module.scss";

export function AboutUs2() {
  return (
    <Container className={classes.aboutSection}>
      <div className={classes.imageContainer}>
        {/* Use the correct public image path */}
        <Image src="6195368.jpg" className={classes.image} alt="Adamass Image" />
      </div>
    
      <div className={classes.textContainer}>
        <Title className={classes.title}>Anything</Title>
        <Text c="dimmed" size="lg">
          Adamass AB is a consulting firm specializing in IT, finance, business
          restructuring, due diligence, and strategic advisory. We help businesses
          overcome challenges, streamline operations, and drive sustainable growth.
          Our customized solutions enhance efficiency, reduce risks, and unlock new
          opportunities. With a commitment to integrity, excellence, and long-term
          partnerships, we deliver measurable results.
        </Text>
      </div>

    </Container>
  );
}
