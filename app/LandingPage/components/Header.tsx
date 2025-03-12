"use client";

import {
  IconChevronDown,
  IconCode,
  IconCoin,
  IconBook,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from "../styles/HeaderMegaMenu.module.scss";
import Image from "next/image";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setScrollDirection(null); // Transparent at top
      } else if (currentScrollY > lastScrollY) {
        setScrollDirection("down"); // Hide on scroll down
      } else {
        setScrollDirection("up"); // Show on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box pb={0}>
      <header
        className={`${classes.header} ${
          scrollDirection === "up"
            ? classes.visible
            : scrollDirection === "down"
            ? classes.hidden
            : classes.transparent
        }`}
      >
        {/* === FIXED === Using Container for Proper Width and Centering */}
        <Container size="md" className={classes.inner}>
          <Group justify="space-between" h="100%">

            {/* Logo */}
            <Image
              src="/LOGO.png"
              alt="Adamass Logo"
              width={100}
              height={20}
              priority
            />

            {/* Links */}
            <Group h="100%" gap="5" visibleFrom="sm">
              <a href="#" className={classes.link}>Home</a>
              <a href="#" className={classes.link}>Features</a>
              <a href="#" className={classes.link}>About Us</a>
              <a href="#" className={classes.link}>Contact</a>
            </Group>

            {/* Auth Buttons */}
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </Container>
      </header>
    </Box>
  );
}
