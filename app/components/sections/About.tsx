"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export const About = () => {
    return (
        <section id="about" className="flex flex-col items-center justify-center py-20 relative z-20">
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
                About Me
            </h1>

            <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2"
                >
                    <Card className="h-full">
                        <h2 className="text-2xl font-bold mb-4 text-white">Executive Summary</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Versatile Full Stack Developer with a passion for scalable solutions, innovation, and seamless user experiences.
                            Skilled in front-end, back-end, and AI-driven development, with a strong focus on collaboration, problem-solving,
                            and high-impact solutions.
                        </p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2"
                >
                    <Card className="h-full flex flex-col justify-center">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-400">Location</span>
                                <span className="text-white">Lahore, Pakistan</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-400">Email</span>
                                <span className="text-white">kabeeahmad.ka@gmail.com</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-gray-400">Website</span>
                                <a href="https://kabeerahmad.work" target="_blank" className="text-cyan-500 hover:underline">kabeerahmad.work</a>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">LinkedIn</span>
                                <a href="https://www.linkedin.com/in/kabeer-ahmad/" target="_blank" className="text-cyan-500 hover:underline">kabeer-ahmad</a>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};
