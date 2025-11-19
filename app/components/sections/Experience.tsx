"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCES } from "@/app/constants";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

export const Experience = () => {
    return (
        <section id="experience" className="flex flex-col items-center justify-center py-20 relative z-20">
            <SectionHeading
                icon={<Briefcase className="text-purple-500" size={48} />}
                title="Professional Experience"
                subtitle="My journey through the tech industry"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            {EXPERIENCES.length}
                        </div>
                        <div className="text-gray-400">Positions</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            {new Set(EXPERIENCES.map(e => e.company)).size}
                        </div>
                        <div className="text-gray-400">Companies</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            3+
                        </div>
                        <div className="text-gray-400">Years Experience</div>
                    </Card>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

                    <div className="flex flex-col gap-12 md:gap-20">
                        {EXPERIENCES.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:items-center justify-center w-full`}>

                                {/* Left Side (Card or Date) */}
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right pl-16 md:pl-0' : 'md:text-left hidden md:block'}`}>
                                    {index % 2 === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <ExperienceCard exp={exp} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="hidden md:flex items-center justify-end gap-2"
                                        >
                                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-300 font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                                {exp.period}
                                            </div>
                                            <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-purple-500/50" />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Center Timeline Node */}
                                <div className="absolute left-6 md:static md:left-auto top-0 md:top-auto flex items-center justify-center z-10 transform -translate-x-1/2 md:translate-x-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.4, type: "spring" }}
                                        className="w-12 h-12 rounded-full bg-[#0a0118] border-2 border-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] relative group"
                                    >
                                        {/* Pulsing effect */}
                                        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-75" />
                                        <Briefcase size={20} className="text-purple-400 group-hover:text-white transition-colors relative z-10" />
                                    </motion.div>
                                </div>

                                {/* Right Side (Date or Card) */}
                                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-left hidden md:block' : 'md:text-right pl-16 md:pl-0'}`}>
                                    {index % 2 === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="hidden md:flex items-center justify-start gap-2"
                                        >
                                            <div className="h-[2px] w-8 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-300 font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                                {exp.period}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <ExperienceCard exp={exp} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Mobile Date (visible only on small screens) */}
                                <div className="md:hidden w-full flex justify-start pl-16 mt-2 mb-4">
                                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-medium">
                                        {exp.period}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ExperienceCard = ({ exp }: { exp: any }) => (
    <Card className="border-l-4 border-l-purple-500 p-6 md:p-8 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group hover:-translate-y-1 text-left">
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{exp.role}</h3>

                <div className="flex items-center gap-2 text-lg text-purple-400 font-medium">
                    <Briefcase size={16} />
                    <h4>{exp.company}</h4>
                </div>
            </div>

            {/* Responsibilities */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-purple-400" />
                    <h5 className="font-semibold text-white">Key Responsibilities</h5>
                </div>
                <ul className="space-y-2 mb-4">
                    {exp.description.map((desc: string, i: number) => (
                        <li key={i} className="text-gray-300 flex gap-3 text-sm leading-relaxed">
                            <span className="text-purple-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                            <span>{desc}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Technologies Tags */}
            {exp.technologies && (
                <div className="pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string, i: number) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </Card>
);
