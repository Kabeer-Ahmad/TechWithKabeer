"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Overview", href: "/#overview" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Code Showcase", href: "/#code-showcase" },
    { name: "Skills", href: "/#skills" },
    { name: "My Approach", href: "/#approach" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 w-full z-50 flex justify-center pt-6 px-4"
            >
                <div
                    className={cn(
                        "flex items-center justify-between gap-8 px-6 md:px-8 py-3 rounded-full transition-all duration-300 w-full max-w-5xl bg-[#030014]/80 backdrop-blur-md border border-white/10",
                        scrolled
                            ? "shadow-lg shadow-purple-500/10"
                            : "shadow-md shadow-purple-500/5"
                    )}
                >
                    <a
                        href="#"
                        className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
                    >
                        TWK
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="relative group text-gray-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:text-purple-500 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-24 left-4 right-4 z-40 md:hidden"
                    >
                        <div className="bg-[#030014]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                            <div className="flex flex-col p-4">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={handleNavClick}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="text-gray-300 hover:text-white hover:bg-white/5 transition-all px-4 py-3 rounded-lg text-base font-medium border-b border-white/5 last:border-b-0"
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
