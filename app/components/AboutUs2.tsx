import { Container, Image, Text, Title } from "@mantine/core";
import classes from "../styles/AboutUs2.module.scss"; // ✅ Keep original path

export function AboutUs2() {
  return (
    <Container className={classes.aboutSection} id="about-us"> {/* Added id for scrolling */}
      <div className={classes.imageContainer}>
        {/* Use the correct public image path */}
        <Image src="6195369.png" className={classes.image} alt="Adamass Image" />
      </div>
      
      <div className={classes.textContainer}>
        <Text c="dimmed" mt="lg" size="lg">
        Adamass is a consulting firm dedicated to guiding businesses through complex challenges by delivering tailored solutions that drive growth, innovation, and stability. Founded in 2019, Adamass combines over 25 years of cumulative experience in the technology sector, with expertise spanning financial advisory, strategic consulting, and due diligence. By blending technical expertise with financial and operational acumen, we enable businesses to unlock their full potential and make confident decisions in dynamic markets.
        </Text>
      </div>

    </Container>
  );
}
