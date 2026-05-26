import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asira Wallet",
  description: "Digital wallet for payments, QR, transfers, and savings.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>

      <body>{children}</body>
    </html>
  );
}