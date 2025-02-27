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
          Adamass AB is a consulting firm specializing in IT, finance, business restructuring,
          due diligence, and strategic advisory. We help businesses overcome challenges,
          streamline operations, and drive sustainable growth. Our customized solutions
          enhance efficiency, reduce risks, and unlock new opportunities.
        </Text>
      </div>

    </Container>
  );
}
