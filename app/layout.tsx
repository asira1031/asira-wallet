import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MANNY PAY",
  description:
    "Digital wallet for payments, QR transfers, bank transfers, and savings.",
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

      <body>
        {children}

        <div
          style={{
            position: "fixed",
            bottom: 10,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "#888",
            zIndex: 9999,
          }}
        >
          Powered by Manny-pay Infrastructure
        </div>
      </body>
    </html>
  );
}