import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "./components/3d/StarBackground";

const inter = Inter({ subsets: ["latin"] });

import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#030014",
};

export const metadata: Metadata = {
  title: {
    default: "Kabeer Ahmad - Full Stack Developer | React, Next.js, Node.js Expert",
    template: "%s | Kabeer Ahmad"
  },
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-driven solutions. 3+ years of experience building scalable web applications. Based in Lahore, Pakistan.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Expert",
    "TypeScript Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "AI Development",
    "Kabeer Ahmad",
    "Tech With Kabeer",
    "Pakistan Developer",
    "Lahore Developer",
    "MERN Stack",
    "Software Engineer",
    "Web Applications",
    "Scalable Solutions",
    "UI/UX Development"
  ],
  authors: [{ name: "Kabeer Ahmad", url: "https://tech-with-kabeer.vercel.app" }],
  creator: "Kabeer Ahmad",
  publisher: "Kabeer Ahmad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tech-with-kabeer.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tech-with-kabeer.vercel.app",
    title: "Kabeer Ahmad - Full Stack Developer | React, Next.js, Node.js Expert",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-driven solutions. 3+ years of experience building scalable web applications.",
    siteName: "Kabeer Ahmad Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kabeer Ahmad - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabeer Ahmad - Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and AI-driven solutions.",
    images: ["/og-image.png"],
    creator: "@kabeerahmad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
  },
};

import { MouseTrace } from "./components/ui/MouseTrace";
import { ScrollProgress } from "./components/ui/ScrollProgress";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} bg-[#030014] overflow-x-hidden`}>
        <ScrollProgress />
        <MouseTrace />
        {children}
      </body>
    </html>
  );
}
