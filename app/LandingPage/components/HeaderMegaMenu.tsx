"use client";

import Link from 'next/link'

import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
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

const mockdata = [
  { icon: IconCode, title: "Open source", description: "Reliable and transparent code." },
  { icon: IconCoin, title: "Free for everyone", description: "Open and accessible for all." },
  { icon: IconBook, title: "Documentation", description: "Comprehensive guides and tutorials." },
  { icon: IconFingerprint, title: "Security", description: "Robust protection for your data." },
  { icon: IconChartPie3, title: "Analytics", description: "Powerful data visualization tools." },
  { icon: IconNotification, title: "Notifications", description: "Stay updated with alerts." },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setScrollDirection(null);  // Transparent when at top
      } else if (currentScrollY > lastScrollY) {
        setScrollDirection("down"); // Hide on scroll down
      } else {
        setScrollDirection("up");   // Show and turn white on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={0}>
      <header
        className={`${classes.header} ${
          scrollDirection === "up"
            ? classes.visible
            : scrollDirection === "down"
            ? classes.hidden
            : classes.transparent // Transparent by default
        }`}
      >
        <Group justify="space-between" h="100%">

         <Image
            src="/LOGO.png"    // Path to your logo
             alt="Adamass Logo" // Alternative text for accessibility
             width={100}        // Adjust width as per your design
             height={20}        // Adjust height to align properly
            priority           // Ensures the logo loads faster for improved UX
          />


          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/LandingPage" className={classes.link}>
              Home
            </Link>

            <Link href="/portfolio" className={classes.link}>
              Portfolio
            </Link>

            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Begin your journey with us today.
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/contact" className={classes.link}>
              Contact
            </Link>

          </Group>

          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>
  );
}
