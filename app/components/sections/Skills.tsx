"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { SKILLS } from "@/app/constants";
import { Zap, Code, Database, Cloud, Cpu, Smartphone, Wrench, Palette, Users } from "lucide-react";

// Icons for each category
const categoryIcons: { [key: string]: any } = {
    "Languages": Code,
    "Web Development": Zap,
    "Databases": Database,
    "Cloud & DevOps": Cloud,
    "AI / ML": Cpu,
    "Mobile Development": Smartphone,
    "Graphics & Design": Palette,
    "Project Management": Users,
    "Tools & Testing": Wrench,
};

export const Skills = () => {
    return (
        <section id="skills" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            <SectionHeading
                icon={<Zap className="text-cyan-500" size={48} />}
                title="Skills"
                subtitle="Technologies and tools I master"
                gradient="from-cyan-500 via-purple-500 to-pink-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 max-w-7xl w-full">
                {Object.entries(SKILLS).map(([category, items], index) => {
                    const IconComponent = categoryIcons[category] || Code;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className="h-full relative group rounded-xl p-[1px] overflow-hidden">
                                {/* Rotating Gradient Border */}
                                <motion.div
                                    className="absolute inset-[-50%]"
                                    animate={{ rotate: [index * 45, index * 45 + 360] }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        background: "conic-gradient(from 0deg, transparent 0 340deg, #a855f7 360deg)"
                                    }}
                                />

                                {/* Inner Content */}
                                <div className="relative h-full bg-[#0a0118] rounded-xl p-6 border border-white/10 group-hover:border-purple-500/50 transition-colors">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
                                        <motion.div
                                            className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <IconComponent className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                                        </motion.div>
                                        <h2 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                                            {category}
                                        </h2>
                                    </div>

                                    {/* Skills Tags with Juggling Animation */}
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                animate={{
                                                    y: [0, -3, 0, -2, 0],
                                                    rotate: [0, 1, 0, -1, 0],
                                                }}
                                                transition={{
                                                    opacity: { delay: index * 0.1 + i * 0.05 },
                                                    y: {
                                                        duration: 4 + (i % 3),
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                        ease: "easeInOut"
                                                    },
                                                    rotate: {
                                                        duration: 4 + (i % 3),
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                whileHover={{
                                                    scale: 1.15,
                                                    y: -4,
                                                    rotate: 0,
                                                    transition: { duration: 0.2 }
                                                }}
                                                className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Skill Count Badge */}
                                    <motion.div
                                        className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-500"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                        <span>{items.length} skills</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
