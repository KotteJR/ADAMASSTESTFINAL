import { Container, Image, Text, Title } from "@mantine/core";
import classes from "../styles/AboutUs.module.scss"; // ✅ Keep original path

export function AboutUs() {
  return (
    <Container className={classes.aboutSection}> {/* Added id for scrolling */}
      <div className={classes.textContainer}>
        <Text c="dimmed" mt="lg" size="lg">
        At Adamass, we blend human expertise with advanced technology to create a unique consulting experience. Our approach integrates proprietary AI-driven tools with deep market knowledge and hands-on collaboration, allowing us to rapidly understand client challenges, deliver precise analyses, and ensure practical, effective solutions. By combining innovative technology with proven advisory methodologies, we ensure clients achieve strategic clarity, operational excellence, and measurable financial success.
        </Text>
      </div>

      <div className={classes.imageContainer}>
        {/* Use the correct public image path */}
        <Image src="6502435.png" className={classes.image} alt="Adamass Image" />
      </div>
    </Container>
  );
}
