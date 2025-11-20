"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "@/app/constants";
import { Mail, MessageCircle, Send, Sparkles, ExternalLink } from "lucide-react";

export const Contact = () => {
    const email = "tech.w.kabeer@gmail.com";
    const whatsapp = "+923214480668";
    const whatsappLink = `https://wa.me/${whatsapp.replace(/\+/g, '')}`;

    return (
        <section id="contact" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20 overflow-hidden">
            <SectionHeading
                icon={<Send className="text-cyan-500" size={48} />}
                title="Let's Connect"
                subtitle="Ready to bring your ideas to life? Reach out!"
                gradient="from-cyan-500 to-purple-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Let's Build Something{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 inline-flex items-center gap-2">
                                Amazing
                                <Sparkles className="text-cyan-400 inline" size={32} />
                            </span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Have a project in mind? Want to collaborate? Or just want to say hi?
                            I'd love to hear from you! Choose your preferred way to connect.
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="text-2xl font-bold text-cyan-400 mb-1">24h</div>
                                <div className="text-sm text-gray-400">Response Time</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            >
                                <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
                                <div className="text-sm text-gray-400">Satisfaction</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - MacBook Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-full mx-auto"
                        style={{ maxWidth: '30rem' }}
                    >
                        {/* MacBook Frame */}
                        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl md:rounded-2xl p-2 md:p-3 shadow-2xl border border-gray-700">
                            {/* Screen Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-4 md:h-6 bg-black rounded-b-xl md:rounded-b-2xl z-10" />

                            {/* Screen */}
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden relative">
                                {/* Browser Chrome */}
                                <div className="bg-gray-800/50 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 border-b border-gray-700">
                                    <div className="flex gap-1.5 md:gap-2">
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex-1 mx-2 md:mx-4 bg-gray-700/50 rounded px-2 md:px-3 py-0.5 md:py-1 text-xs text-gray-400 flex items-center gap-2">
                                        <ExternalLink size={10} />
                                        <span className="hidden sm:inline">Contact Me</span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-3 md:p-4 space-y-2 md:space-y-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                                    {/* Email Section */}
                                    <a
                                        href={`mailto:${email}`}
                                        className="block group"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden cursor-pointer"
                                        >
                                            {/* Animated background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

                                            <div className="relative z-10 flex items-center gap-2 md:gap-3">
                                                <div className="p-1.5 md:p-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex-shrink-0">
                                                    <Mail className="text-cyan-400" size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs md:text-sm font-semibold text-white mb-0.5">Email Me</div>
                                                    <div className="text-[10px] md:text-xs text-cyan-400 font-mono truncate">{email}</div>
                                                </div>
                                                <Send size={14} className="text-cyan-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                            </div>
                                        </motion.div>
                                    </a>

                                    {/* WhatsApp Section */}
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 md:p-4 relative overflow-hidden cursor-pointer"
                                        >
                                            {/* Animated background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

                                            <div className="relative z-10 flex items-center gap-2 md:gap-3">
                                                <div className="p-1.5 md:p-2 rounded-full bg-green-500/20 border border-green-500/50 flex-shrink-0">
                                                    <MessageCircle className="text-green-400" size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs md:text-sm font-semibold text-white mb-0.5">WhatsApp Me</div>
                                                    <div className="text-[10px] md:text-xs text-green-400 font-mono">{whatsapp}</div>
                                                </div>
                                                <MessageCircle size={14} className="text-green-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                            </div>
                                        </motion.div>
                                    </a>

                                    {/* Quick Note */}
                                    <div className="text-center pt-1 md:pt-2">
                                        <p className="text-[10px] md:text-xs text-gray-500">Click to connect instantly</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MacBook Base */}
                        <div className="h-1.5 md:h-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl mx-auto" style={{ width: '110%', marginLeft: '-5%' }} />
                        <div className="h-0.5 md:h-1 bg-gradient-to-b from-gray-800 to-gray-900 mx-auto" style={{ width: '120%', marginLeft: '-10%' }} />

                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl -z-10 opacity-50" />
                    </motion.div>
                </div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <h4 className="text-xl font-semibold text-white mb-6">Or Connect With Me On</h4>

                    {/* Desktop - Floating Capsule Container */}
                    <div className="hidden md:block relative h-32 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

                        {/* Blurred edges overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 shadow-[inset_0_0_30px_15px_rgba(3,0,20,0.5)] rounded-full" />
                        </div>

                        {/* Floating Social Icons */}
                        <div className="absolute inset-0 flex items-center justify-center px-12">
                            <div className="flex items-center justify-evenly w-full">
                                {SOCIAL_LINKS.map((social, index) => {
                                    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
                                        "GitHub": { bg: "hover:bg-white/10", text: "hover:text-white", border: "hover:border-white" },
                                        "LinkedIn": { bg: "hover:bg-[#0077b5]/10", text: "hover:text-[#0077b5]", border: "hover:border-[#0077b5]" },
                                        "Instagram": { bg: "hover:bg-[#E1306C]/10", text: "hover:text-[#E1306C]", border: "hover:border-[#E1306C]" },
                                        "YouTube": { bg: "hover:bg-[#FF0000]/10", text: "hover:text-[#FF0000]", border: "hover:border-[#FF0000]" },
                                        "TikTok": { bg: "hover:bg-[#ff0050]/10", text: "hover:text-[#ff0050]", border: "hover:border-[#ff0050]" }
                                    };

                                    const colorScheme = colors[social.name] || { bg: "hover:bg-purple-500/10", text: "hover:text-purple-500", border: "hover:border-purple-500" };

                                    const randomDuration = 4 + Math.random() * 3; // 4-7 seconds
                                    const randomDelay = Math.random() * 2; // 0-2 seconds

                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-gray-400 ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} transition-all cursor-pointer`}
                                            animate={{
                                                y: [0, -8, 0], // Float up and down
                                            }}
                                            transition={{
                                                duration: randomDuration,
                                                delay: randomDelay,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                            }}
                                        >
                                            <social.icon size={18} className="transition-transform" />
                                            <span className="text-sm font-medium">{social.name}</span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Mobile - Floating Grid Layout */}
                    <div className="md:hidden grid grid-cols-2 gap-4">
                        {SOCIAL_LINKS.map((social, index) => {
                            const colors: { [key: string]: { bg: string; text: string; border: string } } = {
                                "GitHub": { bg: "active:bg-white/10", text: "active:text-white", border: "active:border-white" },
                                "LinkedIn": { bg: "active:bg-[#0077b5]/10", text: "active:text-[#0077b5]", border: "active:border-[#0077b5]" },
                                "Instagram": { bg: "active:bg-[#E1306C]/10", text: "active:text-[#E1306C]", border: "active:border-[#E1306C]" },
                                "YouTube": { bg: "active:bg-[#FF0000]/10", text: "active:text-[#FF0000]", border: "active:border-[#FF0000]" },
                                "TikTok": { bg: "active:bg-[#ff0050]/10", text: "active:text-[#ff0050]", border: "active:border-[#ff0050]" }
                            };

                            const colorScheme = colors[social.name] || { bg: "active:bg-purple-500/10", text: "active:text-purple-500", border: "active:border-purple-500" };

                            const randomDuration = 4 + Math.random() * 3;
                            const randomDelay = index * 0.2;

                            // Center the last (5th) item by spanning both columns
                            const isLast = index === SOCIAL_LINKS.length - 1;

                            return (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-gray-400 ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} transition-all ${isLast ? 'col-span-2 max-w-xs mx-auto' : ''}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    animate={{
                                        y: [0, -6, 0], // Float up and down
                                    }}
                                    transition={{
                                        opacity: { delay: randomDelay, duration: 0.5 },
                                        scale: { delay: randomDelay, duration: 0.5 },
                                        y: { duration: randomDuration, delay: randomDelay, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={20} />
                                    <span className="text-sm font-medium">{social.name}</span>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-16 pt-8 border-t border-white/10"
                >
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Tech With Kabeer!
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
