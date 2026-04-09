import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Selamat Tinggal",
  description: "Kenangan dan Ucapan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
