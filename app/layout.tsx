import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#08080a",
};

const TITLE = "Kabeer Ahmad — Software Engineer | Full-Stack & Applied AI";
const DESCRIPTION =
    "Software engineer specializing in full-stack development and applied AI — LLM integration, AI agents and automation. I turn LLMs, open-source models and automation into production-ready products. Based in Lahore, Pakistan.";

export const metadata: Metadata = {
    title: {
        default: TITLE,
        template: "%s | Kabeer Ahmad",
    },
    description: DESCRIPTION,
    keywords: [
        "Kabeer Ahmad",
        "Tech With Kabeer",
        "Software Engineer",
        "Full Stack Developer",
        "Applied AI Engineer",
        "LLM Integration",
        "AI Agents",
        "Automation",
        "n8n",
        "React Native",
        "Next.js",
        "React",
        "Node.js",
        "Python",
        "Virtual Try-On",
        "Lahore",
        "Pakistan",
    ],
    authors: [{ name: "Kabeer Ahmad", url: "https://tech-with-kabeer.vercel.app" }],
    creator: "Kabeer Ahmad",
    publisher: "Kabeer Ahmad",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL("https://tech-with-kabeer.vercel.app"),
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tech-with-kabeer.vercel.app",
        title: TITLE,
        description: DESCRIPTION,
        siteName: "Kabeer Ahmad",
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable} overflow-x-clip`}>
            <body className="min-h-screen bg-ink font-sans text-fg">{children}</body>
        </html>
    );
}
