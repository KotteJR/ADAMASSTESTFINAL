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
  { icon: IconBook, title: "Due Diligence", description: "In-depth research and market evaluation.", link: "/duediligence"},
  { icon: IconChartPie3, title: "Capital Advisory", description: "Investor insights and funding strategies.", link: "/capitaladvisory" },
  { icon: IconNotification, title: "Strategic Advisory", description: "Tailored strategies for business growth.", link: "/strategicadvisory" },
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

  const links = mockdata.map((item) => (
    <Link href={item.link || "#"} key={item.title} className={classes.subLink}>
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
    </Link>
  ));
  

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
        <Group justify="space-between" h="100%">

          <Image
            src="/LOGO.png" 
            alt="Adamass Logo"
            width={100}  
            height={20}  
            priority        
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
                      Solutions
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Solutions</Text>
                  <Anchor href="#" fz="xs">
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
                        Explore Desktop Review AI
                      </Text>
                      <Text size="xs" c="dimmed">
                        Speed up your assessments with our cutting-edge AI-driven review platform.
                      </Text>
                    </div>
                    <Button variant="default">Try for Free</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link href="/contact" className={classes.link}>
              Contact
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Button>Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>
  );
}
