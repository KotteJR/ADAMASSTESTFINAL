// app/layout.tsx
import "./globals.scss";
import type { Metadata } from "next";
import {
  MantineProvider,
  ColorSchemeScript,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ClientLayout } from "./ClientLayout";

export const metadata: Metadata = {
  title: "Adamass",
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <ClientLayout>{children}</ClientLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
