"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCES, PROJECTS, EDUCATION, CREDENTIALS } from "@/app/constants";
import { Briefcase, Rocket, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const PreviewCard = ({
    href,
    icon: Icon,
    title,
    count,
    countLabel,
    items,
    gradient,
    hoverColor,
    index
}: any) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animations for smooth movement
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={href}>
                <motion.div
                    className="h-full relative group rounded-xl p-[3px] overflow-visible"
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Enhanced 3D Border */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                        {/* Rotating gradient border */}
                        <motion.div
                            className="absolute inset-[-50%] z-10"
                            animate={{ rotate: [index * 60, index * 60 + 360] }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                background: `conic-gradient(from 0deg, transparent 0 340deg, ${gradient} 360deg)`
                            }}
                        />

                        {/* Outer glow */}
                        <motion.div
                            className="absolute inset-[-3px] rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 z-0"
                            style={{
                                background: `linear-gradient(135deg, ${gradient}40, ${gradient}60)`,
                                filter: "blur(10px)",
                            }}
                        />
                    </div>

                    {/* Card Content */}
                    <div
                        className={`relative h-full bg-[#0a0118] rounded-xl p-8 border-[3px] border-white/10 group-hover:border-${hoverColor} transition-all duration-300 cursor-pointer flex flex-col justify-between`}
                        style={{
                            transform: "translateZ(20px)",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    className={`p-3 rounded-full bg-${hoverColor}/10 border border-${hoverColor}/20 group-hover:bg-${hoverColor}/20 transition-all`}
                                    style={{
                                        transform: "translateZ(30px)",
                                    }}
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Icon className={`text-${hoverColor}`} size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white">{title}</h3>
                            </div>

                            <div className="mb-6">
                                <p className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-2`}>
                                    {count}
                                </p>
                                <p className="text-gray-400">{countLabel}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {items.map((item: any, i: number) => (
                                    <motion.span
                                        key={i}
                                        className={`text-xs px-2 py-1 rounded-full bg-${hoverColor}/10 text-${hoverColor}-300 border border-${hoverColor}/20`}
                                        style={{
                                            transform: "translateZ(10px)",
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className={`mt-6 flex items-center gap-2 text-${hoverColor}-400 group-hover:text-${hoverColor}-300 transition-colors`}>
                            <span className="font-medium">See Details</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export const PreviewBoxes = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const cards = [
        {
            href: "/experience",
            icon: Briefcase,
            title: "Experience",
            count: EXPERIENCES.length,
            countLabel: "Professional Positions",
            items: EXPERIENCES.map(exp => exp.company),
            gradient: "from-purple-500 to-cyan-500",
            hoverColor: "purple-500"
        },
        {
            href: "/projects",
            icon: Rocket,
            title: "Projects",
            count: PROJECTS.length,
            countLabel: "Completed Projects",
            items: PROJECTS.slice(0, 5).map(p => p.title),
            gradient: "from-cyan-500 to-purple-500",
            hoverColor: "cyan-500"
        },
        {
            href: "/about",
            icon: GraduationCap,
            title: "Education",
            count: EDUCATION.length,
            countLabel: "Academic Achievements",
            items: EDUCATION.map(edu => edu.degree),
            gradient: "from-pink-500 to-cyan-500",
            hoverColor: "pink-500"
        }
    ];

    const totalSlides = cards.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <section id="overview" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            <SectionHeading
                title="Who Am I"
                subtitle="Explore my professional journey, projects, and credentials"
                gradient="from-purple-500 via-cyan-500 to-purple-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <PreviewCard key={index} {...card} index={index} />
                    ))}
                </div>

                {/* Mobile Slider View */}
                <div className="md:hidden w-full relative">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${currentSlide * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50 && currentSlide < totalSlides - 1) {
                                    nextSlide();
                                } else if (swipe > 50 && currentSlide > 0) {
                                    prevSlide();
                                }
                            }}
                        >
                            {cards.map((card, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <PreviewCard {...card} index={index} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {cards.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'bg-purple-500 w-8'
                                        : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Slide Counter */}
                    <div className="text-center mt-4 text-sm text-gray-400">
                        {currentSlide + 1} / {totalSlides}
                    </div>
                </div>
            </div>
        </section>
    );
};
