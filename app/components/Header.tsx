"use client";

import { useState, useEffect } from "react";
import { Burger, Container, Group, Image, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "../styles/HeaderSimple.module.scss";

const links = [
  { link: "#hero", label: "Home" },
  { link: "#features", label: "Offerings" },
  { link: "#about-us", label: "About Us" },
  { link: "#contact-us", label: "Contact Us" },
];

export function HeaderSimple() {
  const [active, setActive] = useState(links[0].link);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setScrollDirection(null);
      } else if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let foundActive = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting && !foundActive) {
            setActive(`#${entry.target.id}`);
            foundActive = true;
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.2 }
    );

    links.forEach((link) => {
      const section = document.querySelector(link.link);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    setActive(target);

    const section = document.querySelector(target);
    if (section) {
      const offsetPosition = section.getBoundingClientRect().top + window.scrollY - (isMobile ? 50 : 80);
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });

      setTimeout(() => setActive(target), 300);
    }

    if (isMobile) close();
  };

  return (
    <header
      className={`${styles.header} ${
        scrollDirection === "down" ? styles.hidden : scrollDirection === "up" ? styles.visible : ""
      }`}
    >
      <Container size="md" className={styles.inner}>
        <Image src="/LOGO.png" alt="Custom Logo" height={25} width={95} />

        {!isMobile && (
          <Group gap="5" className={styles.links}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.link}
                className={`${styles.link} ${active === link.link ? styles.active : ""}`}
                onClick={(event) => handleSmoothScroll(event, link.link)}
              >
                {link.label}
              </a>
            ))}
          </Group>
        )}

        {isMobile && <Burger opened={opened} onClick={toggle} size="sm" />}

        {isMobile && (
          <Drawer opened={opened} onClose={close} size="100%" position="right" padding="md" title="Menu">
            <Group style={{ flexDirection: "column" }} gap="lg" align="center" className={styles.mobileMenu}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.link}
                  className={`${styles.link} ${active === link.link ? styles.active : ""}`}
                  onClick={(event) => handleSmoothScroll(event, link.link)}
                >
                  {link.label}
                </a>
              ))}
            </Group>
          </Drawer>
        )}
      </Container>
    </header>
  );
}