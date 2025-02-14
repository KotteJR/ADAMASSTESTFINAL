"use client";

import { useState, useEffect } from "react";
import { Burger, Container, Group, Image, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/HeaderSimple.module.css";

const links = [
  { link: "#home", label: "Home" },
  { link: "#features-cards", label: "What We Do" },
  { link: "#about-us", label: "About Us" },
  { link: "#contact-us", label: "Contact Us" },
];

export function HeaderSimple() {
  const [active, setActive] = useState(links[0].link);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect Mobile on Initial Load & Resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Smooth Scroll + Active Section Detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      let foundActive = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting && !foundActive) {
          setActive(`#${entry.target.id}`);
          foundActive = true;
        }
      });
    }, observerOptions);

    links.forEach((link) => {
      const section = document.querySelector(link.link);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Smooth Scrolling Function with TypeScript Fix
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    setActive(target);

    const isMobileView = window.innerWidth < 768;
    let headerOffset = isMobileView ? 50 : 80;

    if (target === "#about-us") {
      headerOffset = isMobileView ? 60 : 20;
    } else if (target === "#features-cards") {
      headerOffset = isMobileView ? 80 : 130;
    } else if (target === "#contact-us") {
      headerOffset = isMobileView ? 120 : 200;
    }

    const section = document.querySelector(target);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setActive(target);
      }, 300);
    }

    if (isMobileView) close();
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => handleSmoothScroll(event, link.link)}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* ✅ Logo - Ensures Proper Sizing */}
        <Image src="/LOGO.png" alt="Custom Logo" height={25} width={95} />

        {/* ✅ Show Links for Desktop Only */}
        {!isMobile && (
          <Group gap="5" className={classes.links}>
            {items}
          </Group>
        )}

        {/* ✅ Show Hamburger Menu for Mobile Only */}
        {isMobile && <Burger opened={opened} onClick={toggle} size="sm" />}

        {/* ✅ Full-screen Drawer for Mobile (Fixes `transitionDuration`) */}
        {isMobile && (
          <Drawer
            opened={opened}
            onClose={close}
            size="100%"
            position="right"
            padding="md"
            title="Menu"
            transitionProps={{ duration: 300 }} // ✅ FIX: Use `transitionProps`
          >
            <Group style={{ flexDirection: "column" }} gap="lg" align="center" className={classes.mobileMenu}>
              {items}
            </Group>
          </Drawer>
        )}
      </Container>
    </header>
  );
}
