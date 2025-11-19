"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "@/app/constants";
import { Mail } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20 overflow-hidden">
            <SectionHeading
                icon={<Mail className="text-cyan-500" size={48} />}
                title="Contact Me"
                subtitle="Let's work together on your next project"
                gradient="from-cyan-500 to-purple-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10 flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className="p-8 border-t-4 border-t-cyan-500 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <form className="flex flex-col gap-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white font-medium">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-white font-medium">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white font-medium">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white font-medium">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Your Message"
                                        className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <Button className="w-full md:w-auto self-end bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition-opacity">
                                    Send Message
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    {/* Right Column: Content & 3D Effects */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col gap-8 relative"
                    >
                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Let's Bring Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                    Ideas to Life
                                </span>
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Whether you have a groundbreaking startup idea, need to modernize your existing platform, or want to solve a complex technical challenge, I'm here to help.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Innovation", desc: "Cutting-edge solutions" },
                                    { title: "Quality", desc: "Clean, scalable code" },
                                    { title: "Speed", desc: "Fast delivery" },
                                    { title: "Support", desc: "Long-term partnership" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default"
                                    >
                                        <h4 className="text-cyan-400 font-bold mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative 3D Elements */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center w-full"
                >
                    <div className="flex flex-wrap justify-center gap-6 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-colors z-10">
                        {SOCIAL_LINKS.map((social, index) => {
                            const colors: { [key: string]: string } = {
                                "GitHub": "hover:text-white",
                                "LinkedIn": "hover:text-[#0077b5]",
                                "Instagram": "hover:text-[#E1306C]",
                                "YouTube": "hover:text-[#FF0000]",
                                "TikTok": "hover:text-[#ff0050]"
                            };

                            return (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-400 ${colors[social.name] || "hover:text-purple-500"} transition-colors hover:scale-110 transform duration-200 flex items-center gap-2`}
                                >
                                    <social.icon size={24} />
                                    <span className="text-sm font-medium hidden md:block">{social.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
