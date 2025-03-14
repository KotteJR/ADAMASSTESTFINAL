import "./globals.scss";
import type { Metadata } from "next";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { HeaderMegaMenu } from "./LandingPage/components/HeaderMegaMenu";

export const metadata: Metadata = {
  title: "Adamass",
};

// ✅ Create a theme that applies "Inter" globally
const theme = createTheme({
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <HeaderMegaMenu />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
