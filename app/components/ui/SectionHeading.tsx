"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    gradient?: string;
}

export const SectionHeading = ({
    icon,
    title,
    subtitle,
    gradient = "from-purple-500 to-cyan-500"
}: SectionHeadingProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 relative"
        >
            {/* Decorative line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -z-10" />

            <div className="flex flex-col items-center gap-4 px-8 py-4">
                {icon && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                    >
                        {icon}
                    </motion.div>
                )}

                <h2 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient} relative`}>
                    {title}
                    {/* Underline decoration */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r ${gradient} origin-left`}
                    />
                </h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-400 text-lg max-w-2xl"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};
