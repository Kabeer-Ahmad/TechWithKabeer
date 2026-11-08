"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Check, Copy } from "lucide-react";
import { CODE_SHOWCASES } from "@/app/constants/codeShowcases";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { cn } from "@/app/lib/utils";

/** Minimal syntax theme tuned to the site palette. */
const theme: Record<string, React.CSSProperties> = {
    'code[class*="language-"]': { color: "#d4d4d8", background: "none", fontFamily: "var(--font-mono)", fontSize: "12.5px", lineHeight: 1.7 },
    'pre[class*="language-"]': { color: "#d4d4d8", background: "none", margin: 0, padding: "1.25rem 1.25rem 2rem", overflow: "auto" },
    comment: { color: "#5c5c66", fontStyle: "italic" },
    keyword: { color: "#b4a1ff" },
    "class-name": { color: "#d4ff4f" },
    function: { color: "#8fd3ff" },
    string: { color: "#a6e3a1" },
    "template-string": { color: "#a6e3a1" },
    number: { color: "#fab387" },
    boolean: { color: "#fab387" },
    operator: { color: "#a1a1aa" },
    punctuation: { color: "#71717a" },
    builtin: { color: "#d4ff4f" },
    property: { color: "#e4e4e7" },
    decorator: { color: "#fab387" },
};

const EXT: Record<string, string> = { typescript: "ts", python: "py", javascript: "js", tsx: "tsx" };

export const CodeShowcase = () => {
    const [active, setActive] = useState(0);
    const [copied, setCopied] = useState(false);
    const current = CODE_SHOWCASES[active];
    const fileName = `${current.title.split(" ").slice(0, 2).join("-").toLowerCase().replace(/[^a-z-]/g, "")}.${EXT[current.language] ?? "txt"}`;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(current.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <section id="code" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
            <SectionHeading
                index="04"
                label="Code"
                title={
                    <>
                        Read the <em>source</em>, not just the pitch
                    </>
                }
                description="A few patterns I reach for — retrieval pipelines, distributed training, GPU vision and real-time 3D."
            />

            <Reveal>
                <div className="grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[300px_1fr]">
                    <div className="flex gap-2 overflow-x-auto border-b border-line p-3 scrollbar-hide lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r">
                        {CODE_SHOWCASES.map((s, i) => (
                            <button
                                key={s.title}
                                onClick={() => setActive(i)}
                                className={cn(
                                    "relative min-w-[220px] rounded-xl p-4 text-left transition-colors lg:min-w-0",
                                    i === active ? "text-fg" : "text-muted hover:bg-white/[0.03] hover:text-fg"
                                )}
                            >
                                {i === active && (
                                    <motion.span
                                        layoutId="code-tab"
                                        className="absolute inset-0 rounded-xl border border-line-strong bg-white/[0.04]"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative block font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                                    {String(i + 1).padStart(2, "0")} · {s.language}
                                </span>
                                <span className="relative mt-1.5 block text-sm font-medium leading-snug">{s.title}</span>
                            </button>
                        ))}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center justify-between border-b border-line px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <span className="size-2.5 rounded-full bg-white/15" />
                                    <span className="size-2.5 rounded-full bg-white/15" />
                                    <span className="size-2.5 rounded-full bg-white/15" />
                                </div>
                                <span className="font-mono text-xs text-muted">{fileName}</span>
                            </div>
                            <button
                                onClick={copy}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                                aria-label="Copy code"
                            >
                                {copied ? <Check size={13} className="text-signal" /> : <Copy size={13} />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>

                        <div className="border-b border-line px-5 py-4">
                            <p className="text-sm text-muted">{current.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {current.tags.map((t) => (
                                    <span key={t} className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[460px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                    className="h-full overflow-auto"
                                >
                                    <SyntaxHighlighter language={current.language} style={theme} showLineNumbers lineNumberStyle={{ color: "#3f3f46", minWidth: "2.5em" }}>
                                        {current.code}
                                    </SyntaxHighlighter>
                                </motion.div>
                            </AnimatePresence>
                            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};
