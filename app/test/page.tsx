"use client";

import TechBackground from "../components/3d/TechBackground";
import Link from "next/link";

export default function TestPage() {
    return (
        <main className="min-h-screen relative">
            <TechBackground />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
                <h1 className="text-6xl font-bold mb-8">Background Test</h1>
                <p className="text-xl text-gray-300 mb-8">Cyber Network Style</p>

                <Link href="/">
                    <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                        Back to Home
                    </button>
                </Link>
            </div>
        </main>
    );
};
