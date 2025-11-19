"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { Lightbulb, Code, Rocket, Settings, CheckCircle, Database, Cloud, Cpu, Zap, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const phases = [
    {
        number: "01",
        title: "Planning & Strategy",
        icon: Lightbulb,
        description: "Understanding requirements, defining scope, and creating a roadmap for success.",
        color: "from-purple-500 to-pink-500",
        borderColor: "border-purple-500",
        position: { desktop: "top-0 left-1/2 -translate-x-1/2", mobile: "top-0" },
    },
    {
        number: "02",
        title: "Design & Architecture",
        icon: Code,
        description: "Crafting scalable architecture and designing intuitive user experiences.",
        color: "from-pink-500 to-cyan-500",
        borderColor: "border-pink-500",
        position: { desktop: "top-48 left-0", mobile: "top-64" },
    },
    {
        number: "03",
        title: "Development & Progress",
        icon: Settings,
        description: "Building features iteratively with regular updates and quality assurance.",
        color: "from-cyan-500 to-blue-500",
        borderColor: "border-cyan-500",
        position: { desktop: "top-96 left-1/4", mobile: "top-128" },
    },
    {
        number: "04",
        title: "Deployment & Launch",
        icon: Rocket,
        description: "Seamless deployment to production with monitoring and optimization.",
        color: "from-blue-500 to-purple-500",
        borderColor: "border-blue-500",
        position: { desktop: "top-96 right-1/4", mobile: "top-192" },
    },
    {
        number: "05",
        title: "Maintenance & Support",
        icon: CheckCircle,
        description: "Ongoing support, updates, and continuous improvement based on feedback.",
        color: "from-purple-500 to-pink-500",
        borderColor: "border-purple-500",
        position: { desktop: "top-48 right-0", mobile: "top-256" },
    },
];

// Tech icons that flow along the paths
const techIcons = [Database, Cloud, Cpu, Zap, Terminal, Code];

// Complete sequential path: Phase 1 → 2 → 3 → 4 → 5 (now flows through right side too)
const completePath = [
    // Start at Phase 1 (center top)
    { x: "50%", y: "15%" },
    // Move to Phase 2 (left)
    { x: "37%", y: "24%" },
    { x: "25%", y: "32%" },
    { x: "18%", y: "40%" },
    { x: "12%", y: "48%" },
    // Move to Phase 3 (bottom left)
    { x: "15%", y: "57%" },
    { x: "18%", y: "65%" },
    { x: "22%", y: "72%" },
    { x: "27%", y: "78%" },
    // Move to Phase 4 (bottom right)
    { x: "37%", y: "80%" },
    { x: "48%", y: "82%" },
    { x: "58%", y: "80%" },
    { x: "67%", y: "78%" },
    // Move to Phase 5 (right)
    { x: "75%", y: "65%" },
    { x: "82%", y: "57%" },
    { x: "88%", y: "48%" },
];

export const MyApproach = () => {
    const [particles, setParticles] = useState<{ id: number; icon: number }[]>([]);

    useEffect(() => {
        // Generate flowing tech icons following sequential path 1→2→3→4→5
        const interval = setInterval(() => {
            const newParticle = {
                id: Date.now(),
                icon: Math.floor(Math.random() * techIcons.length),
            };
            setParticles((prev) => [...prev.slice(-8), newParticle]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="approach" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20 overflow-hidden">
            <SectionHeading
                icon={<Lightbulb className="text-purple-500" size={48} />}
                title="My Approach"
                subtitle="A systematic process to deliver exceptional results"
                gradient="from-purple-500 via-pink-500 to-cyan-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Desktop View - Map Structure */}
                <div className="hidden lg:block relative h-[600px]">
                    {/* Animated SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>

                        {/* Solid Connection Lines - Sequential flow */}
                        {/* Line 1: Phase 1 to Phase 2 */}
                        <path
                            d="M 50% 15% Q 25% 32% 12% 48%"
                            stroke="url(#gradient1)"
                            strokeWidth="3"
                            fill="none"
                            opacity="0.8"
                        />
                        {/* Line 2: Phase 2 to Phase 3 */}
                        <path
                            d="M 12% 48% Q 17% 65% 27% 78%"
                            stroke="url(#gradient2)"
                            strokeWidth="3"
                            fill="none"
                            opacity="0.8"
                        />
                        {/* Line 3: Phase 3 to Phase 4 */}
                        <path
                            d="M 27% 78% Q 47% 82% 67% 78%"
                            stroke="url(#gradient3)"
                            strokeWidth="3"
                            fill="none"
                            opacity="0.8"
                        />
                        {/* Line 4: Phase 4 to Phase 5 */}
                        <path
                            d="M 67% 78% Q 80% 65% 88% 48%"
                            stroke="url(#gradient4)"
                            strokeWidth="3"
                            fill="none"
                            opacity="0.8"
                        />

                        {/* Pulsing dots at connection points */}
                        <motion.circle
                            cx="50%"
                            cy="15%"
                            r="4"
                            fill="#a855f7"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="12%"
                            cy="48%"
                            r="4"
                            fill="#ec4899"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="27%"
                            cy="78%"
                            r="4"
                            fill="#06b6d4"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="67%"
                            cy="78%"
                            r="4"
                            fill="#3b82f6"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                            cx="88%"
                            cy="48%"
                            r="4"
                            fill="#a855f7"
                            animate={{ r: [4, 6, 4], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </svg>

                    {/* Flowing Tech Icons - Following sequential path 1→2→3→4→5 */}
                    {particles.map((particle) => {
                        const TechIcon = techIcons[particle.icon];

                        return (
                            <motion.div
                                key={particle.id}
                                className="absolute w-6 h-6 rounded-full bg-purple-500/80 flex items-center justify-center backdrop-blur-sm shadow-lg"
                                initial={{ left: completePath[0].x, top: completePath[0].y, opacity: 1 }}
                                animate={{
                                    left: completePath.map(c => c.x),
                                    top: completePath.map(c => c.y),
                                    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                                }}
                                transition={{ duration: 9, ease: "linear" }}
                                style={{ zIndex: 5 }}
                            >
                                <TechIcon size={14} className="text-white" />
                            </motion.div>
                        );
                    })}

                    {/* Phase Cards */}
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`absolute ${phase.position.desktop} w-64`}
                            style={{ zIndex: 10 }}
                        >
                            <Card className={`p-6 border-l-4 ${phase.borderColor} hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-[#030014]/90`}>
                                <div className="flex flex-col gap-4">
                                    {/* Number Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                                            {phase.number}
                                        </div>
                                        <div className={`p-2 rounded-full bg-gradient-to-r ${phase.color} bg-opacity-10`}>
                                            <phase.icon className="text-white" size={24} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{phase.title}</h3>
                                        <p className="text-gray-400 text-sm">{phase.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile/Tablet View - Vertical Pipeline */}
                <div className="lg:hidden relative">
                    {/* Connecting Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 via-cyan-500 to-blue-500 opacity-30" />

                    <div className="flex flex-col gap-8">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex gap-6"
                            >
                                {/* Phase Number Circle */}
                                <div className="flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold text-lg shadow-lg relative z-10`}>
                                        {phase.number}
                                    </div>
                                </div>

                                {/* Phase Card */}
                                <Card className={`flex-1 p-6 border-l-4 ${phase.borderColor}`}>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full bg-gradient-to-r ${phase.color} bg-opacity-10`}>
                                                <phase.icon className="text-white" size={28} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm">{phase.description}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-300 text-lg">
                        Ready to bring your project to life with this proven approach?
                    </p>
                    <a
                        href="#contact"
                        className="inline-block mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform duration-300"
                    >
                        Let's Get Started
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
