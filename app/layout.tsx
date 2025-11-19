import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "./components/3d/StarBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech With Kabeer",
  description: "Full Stack Developer Portfolio",
};

import { MouseTrace } from "./components/ui/MouseTrace";
import { ScrollProgress } from "./components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <ScrollProgress />
        <MouseTrace />
        <StarsCanvas />
        {children}
      </body>
    </html>
  );
}
