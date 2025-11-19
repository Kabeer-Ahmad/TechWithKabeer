"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { EDUCATION, CREDENTIALS } from "@/app/constants";
import { GraduationCap, Award, Calendar, Building, ExternalLink, CheckCircle } from "lucide-react";

export const Education = () => {
    return (
        <section id="education" className="flex flex-col items-center justify-center py-20 relative z-20">
            <SectionHeading
                icon={<GraduationCap className="text-purple-500" size={48} />}
                title="About Me"
                subtitle="My academic journey and professional credentials"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            {EDUCATION.length}
                        </div>
                        <div className="text-gray-400">Degrees</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            {CREDENTIALS.length}
                        </div>
                        <div className="text-gray-400">Certifications & Courses</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">
                            ∞
                        </div>
                        <div className="text-gray-400">Learning</div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Education (Smaller Area - 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                                    <GraduationCap className="text-purple-500" size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Education</h3>
                            </div>

                            <div className="flex flex-col gap-6">
                                {EDUCATION.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="p-6 border-l-4 border-l-purple-500 hover:bg-purple-500/5 transition-colors">
                                            <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                                            <div className="flex items-center gap-2 text-purple-400 mb-2">
                                                <Building size={16} />
                                                <span className="font-medium">{edu.institution}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                                <Calendar size={14} />
                                                <span>{edu.period}</span>
                                            </div>
                                            {edu.details && (
                                                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20">
                                                    {edu.details}
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Certifications & Courses (Larger Area - 8 cols) */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                    <Award className="text-cyan-500" size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Certifications & Courses</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CREDENTIALS.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Card className="h-full p-5 border-l-4 border-l-cyan-500 hover:bg-cyan-500/5 transition-all group relative overflow-hidden">
                                            <div className="flex flex-col justify-between h-full gap-4">
                                                <div>
                                                    <div className="flex justify-between items-start gap-2 mb-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full border ${item.type === 'Certification'
                                                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                                                                : 'bg-pink-500/10 text-pink-300 border-pink-500/20'
                                                            }`}>
                                                            {item.type}
                                                        </span>
                                                        <span className="text-xs text-gray-500">{item.date}</span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                                        <CheckCircle size={12} className="text-cyan-500" />
                                                        {item.provider}
                                                    </p>
                                                </div>

                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mt-auto pt-3 border-t border-white/5"
                                                >
                                                    <span>Verify Credential</span>
                                                    <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
