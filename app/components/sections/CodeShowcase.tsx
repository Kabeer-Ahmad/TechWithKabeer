"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { CODE_SHOWCASES } from "@/app/constants/codeShowcases";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Copy, Check } from "lucide-react";

export const CodeShowcase = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(CODE_SHOWCASES[selectedIndex].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const selectedShowcase = CODE_SHOWCASES[selectedIndex];

    return (
        <section id="code-showcase" className="flex flex-col items-center justify-center py-10 md:py-14 relative z-20">
            <SectionHeading
                icon={<Code2 className="text-purple-500" size={48} />}
                title="Code Showcase"
                subtitle="Explore my coding style through these snippets"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                <div className="flex flex-col gap-6">
                    {/* Sidebar Selector - Horizontal scroll on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="flex lg:hidden gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                            {CODE_SHOWCASES.map((showcase, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-shrink-0 w-[280px] snap-start text-left p-4 rounded-xl transition-all duration-300 ${selectedIndex === index
                                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500'
                                        : 'bg-white/5 border-2 border-white/10'
                                        }`}
                                >
                                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                                        {showcase.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {showcase.tags.slice(0, 3).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar Selector - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden lg:block lg:w-1/3"
                        >
                            <div className="flex flex-col gap-3">
                                {CODE_SHOWCASES.map((showcase, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedIndex(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`text-left p-4 rounded-xl transition-all duration-300 ${selectedIndex === index
                                            ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500'
                                            : 'bg-white/5 border-2 border-white/10 hover:border-purple-500/50'
                                            }`}
                                    >
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                                            {showcase.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {showcase.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {showcase.tags.length > 3 && (
                                                <span className="text-xs px-2 py-1 text-gray-400">
                                                    +{showcase.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Code Display */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full lg:w-2/3"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="overflow-hidden">
                                        <div className="flex flex-col gap-4">
                                            {/* Header */}
                                            <div className="flex flex-col gap-3">
                                                <h2 className="text-2xl font-bold text-white">
                                                    {selectedShowcase.title}
                                                </h2>
                                                <p className="text-gray-400">{selectedShowcase.description}</p>

                                                {/* All Tags */}
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedShowcase.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Code Block */}
                                            <div className="relative">
                                                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                                                    <span className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
                                                        {selectedShowcase.language}
                                                    </span>
                                                    <button
                                                        onClick={handleCopy}
                                                        className="flex items-center gap-2 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-1 rounded transition-colors"
                                                    >
                                                        {copied ? (
                                                            <>
                                                                <Check size={14} />
                                                                <span>Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy size={14} />
                                                                <span>Copy</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                <div className="relative overflow-hidden rounded-lg border border-white/10 max-h-[600px] overflow-y-auto">
                                                    <SyntaxHighlighter
                                                        language={selectedShowcase.language}
                                                        style={vscDarkPlus}
                                                        customStyle={{
                                                            margin: 0,
                                                            borderRadius: '0.5rem',
                                                            fontSize: '0.875rem',
                                                            lineHeight: '1.5',
                                                        }}
                                                        showLineNumbers
                                                        wrapLines
                                                    >
                                                        {selectedShowcase.code}
                                                    </SyntaxHighlighter>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
