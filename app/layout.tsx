import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alejardín 🌸 - Una flor nueva cada día",
  description:
    "Descubre una flor nueva cada día durante todo un año. 365 flores únicas con mensajes especiales. Una app creada con amor para Alejandra.",
  keywords: [
    "flores",
    "jardín",
    "naturaleza",
    "flores diarias",
    "app de flores",
    "Alejardín",
    "PWA",
  ],
  authors: [{ name: "Alejardín Team" }],
  creator: "Alejardín",
  publisher: "Alejardín",
  manifest: "/manifest.json",
  themeColor: "#FFE4E9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Alejardín",
  },
  openGraph: {
    type: "website",
    title: "Alejardín 🌸 - Una flor nueva cada día",
    description:
      "Descubre una flor nueva cada día durante todo un año. 365 flores únicas con mensajes especiales.",
    siteName: "Alejardín",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejardín 🌸",
    description: "Una flor nueva cada día para ti",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
