"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { SKILLS } from "@/app/constants";
import { Zap, Code, Database, Cloud, Cpu, Smartphone, Wrench, Palette, Users } from "lucide-react";
import { useRef } from "react";
import { MobileScrollProgress } from "../ui/MobileScrollProgress";

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

const SkillCard = ({ category, items, index }: { category: string; items: string[]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animations for smooth movement
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized position (-0.5 to 0.5)
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const IconComponent = categoryIcons[category] || Code;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            style={{
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="h-full relative group rounded-xl p-[3px] overflow-visible"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Enhanced 3D Border with Multiple Layers */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                    {/* Rotating gradient border - always visible */}
                    <motion.div
                        className="absolute inset-[-50%] z-10"
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

                    {/* Outer glow - always visible, brighter on hover */}
                    <motion.div
                        className="absolute inset-[-3px] rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.6))",
                            filter: "blur(10px)",
                        }}
                    />
                </div>

                {/* Inner Content with 3D effect */}
                <div
                    className="relative h-full bg-[#0a0118] rounded-xl p-6 border-[3px] border-white/10 group-hover:border-purple-500/50 transition-colors"
                    style={{
                        transform: "translateZ(20px)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
                        <motion.div
                            className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                transform: "translateZ(30px)",
                            }}
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
                                style={{
                                    transform: "translateZ(10px)",
                                }}
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
            </motion.div>
        </motion.div>
    );
};

export const Skills = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const skillsArray = Object.entries(SKILLS);

    return (
        <section id="skills" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            <SectionHeading
                icon={<Zap className="text-cyan-500" size={48} />}
                title="Skills"
                subtitle="Technologies and tools I master"
                gradient="from-cyan-500 via-purple-500 to-pink-500"
            />

            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 max-w-7xl w-full">
                {skillsArray.map(([category, items], index) => (
                    <SkillCard key={index} category={category} items={items} index={index} />
                ))}
            </div>

            {/* Mobile Slider View */}
            <div
                ref={scrollRef}
                className="md:hidden w-full flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 scrollbar-hide"
            >
                {skillsArray.map(([category, items], index) => (
                    <div key={index} className="w-[85vw] snap-center flex-shrink-0">
                        <SkillCard category={category} items={items} index={index} />
                    </div>
                ))}
            </div>

            <MobileScrollProgress containerRef={scrollRef} />
        </section>
    );
};
