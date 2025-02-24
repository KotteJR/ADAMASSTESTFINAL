import { Container, Image, Text, Title } from "@mantine/core";
import classes from "../styles/AboutUs2.module.scss";

export function AboutUs2() {
  return (
    <Container className={classes.aboutSection}>
      <div className={classes.imageContainer}>
        {/* Use the correct public image path */}
        <Image src="6195369.jpg" className={classes.image} alt="Adamass Image" />
      </div>
    
      <div className={classes.textContainer}>
        <Title className={classes.title}>AI-Powered Insights</Title>
        <Text c="dimmed" size="lg">
        We specialize in AI-driven analysis, 
        machine learning solutions, automation, and data science. We help 
        businesses leverage advanced AI technologies to enhance decision-making, 
        optimize operations, and unlock valuable insights. Our tailored AI solutions 
        improve efficiency, drive innovation, and enable data-informed strategies 
        for growth.  
        </Text>
      </div>

    </Container>
  );
}
