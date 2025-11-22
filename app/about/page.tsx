"use client";

import { Education } from "../components/sections/Education";
import { Navbar } from "../components/ui/Navbar";
import StarsCanvas from "../components/3d/StarBackground";
import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="h-full w-full">
            <StarsCanvas />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-0 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <User className="text-cyan-400" size={24} />
                            <span className="text-white font-semibold">About Me</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
                            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Journey</span>
                        </h1>
                        <p className="text-l md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                            My Educational Background, Certifications, & Courses!
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="flex flex-col gap-10">
                <Education />
            </div>
        </main>
    );
}
