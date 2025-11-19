"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { SOCIAL_LINKS } from "@/app/constants";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
    return (
        <section className="relative flex flex-col min-h-screen w-full items-center justify-center py-10 md:py-16 z-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center m-auto z-20 px-6 md:px-10 max-w-7xl w-full">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-5 flex-1 text-center md:text-left pt-16 md:pt-0"
                >
                    <div className="flex flex-col gap-3 md:gap-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                        <TypeAnimation
                            sequence={[
                                'Welcome To', 2000,
                                'مرحبا بك في', 2000,      // Arabic
                                'Bienvenue à', 2000,  // French
                                'Bienvenido a', 2000, // Spanish
                                'Willkommen bei', 2000, // German
                                'Benvenuto a', 2000,  // Italian
                                'ようこそ', 2000,     // Japanese
                                '환영합니다', 2000,    // Korean
                                'Добро пожаловать в', 2000, // Russian
                                '欢迎来到', 2000,        // Chinese
                                'خوش آمدید', 2000,  // Urdu/Persian
                            ]}
                            wrapper="div"
                            speed={50}
                            className="text-cyan-400"
                            repeat={Infinity}
                        />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            Tech With Kabeer
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-gray-400 my-3 max-w-[600px] mx-auto md:mx-0">
                        I&apos;m Kabeer Ahmad, a Full Stack & AI Developer with experience in Websites,
                        Mobile Apps, Softwares, AI, DevOps, & MLOps. Explore my projects and skills to see how I build modern, scalable solutions.
                    </p>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="mailto:tech.w.kabeer@gmail.com,kabeeahmad.ka@gmail.com">
                                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 group border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all">
                                    <span>Contact Me</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </Button>
                            </a>
                            <a href="/Kabeer Ahmad CV.pdf" download="Kabeer_Ahmad_CV.pdf">
                                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 group hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all">
                                    <span>Download CV</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                </Button>
                            </a>
                        </div>

                        <div className="flex gap-4 items-center justify-center md:justify-start">
                            {SOCIAL_LINKS.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Avatar Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 flex justify-center items-center"
                >
                    <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <Image
                            src="/hero-img.png"
                            alt="Kabeer Ahmad"
                            width={400}
                            height={400}
                            className="relative rounded-full border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50 object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div >
        </section >
    );
};
