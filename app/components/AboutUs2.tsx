import { useEffect, useRef } from "react";
import { Container, Image, Text, Title } from "@mantine/core";
import { animate, scroll } from "@motionone/dom";
import classes from "../styles/AboutUs2.module.scss";

export function AboutUs2() {
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
          <h2 ref={sectionTitleRef} className={classes.sectionTitle}>
            About Us.
          </h2>
      <div className={classes.textContainer}>
        <Text c="dimmed" mt="lg" size="lg">
        Adamass is a consulting firm dedicated to guiding businesses through complex challenges by delivering tailored solutions that drive growth, innovation, and stability. Founded in 2019, Adamass combines over 25 years of cumulative experience in the technology sector, with expertise spanning financial advisory, strategic consulting, and due diligence. By blending technical expertise with financial and operational acumen, we enable businesses to unlock their full potential and make confident decisions in dynamic markets.
        </Text>
      </div>

      <div className={classes.imageContainer}>
        <Image src="6195369.png" className={classes.image} alt="Adamass Image" />
      </div>
    </Container>
  );
}
