"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCES, PROJECTS, EDUCATION, CREDENTIALS } from "@/app/constants";
import { Briefcase, Rocket, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export const PreviewBoxes = () => {
    return (
        <section id="overview" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0">
                {/* Grid pattern */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
                {/* Fade out edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-transparent to-[#030014]" />
            </div>

            <SectionHeading
                title="Who Am I"
                subtitle="Explore my professional journey, projects, and credentials"
                gradient="from-purple-500 via-cyan-500 to-purple-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Experience Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/experience">
                            <Card className="h-full flex flex-col justify-between p-8 cursor-pointer group hover:border-purple-500 transition-all duration-300">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                                            <Briefcase className="text-purple-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Experience</h3>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                                            {EXPERIENCES.length}
                                        </p>
                                        <p className="text-gray-400">Professional Positions</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {EXPERIENCES.map((exp, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                                {exp.company}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span className="font-medium">See Details</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Projects Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Link href="/projects">
                            <Card className="h-full flex flex-col justify-between p-8 cursor-pointer group hover:border-cyan-500 transition-all duration-300">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                                            <Rocket className="text-cyan-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Projects</h3>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-2">
                                            {PROJECTS.length}
                                        </p>
                                        <p className="text-gray-400">Innovative Solutions</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {["Next.js", "React", "Flutter", "React Native", "Python", "PHP", "TypeScript", "JavaScript", "HTML/CSS", "MLOps", "DevOps", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes"].slice(0, 12).map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                    <span className="font-medium">See Details</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* About Me Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link href="/about">
                            <Card className="h-full flex flex-col justify-between p-8 cursor-pointer group hover:border-purple-500 transition-all duration-300">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                                            <GraduationCap className="text-purple-500" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">About Me</h3>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                                            {EDUCATION.length + CREDENTIALS.length}
                                        </p>
                                        <p className="text-gray-400">Credentials</p>
                                    </div>

                                    <p className="text-gray-300 mb-4">
                                        Academic background and professional certifications
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                            Education
                                        </span>
                                        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                            Credentials
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span className="font-medium">See Details</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
