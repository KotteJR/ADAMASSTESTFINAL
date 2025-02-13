import { Container, Image, Text, Title } from "@mantine/core";
import classes from "../styles/AboutUs.module.scss"; // ✅ Keep original path

export function AboutUs() {  // ✅ Named Export (Original)
  return (
    <Container className={classes.aboutSection}>
      <div className={classes.textContainer}>
        <Title className={classes.title}>Adamass AB</Title>
        <Text c="dimmed" size="lg">
          Adamass AB is a consulting firm specializing in IT, finance, business restructuring,
          due diligence, and strategic advisory. We help businesses overcome challenges,
          streamline operations, and drive sustainable growth. Our customized solutions
          enhance efficiency, reduce risks, and unlock new opportunities.
        </Text>
      </div>

      <div className={classes.imageContainer}>
        {/* Use the correct public image path */}
        <Image src="6502435.jpg" className={classes.image} alt="Adamass Image" />
      </div>
    </Container>
  );
}
