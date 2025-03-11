import { useEffect, useRef } from "react";
import { Container, Image, Text, Title } from "@mantine/core";
import { animate, scroll } from "@motionone/dom";
import classes from "../styles/AboutUs.module.scss";

export function AboutUs() {
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sectionTitleRef.current) {
      scroll(
        animate(sectionTitleRef.current,
          { 
            y: [-50, 0, 50], 
            opacity: [0.2, 1, 0.2] 
          },
          { easing: "ease-in-out", duration: 1.5 }
        ),
        { target: sectionTitleRef.current }
      );
    }
  }, []);

  return (
    <Container className={classes.aboutSection} id="about-us">
      <Title ref={sectionTitleRef} order={2} className={classes.sectionTitle}>
        Approach.
      </Title>

      <div className={classes.textContainer}>
        <Text c="dimmed" mt="lg" size="lg">
        At Adamass, we blend human expertise with advanced technology to create a unique consulting experience. Our approach integrates proprietary AI-driven tools with deep market knowledge and hands-on collaboration, allowing us to rapidly understand client challenges, deliver precise analyses, and ensure practical, effective solutions. By combining innovative technology with proven advisory methodologies, we ensure clients achieve strategic clarity, operational excellence, and measurable financial success.
        </Text>
      </div>

      <div className={classes.imageContainer}>
        <Image src="6195369.png" className={classes.image} alt="Adamass Image" />
      </div>
    </Container>
  );
}
